/**
 * TEKSTEN EN VOORBEELDDATA VAN NIVEAU 2 (de communityomgeving)
 * ------------------------------------------------------------
 * Gebaseerd op het document "Website MijnInkomen – niveau 2" van Isabella.
 * Niveau 2 is het besloten werkplatform voor communityleden: vergaderingen,
 * besluiten, acties, de stand van zaken per gemeente, de roadmap en initiatieven.
 *
 * LET OP: ALLES hieronder is VOORBEELDDATA. De namen van personen zijn verzonnen
 * (keuze Isabella: geen echte personen in het prototype).
 * Bij de echte bouw komt deze informatie uit GitHub, het CMS of de
 * website-applicatie (zie componenten.md).
 */

// ── Menu (verticaal zijmenu, keuze Isabella) ──
export const communityMenu = {
  titel: 'Communityomgeving',
  items: [
    { label: 'Home', href: '/community' },
    { label: 'Vergaderingen', href: '/community/vergaderingen' },
    { label: 'Stand van zaken steden', href: '/community/steden' },
    { label: 'Roadmap & backlog', href: '/community/roadmap' },
    { label: 'Initiatieven & innovaties', href: '/community/initiatieven' },
  ],
};

export const prototypeMelding =
  'Dit is een prototype. Alle namen, datums, besluiten en acties zijn voorbeelden.';

// ── De ingelogde gebruiker (voorbeeld) ──
export const gebruiker = {
  voornaam: 'Sanne',
  naam: 'Sanne de Vries',
  rol: 'Product Owner',
  gemeente: 'Utrecht',
};

export type Gemeente = 'Den Haag' | 'Utrecht' | 'Amsterdam' | "'s-Hertogenbosch" | 'Enschede' | 'Lelystad';
export const alleGemeenten: Gemeente[] = ['Den Haag', 'Utrecht', 'Amsterdam', "'s-Hertogenbosch", 'Enschede', 'Lelystad'];

// ── 1. HOME ──
export const home = {
  titel: `Welkom, ${gebruiker.voornaam}`,
  tekst: 'Hier zie je wat er speelt in de samenwerking, wanneer het volgende overleg is en welke acties voor jou klaarstaan.',
  highlightsTitel: 'Laatste nieuws uit de samenwerking',
  overlegTitel: 'Eerstvolgende overleggen',
  overlegLink: 'Naar de agenda',
  actiesTitel: 'Mijn acties',
  actiesTekst: `Openstaande acties voor jou of voor de gemeente ${gebruiker.gemeente}.`,
  actiesLink: 'Alle acties',
  besluitenTitel: 'Laatste besluiten',
  besluitenLink: 'Naar het besluitenlogboek',
};

export const highlights = [
  { datum: '2026-10-30', titel: 'Sprint 3 opgeleverd', tekst: 'De nieuwe statuspagina voor inwoners staat klaar om te testen.' },
  { datum: '2026-10-15', titel: 'Enschede en Lelystad treden toe', tekst: 'De stuurgroep heeft besloten dat beide gemeenten mogen toetreden.' },
  { datum: '2026-10-01', titel: 'ALO live in Utrecht', tekst: 'Inwoners van Utrecht vragen algemene bijstand nu aan via MijnInkomen.' },
];

// ── 2. VERGADERINGEN ──
export type Overleg = 'Stuurgroepoverleg' | 'Product Owner-overleg' | 'Community-sessie';

export const vergaderingen = {
  titel: 'Vergaderingen',
  tekst: 'De vaste overleggen met hun agenda, alle besluiten en de openstaande acties op één plek.',
  agendaTitel: "Agenda's",
  agendaTekst: 'Elk overleg heeft een vaste agenda. Zo bereidt iedereen zich op dezelfde manier voor.',
  besluitenTitel: 'Besluitenlogboek',
  besluitenTekst: 'Alle besluiten uit de overleggen. Zoek op een woord, of filter op status en gemeente.',
  actiesTitel: 'Actielijst',
  actiesTekst: 'Landelijke acties (voor de hele samenwerking) en lokale acties (voor één gemeente).',
};

