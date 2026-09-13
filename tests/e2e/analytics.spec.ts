import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route(/^https?:\/\/(?!localhost:3210)/, (route) => route.abort())
})

test('captures a privacy-minimised page view, UTM attribution, and CTA placement', async ({ page, context }) => {
  const batches: Record<string, unknown>[] = []
  await page.route('**/api/analytics/batch', async (route) => {
    batches.push(route.request().postDataJSON())
    await route.fulfill({ status: 202, contentType: 'application/json', body: '{"accepted":true}' })
  })
  await page.goto('/?utm_source=linkedin&utm_campaign=september&email=never-store-this')
  await expect.poll(() => batches.length).toBeGreaterThan(0)

  const first = batches[0] as { path: string; attribution: Record<string, string>; events: { name: string }[] }
  expect(first.path).toBe('/')
  expect(first.attribution.utmSource).toBe('linkedin')
  expect(first.attribution.utmCampaign).toBe('september')
  expect(JSON.stringify(first)).not.toContain('never-store-this')
  expect(first.events.some((event) => event.name === 'page_view')).toBe(true)

  await page.locator('[data-analytics-id="hero"]').click()
  await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pagehide')))
  await expect.poll(() => batches.some((batch) => JSON.stringify(batch).includes('cta_click'))).toBe(true)

  const cookies = await context.cookies()
  const visitorCookie = cookies.find((cookie) => cookie.name === 'ccc_visitor')
  const sessionCookie = cookies.find((cookie) => cookie.name === 'ccc_session')
  expect(visitorCookie?.httpOnly).toBe(true)
  expect(sessionCookie?.httpOnly).toBe(true)
  expect(visitorCookie!.expires - Date.now() / 1000).toBeGreaterThan(29 * 24 * 60 * 60)
  expect(sessionCookie!.expires - Date.now() / 1000).toBeGreaterThan(29 * 60)
})

test('records the application funnel without recording entered values', async ({ page }) => {
  const batches: Record<string, unknown>[] = []
  await page.route('**/api/analytics/batch', async (route) => {
    batches.push(route.request().postDataJSON())
    await route.fulfill({ status: 202, contentType: 'application/json', body: '{"accepted":true}' })
  })
  await page.route('**/api/applications', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' })
  })
  await page.goto('/')
  await expect.poll(() => batches.length).toBeGreaterThan(0)

  await page.getByRole('button', { name: /ready to apply/i }).last().click()
  await expect(page.getByRole('alert').first()).toBeVisible()
  await page.getByLabel('Full name').fill('Private Analytics Person')
  await page.getByLabel('Email').fill('private-analytics@example.com')
  await page.getByLabel('Phone number').fill('+48512345678')
  await page.getByLabel('Within a month').check()
  await page.getByLabel('Why do you want to work with us?').fill('This private answer must never appear in analytics payloads.')
  await page.locator('#cvFile').setInputFiles({
    name: 'private-resume.pdf',
    mimeType: 'application/pdf',
    buffer: Buffer.from('%PDF-1.4\n'),
  })
  await page.getByRole('button', { name: /ready to apply/i }).last().click()
  await expect(page.getByText(/Application received/)).toBeVisible()
  await expect.poll(() => batches.some((batch) => JSON.stringify(batch).includes('application_submitted'))).toBe(true)

  const payload = JSON.stringify(batches)
  expect(payload).toContain('application_started')
  expect(payload).toContain('application_submit_attempted')
  expect(payload).toContain('application_validation_failed')
  expect(payload).toContain('application_submitted')
  expect(payload).not.toContain('Private Analytics Person')
  expect(payload).not.toContain('private-analytics@example.com')
  expect(payload).not.toContain('private-resume.pdf')
  expect(payload).not.toContain('This private answer')
})

test('does not load the production tracker in the variant studio', async ({ page }) => {
  let requests = 0
  await page.route('**/api/analytics/batch', async (route) => {
    requests += 1
    await route.fulfill({ status: 202, body: '{}' })
  })
  await page.goto('/variants/original-baseline')
  await page.waitForTimeout(500)
  expect(requests).toBe(0)
})

test('does not identify or track an automated visitor', async ({ browser }) => {
  const context = await browser.newContext({ userAgent: 'Googlebot/2.1 (+https://www.google.com/bot.html)' })
  const page = await context.newPage()
  await page.route(/^https?:\/\/(?!localhost:3210)/, (route) => route.abort())
  let requests = 0
  await page.route('**/api/analytics/batch', async (route) => {
    requests += 1
    await route.fulfill({ status: 202, body: '{}' })
  })
  await page.goto('/')
  await page.waitForTimeout(500)
  expect(requests).toBe(0)
  expect((await context.cookies()).some((cookie) => cookie.name.startsWith('ccc_'))).toBe(false)
  await context.close()
})

test('opt-out endpoint removes analytics identifiers and prevents future collection', async ({ page, context }) => {
  let requests = 0
  await page.route('**/api/analytics/batch', async (route) => {
    requests += 1
    await route.fulfill({ status: 202, body: '{}' })
  })
  await page.goto('/')
  await expect.poll(() => requests).toBeGreaterThan(0)
  await page.evaluate(() => {
    const form = document.createElement('form')
    form.method = 'post'
    form.action = '/api/analytics/opt-out'
    document.body.appendChild(form)
    form.submit()
  })
  await expect(page).toHaveURL(/\?analytics=off$/)

  const cookies = await context.cookies()
  expect(cookies.find((cookie) => cookie.name === 'ccc_analytics_optout')?.value).toBe('1')
  expect(cookies.some((cookie) => ['ccc_visitor', 'ccc_session'].includes(cookie.name))).toBe(false)

  requests = 0
  await page.reload()
  await page.waitForTimeout(500)
  expect(requests).toBe(0)
})
