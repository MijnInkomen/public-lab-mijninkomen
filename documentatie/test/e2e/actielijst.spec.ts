import { expect, test, type Page } from '@playwright/test';
import { createHmac } from 'node:crypto';

// Start eerst de omgeving met `docker compose up -d` in de hoofdmap van de repo. Draai met --workers=1.
process.loadEnvFile('../.env');

const leesInstelling = (naam: string) => {
  const waarde = process.env[naam];
  if (!waarde) throw new Error(`${naam} ontbreekt in .env`);
  return waarde;
};

const websiteURL = `http://localhost:${leesInstelling('SITE_PORT')}`;
const pagina = `${websiteURL}/vergaderingen/actielijst/`;

const maakCode = () => {
  const teller = Buffer.alloc(8);
  teller.writeBigUInt64BE(BigInt(Math.floor(Date.now() / 30000)));
  const hash = createHmac('sha1', leesInstelling('TEST_LID_OTP_SECRET')).update(teller).digest();
  const start = hash[hash.length - 1] & 0xf;
  return String((hash.readUInt32BE(start) & 0x7fffffff) % 1000000).padStart(6, '0');
};

const logIn = async (page: Page) => {
  // Een code werkt maar één keer per account, en andere testbestanden gebruiken dezelfde. Wacht daarom op een nieuwe.
  await page.setContent('<p style="font: 1.5rem sans-serif; padding: 2rem">Wacht op een nieuwe inlogcode (maximaal 30 seconden)…</p>');
  await page.waitForTimeout(30000 - (Date.now() % 30000) + 500);
  await page.goto(`${websiteURL}/inloggen/`);
  await page.getByLabel('E-mailadres').fill(leesInstelling('TEST_LID_EMAIL'));
  await page.getByLabel('Wachtwoord', { exact: true }).fill(leesInstelling('TEST_LID_PASSWORD'));
  await page.getByRole('button', { name: 'Inloggen' }).click();
  await page.getByLabel('Code uit de app').fill(maakCode());
  await page.getByRole('button', { name: 'Inloggen' }).click();
  await expect(page.getByRole('link', { name: 'Uitloggen' })).toBeVisible();
};

const aantal = (page: Page) => page.getByRole('status').filter({ hasText: /^\d+ acties?$/ });

test('zonder login is de actielijst afgeschermd', async ({ page, request }) => {
  expect((await request.get(`${websiteURL}/community/actielijst.json`)).status()).toBe(401);

  await page.goto(pagina);
  await expect(page.getByRole('heading', { name: 'Inloggen als communitylid' })).toBeVisible();
});

test('een lid ziet de acties, gesorteerd en te filteren', async ({ page }) => {
  test.setTimeout(90000);
  await logIn(page);
  await page.goto(pagina);

  await expect(page.getByRole('heading', { name: 'Actielijst', level: 1 })).toBeVisible();
  await expect(aantal(page)).toHaveText('8 acties');
  for (const kop of ['Actie', 'Eigenaar', 'Landelijk of lokaal', 'Streefdatum', 'Status']) {
    await expect(page.getByRole('columnheader', { name: kop })).toBeVisible();
  }

  // Openstaande acties eerst, de vroegste streefdatum bovenaan. Afgeronde acties onderaan.
  const rijen = page.getByRole('row');
  await expect(rijen.nth(1)).toContainText('Feedback geven op het basisproces bijzondere bijstand');
  await expect(rijen.nth(1)).toContainText('10 november 2026');
  await expect(rijen.nth(7)).toContainText('Afgerond');
  await expect(rijen.nth(8)).toContainText('Afgerond');

  // Filteren op status: het aantal verandert mee.
  const status = page.getByLabel('Status');
  await status.selectOption({ label: 'Afgerond' });
  await expect(aantal(page)).toHaveText('2 acties');
  await status.selectOption({ label: 'Open' });
  await expect(aantal(page)).toHaveText('3 acties');

  // Het testlid is van geen enkele voorbeeldactie de eigenaar.
  await status.selectOption({ label: 'Alle statussen' });
  await page.getByLabel('Alleen mijn acties').check();
  await expect(aantal(page)).toHaveText('0 acties');
  await expect(page.getByText('Er zijn geen acties met dit filter.')).toBeVisible();
  await expect(page.getByRole('table')).toHaveCount(0);
});
