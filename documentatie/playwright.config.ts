import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end tests voor MijnInkomen. Start eerst de omgeving met `docker compose up -d`
 * in de hoofdmap van de repo. De tests draaien na elkaar: de testaccounts delen één code uit de app.
 */
export default defineConfig({
  testDir: './test/e2e',
  outputDir: './tmp/playwright-results/',
  forbidOnly: !!process.env.CI,
  workers: 1,
  reporter: [['html', { outputFolder: './tmp/playwright-html-report/', open: 'never' }]],
  use: {
    trace: 'on-first-retry',
    /* Wachttijd per stap in milliseconden, om een test rustig te bekijken. */
    launchOptions: { slowMo: Number(process.env.SLOWMO ?? 0) },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