export const overleggen: {
  id: string;
  naam: Overleg;
  wie: string;
  hoeVaak: string;
  volgende: { datum: string; tijd: string; waar: string };
  agenda: string[];
}[] = [
  {
    id: 'stuurgroep',
    naam: 'Stuurgroepoverleg',
    wie: 'Vertegenwoordigers van de gemeenten en het programmateam',
    hoeVaak: 'Elke maand',
    volgende: { datum: '2026-11-12', tijd: '10.00–11.30 uur', waar: 'Online' },
    agenda: [
      'Opening en vaststellen agenda',
      'Besluiten en acties vorige keer',
      'Voortgang roadmap',
      'Nieuwe initiatieven ter beoordeling',
      'Financiën',
      'Rondvraag',
    ],
  },
  {
    id: 'po-overleg',
    naam: 'Product Owner-overleg',
    wie: 'De Product Owners van de gemeenten',
    hoeVaak: 'Elke twee weken',
    volgende: { datum: '2026-11-17', tijd: '14.00–15.00 uur', waar: 'Online' },
    agenda: [
      'Wat is er opgeleverd?',
      'Wat staat er in de volgende sprint?',
      'Knelpunten per gemeente',
      'Afspraken over de backlog',
    ],
  },
  {
    id: 'community',
    naam: 'Community-sessie',
    wie: 'Alle communityleden',
    hoeVaak: 'Elk kwartaal',
    volgende: { datum: '2026-11-25', tijd: '15.00–16.30 uur', waar: 'Utrecht en online' },
    agenda: ['Nieuws uit de samenwerking', 'Demo van nieuwe functies', 'Ervaringen delen per gemeente', 'Vragen en ideeën'],
  },
];

export type BesluitStatus = 'Besloten' | 'In uitvoering' | 'Uitgevoerd' | 'Uitgesteld';
export const besluitStatussen: BesluitStatus[] = ['Besloten', 'In uitvoering', 'Uitgevoerd', 'Uitgesteld'];

export const besluiten: { datum: string; besluit: string; overleg: Overleg; gemeenten: Gemeente[] | 'Alle'; status: BesluitStatus }[] = [
  { datum: '2026-10-15', besluit: 'Enschede en Lelystad mogen toetreden tot MijnInkomen.', overleg: 'Stuurgroepoverleg', gemeenten: ['Enschede', 'Lelystad'], status: 'Besloten' },
  { datum: '2026-10-15', besluit: 'Het basisproces bijzondere bijstand wordt de standaard voor alle gemeenten.', overleg: 'Stuurgroepoverleg', gemeenten: 'Alle', status: 'In uitvoering' },
  { datum: '2026-10-08', besluit: 'Epics en user stories worden voortaan bijgehouden in GitHub, niet meer in Jira.', overleg: 'Product Owner-overleg', gemeenten: 'Alle', status: 'In uitvoering' },
  { datum: '2026-09-24', besluit: 'De bijdrage per gemeente voor 2027 is vastgesteld.', overleg: 'Stuurgroepoverleg', gemeenten: 'Alle', status: 'Besloten' },
  { datum: '2026-09-17', besluit: 'ALO gaat op 1 oktober live in Utrecht.', overleg: 'Product Owner-overleg', gemeenten: ['Utrecht'], status: 'Uitgevoerd' },
  { datum: '2026-09-03', besluit: 'De proef met één aanvraagformulier voor meerdere regelingen schuift op naar 2027.', overleg: 'Community-sessie', gemeenten: ['Den Haag', 'Utrecht'], status: 'Uitgesteld' },
];

export type ActieStatus = 'Open' | 'In behandeling' | 'Afgerond';
export const actieStatussen: ActieStatus[] = ['Open', 'In behandeling', 'Afgerond'];

