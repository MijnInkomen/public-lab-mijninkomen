import { expect, test, type APIRequestContext, type Page } from '@playwright/test';
import { createHmac } from 'node:crypto';

// Start eerst de omgeving met `docker compose up -d` in de hoofdmap van de repo. Draai met --workers=1.
process.loadEnvFile('../.env');

const leesInstelling = (naam: string) => {
  const waarde = process.env[naam];
  if (!waarde) throw new Error(`${naam} ontbreekt in .env`);
  return waarde;
};

const websiteURL = `http://localhost:${leesInstelling('SITE_PORT')}`;
const mailpitURL = 'http://localhost:8025/api/v1';
const beheerpagina = `${websiteURL}/community/beheer/`;
const uniek = Date.now();
const toegelaten = { naam: `Toegelaten ${uniek}`, email: `toegelaten-${uniek}@gemeente.nl` };
const geweigerd = { naam: `Geweigerd ${uniek}`, email: `geweigerd-${uniek}@gemeente.nl` };

const maakCode = (geheim: Buffer | string) => {
  const teller = Buffer.alloc(8);
  teller.writeBigUInt64BE(BigInt(Math.floor(Date.now() / 30000)));
  const hash = createHmac('sha1', geheim).update(teller).digest();
  const start = hash[hash.length - 1] & 0xf;
  return String((hash.readUInt32BE(start) & 0x7fffffff) % 1000000).padStart(6, '0');
};

// Een code werkt maar één keer. Wacht daarom op de volgende.
const wachtOpNieuweCode = (page: Page) => page.waitForTimeout(30000 - (Date.now() % 30000) + 500);

