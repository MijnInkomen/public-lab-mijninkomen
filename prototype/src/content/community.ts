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
// Elk onderdeel heeft eigen subpagina's, zoals het menu van de NL Design
// System-website (keuze Isabella). De eerste subpagina heeft hetzelfde adres als
// het onderdeel zelf. Home en Account zijn één pagina: Home is juist een overzicht
// in één oogopslag, en Account is kort.
export const communityMenu = {
  titel: 'Communityomgeving',
  items: [
    { label: 'Home', href: '/community' },
    {
      label: 'Vergaderondersteuning',
      href: '/community/vergaderingen',
      sub: [
        { label: "Agenda's", href: '/community/vergaderingen' },
        { label: 'Besluitenlogboek', href: '/community/vergaderingen/besluitenlogboek' },
        { label: 'Actielijst', href: '/community/vergaderingen/actielijst' },
      ],
    },
    {
      label: 'Stand van zaken steden',
      href: '/community/steden',
      sub: [
        { label: 'Rollen en contactpersonen', href: '/community/steden' },
        { label: 'Status per regeling', href: '/community/steden/regelingen' },
      ],
    },
    {
      label: 'Roadmap & backlog',
      href: '/community/roadmap',
      sub: [
        { label: 'Tijdlijn', href: '/community/roadmap' },
        { label: 'Koppeling met Jira en GitHub', href: '/community/roadmap/koppeling' },
      ],
    },
    {
      label: 'Initiatieven & innovaties',
      href: '/community/initiatieven',
      sub: [
        { label: 'Ingediende initiatieven', href: '/community/initiatieven' },
        { label: 'Zo beoordelen we', href: '/community/initiatieven/beoordeling' },
        { label: 'Initiatief indienen', href: '/community/initiatieven/indienen' },
        { label: 'Initiatief bijwerken', href: '/community/initiatieven/bijwerken' },
      ],
    },
    // Account staat los onderaan (keuze Isabella: de naam staat niet meer in de kop)
    {
      label: 'Account',
      href: '/community/account',
      apart: true,
      sub: [
        { label: 'Mijn gegevens', href: '/community/account' },
        { label: 'Wijziging aanvragen', href: '/community/account/aanvragen' },
        { label: 'Inloggen en beveiliging', href: '/community/account/beveiliging' },
      ],
    },
  ],
};

export const prototypeMelding =
  'Dit is een prototype. Alle namen, datums, besluiten en acties zijn voorbeelden.';

// ── De ingelogde gebruiker (voorbeeld) ──
// Rolgericht (document niveau 2, uitgangspunten): elke rol ziet op Home andere
// snelkoppelingen, overleggen en acties. In het prototype ben je altijd de eerste
// gebruiker (Sanne, Product Owner); de andere rollen laten zien hoe het per rol
// kan verschillen. Alle personen zijn verzonnen.
export type RolId = 'po' | 'programmamanager' | 'stuurgroep' | 'ontwikkelaar' | 'beleidsadviseur';

export type Gebruiker = {
  id: RolId;
  voornaam: string;
  naam: string;
  rol: string;
  gemeente: Gemeente | 'Programmateam';
  email: string;
  lidSinds: string;
  /** Welke overleggen deze rol bijwoont (id's uit `overleggen`) */
  overleggen: string[];
  /** Ziet deze rol ook alle landelijke acties? */
  landelijk: boolean;
  /** Snelkoppelingen op Home */
  snelNaar: { label: string; href: string }[];
};