export const acties: {
  actie: string;
  eigenaar: string;
  gemeente: Gemeente | 'Alle';
  soort: 'Landelijk' | 'Lokaal';
  streefdatum: string;
  status: ActieStatus;
}[] = [
  { actie: 'Feedback geven op het basisproces bijzondere bijstand', eigenaar: 'Sanne de Vries', gemeente: 'Utrecht', soort: 'Lokaal', streefdatum: '2026-11-10', status: 'Open' },
  { actie: 'Export van de Jira-epics omzetten naar CSV voor GitHub', eigenaar: 'Programmateam', gemeente: 'Alle', soort: 'Landelijk', streefdatum: '2026-11-14', status: 'In behandeling' },
  { actie: 'Testscenario’s ALO voor Amsterdam afronden', eigenaar: 'Fatima El Amrani', gemeente: 'Amsterdam', soort: 'Lokaal', streefdatum: '2026-11-21', status: 'Open' },
  { actie: 'Koppeling met de leverancier van de Stadspas testen', eigenaar: 'Sanne de Vries', gemeente: 'Utrecht', soort: 'Lokaal', streefdatum: '2026-11-28', status: 'In behandeling' },
  { actie: 'Privacytoets (DPIA) voor Bbz bijwerken', eigenaar: 'Pieter Bakker', gemeente: 'Den Haag', soort: 'Lokaal', streefdatum: '2026-12-05', status: 'Open' },
  { actie: 'Kennismakingsgesprek met Enschede plannen', eigenaar: 'Programmateam', gemeente: 'Enschede', soort: 'Landelijk', streefdatum: '2026-11-07', status: 'Afgerond' },
  { actie: 'Begroting 2027 delen met alle gemeenten', eigenaar: 'Programmateam', gemeente: 'Alle', soort: 'Landelijk', streefdatum: '2026-10-30', status: 'Afgerond' },
];

// ── 3. STAND VAN ZAKEN STEDEN ──
export const steden = {
  titel: 'Stand van zaken steden',
  tekst: 'Welke gemeenten meedoen, welke regelingen ze gebruiken en wie je per gemeente kunt bellen of mailen.',
  rollenTitel: 'Deelnemers en rollen',
  rollenTekst: 'Wie bouwt mee, wie betaalt mee en wie treedt nog toe.',
  regelingenTitel: 'Regelingen per gemeente',
  regelingenTekst: 'Zo zie je welke gemeente al ervaring heeft met een regeling.',
  contactTitel: 'Contactpersonen',
  contactTekst: 'Neem direct contact op met de Product Owner of projectmanager van een andere gemeente.',
};

export type Deelname = 'Bouwt en betaalt mee' | 'Communitylid' | 'Toetreder';

export const deelnemers: { gemeente: Gemeente; rol: Deelname; bouwtMee: boolean; betaaltMee: boolean; sinds: string }[] = [
  { gemeente: 'Den Haag', rol: 'Bouwt en betaalt mee', bouwtMee: true, betaaltMee: true, sinds: '2024' },
  { gemeente: 'Utrecht', rol: 'Bouwt en betaalt mee', bouwtMee: true, betaaltMee: true, sinds: '2024' },
  { gemeente: 'Amsterdam', rol: 'Communitylid', bouwtMee: false, betaaltMee: true, sinds: '2025' },
  { gemeente: "'s-Hertogenbosch", rol: 'Communitylid', bouwtMee: false, betaaltMee: true, sinds: '2026' },
  { gemeente: 'Enschede', rol: 'Toetreder', bouwtMee: false, betaaltMee: false, sinds: '2026' },
  { gemeente: 'Lelystad', rol: 'Toetreder', bouwtMee: false, betaaltMee: false, sinds: '2026' },
];

export type RegelingStatus = 'Live' | 'In test' | 'Gepland' | 'Nog niet';

export const regelingen = ['ALO', 'Bbz', 'Stadspas', 'Bijzondere bijstand', 'IOAW'] as const;
export const regelingUitleg: Record<(typeof regelingen)[number], string> = {
  ALO: 'algemene bijstand',
  Bbz: 'bijstand voor zelfstandigen',
  Stadspas: 'korting voor inwoners met een laag inkomen',
  'Bijzondere bijstand': 'geld voor kosten die je echt moet maken',
  IOAW: 'uitkering voor oudere werklozen',
};

