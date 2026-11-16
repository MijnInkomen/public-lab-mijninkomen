import assert from 'node:assert/strict';
import { after, before, beforeEach, test } from 'node:test';
import type { AddressInfo } from 'node:net';
import { AccountBestaatAl, type Keycloak, type KeycloakLid } from '../src/keycloak.ts';
import type { Mail } from '../src/mail.ts';
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
  redenWeigering: null,
  aangemaaktOp: '2026-01-13T10:00:00Z',
};

const opgeslagen: Aanvraag[] = [];
const accounts: string[] = [];
const mails: { email: string; reden: string }[] = [];
let opgeslagenReden: string | undefined;
let mailStoring = false;
let status: OpgeslagenAanvraag['status'] = 'in behandeling';
let storing = false;
let accountStoring: Error | undefined;

const opslag: Opslag = {
  slaAanvraagOp: async (aanvraag) => {
    if (storing) throw new Error('Database weg');
    opgeslagen.push(aanvraag);
  },
  haalAanvragenOp: async () => [{ ...aanvraagInLijst, status }],
  behandelAanvraag: async (id, nieuweStatus, actie, reden) => {
    if (id !== ID) return 'niet-gevonden';
    if (status !== 'in behandeling') return 'al-behandeld';
    await actie?.({ ...aanvraagInLijst, status });
    status = nieuweStatus;
    opgeslagenReden = reden;
    return 'gelukt';
  },
  haalSoortenOp: async (leden) => new Map(leden.map(({ id }) => [id, soorten.get(id) ?? null])),
  zetSoort: async (id, soort) => {
    soorten.set(id, soort);
  },
};

const HOOFD_ID = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
const ADMIN_ID = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
const LID_ID = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc';
const beginLeden = (): KeycloakLid[] => [
  { id: HOOFD_ID, naam: 'Hoofd Beheerder', email: 'hoofd@test.nl', rol: 'hoofdbeheerder' },
  { id: ADMIN_ID, naam: 'Gewone Beheerder', email: 'admin@test.nl', rol: 'beheerder' },
  { id: LID_ID, naam: 'Sam Lid', email: 'lid@test.nl', rol: 'lid' },
];
let leden = beginLeden();
const soorten = new Map<string, string>();

const KEYCLOAK_ROLLEN = { hoofdbeheerder: ['admin', 'hoofdbeheerder'], beheerder: ['admin'], lid: [] };

const keycloak: Keycloak = {
  maakCommunitylid: async ({ email }) => {
    if (accountStoring) throw accountStoring;
    accounts.push(email);
  },
  haalLedenOp: async () => leden.map((lid) => ({ ...lid })),
  haalLidOp: async (id) => leden.find((lid) => lid.id === id),
  zetRol: async (id, rol) => {
    leden = leden.map((lid) => (lid.id === id ? { ...lid, rol } : lid));
  },
  haalRollenOp: async (email) => {
    const lid = leden.find((kandidaat) => kandidaat.email === email);
    return lid ? ['communitylid', ...KEYCLOAK_ROLLEN[lid.rol]] : [];
  },
};

const mail: Mail = {
  stuurWeigering: async ({ email }, reden) => {
    if (mailStoring) throw new Error('Mailserver weg');
    mails.push({ email, reden });
  },
};

const server = maakServer(opslag, keycloak, mail);
let adres: string;

before(async () => {
  await new Promise<void>((klaar) => server.listen(0, klaar));
  adres = `http://localhost:${(server.address() as AddressInfo).port}/api/toegang-aanvragen`;
});

after(() => server.close());