export const voorbeeldGebruikers: Gebruiker[] = [
  {
    id: 'po',
    voornaam: 'Sanne',
    naam: 'Sanne de Vries',
    rol: 'Product Owner',
    gemeente: 'Utrecht',
    email: 's.devries@voorbeeld.nl',
    lidSinds: '2024',
    overleggen: ['po-overleg', 'community'],
    landelijk: false,
    snelNaar: [
      { label: 'Actielijst', href: '/community/vergaderingen/actielijst' },
      { label: 'Tijdlijn van de roadmap', href: '/community/roadmap' },
      { label: 'Status per regeling', href: '/community/steden/regelingen' },
    ],
  },
  {
    id: 'programmamanager',
    voornaam: 'Mark',
    naam: 'Mark Visser',
    rol: 'Programmamanager',
    gemeente: 'Programmateam',
    email: 'm.visser@voorbeeld.nl',
    lidSinds: '2024',
    overleggen: ['stuurgroep', 'po-overleg', 'community'],
    landelijk: true,
    snelNaar: [
      { label: 'Actielijst', href: '/community/vergaderingen/actielijst' },
      { label: 'Besluitenlogboek', href: '/community/vergaderingen/besluitenlogboek' },
      { label: 'Ingediende initiatieven', href: '/community/initiatieven' },
    ],
  },
  {
    id: 'stuurgroep',
    voornaam: 'Ingrid',
    naam: 'Ingrid Hoekstra',
    rol: 'Lid van de stuurgroep',
    gemeente: 'Den Haag',
    email: 'i.hoekstra@voorbeeld.nl',
    lidSinds: '2024',
    overleggen: ['stuurgroep', 'community'],
    landelijk: false,
    snelNaar: [
      { label: 'Ingediende initiatieven', href: '/community/initiatieven' },
      { label: 'Besluitenlogboek', href: '/community/vergaderingen/besluitenlogboek' },
      { label: 'Rollen en contactpersonen', href: '/community/steden' },
    ],
  },
  {
    id: 'ontwikkelaar',
    voornaam: 'Daan',
    naam: 'Daan Smit',
    rol: 'Ontwikkelaar',
    gemeente: 'Den Haag',
    email: 'd.smit@voorbeeld.nl',
    lidSinds: '2025',
    overleggen: ['po-overleg'],
    landelijk: false,
    snelNaar: [
      { label: 'Tijdlijn van de roadmap', href: '/community/roadmap' },
      { label: 'Koppeling met Jira en GitHub', href: '/community/roadmap/koppeling' },
      { label: 'Ingediende initiatieven', href: '/community/initiatieven' },
    ],
  },
  {
    id: 'beleidsadviseur',
    voornaam: 'Noor',
    naam: 'Noor Bakker',
    rol: 'Beleidsadviseur',
    gemeente: 'Amsterdam',
    email: 'n.bakker@voorbeeld.nl',
    lidSinds: '2025',
    overleggen: ['community'],
    landelijk: false,
    snelNaar: [
      { label: 'Status per regeling', href: '/community/steden/regelingen' },
      { label: 'Rollen en contactpersonen', href: '/community/steden' },
      { label: 'Agenda', href: '/community/vergaderingen' },
    ],
  },
];

/** Welke acties horen bij deze gebruiker? Van hem/haar, van de eigen gemeente, of (bij landelijk) alle landelijke */
export const isMijnActie = (g: Gebruiker, a: { eigenaar: string; gemeente: string; soort: string }) =>
  a.eigenaar === g.naam || a.gemeente === g.gemeente || (g.landelijk && a.soort === 'Landelijk');

// ── ACCOUNT (staat los onderaan in het zijmenu) ──
// Keuze Isabella: je naam en e-mailadres wijzig je zelf. Voor al het andere doe
// je een aanvraag bij beheer, en beheer beslist of de wijziging mag.
export const account = {
  titel: 'Account',
  gegevensTitel: 'Mijn gegevens',
  gegevensTekst: 'Dit zijn je gegevens in de communityomgeving. Je naam en e-mailadres wijzig je zelf met de knop Wijzigen.',
  aanvragenTitel: 'Wijziging aanvragen',
  aanvragenTekst:
    'Je functie, je gemeente en de telefoon voor je inlogcode kun je niet zelf wijzigen. Vraag de wijziging aan bij beheer. Beheer controleert of de wijziging mag, en laat het je per e-mail weten.',
  aanvragenKnop: 'Aanvraag versturen',
  aanvragenBevestiging:
    'Je aanvraag is verstuurd naar beheer. Je krijgt een e-mail als beheer je aanvraag heeft bekeken. Dit is een prototype: er is niets echt verstuurd.',
  beveiligingTitel: 'Inloggen en beveiliging',
  beveiligingTekst:
    'Je logt in met je e-mailadres, je wachtwoord en een code uit een app op je telefoon. Dat heet tweestapsverificatie. Zo blijft de communityomgeving veilig.',
  beveiligingTelefoon: 'Heb je een nieuwe telefoon? Vraag dan een wijziging aan bij beheer.',
};