/** Per gemeente de status van elke regeling (in dezelfde volgorde als `regelingen`) */
export const regelingenPerGemeente: Record<Gemeente, RegelingStatus[]> = {
  'Den Haag': ['Live', 'Gepland', 'Live', 'Live', 'Live'],
  Utrecht: ['Live', 'Live', 'Live', 'Live', 'Nog niet'],
  Amsterdam: ['In test', 'Nog niet', 'Gepland', 'Nog niet', 'Nog niet'],
  "'s-Hertogenbosch": ['Gepland', 'Nog niet', 'Gepland', 'Nog niet', 'Nog niet'],
  Enschede: ['Nog niet', 'Nog niet', 'Nog niet', 'Nog niet', 'Nog niet'],
  Lelystad: ['Nog niet', 'Nog niet', 'Nog niet', 'Nog niet', 'Nog niet'],
};

export const contactpersonen: { naam: string; rol: string; gemeente: Gemeente; email: string }[] = [
  { naam: 'Pieter Bakker', rol: 'Product Owner', gemeente: 'Den Haag', email: 'p.bakker@voorbeeld.nl' },
  { naam: 'Sanne de Vries', rol: 'Product Owner', gemeente: 'Utrecht', email: 's.devries@voorbeeld.nl' },
  { naam: 'Fatima El Amrani', rol: 'Projectmanager', gemeente: 'Amsterdam', email: 'f.elamrani@voorbeeld.nl' },
  { naam: 'Thomas van Dijk', rol: 'Projectmanager', gemeente: "'s-Hertogenbosch", email: 't.vandijk@voorbeeld.nl' },
  { naam: 'Lotte Meijer', rol: 'Contactpersoon toetreding', gemeente: 'Enschede', email: 'l.meijer@voorbeeld.nl' },
  { naam: 'Youssef Bouzid', rol: 'Contactpersoon toetreding', gemeente: 'Lelystad', email: 'y.bouzid@voorbeeld.nl' },
];

// ── 4. ROADMAP & BACKLOG ──
export const roadmap = {
  titel: 'Roadmap & backlog',
  tekst: 'Waar de samenwerking aan werkt, per tertiaal (een periode van vier maanden), met de fase van elk onderdeel.',
  fasenTitel: 'Wat betekenen de fasen?',
  synclogTitel: 'Koppeling met Jira en GitHub',
  synclogTekst: 'De roadmap komt uit één bron. Hier zie je wanneer de gegevens uit Jira (Den Haag) en GitHub voor het laatst zijn bijgewerkt.',
};

export type Fase = 'Roadmap' | 'Analyse' | 'Ontwerp' | 'Realisatie';
export const fasen: { fase: Fase; uitleg: string }[] = [
  { fase: 'Roadmap', uitleg: 'Staat op de planning, er is nog niet aan begonnen.' },
  { fase: 'Analyse', uitleg: 'We zoeken uit wat er nodig is.' },
  { fase: 'Ontwerp', uitleg: 'We bedenken hoe het eruit komt te zien en hoe het werkt.' },
  { fase: 'Realisatie', uitleg: 'Het wordt gebouwd en getest.' },
];

export const tertialen: { id: string; naam: string; periode: string; nu?: boolean; epics: { naam: string; fase: Fase; gemeenten: string }[] }[] = [
  {
    id: 't3-2026',
    naam: 'T3 2026',
    periode: 'september – december 2026',
    nu: true,
    epics: [
      { naam: 'Basisproces bijzondere bijstand', fase: 'Realisatie', gemeenten: 'Den Haag, Utrecht' },
      { naam: 'Duidelijker status voor inwoners', fase: 'Realisatie', gemeenten: 'Alle gemeenten' },
      { naam: 'Aansluiting Amsterdam', fase: 'Realisatie', gemeenten: 'Amsterdam' },
      { naam: "Aansluiting 's-Hertogenbosch", fase: 'Ontwerp', gemeenten: "'s-Hertogenbosch" },
    ],
  },
  {
    id: 't1-2027',
    naam: 'T1 2027',
    periode: 'januari – april 2027',
    epics: [
      { naam: 'Toetreding Enschede en Lelystad', fase: 'Analyse', gemeenten: 'Enschede, Lelystad' },
      { naam: 'Roadmap volledig in GitHub', fase: 'Ontwerp', gemeenten: 'Alle gemeenten' },
      { naam: 'Bijzondere bijstand voor Amsterdam', fase: 'Analyse', gemeenten: 'Amsterdam' },
    ],
  },
  {
    id: 't2-2027',
    naam: 'T2 2027',
    periode: 'mei – augustus 2027',
    epics: [
      { naam: 'Eén aanvraagformulier voor meerdere regelingen', fase: 'Roadmap', gemeenten: 'Den Haag, Utrecht' },
      { naam: 'Kwijtschelding gemeentelijke belastingen', fase: 'Roadmap', gemeenten: 'Nog niet bepaald' },
    ],
  },
];

