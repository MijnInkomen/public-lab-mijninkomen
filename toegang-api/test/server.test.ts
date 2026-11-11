import assert from 'node:assert/strict';
import { after, before, beforeEach, test } from 'node:test';
import type { AddressInfo } from 'node:net';
import { AccountBestaatAl, type Keycloak } from '../src/keycloak.ts';
import type { OpgeslagenAanvraag, Opslag } from '../src/opslag.ts';
import { maakServer } from '../src/server.ts';
import type { Aanvraag } from '../src/validatie.ts';

const ID = '11111111-1111-4111-8111-111111111111';
const aanvraagInLijst: OpgeslagenAanvraag = {
  id: ID,
  naam: 'Sam de Vries',
  organisatie: 'Gemeente Utrecht',
  functie: 'Beleidsadviseur sociaal domein',
  email: 'sam@gemeente.nl',
  gesprekDatum: '2026-01-12',
  status: 'in behandeling',
  aangemaaktOp: '2026-01-13T10:00:00Z',
};

const opgeslagen: Aanvraag[] = [];
const accounts: string[] = [];
let status: OpgeslagenAanvraag['status'] = 'in behandeling';
let storing = false;
let accountStoring: Error | undefined;

const opslag: Opslag = {
  slaAanvraagOp: async (aanvraag) => {
    if (storing) throw new Error('Database weg');
    opgeslagen.push(aanvraag);
  },
  haalAanvragenOp: async () => [{ ...aanvraagInLijst, status }],
  behandelAanvraag: async (id, nieuweStatus, actie) => {
    if (id !== ID) return 'niet-gevonden';
    if (status !== 'in behandeling') return 'al-behandeld';
    await actie?.({ ...aanvraagInLijst, status });
    status = nieuweStatus;
    return 'gelukt';
  },
};

const keycloak: Keycloak = {
  maakCommunitylid: async ({ email }) => {
    if (accountStoring) throw accountStoring;
    accounts.push(email);
  },
};

const server = maakServer(opslag, keycloak);
let adres: string;

before(async () => {
  await new Promise<void>((klaar) => server.listen(0, klaar));
  adres = `http://localhost:${(server.address() as AddressInfo).port}/api/toegang-aanvragen`;
});

after(() => server.close());

beforeEach(() => {
  status = 'in behandeling';
  accounts.length = 0;
  accountStoring = undefined;
});

const goedeAanvraag = {
  naam: 'Sam de Vries',
  organisatie: 'Gemeente Utrecht',
  functie: 'Beleidsadviseur sociaal domein',
  email: 'sam@gemeente.nl',
  gesprek: '2026-01-12',
};

const verstuur = (body?: string, method = 'POST') => fetch(adres, { method, body });

test('een goede aanvraag wordt opgeslagen en krijgt status in behandeling', async () => {
  const antwoord = await verstuur(JSON.stringify(goedeAanvraag));

  assert.equal(antwoord.status, 201);
  assert.deepEqual(await antwoord.json(), { status: 'in behandeling' });
  assert.equal(opgeslagen.at(-1)?.email, 'sam@gemeente.nl');
});

test('een foute aanvraag geeft foutmeldingen en wordt niet opgeslagen', async () => {
  const aantal = opgeslagen.length;
  const antwoord = await verstuur(JSON.stringify({ ...goedeAanvraag, email: 'geen-mail' }));

  assert.equal(antwoord.status, 422);
  assert.match((await antwoord.json()).fouten.email, /geldig e-mailadres/);
  assert.equal(opgeslagen.length, aantal);
});

test('kapotte JSON geeft 400', async () => {
  assert.equal((await verstuur('{geen json')).status, 400);
});

test('een te groot verzoek wordt geweigerd', async () => {
  assert.equal((await verstuur(JSON.stringify({ naam: 'x'.repeat(20000) }))).status, 400);
});

test('alleen POST is toegestaan', async () => {
  assert.equal((await verstuur(undefined, 'GET')).status, 405);
});

test('bij een databasefout lekt het antwoord geen details', async () => {
  storing = true;
  const antwoord = await verstuur(JSON.stringify(goedeAanvraag));
  storing = false;

  assert.equal(antwoord.status, 500);
  assert.deepEqual(await antwoord.json(), { fout: 'Er ging iets mis. Probeer het later opnieuw' });
});

const beheer = (pad: string, method = 'GET', groepen?: string) =>
  fetch(`${adres.replace('/api/toegang-aanvragen', '/api/beheer/aanvragen')}${pad}`, {
    method,
    headers: groepen === undefined ? {} : { 'X-Auth-Groups': groepen },
  });

test('zonder de rol admin zijn de beheerroutes niet te gebruiken', async () => {
  assert.equal((await beheer('')).status, 403);
  assert.equal((await beheer('', 'GET', 'communitylid')).status, 403);
  assert.equal((await beheer('', 'GET', 'geen-admin')).status, 403);
  assert.equal((await beheer(`/${ID}/toelaten`, 'POST', 'communitylid')).status, 403);
  assert.deepEqual(accounts, []);
  assert.equal(status, 'in behandeling');
});

test('een admin ziet de aanvragen', async () => {
  const antwoord = await beheer('', 'GET', 'communitylid,admin');

  assert.equal(antwoord.status, 200);
  assert.equal((await antwoord.json()).aanvragen[0].email, 'sam@gemeente.nl');
});

test('toelaten maakt een account en zet de status', async () => {
  assert.equal((await beheer(`/${ID}/toelaten`, 'POST', 'admin')).status, 200);
  assert.deepEqual(accounts, ['sam@gemeente.nl']);
  assert.equal(status, 'toegelaten');
});

test('weigeren maakt geen account', async () => {
  assert.equal((await beheer(`/${ID}/weigeren`, 'POST', 'admin')).status, 200);
  assert.deepEqual(accounts, []);
  assert.equal(status, 'geweigerd');
});

test('een behandelde aanvraag kan niet nog een keer worden behandeld', async () => {
  await beheer(`/${ID}/weigeren`, 'POST', 'admin');

  assert.equal((await beheer(`/${ID}/toelaten`, 'POST', 'admin')).status, 409);
  assert.deepEqual(accounts, []);
});

test('een onbekende aanvraag of route geeft 404', async () => {
  assert.equal((await beheer('/22222222-2222-4222-8222-222222222222/toelaten', 'POST', 'admin')).status, 404);
  assert.equal((await beheer(`/${ID}/verwijderen`, 'POST', 'admin')).status, 404);
  assert.equal((await beheer('/geen-id/toelaten', 'POST', 'admin')).status, 404);
});

test('als Keycloak faalt, blijft de aanvraag in behandeling', async () => {
  accountStoring = new Error('Keycloak weg');

  assert.equal((await beheer(`/${ID}/toelaten`, 'POST', 'admin')).status, 500);
  assert.equal(status, 'in behandeling');
});

test('een bestaand account geeft een duidelijke melding', async () => {
  accountStoring = new AccountBestaatAl();
  const antwoord = await beheer(`/${ID}/toelaten`, 'POST', 'admin');

  assert.equal(antwoord.status, 409);
  assert.match((await antwoord.json()).fout, /bestaat al een account/);
});
