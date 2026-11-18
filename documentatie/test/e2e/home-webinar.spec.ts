import { expect, test, type Page } from '@playwright/test';

const websiteURL = 'http://localhost:3000/';
const volgende = 'Het volgende webinar is op';

const openOp = async (page: Page, datum: string) => {
  await page.clock.setFixedTime(new Date(`${datum}T12:00:00`));
  await page.goto(websiteURL);
  await expect(page.getByRole('heading', { name: 'Wil je meer weten?' })).toBeVisible();
};

test('toont het eerstvolgende webinar', async ({ page }) => {
  await openOp(page, '2026-10-31');

  await expect(page.getByText(`${volgende} woensdag 11 november 2026.`)).toBeVisible();
});

test('slaat webinars in het verleden over', async ({ page }) => {
  await openOp(page, '2026-11-12');

  await expect(page.getByText(`${volgende} woensdag 9 december 2026.`)).toBeVisible();
});

test('laat alleen de zin met de datum weg zonder komend webinar', async ({ page }) => {
  await openOp(page, '2027-02-01');

  await expect(page.getByText('In een webinar vertellen we')).toBeVisible();
  await expect(page.getByText(volgende)).toHaveCount(0);
  await expect(page.getByRole('link', { name: /Lees meer over het webinar/ })).toHaveAttribute(
    'href',
    '/meer-weten/webinar/',
  );
});
