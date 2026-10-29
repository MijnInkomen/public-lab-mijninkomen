/**
 * TEKSTEN VAN DE PAGINA "ONTWIKKELINGEN" (versie 2)
 * --------------------------------------------------
 * Openbare samenvatting. De volledige roadmap (planning, Jira) hoort bij niveau 2.
 * Wat precies openbaar mag, bepaalt de opdrachtgever.
 *
 * LET OP: welke gemeente welke regeling gebruikt, de lopende onderwerpen en de
 * updates zijn VOORBEELDEN. Ze zijn op de pagina gemarkeerd met "Voorbeeld".
 */

export const ontwikkelingenIntro = {
  bovenkop: 'Ontwikkelingen',
  titel: 'Waar we aan werken',
  tekst: 'Hier lees je wat MijnInkomen al kan en waar de gemeenten samen aan werken.',
};

export const regelingen = {
  titel: 'Wat MijnInkomen al kan',
  tekst: 'Deze regelingen zitten al in MijnInkomen.',
  lijst: [
    { naam: 'Stadspas', uitleg: 'Korting op sport, cultuur en activiteiten voor inwoners met een laag inkomen.', gemeenten: 'Den Haag, Utrecht' },
    { naam: 'Algemene bijstand (ALO)', uitleg: 'Geld om van te leven als je te weinig inkomen hebt en geen andere uitkering kunt krijgen.', gemeenten: 'Den Haag, Utrecht' },
    { naam: 'IOAW', uitleg: 'Een uitkering voor mensen die op latere leeftijd werkloos zijn geworden en geen WW meer krijgen.', gemeenten: 'Den Haag' },
    { naam: 'Bbz (bijstand voor zelfstandigen)', uitleg: 'Hulp voor ondernemers die tijdelijk te weinig inkomen hebben.', gemeenten: 'Utrecht' },
    { naam: 'Bijzondere bijstand', uitleg: 'Een vergoeding voor noodzakelijke kosten die je zelf niet kunt betalen.', gemeenten: 'Den Haag, Utrecht' },
  ],
};

export type Status = 'In ontwikkeling' | 'In test' | 'In voorbereiding';

export const nuBezig = {
  titel: 'Waar we nu aan werken',
  lijst: [
    { naam: 'Basisproces bijzondere bijstand', uitleg: 'Eén vaste manier om bijzondere bijstand aan te vragen en af te handelen, voor alle gemeenten.', status: 'In ontwikkeling' },
    { naam: 'Aansluiting van Amsterdam', uitleg: 'Amsterdam gaat MijnInkomen gebruiken. We testen samen of alles goed werkt.', status: 'In test' },
    { naam: "Aansluiting van 's‑Hertogenbosch", uitleg: "'s‑Hertogenbosch bereidt de overstap naar MijnInkomen voor.", status: 'In voorbereiding' },
    { naam: 'Duidelijker status voor inwoners', uitleg: 'Inwoners zien beter waar hun aanvraag is en wat de volgende stap is.', status: 'In ontwikkeling' },
  ] satisfies { naam: string; uitleg: string; status: Status }[],
};

export const plannen = {
  titel: 'Wat eraan komt',
  tekst: 'Dit zijn plannen. Er is nog geen vaste datum.',
  lijst: [
    'Eén aanvraagformulier voor meerdere regelingen tegelijk.',
    'Meer regelingen in MijnInkomen.',
  ],
};

export const updates = {
  titel: 'Updates',
  // Nieuwste bovenaan. Datum als JJJJ-MM-DD.
  lijst: [
    { datum: '2026-10-21', tekst: 'Terugblik op het webinar van 14 oktober.' },
    { datum: '2026-10-01', tekst: "'s‑Hertogenbosch sluit aan bij MijnInkomen." },
    { datum: '2026-09-15', tekst: 'De Stadspas is nu in MijnInkomen beschikbaar voor Utrecht.' },
    { datum: '2026-08-28', tekst: 'Amsterdam begint met testen.' },
  ],
};

export const naarAansluiten = {
  tekst: 'Wil je weten wat aansluiten inhoudt?',
  link: 'Lees hoe het werkt',
};
