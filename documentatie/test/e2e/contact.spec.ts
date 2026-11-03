import { expect, test } from '@playwright/test';

const contactURL = 'http://localhost:3000/contact/';

test.beforeEach(async ({ page }) => {
  await page.goto(contactURL);
});

test('toont waarvoor je contact opneemt en verwijst aansluiten door', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1, name: 'Neem contact op' })).toBeVisible();
  await expect(page.getByText('Vragen over de samenwerking')).toBeVisible();
  await expect(page.getByRole('link', { name: /Lees hoe je aansluit/ })).toHaveAttribute(
    'href',
    '/meer-weten/communitylid/',
  );
});

test('toont een algemeen e-mailadres en de reactietijd', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'programmateam@mijninkomen-voorbeeld.nl' })).toHaveAttribute(
    'href',
    'mailto:programmateam@mijninkomen-voorbeeld.nl',
  );
  await expect(page.getByText('We reageren binnen 5 werkdagen.')).toBeVisible();
});

test('opent LinkedIn in een nieuw tabblad', async ({ page }) => {
  const linkedin = page.getByRole('link', { name: /MijnInkomen op LinkedIn/ });

  await expect(linkedin).toHaveAttribute('href', 'https://www.linkedin.com/');
  await expect(linkedin).toHaveAttribute('target', '_blank');
});
