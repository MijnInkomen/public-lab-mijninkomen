import assert from 'node:assert/strict';
import { test } from 'node:test';
import { controleerAanvraag, leesDatum } from '../src/validatie.ts';

const VANDAAG = '2026-10-31';

const goedeAanvraag = {
  naam: 'Sam de Vries',
  organisatie: 'Gemeente Utrecht',
  functie: 'Beleidsadviseur',
  email: 'Sam@Gemeente.nl',
  gesprek: '2026-10-12',
};

test('een goede aanvraag komt netjes terug', () => {
  const { aanvraag, fouten } = controleerAanvraag(goedeAanvraag, VANDAAG);

  assert.equal(fouten, undefined);
  assert.deepEqual(aanvraag, {
    naam: 'Sam de Vries',
    organisatie: 'Gemeente Utrecht',
    functie: 'Beleidsadviseur',
    email: 'sam@gemeente.nl',
    gesprekDatum: '2026-10-12',
  });
});

test('lege velden krijgen elk een eigen foutmelding', () => {
  const { aanvraag, fouten } = controleerAanvraag({ naam: '   ' }, VANDAAG);

  assert.equal(aanvraag, undefined);
  assert.deepEqual(Object.keys(fouten ?? {}), ['naam', 'organisatie', 'functie', 'email', 'gesprek']);
});

test('geen object of een verkeerd type is een fout, geen crash', () => {
  assert.ok(controleerAanvraag(null, VANDAAG).fouten);
  assert.ok(controleerAanvraag({ ...goedeAanvraag, naam: ['Sam'] }, VANDAAG).fouten?.naam);
});

test('een ongeldig e-mailadres wordt geweigerd', () => {
  const { fouten } = controleerAanvraag({ ...goedeAanvraag, email: 'sam@gemeente' }, VANDAAG);

  assert.match(fouten?.email ?? '', /geldig e-mailadres/);
});

test('te lange tekst wordt geweigerd', () => {
  const { fouten } = controleerAanvraag({ ...goedeAanvraag, functie: 'x'.repeat(201) }, VANDAAG);

  assert.match(fouten?.functie ?? '', /te lang/);
});

test('een datum in de toekomst wordt geweigerd, vandaag mag wel', () => {
  assert.match(controleerAanvraag({ ...goedeAanvraag, gesprek: '2026-11-01' }, VANDAAG).fouten?.gesprek ?? '', /toekomst/);
  assert.ok(controleerAanvraag({ ...goedeAanvraag, gesprek: '2026-10-31' }, VANDAAG).aanvraag);
});

test('leesDatum accepteert de datum van een datumkiezer', () => {
  assert.equal(leesDatum('2026-11-12'), '2026-11-12');
  assert.equal(leesDatum('2024-02-29'), '2024-02-29');
});

test('leesDatum weigert andere schrijfwijzen en datums die niet bestaan', () => {
  assert.equal(leesDatum('2026-02-31'), undefined);
  assert.equal(leesDatum('2026-13-01'), undefined);
  assert.equal(leesDatum('12-11-2026'), undefined);
  assert.equal(leesDatum('volgende week'), undefined);
});