export type Gemeente = 'Den Haag' | 'Utrecht' | 'Amsterdam' | "'s-Hertogenbosch" | 'Enschede' | 'Lelystad';
export const alleGemeenten: Gemeente[] = ['Den Haag', 'Utrecht', 'Amsterdam', "'s-Hertogenbosch", 'Enschede', 'Lelystad'];

// ── 1. HOME ──
export const home = {
  welkom: 'Welkom',
  tekst: 'Hier zie je wat er speelt in de samenwerking, wanneer het volgende overleg is en welke acties voor jou klaarstaan.',
  highlightsTitel: 'Laatste nieuws uit de samenwerking',
  overlegTitel: 'Eerstvolgende overleggen',
  overlegLink: 'Naar de agenda',
  actiesTitel: 'Mijn acties',
  snelTitel: 'Snel naar',
  snelTekst: 'De pagina\'s die je als {rol} het meest gebruikt.',
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
  // Naam uit het document voor niveau 2 (keuze Isabella)
  titel: 'Vergaderondersteuning',
  tekst: 'De vaste overleggen met hun agenda, alle besluiten en de openstaande acties op één plek.',
  agendaTitel: "Agenda's",
  agendaTekst: 'Alle overleggen in een agenda. Bekijk een dag, een week of een maand. Klik op een overleg om te zien wie er zijn en wat er op de vaste agenda staat.',
  besluitenTitel: 'Besluitenlogboek',
  besluitenTekst: 'Alle besluiten uit de overleggen. Zoek op een woord, of filter op datum, status en gemeente.',
  actiesTitel: 'Actielijst',
  actiesTekst: 'Landelijke acties (voor de hele samenwerking) en lokale acties (voor één gemeente).',
};

/**
 * De vaste overleggen. Elk overleg heeft een vast ritme (herhaling), zodat de
 * agenda zelf uitrekent wanneer het overleg is (voorbeelddata).
 * - 'nde-weekdag': bijv. elke 2e donderdag van de maand (eventueel alleen in bepaalde maanden)
 * - 'om-de-twee-weken': vanaf een startdatum, elke twee weken op dezelfde dag
 */
export type Herhaling =
  | { soort: 'nde-weekdag'; n: number; weekdag: number; maanden?: number[] }
  | { soort: 'om-de-twee-weken'; start: string };

export const overleggen: {
  id: string;
  naam: Overleg;
  kort: string;
  wie: string;
  hoeVaak: string;
  tijd: string;
  waar: string;
  herhaling: Herhaling;
  agenda: string[];
}[] = [
  {
    id: 'stuurgroep',
    naam: 'Stuurgroepoverleg',
    kort: 'Stuurgroep',
    wie: 'Vertegenwoordigers van de gemeenten en het programmateam',
    hoeVaak: 'Elke maand, op de tweede donderdag',
    tijd: '10.00–11.30 uur',
    waar: 'Online',
    // weekdag: 0 = zondag, 1 = maandag … 4 = donderdag
    herhaling: { soort: 'nde-weekdag', n: 2, weekdag: 4 },
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
    kort: 'PO-overleg',
    wie: 'De Product Owners van de gemeenten',
    hoeVaak: 'Elke twee weken, op dinsdag',
    tijd: '14.00–15.00 uur',
    waar: 'Online',
    herhaling: { soort: 'om-de-twee-weken', start: '2026-11-17' },
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
    kort: 'Community',
    wie: 'Alle communityleden',
    hoeVaak: 'Elk kwartaal, op de vierde woensdag',
    tijd: '15.00–16.30 uur',
    waar: 'Utrecht en online',
    // maanden: 1 = januari … 12 = december
    herhaling: { soort: 'nde-weekdag', n: 4, weekdag: 3, maanden: [2, 5, 8, 11] },
    agenda: ['Nieuws uit de samenwerking', 'Demo van nieuwe functies', 'Ervaringen delen per gemeente', 'Vragen en ideeën'],
  },
];

export type OverlegMoment = { datum: string; overleg: (typeof overleggen)[number] };

