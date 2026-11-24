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
const pagina = `${websiteURL}/account/mijn-gegevens/`;

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

const rij = (page: Page, label: string) => page.locator('.mijninkomen-gegevens__rij').filter({ hasText: label });

test('zonder login zijn de gegevens afgeschermd', async ({ page, request }) => {
  expect((await request.get(`${websiteURL}/api/account`)).status()).toBe(401);

  await page.goto(pagina);
  await expect(page.getByRole('heading', { name: 'Inloggen als communitylid' })).toBeVisible();
});

test('een lid ziet de eigen gegevens en wijzigt zelf naam en e-mailadres', async ({ page }) => {
  test.setTimeout(90000);
  await logIn(page);
  await page.goto(pagina);

  await expect(page.getByRole('heading', { name: 'Mijn gegevens', level: 1 })).toBeVisible();
  for (const label of ['Naam', 'E-mailadres', 'Functie', 'Gemeente', 'Communitylid sinds']) {
    await expect(rij(page, label)).toBeVisible();
  }
  await expect(rij(page, 'E-mailadres')).toContainText(leesInstelling('TEST_LID_EMAIL'));
  // Functie en gemeente wijzig je niet zelf.
  await expect(rij(page, 'Functie').getByRole('button')).toHaveCount(0);

  const oudeNaam = (await rij(page, 'Naam').locator('.mijninkomen-gegevens__tekst').textContent()) ?? '';
  const oudEmail = leesInstelling('TEST_LID_EMAIL');
  const wijzigNaam = async (naam: string) => {
    await page.getByRole('button', { name: 'Wijzigen naam' }).click();
    await page.getByLabel('Nieuwe naam').fill(naam);
    await page.getByRole('button', { name: 'Opslaan' }).click();
  };
  const wijzigEmail = async (email: string) => {
    await page.getByRole('button', { name: 'Wijzigen e-mailadres' }).click();
    await page.getByLabel('Nieuw e-mailadres').fill(email);
    await page.getByRole('button', { name: 'Opslaan' }).click();
  };

  try {
    // Annuleren laat de naam ongewijzigd.
    await page.getByRole('button', { name: 'Wijzigen naam' }).click();
    await page.getByLabel('Nieuwe naam').fill('Wordt niet opgeslagen');
    await page.getByRole('button', { name: 'Annuleren' }).click();
    await expect(rij(page, 'Naam')).toContainText(oudeNaam);

    // Een lege naam geeft een foutmelding.
    await wijzigNaam('');
    await expect(page.getByText('Vul je naam in.')).toBeVisible();
    await page.getByRole('button', { name: 'Annuleren' }).click();

    // Een e-mailadres van een ander account kan niet.
    await wijzigEmail(leesInstelling('TEST_ADMIN_EMAIL'));
    await expect(page.getByText('Dit e-mailadres hoort al bij een ander account.')).toBeVisible();
    await page.getByRole('button', { name: 'Annuleren' }).click();

    // Een nieuwe naam staat direct op de pagina, en ook na herladen.
    await wijzigNaam('Test Lid Gewijzigd');
    await expect(page.getByText('Je naam is gewijzigd.')).toBeVisible();
    await expect(rij(page, 'Naam')).toContainText('Test Lid Gewijzigd');
    await page.reload();
    await expect(rij(page, 'Naam')).toContainText('Test Lid Gewijzigd');

    // Een nieuw e-mailadres wordt opgeslagen; functie en gemeente blijven staan.
    const functie = await rij(page, 'Functie').textContent();
    await wijzigEmail('lid-e2e@test.nl');
    await expect(page.getByText('Je e-mailadres is gewijzigd.')).toBeVisible();
    await page.reload();
    await expect(rij(page, 'E-mailadres')).toContainText('lid-e2e@test.nl');
    await expect(rij(page, 'Functie')).toHaveText(functie ?? '');
  } finally {
    // Zet naam en e-mailadres terug, ook als de test faalt.
    await page.goto(pagina);
    await wijzigNaam(oudeNaam);
    await expect(page.getByText('Je naam is gewijzigd.')).toBeVisible();
    if (!(await rij(page, 'E-mailadres').textContent())?.includes(oudEmail)) {
      await wijzigEmail(oudEmail);
      await expect(page.getByText('Je e-mailadres is gewijzigd.')).toBeVisible();
    }
  }
});
