import { expect, test, type Page } from '@playwright/test';
import { createHmac } from 'node:crypto';

// Start eerst de inlogomgeving met `docker compose up -d` in de hoofdmap van de repo.
process.loadEnvFile('../.env');

const leesInstelling = (naam: string) => {
  const waarde = process.env[naam];
  if (!waarde) throw new Error(`${naam} ontbreekt in .env`);
  return waarde;
};

const websiteURL = `http://localhost:${leesInstelling('SITE_PORT')}`;

const maakCode = () => {
  const teller = Buffer.alloc(8);
  teller.writeBigUInt64BE(BigInt(Math.floor(Date.now() / 30000)));
  const hash = createHmac('sha1', leesInstelling('TEST_LID_OTP_SECRET')).update(teller).digest();
  const start = hash[hash.length - 1] & 0xf;
  return String((hash.readUInt32BE(start) & 0x7fffffff) % 1000000).padStart(6, '0');
};

// Een code werkt maar één keer per account, en andere testbestanden gebruiken dezelfde. Wacht daarom op een nieuwe.
const wachtOpNieuweCode = (page: Page) => page.waitForTimeout(30000 - (Date.now() % 30000) + 500);

const openInloggen = async (page: Page) => {
  await page.goto(websiteURL);
  await page.getByRole('link', { name: 'Inloggen' }).click();
  await expect(page.getByRole('heading', { name: 'Inloggen als communitylid' })).toBeVisible();
};

const vulWachtwoordIn = async (page: Page, wachtwoord: string) => {
  await page.getByLabel('E-mailadres').fill(leesInstelling('TEST_LID_EMAIL'));
  await page.getByLabel('Wachtwoord', { exact: true }).fill(wachtwoord);
  await page.getByRole('button', { name: 'Inloggen' }).click();
};

const menubalk = (page: Page) => page.getByRole('navigation', { name: 'Main' });

test('zonder login is er geen Roadmap en is de inhoud afgeschermd', async ({ page, request }) => {
  await page.goto(websiteURL);
  await expect(page.getByRole('link', { name: 'Inloggen' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Roadmap' })).toHaveCount(0);
  await expect(menubalk(page).getByRole('link', { name: 'Communityomgeving' })).toHaveCount(0);

  expect((await request.get(`${websiteURL}/community/roadmap.json`)).status()).toBe(401);

  await page.goto(`${websiteURL}/roadmap/`);
  await expect(page.getByRole('heading', { name: 'Inloggen als communitylid' })).toBeVisible();
});

test('de knop Inloggen opent het inlogscherm op hetzelfde domein', async ({ page }) => {
  await openInloggen(page);

  await expect(page.getByRole('heading', { name: 'Nog geen communitylid?' })).toBeVisible();
  expect(new URL(page.url()).host).toBe(new URL(websiteURL).host);
});

test('een verkeerd wachtwoord geeft een duidelijke foutmelding', async ({ page }) => {
  await openInloggen(page);
  await vulWachtwoordIn(page, 'dit-is-niet-het-wachtwoord');

  await expect(page.getByText('Het e-mailadres of wachtwoord klopt niet.')).toBeVisible();
});

test('na inloggen navigeer je via het zijmenu van de communityomgeving tot je uitlogt', async ({ page }) => {
  test.setTimeout(60000);
  await openInloggen(page);
  await vulWachtwoordIn(page, leesInstelling('TEST_LID_PASSWORD'));

  await wachtOpNieuweCode(page);
  await page.getByLabel('Code uit de app').fill(maakCode());
  await page.getByRole('button', { name: 'Inloggen' }).click();

  await expect(page).toHaveURL(`${websiteURL}/`);
  await expect(page.getByRole('heading', { name: 'Wat is MijnInkomen?' })).toBeVisible();

  // Ingelogd staan in de balk alleen het logo, Communityomgeving en Uitloggen.
  const balk = menubalk(page);
  await expect(balk.getByRole('link', { name: 'Uitloggen' })).toBeVisible();
  for (const openbaar of ['Ontwikkelingen', 'Meer weten', 'Initiatief melden', 'Contact']) {
    await expect(balk.getByRole('link', { name: openbaar })).toHaveCount(0);
  }

  // Het zijmenu bevat alle besloten pagina's en blijft staan, ook bij Account.
  await balk.getByRole('link', { name: 'Communityomgeving' }).click();
  await expect(page.getByRole('heading', { name: "Agenda's", level: 1 })).toBeVisible();
  const zijmenu = page.locator('.theme-doc-sidebar-menu');
  for (const item of ['Home', 'Vergaderondersteuning', 'Stand van zaken steden', 'Roadmap & backlog', 'Initiatieven', 'Account']) {
    await expect(zijmenu.getByRole('link', { name: item, exact: true })).toBeVisible();
  }
  await zijmenu.getByRole('link', { name: 'Roadmap & backlog' }).click();
  await expect(page.getByRole('heading', { name: 'Roadmap', level: 1 })).toBeVisible();
  await zijmenu.getByRole('link', { name: 'Account', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Mijn gegevens', level: 1 })).toBeVisible();
  await expect(zijmenu.getByRole('link', { name: 'Vergaderondersteuning' })).toBeVisible();

  await balk.getByRole('link', { name: 'Uitloggen' }).click();
  await expect(page.getByRole('heading', { name: 'Wat is MijnInkomen?' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Inloggen' })).toBeVisible();
  await expect(menubalk(page).getByRole('link', { name: 'Contact' })).toBeVisible();
});