const naarIso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/** Alle overlegmomenten van datum `van` tot en met `tot` (beide 'JJJJ-MM-DD'), op datum gesorteerd */
export function overlegMomenten(van: string, tot: string): OverlegMoment[] {
  const begin = new Date(`${van}T12:00:00`);
  const eind = new Date(`${tot}T12:00:00`);
  const momenten: OverlegMoment[] = [];
  for (const overleg of overleggen) {
    const h = overleg.herhaling;
    if (h.soort === 'om-de-twee-weken') {
      const d = new Date(`${h.start}T12:00:00`);
      // terug naar een datum vóór het begin, in stappen van twee weken
      while (d > begin) d.setDate(d.getDate() - 14);
      for (; d <= eind; d.setDate(d.getDate() + 14)) {
        if (d >= begin) momenten.push({ datum: naarIso(d), overleg });
      }
    } else {
      const maand = new Date(begin.getFullYear(), begin.getMonth(), 1, 12);
      for (; maand <= eind; maand.setMonth(maand.getMonth() + 1)) {
        if (h.maanden && !h.maanden.includes(maand.getMonth() + 1)) continue;
        const d = new Date(maand);
        const verschil = (h.weekdag - d.getDay() + 7) % 7;
        d.setDate(1 + verschil + (h.n - 1) * 7);
        if (d >= begin && d <= eind) momenten.push({ datum: naarIso(d), overleg });
      }
    }
  }
  return momenten.sort((x, y) => x.datum.localeCompare(y.datum));
}

/** De eerstvolgende `aantal` overleggen vanaf vandaag */
export function volgendeOverleggen(aantal: number): OverlegMoment[] {
  const vandaag = new Date();
  const over = new Date(vandaag);
  over.setMonth(over.getMonth() + 4);
  return overlegMomenten(naarIso(vandaag), naarIso(over)).slice(0, aantal);
}

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
  { actie: 'Koppeling Jira–GitHub controleren na de mislukte synchronisatie', eigenaar: 'Daan Smit', gemeente: 'Alle', soort: 'Landelijk', streefdatum: '2026-11-27', status: 'In behandeling' },
  { actie: 'Privacytoets (DPIA) voor Bbz bijwerken', eigenaar: 'Pieter Bakker', gemeente: 'Den Haag', soort: 'Lokaal', streefdatum: '2026-12-05', status: 'Open' },
  { actie: 'Kennismakingsgesprek met Enschede plannen', eigenaar: 'Programmateam', gemeente: 'Enschede', soort: 'Landelijk', streefdatum: '2026-11-07', status: 'Afgerond' },
  { actie: 'Begroting 2027 delen met alle gemeenten', eigenaar: 'Programmateam', gemeente: 'Alle', soort: 'Landelijk', streefdatum: '2026-10-30', status: 'Afgerond' },
];

// ── 3. STAND VAN ZAKEN STEDEN ──
export const steden = {
  titel: 'Stand van zaken steden',
  tekst: 'Welke gemeenten meedoen, welke regelingen ze gebruiken en wie je per gemeente kunt bellen of mailen.',
  // Feedback Vincent: rollen en contactpersonen samen in één overzicht per gemeente
  rollenTitel: 'Rollen en contactpersonen',
  rollenTekst: 'Per gemeente: wie bouwt en betaalt mee, wie treedt nog toe, en wie je kunt mailen voor overleg.',
  // Feedback Vincent: de status van elke regeling per gemeente
  regelingenTitel: 'Status per regeling',
  regelingenTekst: 'Per gemeente zie je hoe ver elke regeling is. Zo zie je ook welke gemeente al ervaring heeft met een regeling.',
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

// Feedback Vincent: vier statussen per regeling
export type RegelingStatus = 'In gebruik' | 'In ontwikkeling' | 'In onderzoek' | 'Niet in gebruik';
export const regelingStatussen: { status: RegelingStatus; uitleg: string }[] = [
  { status: 'In gebruik', uitleg: 'Inwoners gebruiken de regeling al in MijnInkomen.' },
  { status: 'In ontwikkeling', uitleg: 'De regeling wordt gebouwd of getest.' },
  { status: 'In onderzoek', uitleg: 'De gemeente onderzoekt of en hoe ze de regeling gaat gebruiken.' },
  { status: 'Niet in gebruik', uitleg: 'De gemeente gebruikt deze regeling (nog) niet in MijnInkomen.' },
];

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
  'Den Haag': ['In gebruik', 'In onderzoek', 'In gebruik', 'In gebruik', 'In gebruik'],
  Utrecht: ['In gebruik', 'In gebruik', 'In gebruik', 'In gebruik', 'Niet in gebruik'],
  Amsterdam: ['In ontwikkeling', 'Niet in gebruik', 'In onderzoek', 'Niet in gebruik', 'Niet in gebruik'],
  "'s-Hertogenbosch": ['In onderzoek', 'Niet in gebruik', 'In onderzoek', 'Niet in gebruik', 'Niet in gebruik'],
  Enschede: ['Niet in gebruik', 'Niet in gebruik', 'Niet in gebruik', 'Niet in gebruik', 'Niet in gebruik'],
  Lelystad: ['Niet in gebruik', 'Niet in gebruik', 'Niet in gebruik', 'Niet in gebruik', 'Niet in gebruik'],
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
  // Feedback Vincent: alleen epics en features, de user stories blijven in Jira en GitHub
  tekst: 'Waar de samenwerking aan werkt, per tertiaal (een periode van vier maanden). Je ziet de epics (grote onderdelen) en hun features (kleinere stukken). De user stories staan alleen in Jira en GitHub.',
  tijdlijnTitel: 'Tijdlijn',
  fasenTitel: 'Wat betekenen de fasen?',
  synclogTitel: 'Koppeling met Jira en GitHub',
  synclogTekst: 'De roadmap komt uit één bron: de epics en features uit Jira (Den Haag) en GitHub. Hier zie je wanneer ze voor het laatst zijn bijgewerkt.',
};

