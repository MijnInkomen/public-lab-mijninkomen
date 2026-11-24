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
const ledenpagina = `${websiteURL}/community/leden/`;
const LID = 'Test Lid';
const HOOFDBEHEERDER = 'E2e Admin';

const maakCode = () => {
  const teller = Buffer.alloc(8);
  teller.writeBigUInt64BE(BigInt(Math.floor(Date.now() / 30000)));
  const hash = createHmac('sha1', leesInstelling('TEST_LID_OTP_SECRET')).update(teller).digest();
  const start = hash[hash.length - 1] & 0xf;
  return String((hash.readUInt32BE(start) & 0x7fffffff) % 1000000).padStart(6, '0');
};

const logIn = async (page: Page, email: string) => {
  await page.goto(`${websiteURL}/inloggen/`);
  await page.getByLabel('E-mailadres').fill(email);
  await page.getByLabel('Wachtwoord', { exact: true }).fill(leesInstelling('TEST_LID_PASSWORD'));
  await page.getByRole('button', { name: 'Inloggen' }).click();
  await page.getByLabel('Code uit de app').fill(maakCode());
  await page.getByRole('button', { name: 'Inloggen' }).click();
  await expect(page.getByRole('link', { name: 'Uitloggen' })).toBeVisible();
};

const status = async (page: Page, pad: string) => (await page.request.get(`${websiteURL}${pad}`)).status();

test.describe.configure({ mode: 'serial' });

test('alleen de hoofdbeheerder beheert rollen, en een wijziging werkt direct door', async ({ browser }) => {
  test.setTimeout(120000);

  const lid = await (await browser.newContext()).newPage();
  const hoofd = await (await browser.newContext()).newPage();
  // Een code werkt maar één keer per account. Andere testbestanden gebruiken dezelfde code: wacht op een nieuwe.
  await lid.waitForTimeout(30000 - (Date.now() % 30000) + 500);
  await logIn(lid, leesInstelling('TEST_LID_EMAIL'));
  await logIn(hoofd, leesInstelling('TEST_E2E_ADMIN_EMAIL'));

  // Een communitylid ziet het rollenbeheer niet en kan de API niet gebruiken.
  await expect(lid.getByRole('button', { name: 'Beheer' })).toHaveCount(0);
  await expect(lid.getByRole('link', { name: 'Leden en rollen' })).toHaveCount(0);
  await lid.goto(ledenpagina);
  await expect(lid.getByRole('heading', { name: 'Geen toegang' })).toBeVisible();
  expect(await status(lid, '/api/beheer/leden')).toBe(403);
  expect(await status(lid, '/api/beheer/aanvragen')).toBe(403);

  // De hoofdbeheerder ziet alle leden met hun rol.
  await hoofd.getByRole('button', { name: 'Beheer' }).click();
  await hoofd.getByRole('link', { name: 'Leden en rollen' }).click();
  await expect(hoofd.getByRole('heading', { name: 'Leden en rollen' })).toBeVisible();
  const eigenRij = hoofd.getByRole('row', { name: new RegExp(HOOFDBEHEERDER) });
  await expect(eigenRij.getByText('Deze rol kan niet veranderen.')).toBeVisible();
  await expect(hoofd.getByLabel(`Rol van ${HOOFDBEHEERDER}`)).toHaveCount(0);

  const rol = hoofd.getByLabel(`Rol van ${LID}`);
  const soort = hoofd.getByLabel(`Soort communitylid van ${LID}`);

  try {
    await expect(rol).toHaveValue('lid');

    // Lid wordt beheerder: dat werkt direct, zonder opnieuw in te loggen.
    await rol.selectOption('beheerder');
    await expect(hoofd.getByText(`${LID} is nu beheerder.`)).toBeVisible();
    expect(await status(lid, '/api/beheer/aanvragen')).toBe(200);
    // Een gewone beheerder kan nog steeds niet bij het rollenbeheer.
    expect(await status(lid, '/api/beheer/leden')).toBe(403);

    await soort.selectOption('Schuldhulpverlener');
    await expect(hoofd.getByText(`Het soort communitylid van ${LID} is nu: Schuldhulpverlener.`)).toBeVisible();
    await hoofd.reload();
    await expect(soort).toHaveValue('Schuldhulpverlener');
    await expect(rol).toHaveValue('beheerder');
  } finally {
    // Zet het testlid terug, ook als de test faalt.
    await rol.selectOption('lid');
    await expect(hoofd.getByText(`${LID} is nu lid.`)).toBeVisible();
  }

  expect(await status(lid, '/api/beheer/aanvragen')).toBe(403);

  // Ook via de API kan de rol van de hoofdbeheerder niet veranderen.
  const leden = await (await hoofd.request.get(`${websiteURL}/api/beheer/leden`)).json();
  const eigenId = leden.leden.find(({ naam }: { naam: string }) => naam === HOOFDBEHEERDER).id;
  const degraderen = await hoofd.request.post(`${websiteURL}/api/beheer/leden/${eigenId}`, { data: { rol: 'lid' } });
  expect(degraderen.status()).toBe(409);
});