export type SyncStatus = 'Gelukt' | 'Waarschuwing' | 'Mislukt';
export const synclog: { bron: string; wat: string; wanneer: string; status: SyncStatus }[] = [
  { bron: 'GitHub – roadmap', wat: 'Status van 12 epics bijgewerkt', wanneer: '3 november 2026, 08.00 uur', status: 'Gelukt' },
  { bron: 'GitHub – website', wat: '3 issues gevonden zonder epic', wanneer: '3 november 2026, 08.00 uur', status: 'Waarschuwing' },
  { bron: 'Jira (Den Haag)', wat: '38 epics en 212 user stories geëxporteerd', wanneer: '2 november 2026, 09.14 uur', status: 'Gelukt' },
  { bron: 'Jira (Den Haag)', wat: 'Geen verbinding, automatisch opnieuw geprobeerd', wanneer: '1 november 2026, 09.00 uur', status: 'Mislukt' },
];

// ── 5. INITIATIEVEN & INNOVATIES ──
export const initiatieven = {
  titel: 'Initiatieven & innovaties',
  tekst: 'Nieuwe ideeën uit het hele land, los van de vaste roadmap. Zo raakt de roadmap niet vol met ideeën die nog niet zijn beoordeeld.',
  backlogTitel: 'Ingediende initiatieven',
  procesTitel: 'Zo beoordelen we een initiatief',
  criteriaTitel: 'Waar letten we op?',
  formulierTitel: 'Een initiatief indienen',
  formulierKnop: 'Initiatief indienen',
  bevestiging: 'Bedankt! Dit is een prototype: je initiatief is niet echt ingediend en er zijn geen gegevens opgeslagen.',
};

export type Beoordeling = 'Ingediend' | 'In beoordeling' | 'Naar de roadmap' | 'Afgewezen';

export const ingediend: { naam: string; door: string; datum: string; status: Beoordeling; toelichting?: string }[] = [
  { naam: 'Chatbot voor vragen over bijzondere bijstand', door: 'Gemeente Enschede', datum: '2026-10-20', status: 'In beoordeling' },
  { naam: 'Koppeling met schuldhulpverlening', door: 'Stichting Schuldhulp (voorbeeld)', datum: '2026-10-05', status: 'Ingediend' },
  { naam: 'Inkomen automatisch ophalen bij een aanvraag', door: 'Gemeente Lelystad', datum: '2026-09-12', status: 'Naar de roadmap' },
  { naam: 'Eigen app voor de Stadspas', door: 'Leverancier (voorbeeld)', datum: '2026-08-30', status: 'Afgewezen', toelichting: 'Kan al met de bestaande Stadspas in MijnInkomen.' },
];

export const beoordelingStappen = [
  { titel: 'Ingediend', tekst: 'Je initiatief komt binnen bij het programmateam.' },
  { titel: 'Eerste check', tekst: 'Het programmateam kijkt of alles compleet is en of het bij MijnInkomen past.' },
  { titel: 'Beoordeling', tekst: 'De stuurgroep bespreekt het initiatief in het stuurgroepoverleg.' },
  { titel: 'Besluit', tekst: 'Het initiatief gaat naar de roadmap, of je hoort waarom niet.' },
];

export const criteria = [
  'Het helpt inwoners met een laag inkomen.',
  'Meerdere gemeenten kunnen het gebruiken.',
  'Het is open source en volgt de standaarden (zoals NL Design System).',
  'Het is haalbaar in tijd en geld.',
  'Het is veilig en gaat goed om met privacy.',
];