export type Fase = 'Roadmap' | 'Analyse' | 'Ontwerp' | 'Realisatie';
export const fasen: { fase: Fase; uitleg: string }[] = [
  { fase: 'Roadmap', uitleg: 'Staat op de planning, er is nog niet aan begonnen.' },
  { fase: 'Analyse', uitleg: 'We zoeken uit wat er nodig is.' },
  { fase: 'Ontwerp', uitleg: 'We bedenken hoe het eruit komt te zien en hoe het werkt.' },
  { fase: 'Realisatie', uitleg: 'Het wordt gebouwd en getest.' },
];

export const tertialen: { id: string; naam: string; periode: string; nu?: boolean; epics: { naam: string; fase: Fase; gemeenten: string; features: string[] }[] }[] = [
  {
    id: 't3-2026',
    naam: 'T3 2026',
    periode: 'september – december 2026',
    nu: true,
    epics: [
      { naam: 'Basisproces bijzondere bijstand', fase: 'Realisatie', gemeenten: 'Den Haag, Utrecht', features: ['Aanvraag online indienen', 'Bewijsstukken uploaden', 'Besluit inzien'] },
      { naam: 'Duidelijker status voor inwoners', fase: 'Realisatie', gemeenten: 'Alle gemeenten', features: ['Statuspagina met stappen', 'Bericht bij een nieuwe stap'] },
      { naam: 'Aansluiting Amsterdam', fase: 'Realisatie', gemeenten: 'Amsterdam', features: ['Koppeling met de systemen van Amsterdam', 'Testen met inwoners'] },
      { naam: "Aansluiting 's-Hertogenbosch", fase: 'Ontwerp', gemeenten: "'s-Hertogenbosch", features: ['Wensen van de gemeente in kaart', 'Koppeling ontwerpen'] },
    ],
  },
  {
    id: 't1-2027',
    naam: 'T1 2027',
    periode: 'januari – april 2027',
    epics: [
      { naam: 'Toetreding Enschede en Lelystad', fase: 'Analyse', gemeenten: 'Enschede, Lelystad', features: ['Afspraken over de bijdrage', 'Planning van de aansluiting'] },
      { naam: 'Roadmap volledig in GitHub', fase: 'Ontwerp', gemeenten: 'Alle gemeenten', features: ['Epics en features overzetten uit Jira', 'Automatische koppeling met de website'] },
      { naam: 'Bijzondere bijstand voor Amsterdam', fase: 'Analyse', gemeenten: 'Amsterdam', features: ['Lokale regels in kaart brengen', 'Aanpassingen aan het basisproces'] },
    ],
  },
  {
    id: 't2-2027',
    naam: 'T2 2027',
    periode: 'mei – augustus 2027',
    epics: [
      { naam: 'Eén aanvraagformulier voor meerdere regelingen', fase: 'Roadmap', gemeenten: 'Den Haag, Utrecht', features: ['Gegevens één keer invullen', 'Combinatie van regelingen kiezen'] },
      { naam: 'Kwijtschelding gemeentelijke belastingen', fase: 'Roadmap', gemeenten: 'Nog niet bepaald', features: ['Onderzoek naar de wensen van gemeenten'] },
    ],
  },
];

