import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:3210',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/140.0 Safari/537.36',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'ANALYTICS_TEST_MODE=true ANALYTICS_HMAC_SECRET=e2e-secret-with-more-than-thirty-two-bytes npm run dev',
    url: 'http://localhost:3210',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