beforeEach(() => {
  status = 'in behandeling';
  accounts.length = 0;
  mails.length = 0;
  opgeslagenReden = undefined;
  mailStoring = false;
  accountStoring = undefined;
  leden = beginLeden();
  soorten.clear();
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

/** Zoals Nginx: de rollen uit de login en het e-mailadres. */
const emailBij = (groepen: string) => {
  const rollen = groepen.split(',');
  if (rollen.includes('hoofdbeheerder')) return 'hoofd@test.nl';
  return rollen.includes('admin') ? 'admin@test.nl' : 'lid@test.nl';
};

const roep = (basis: string, pad: string, method = 'GET', groepen?: string, body?: object) =>
  fetch(`${adres.replace('/api/toegang-aanvragen', basis)}${pad}`, {
    method,
    headers: groepen === undefined ? {} : { 'X-Auth-Groups': groepen, 'X-Auth-Email': emailBij(groepen) },
    body: body && JSON.stringify(body),
  });

const beheer = (pad: string, method = 'GET', groepen?: string, body?: object) =>
  roep('/api/beheer/aanvragen', pad, method, groepen, body);

const REDEN = { reden: 'Je hebt nog geen kennismakingsgesprek gehad.' };

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

test('weigeren maakt geen account, slaat de reden op en mailt die naar de aanvrager', async () => {
  assert.equal((await beheer(`/${ID}/weigeren`, 'POST', 'admin', REDEN)).status, 200);
  assert.deepEqual(accounts, []);
  assert.equal(status, 'geweigerd');
  assert.equal(opgeslagenReden, REDEN.reden);
  assert.deepEqual(mails, [{ email: 'sam@gemeente.nl', reden: REDEN.reden }]);
});

test('weigeren zonder reden kan niet en laat de aanvraag ongewijzigd', async () => {
  for (const body of [undefined, {}, { reden: '   ' }, { reden: 'x'.repeat(1001) }]) {
    const antwoord = await beheer(`/${ID}/weigeren`, 'POST', 'admin', body);
    assert.equal(antwoord.status, body ? 422 : 400);
  }
  const antwoord = await beheer(`/${ID}/weigeren`, 'POST', 'admin', { reden: '' });
  assert.equal((await antwoord.json()).fouten.reden, 'Vul de reden van weigering in.');
  assert.equal(status, 'in behandeling');
  assert.deepEqual(mails, []);
});

test('als de weigeringsmail niet lukt, blijft de aanvraag in behandeling', async () => {
  mailStoring = true;

  assert.equal((await beheer(`/${ID}/weigeren`, 'POST', 'admin', REDEN)).status, 500);
  assert.equal(status, 'in behandeling');
});

test('een behandelde aanvraag kan niet nog een keer worden behandeld', async () => {
  await beheer(`/${ID}/weigeren`, 'POST', 'admin', REDEN);

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

test('een beheerder die net lid is gemaakt, kan direct niet meer bij de aanvragen', async () => {
  leden = leden.map((lid) => (lid.id === ADMIN_ID ? { ...lid, rol: 'lid' } : lid));

  // De login zegt nog admin, maar Keycloak niet meer.
  assert.equal((await beheer('', 'GET', 'communitylid,admin')).status, 403);
});

test('een lid dat net beheerder is gemaakt, kan direct bij de aanvragen', async () => {
  leden = leden.map((lid) => (lid.id === LID_ID ? { ...lid, rol: 'beheerder' } : lid));

  // De login zegt nog communitylid, maar Keycloak al admin.
  assert.equal((await beheer('', 'GET', 'communitylid')).status, 200);
});

const ledenApi = (pad: string, method = 'GET', groepen?: string, body?: object) =>
  roep('/api/beheer/leden', pad, method, groepen, body);

test('alleen de hoofdbeheerder ziet het ledenoverzicht', async () => {
  assert.equal((await ledenApi('')).status, 403);
  assert.equal((await ledenApi('', 'GET', 'communitylid')).status, 403);
  assert.equal((await ledenApi('', 'GET', 'communitylid,admin')).status, 403);

  const antwoord = await ledenApi('', 'GET', 'admin,hoofdbeheerder');
  assert.equal(antwoord.status, 200);
  const { leden: lijst } = await antwoord.json();
  assert.deepEqual(
    lijst.map(({ email, rol }: KeycloakLid) => [email, rol]),
    [
      ['hoofd@test.nl', 'hoofdbeheerder'],
      ['admin@test.nl', 'beheerder'],
      ['lid@test.nl', 'lid'],
    ],
  );
});

test('een soort dat niet in de lijst staat, telt als nog niet gekozen', async () => {
  soorten.set(LID_ID, 'Adviseur');
  const { leden: lijst } = await (await ledenApi('', 'GET', 'admin,hoofdbeheerder')).json();

  assert.equal(lijst.find(({ id }: KeycloakLid) => id === LID_ID).soort, null);
});

test('de hoofdbeheerder maakt een lid beheerder en past het soort aan', async () => {
  const groepen = 'admin,hoofdbeheerder';

  assert.equal((await ledenApi(`/${LID_ID}`, 'POST', groepen, { rol: 'beheerder' })).status, 200);
  assert.equal(leden.find(({ id }) => id === LID_ID)?.rol, 'beheerder');

  assert.equal((await ledenApi(`/${LID_ID}`, 'POST', groepen, { soort: 'Schuldhulpverlener' })).status, 200);
  assert.equal(soorten.get(LID_ID), 'Schuldhulpverlener');

  assert.equal((await ledenApi(`/${LID_ID}`, 'POST', groepen, { rol: 'lid' })).status, 200);
  assert.equal(leden.find(({ id }) => id === LID_ID)?.rol, 'lid');
});

test('een gewone beheerder kan geen rollen wijzigen', async () => {
  assert.equal((await ledenApi(`/${LID_ID}`, 'POST', 'communitylid,admin', { rol: 'beheerder' })).status, 403);
  assert.equal(leden.find(({ id }) => id === LID_ID)?.rol, 'lid');
});

test('de rol van de hoofdbeheerder kan niet veranderen, het soort wel', async () => {
  const groepen = 'admin,hoofdbeheerder';
  const antwoord = await ledenApi(`/${HOOFD_ID}`, 'POST', groepen, { rol: 'lid' });

  assert.equal(antwoord.status, 409);
  assert.match((await antwoord.json()).fout, /hoofdbeheerder kan niet veranderen/);
  assert.equal(leden.find(({ id }) => id === HOOFD_ID)?.rol, 'hoofdbeheerder');
  assert.equal((await ledenApi(`/${HOOFD_ID}`, 'POST', groepen, { soort: 'Teamleider sociaal domein' })).status, 200);
});

test('een onbekende rol, onbekend soort of onbekend lid wordt geweigerd', async () => {
  const groepen = 'admin,hoofdbeheerder';

  assert.equal((await ledenApi(`/${LID_ID}`, 'POST', groepen, { rol: 'hoofdbeheerder' })).status, 422);
  assert.equal((await ledenApi(`/${LID_ID}`, 'POST', groepen, { soort: 'Astronaut' })).status, 422);
  assert.equal((await ledenApi(`/${LID_ID}`, 'POST', groepen, {})).status, 422);
  assert.equal((await ledenApi(`/${ID}`, 'POST', groepen, { rol: 'lid' })).status, 404);
  assert.equal(leden.find(({ id }) => id === LID_ID)?.rol, 'lid');
});