export type SyncStatus = 'Gelukt' | 'Waarschuwing' | 'Mislukt';
export const synclog: { bron: string; wat: string; wanneer: string; status: SyncStatus }[] = [
  { bron: 'GitHub – roadmap', wat: 'Status van 12 epics en 31 features bijgewerkt', wanneer: '3 november 2026, 08.00 uur', status: 'Gelukt' },
  { bron: 'GitHub – website', wat: '3 issues gevonden zonder epic', wanneer: '3 november 2026, 08.00 uur', status: 'Waarschuwing' },
  { bron: 'Jira (Den Haag)', wat: '38 epics en 104 features geëxporteerd', wanneer: '2 november 2026, 09.14 uur', status: 'Gelukt' },
  { bron: 'Jira (Den Haag)', wat: 'Geen verbinding, automatisch opnieuw geprobeerd', wanneer: '1 november 2026, 09.00 uur', status: 'Mislukt' },
];

// ── 5. INITIATIEVEN & INNOVATIES ──
export const initiatieven = {
  titel: 'Initiatieven & innovaties',
  tekst: 'Nieuwe ideeën uit het hele land, los van de vaste roadmap. Zo raakt de roadmap niet vol met ideeën die nog niet zijn beoordeeld.',
  backlogTitel: 'Ingediende initiatieven',
  procesTitel: 'Zo beoordelen we',
  procesTekst: 'Elk initiatief doorloopt dezelfde vier stappen. Hieronder zie je ook waar we op letten.',
  criteriaTitel: 'Waar letten we op?',
  formulierTitel: 'Initiatief indienen',
  formulierKnop: 'Initiatief indienen',
  bevestiging: 'Bedankt! Dit is een prototype: je initiatief is niet echt ingediend en er zijn geen gegevens opgeslagen.',
  // Feedback Vincent: welke vragen in het formulier komen, wordt nog afgestemd
  formulierVoorbeeld: 'Welke vragen in dit formulier komen, wordt nog afgestemd. De vragen hieronder zijn een voorbeeld.',
  // Feedback Vincent: de indiener werkt zijn initiatief zelf bij, via een link in een e-mail
  bijwerkenTitel: 'Initiatief bijwerken',
  bijwerkenTekst:
    'Heb je een initiatief ingediend? Dan krijg je regelmatig een e-mail met een link naar dit formulier. Daarin vertel je hoe het er nu voor staat. Zo blijft het overzicht van ingediende initiatieven actueel.',
  bijwerkenKnop: 'Bijwerken versturen',
  bijwerkenBevestiging: 'Bedankt! Dit is een prototype: er is niets echt bijgewerkt en er zijn geen gegevens opgeslagen.',
};

export type Beoordeling = 'Ingediend' | 'In beoordeling' | 'Naar de roadmap' | 'Afgewezen';

export const ingediend: { naam: string; door: string; datum: string; bijgewerkt: string; status: Beoordeling; toelichting?: string }[] = [
  { naam: 'Chatbot voor vragen over bijzondere bijstand', door: 'Gemeente Enschede', datum: '2026-10-20', bijgewerkt: '2026-11-03', status: 'In beoordeling' },
  { naam: 'Koppeling met schuldhulpverlening', door: 'Stichting Schuldhulp (voorbeeld)', datum: '2026-10-05', bijgewerkt: '2026-10-05', status: 'Ingediend' },
  { naam: 'Inkomen automatisch ophalen bij een aanvraag', door: 'Gemeente Lelystad', datum: '2026-09-12', bijgewerkt: '2026-10-28', status: 'Naar de roadmap' },
  { naam: 'Eigen app voor de Stadspas', door: 'Leverancier (voorbeeld)', datum: '2026-08-30', bijgewerkt: '2026-09-24', status: 'Afgewezen', toelichting: 'Kan al met de bestaande Stadspas in MijnInkomen.' },
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