const leesBase32 = (tekst: string) => {
  const bits = [...tekst.replace(/\s/g, '')]
    .map((teken) => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'.indexOf(teken).toString(2).padStart(5, '0'))
    .join('');
  return Buffer.from(bits.match(/.{8}/g)?.map((byte) => parseInt(byte, 2)) ?? []);
};

const logIn = async (page: Page, email: string, wachtwoord: string, geheim: Buffer | string) => {
  await page.getByLabel('E-mailadres').fill(email);
  await page.getByLabel('Wachtwoord', { exact: true }).fill(wachtwoord);
  await page.getByRole('button', { name: 'Inloggen' }).click();
  await page.getByLabel('Code uit de app').fill(maakCode(geheim));
  await page.getByRole('button', { name: 'Inloggen' }).click();
};

const dien = (request: APIRequestContext, persoon: { naam: string; email: string }) =>
  request.post(`${websiteURL}/api/toegang-aanvragen`, {
    data: { ...persoon, organisatie: 'Gemeente Utrecht', functie: 'Schuldhulpverlener', gesprek: '2026-10-12' },
  });

const leesMail = async (request: APIRequestContext, email: string) => {
  const zoek = await request.get(`${mailpitURL}/search`, { params: { query: `to:${email}` } });
  const { messages }: { messages: { ID: string }[] } = await zoek.json();
  if (messages.length === 0) return undefined;
  return (await request.get(`${mailpitURL}/message/${messages[0].ID}`)).json() as Promise<{
    Subject: string;
    Text: string;
  }>;
};

test.describe.configure({ mode: 'serial' });

test('zonder login is het beheer niet te gebruiken', async ({ page, request }) => {
  expect((await request.get(`${websiteURL}/api/beheer/aanvragen`, { maxRedirects: 0 })).status()).toBe(401);

  await page.goto(beheerpagina);
  await expect(page.getByRole('heading', { name: 'Inloggen als communitylid' })).toBeVisible();
});

test('een communitylid kan de pagina en de API niet gebruiken', async ({ page }) => {
  await page.goto(`${websiteURL}/inloggen/`);
  await logIn(
    page,
    leesInstelling('TEST_LID_EMAIL'),
    leesInstelling('TEST_LID_PASSWORD'),
    leesInstelling('TEST_LID_OTP_SECRET'),
  );
  await expect(page.getByRole('link', { name: 'Roadmap' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Beheer' })).toHaveCount(0);

  await page.goto(beheerpagina);
  await expect(page.getByRole('heading', { name: 'Geen toegang' })).toBeVisible();

  const lijst = await page.request.get(`${websiteURL}/api/beheer/aanvragen`);
  expect(lijst.status()).toBe(403);

  const id = '11111111-1111-4111-8111-111111111111';
  const toelaten = await page.request.post(`${websiteURL}/api/beheer/aanvragen/${id}/toelaten`, {
    headers: { 'X-Auth-Groups': 'admin' },
  });
  expect(toelaten.status()).toBe(403);
});

test('een admin accepteert, weigert met reden, en de nieuwe gebruiker kan inloggen', async ({
  page,
  request,
  browser,
}) => {
  test.setTimeout(120000);

  expect((await dien(request, toegelaten)).status()).toBe(201);
  expect((await dien(request, geweigerd)).status()).toBe(201);

  await page.goto(`${websiteURL}/inloggen/`);
  await logIn(
    page,
    leesInstelling('TEST_E2E_ADMIN_EMAIL'),
    leesInstelling('TEST_LID_PASSWORD'),
    leesInstelling('TEST_LID_OTP_SECRET'),
  );
  await page.getByRole('link', { name: 'Beheer' }).click();
  await expect(page.getByRole('heading', { name: 'Toegangsaanvragen' })).toBeVisible();

  const dialoog = page.getByRole('alertdialog');
  const reden = 'Je hebt nog geen kennismakingsgesprek gehad.';

  // Annuleren laat de aanvraag ongewijzigd.
  await page.getByRole('button', { name: `${geweigerd.naam} weigeren` }).click();
  await expect(
    dialoog.getByRole('heading', { name: `Weet je zeker dat je de aanvraag van ${geweigerd.naam} wilt weigeren?` }),
  ).toBeVisible();
  await dialoog.getByRole('button', { name: 'Annuleren' }).click();
  await expect(dialoog).toHaveCount(0);
  await expect(
    page.getByRole('row', { name: new RegExp(geweigerd.naam) }).getByText('in behandeling', { exact: true }),
  ).toBeVisible();

  // Weigeren zonder reden kan niet.
  await page.getByRole('button', { name: `${geweigerd.naam} weigeren` }).click();
  await dialoog.getByRole('button', { name: 'Ja, weigeren' }).click();
  await expect(dialoog.getByText('Vul de reden van weigering in.')).toBeVisible();
  await expect(dialoog.getByLabel('Reden van weigering')).toBeFocused();

  await dialoog.getByLabel('Reden van weigering').fill(reden);
  await dialoog.getByRole('button', { name: 'Ja, weigeren' }).click();
  await expect(page.getByText(`${geweigerd.naam} is geweigerd en krijgt een e-mail met de reden.`)).toBeVisible();
  const rijGeweigerd = page.getByRole('row', { name: new RegExp(geweigerd.naam) });
  await expect(rijGeweigerd.getByText('geweigerd', { exact: true })).toBeVisible();
  await expect(rijGeweigerd.getByText(`Reden: ${reden}`)).toBeVisible();

  await page.getByRole('button', { name: `${toegelaten.naam} accepteren` }).click();
  await expect(
    dialoog.getByRole('heading', { name: `Weet je zeker dat je de aanvraag van ${toegelaten.naam} wilt accepteren?` }),
  ).toBeVisible();
  await dialoog.getByRole('button', { name: 'Ja, accepteren' }).click();
  await expect(
    page.getByText(`${toegelaten.naam} is geaccepteerd en krijgt een e-mail om een account in te stellen.`),
  ).toBeVisible();
  await expect(
    page.getByRole('row', { name: new RegExp(toegelaten.naam) }).getByText('geaccepteerd', { exact: true }),
  ).toBeVisible();

  await expect.poll(() => leesMail(request, geweigerd.email)).toBeTruthy();
  const weigering = await leesMail(request, geweigerd.email);
  expect(weigering?.Subject).toBe('Je aanvraag voor MijnInkomen');
  expect(weigering?.Text).toContain(reden);

  await expect.poll(() => leesMail(request, toegelaten.email)).toBeTruthy();

  const mail = await leesMail(request, toegelaten.email);
  expect(mail?.Subject).toBe('Je toegang tot MijnInkomen');
  const link = mail?.Text.match(/http:\/\/localhost:\d+\/auth\/\S+/)?.[0];
  expect(link).toBeTruthy();

  const nieuw = await (await browser.newContext()).newPage();
  await nieuw.goto(link ?? '');

  const verder = nieuw.getByRole('link', { name: /hier|verder/i });
  if (await verder.count()) await verder.first().click();

  const wachtwoord = `Nieuw-${uniek}`;
  await nieuw.locator('#password-new').fill(wachtwoord);
  await nieuw.locator('#password-confirm').fill(wachtwoord);
  await nieuw.locator('input[type=submit], button[type=submit]').first().click();

  await nieuw.getByRole('link', { name: 'Scannen mislukt?' }).click();
  const geheim = leesBase32((await nieuw.locator('#kc-totp-secret-key').innerText()).trim());
  await nieuw.locator('#totp').fill(maakCode(geheim));
  await nieuw.locator('input[type=submit], button[type=submit]').first().click();
  await expect(nieuw.locator('body')).not.toContainText('Scannen mislukt?');

  await wachtOpNieuweCode(nieuw);
  await nieuw.goto(`${websiteURL}/inloggen/`);
  await logIn(nieuw, toegelaten.email, wachtwoord, geheim);
  await expect(nieuw.getByRole('link', { name: 'Roadmap' })).toBeVisible();
  await expect(nieuw.getByRole('link', { name: 'Beheer' })).toHaveCount(0);
});
