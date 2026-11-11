import assert from 'node:assert/strict';
import { test } from 'node:test';
import { maakWeigeringsmail } from '../src/mail.ts';
import type { OpgeslagenAanvraag } from '../src/opslag.ts';

const aanvraag = { naam: 'Sam de Vries', email: 'sam@gemeente.nl' } as OpgeslagenAanvraag;

test('de weigeringsmail noemt de reden', () => {
  const mail = maakWeigeringsmail(aanvraag, 'Je hebt nog geen kennismakingsgesprek gehad.');

  assert.equal(mail.subject, 'Je aanvraag voor MijnInkomen');
  assert.match(mail.text, /^Beste Sam,/);
  assert.match(mail.text, /Reden:\nJe hebt nog geen kennismakingsgesprek gehad\./);
  assert.match(mail.html, /Je hebt nog geen kennismakingsgesprek gehad\./);
});

test('html in de reden wordt niet uitgevoerd', () => {
  const { html } = maakWeigeringsmail(aanvraag, '<script>alert(1)</script>');

  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /&#60;script&#62;/);
});
