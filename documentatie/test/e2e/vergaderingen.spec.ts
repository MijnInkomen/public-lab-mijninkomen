import { expect, test } from '@playwright/test';

// Start eerst de inlogomgeving met `docker compose up -d` in de hoofdmap van de repo.
process.loadEnvFile('../.env');

const websiteURL = `http://localhost:${process.env.SITE_PORT}`;

test('zonder login zijn de agenda\'s afgeschermd en staat Vergaderingen niet in het menu', async ({ page, request }) => {
  await page.goto(websiteURL);
  await expect(page.getByRole('link', { name: 'Vergaderingen' })).toHaveCount(0);

  expect((await request.get(`${websiteURL}/community/vergaderingen.json`)).status()).toBe(401);

  await page.goto(`${websiteURL}/vergaderingen/`);
  await expect(page.getByRole('heading', { name: 'Inloggen als communitylid' })).toBeVisible();
});
