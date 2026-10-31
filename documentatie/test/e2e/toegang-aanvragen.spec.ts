import { expect, test, type Page } from '@playwright/test';

// Start eerst de omgeving met `docker compose up -d` in de hoofdmap van de repo.
const pagina = 'http://localhost:3000/toegang-aanvragen/';
const knop = (page: Page) => page.getByRole('button', { name: /Toegang aanvragen/ });

const vulIn = async (page: Page, email: string, gesprek: string) => {
  await page.getByLabel('Naam').fill('Sam de Vries');
  await page.getByLabel('Gemeente of organisatie').fill('Gemeente Utrecht');
  await page.getByLabel('Functie').fill('Beleidsadviseur');
  await page.getByLabel('E-mailadres van je werk').fill(email);
  await page.getByLabel('Wanneer had je het kennismakingsgesprek?').fill(gesprek);
};

test('een leeg formulier toont per veld een foutmelding', async ({ page }) => {
  await page.goto(pagina);
  await knop(page).click();

  await expect(page.getByText('Het formulier is nog niet goed ingevuld')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Vul je naam in.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Kies wanneer je het kennismakingsgesprek had.' })).toBeVisible();
  await expect(page.getByLabel('Naam')).toHaveAttribute('aria-invalid', 'true');
});

test('de datum kies je met een datumkiezer en mag niet in de toekomst liggen', async ({ page }) => {
  await page.goto(pagina);

  await expect(page.getByLabel('Wanneer had je het kennismakingsgesprek?')).toHaveAttribute('type', 'date');

  await vulIn(page, 'sam@gemeente.nl', '2030-01-01');
  await knop(page).click();

  await expect(page.getByRole('link', { name: /kan niet in de toekomst liggen/ })).toBeVisible();
});

test('een goede aanvraag toont de bevestiging en de vervolgstappen', async ({ page }) => {
  await page.goto(pagina);
  await vulIn(page, `sam-${Date.now()}@gemeente.nl`, '2026-10-12');
  await knop(page).click();

  await expect(page.getByText('Bedankt! We hebben je aanvraag ontvangen.')).toBeVisible();
  await expect(page.getByRole('heading', { name: /Wat gebeurt er daarna?/ })).toBeVisible();
  await expect(knop(page)).toHaveCount(0);
});
