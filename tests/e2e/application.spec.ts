import { expect, test, type Page } from '@playwright/test'

const SUBMIT = "Yes — I'm ready to apply"
const PDF = { name: 'Ada CV.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4\n% test cv\n') }

test.beforeEach(async ({ page }) => {
  await page.route(/^https?:\/\/(?!localhost:3210)/, (route) => route.abort())
  await page.route('**/api/analytics/batch', (route) => route.fulfill({ status: 202, body: '{}' }))
})

async function fillRequired(page: Page) {
  await page.locator('#name').fill('Ada Nowak')
  await page.locator('#email').fill('ada@example.com')
  await page.locator('#phone').fill('512345678')
  await page.locator('label', { hasText: 'Within a month' }).click()
  await page.locator('#reason').fill('I want a team to run the search while I keep my current job.')
}

test('the hero CTA scrolls to the form and focuses the first field', async ({ page }) => {
  await page.goto('/')
  await page.locator('[data-analytics-id="hero"]').click()
  await expect(page.locator('#apply')).toBeInViewport()
  await expect(page.locator('#name')).toBeFocused()
})

test('an empty submission shows every field error, phone and CV included', async ({ page }) => {
  await page.goto('/#apply')
  await page.getByRole('button', { name: SUBMIT }).click()
  await expect(page.getByText('Enter your full name.')).toBeVisible()
  await expect(page.getByText('Enter your phone number.')).toBeVisible()
  await expect(page.getByText('Choose when you need a new job by.')).toBeVisible()
  await expect(page.getByText('Tell us why you want to work with us.')).toBeVisible()
  await expect(page.getByText('Attach your CV (PDF or Word, up to 10 MB).')).toBeVisible()
  await expect(page.locator('#name')).toBeFocused()
})

test('the country menu searches, selects with Enter and returns focus to the number', async ({ page }) => {
  await page.goto('/#apply')
  const country = page.getByRole('button', { name: /Country code/ })
  await expect(country).toContainText('+48')
  await country.click()
  await expect(page.getByRole('listbox', { name: 'Countries' })).toBeVisible()
  await page.keyboard.type('germ')
  await page.keyboard.press('Enter')
  await expect(country).toContainText('+49')
  await expect(page.locator('#phone')).toBeFocused()
})

test('the country menu closes on Escape without changing the country', async ({ page }) => {
  await page.goto('/#apply')
  const country = page.getByRole('button', { name: /Country code/ })
  await country.click()
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('listbox', { name: 'Countries' })).toBeHidden()
  await expect(country).toBeFocused()
  await expect(country).toContainText('+48')
})

test('country search puts exact codes and common names first', async ({ page }) => {
  await page.goto('/#apply')
  const country = page.getByRole('button', { name: /Country code/ })
  await country.click()
  await page.keyboard.type('uk')
  await expect(page.getByRole('option').first()).toContainText('United Kingdom')
  await page.keyboard.press('Escape')
  await country.click()
  await page.keyboard.type('u')
  await expect(page.getByRole('option').first()).toContainText(/^U/)
})

test('a pasted international number switches the country', async ({ page }) => {
  await page.goto('/#apply')
  await page.locator('#phone').fill('+44 7911 123456')
  await expect(page.getByRole('button', { name: /Country code/ })).toContainText('+44')
})

test('the urgency choice works from the keyboard', async ({ page }) => {
  await page.goto('/#apply')
  const first = page.locator('#needJobBy-urgent_30d')
  await first.focus()
  await page.keyboard.press('Space')
  await expect(first).toBeChecked()
  await page.keyboard.press('ArrowDown')
  await expect(page.locator('#needJobBy-1_2m')).toBeChecked()
})

test('a CV file is sent as multipart and replaced by a confirmation', async ({ page }) => {
  let body = ''
  let contentType = ''
  await page.route('**/api/applications', async (route) => {
    body = route.request().postData() ?? ''
    contentType = route.request().headers()['content-type'] ?? ''
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' })
  })
  await page.goto('/#apply')
  await fillRequired(page)
  await page.locator('#cvFile').setInputFiles(PDF)
  await expect(page.getByText('Ada CV.pdf')).toBeVisible()
  await page.getByRole('button', { name: SUBMIT }).click()

  await expect(page.getByText('Application received, Ada')).toBeVisible()
  expect(contentType).toContain('multipart/form-data')
  expect(body).toContain('+48512345678')
  expect(body).toContain('filename="Ada CV.pdf"')
})

test('there is no CV link field or reason hint', async ({ page }) => {
  await page.goto('/#apply')
  await expect(page.locator('#cvLink')).toHaveCount(0)
  await expect(page.getByText('Two or three sentences is enough.')).toHaveCount(0)
})

test('a file that is not a real PDF is refused before sending', async ({ page }) => {
  await page.goto('/#apply')
  await page.locator('#cvFile').setInputFiles({ name: 'cv.pdf', mimeType: 'application/pdf', buffer: Buffer.from('MZ fake') })
  await expect(page.getByText('That file does not look like a real PDF or Word document.')).toBeVisible()
})

test('a failed send keeps the answers and asks to try again', async ({ page }) => {
  await page.route('**/api/applications', (route) =>
    route.fulfill({
      status: 503,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'We could not send your application just now. Please try again in a minute.' }),
    }),
  )
  await page.goto('/#apply')
  await fillRequired(page)
  await page.locator('#cvFile').setInputFiles(PDF)
  await page.getByRole('button', { name: SUBMIT }).click()

  await expect(page.getByText('Please try again in a minute.')).toBeVisible()
  await expect(page.locator('#name')).toHaveValue('Ada Nowak')
})
