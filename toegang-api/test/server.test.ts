import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import type { AddressInfo } from 'node:net';
import { maakServer } from '../src/server.ts';
import type { Aanvraag } from '../src/validatie.ts';

const opgeslagen: Aanvraag[] = [];
let storing = false;
const opslag = {
  slaAanvraagOp: async (aanvraag: Aanvraag) => {
    if (storing) throw new Error('Database weg');
    opgeslagen.push(aanvraag);
  },
};

const server = maakServer(opslag);
let adres: string;

before(async () => {
  await new Promise<void>((klaar) => server.listen(0, klaar));
  adres = `http://localhost:${(server.address() as AddressInfo).port}/api/toegang-aanvragen`;
});

after(() => server.close());

const goedeAanvraag = {
  naam: 'Sam de Vries',
  organisatie: 'Gemeente Utrecht',
  functie: 'Beleidsadviseur',
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
  assert.deepEqual(await antwoord.json(), { fout: 'De aanvraag kon niet worden opgeslagen' });
});
