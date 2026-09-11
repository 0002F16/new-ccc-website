import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { chromium } from '@playwright/test'

const baseUrl = process.env.ANALYTICS_SNAPSHOT_URL || 'http://localhost:3210'
const output = path.join(process.cwd(), 'public', 'analytics', 'sections')
const sections = ['hero', 'two-situations', 'bottlenecks', 'outcomes', 'faq', 'apply']
const layouts = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 900, height: 1000 },
  desktop: { width: 1200, height: 900 },
  wide: { width: 1440, height: 1000 },
}

await fs.mkdir(output, { recursive: true })
for (const filename of await fs.readdir(output)) {
  if (/^(mobile|tablet|desktop|wide)-.+\.(png|jpg)$/.test(filename)) {
    await fs.unlink(path.join(output, filename))
  }
}
const browser = await chromium.launch()
const manifest = { generatedAt: new Date().toISOString(), source: baseUrl, layouts, sections, images: [] }

try {
  for (const [layout, viewport] of Object.entries(layouts)) {
    const page = await browser.newPage({
      viewport,
      deviceScaleFactor: 1,
      extraHTTPHeaders: { dnt: '1', 'sec-gpc': '1' },
    })
    await page.goto(baseUrl, { waitUntil: 'networkidle' })
    await page.addStyleTag({ content: '*{animation:none!important;transition:none!important}[data-reveal]{opacity:1!important;transform:none!important}' })
    await page.evaluate(() => document.querySelectorAll('nextjs-portal').forEach((element) => element.remove()))
    for (const section of sections) {
      const locator = page.locator(`#${section}`).first()
      await locator.scrollIntoViewIfNeeded()
      await page.waitForTimeout(80)
      const filename = `${layout}-${section}.jpg`
      await locator.screenshot({ path: path.join(output, filename), type: 'jpeg', quality: 78, animations: 'disabled' })
      const box = await locator.boundingBox()
      manifest.images.push({ layout, section, filename, width: Math.round(box?.width || 0), height: Math.round(box?.height || 0) })
    }
    await page.close()
  }
  await fs.writeFile(path.join(output, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
  process.stdout.write(`Generated ${manifest.images.length} analytics section backdrops.\n`)
} finally {
  await browser.close()
}
