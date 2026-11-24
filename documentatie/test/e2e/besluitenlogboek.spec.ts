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
const pagina = `${websiteURL}/vergaderingen/besluitenlogboek/`;

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

const aantal = (page: Page) => page.getByRole('status').filter({ hasText: /^\d+ besluit(en)?$/ });

test('zonder login is het besluitenlogboek afgeschermd', async ({ page, request }) => {
  expect((await request.get(`${websiteURL}/community/besluitenlogboek.json`)).status()).toBe(401);

  await page.goto(pagina);
  await expect(page.getByRole('heading', { name: 'Inloggen als communitylid' })).toBeVisible();
});

test('een lid zoekt en filtert in de besluiten', async ({ page }) => {
  test.setTimeout(90000);
  await logIn(page);
  await page.goto(pagina);

  await expect(page.getByRole('heading', { name: 'Besluitenlogboek', level: 1 })).toBeVisible();
  await expect(aantal(page)).toHaveText('8 besluiten');
  for (const kop of ['Datum', 'Besluit', 'Overleg', 'Gemeenten', 'Status']) {
    await expect(page.getByRole('columnheader', { name: kop })).toBeVisible();
  }
  // Het nieuwste besluit staat bovenaan.
  await expect(page.getByRole('row').nth(1)).toContainText('15 oktober 2026');

  // Zoeken: hoofdletters en accenten maken niet uit, en ook het overleg telt mee.
  const zoek = page.getByLabel('Zoeken');
  await zoek.fill('GitHub');
  await expect(aantal(page)).toHaveText('1 besluit');
  await expect(page.getByRole('row').nth(1)).toContainText('Epics en user stories');
  await zoek.fill('een aanvraagformulier');
  await expect(aantal(page)).toHaveText('1 besluit');
  await zoek.fill('community-sessie');
  await expect(aantal(page)).toHaveText('1 besluit');
  await zoek.fill('bestaat niet');
  await expect(aantal(page)).toHaveText('0 besluiten');
  await expect(page.getByText('Er zijn geen besluiten die passen bij je zoekopdracht.')).toBeVisible();
  await zoek.fill('');

  // Status.
  await page.getByLabel('Status').selectOption({ label: 'Uitgevoerd' });
  await expect(aantal(page)).toHaveText('2 besluiten');
  await page.getByLabel('Status').selectOption({ label: 'Alle statussen' });

  // Gemeente: ook de besluiten voor alle gemeenten tellen mee.
  await page.getByLabel('Gemeente').selectOption('Utrecht');
  await expect(aantal(page)).toHaveText('5 besluiten');

  // Periode, samen met het gemeentefilter.
  await page.getByLabel('Vanaf datum').fill('2026-09-01');
  await page.getByLabel('Tot en met datum').fill('2026-09-30');
  await expect(aantal(page)).toHaveText('3 besluiten');

  // Een periode die niet klopt, geeft een foutmelding.
  await page.getByLabel('Vanaf datum').fill('2026-10-31');
  await expect(page.getByText('De datum "Tot en met" moet op of na de datum "Vanaf" liggen.')).toBeVisible();
});
