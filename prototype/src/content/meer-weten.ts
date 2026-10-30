/**
 * TEKSTEN VAN HET ONDERDEEL "MEER WETEN" (versie 2.1)
 * ----------------------------------------------------
 * Vervangt de pagina "Aansluiten". Informeren, niet werven: de teksten leggen
 * uit, ze sturen niet aan op aanmelden. Vier pagina's met een zijmenu.
 *
 * Gedetailleerde afspraken en vertrouwelijke informatie horen in de besloten
 * communityomgeving (niveau 2), niet hier.
 * LET OP: rollen, werkgroepen, termijnen en tijden zijn VOORBEELDEN.
 */

export const meerWetenMenu = {
  titel: 'Meer weten',
  items: [
    { label: 'Hoe werken we samen?', href: '/meer-weten' },
    { label: 'Webinar', href: '/meer-weten/webinar' },
    { label: 'Kennismakingsgesprek', href: '/meer-weten/kennismaking' },
    { label: 'Communitylid worden', href: '/meer-weten/communitylid' },
  ],
};

// ── Hoe werken we samen? ──
export const samenwerken = {
  titel: 'Hoe werken we samen?',
  tekst: 'MijnInkomen is van de gemeenten samen. Hier lees je wie er meedoen en hoe de samenwerking is georganiseerd.',
  gemeentenTitel: 'Wie doen mee?',
  // De gemeenten zelf (logo + rol) staan in content/gemeenten.ts
  rollenIntro: 'Alle deelnemende gemeenten zijn communitylid. Sommige gemeenten bouwen en betalen ook mee.',
  rollenUitleg: [
    { rol: 'Communitylid', uitleg: 'Deze gemeenten gebruiken MijnInkomen, of gaan dat binnenkort doen. Ze denken mee en delen kennis in de community.' },
    { rol: 'Bouwt en betaalt mee', uitleg: 'Deze gemeenten zijn ook communitylid. Daarnaast betalen ze mee aan de ontwikkeling en bepalen ze mee wat er gebouwd wordt.' },
  ],
  organisatieTitel: 'Zo is het georganiseerd',
  organisatie: [
    { naam: 'Stuurgroep', icoon: 'tandwiel', tekst: 'Neemt de besluiten. Hierin zitten mensen van de deelnemende gemeenten.' },
    { naam: 'Programmateam', icoon: 'grafiek', tekst: 'Voert de besluiten uit en houdt het overzicht. Het eerste aanspreekpunt.' },
    { naam: 'Werkgroepen', icoon: 'lamp', tekst: 'Werken een onderwerp uit, bijvoorbeeld een nieuwe regeling.' },
    { naam: 'Community', icoon: 'mensen', tekst: 'Alle gemeenten en organisaties die meedoen. Ze denken mee en delen kennis.' },
  ] as const,
  afsprakenTitel: 'Afspraken',
  afspraken: [
    'De afspraken zijn voor alle deelnemende gemeenten gelijk.',
    'Verandert er iets? Dan hoort elke gemeente dat op tijd, voordat het ingaat.',
    'Elke gemeente geeft tijd, mensen en geld. Hoeveel hangt af van de rol.',
  ],
  afsprakenBesloten: 'De uitgebreide afspraken staan in de communityomgeving. Die is alleen voor communityleden.',
};

// ── Webinar ──
export const webinar = {
  titel: 'Webinar',
  tekst: 'In een online webinar vertellen we wat MijnInkomen is en hoe de samenwerking werkt. Het webinar is voor iedereen die meer wil weten.',
  leerTitel: 'Wat hoor je in het webinar?',
  leer: ['Wat MijnInkomen is en wat het al kan', 'Hoe de samenwerking tussen de gemeenten werkt', 'Er is ook ruimte voor jouw vragen'],
  wanneer: 'Wanneer?',
  data: 'Eerstvolgende data',
  knop: 'Aanmelden voor een webinar',
  sluiten: 'Aanmelden verbergen',
};

// ── Kennismakingsgesprek ──
export const kennismaking = {
  titel: 'Kennismakingsgesprek',
  tekst: 'Wil je weten wat MijnInkomen voor jouw gemeente of organisatie kan betekenen? Dan kun je een kennismakingsgesprek aanvragen.',
  watTitel: 'Wat is een kennismakingsgesprek?',
  wat: 'Een gesprek met de stuurgroep en het programmateam. Je bespreekt wat jouw gemeente nodig heeft en welke rol past. Ook kijk je samen naar de volgende stappen. Na het gesprek zit je nog nergens aan vast.',
  letOp: 'Een kennismakingsgesprek is voor wie al een webinar heeft gevolgd. Nog geen webinar gevolgd?',
  letOpLink: 'Lees meer over het webinar',
  formulierTitel: 'Kennismakingsgesprek aanvragen',
  bevestiging:
    'Bedankt! Dit is een prototype: je aanvraag is niet echt verstuurd en er zijn geen gegevens opgeslagen.',
  daarnaTitel: 'Wat gebeurt er daarna?',
  daarna: [
    'Binnen 10 werkdagen neemt het programmateam contact met je op om een gesprek te plannen.',
    'Na het gesprek kun je, als jullie dat allebei willen, toegang tot de community aanvragen.',
  ],
  initiatief: 'Wil je alleen een initiatief of idee delen? Dat is iets anders dan een kennismakingsgesprek.',
  initiatiefLink: 'Naar Initiatief melden',
};

// ── Communitylid worden ──
export const communitylid = {
  titel: 'Communitylid worden',
  tekst: 'De community bestaat uit de gemeenten en organisaties die meedoen met MijnInkomen. Je wordt niet direct lid via de website: eerst maak je kennis.',
  watTitel: 'Wat is de community?',
  wat: 'Communityleden werken samen aan MijnInkomen. Ze kunnen inloggen op een besloten omgeving met bijvoorbeeld de volledige planning, afspraken en documenten.',
  oplevert: {
    titel: 'Wat het je gemeente oplevert',
    lijst: ['Een werkende oplossing om inwoners met een laag inkomen te helpen', 'Gedeelde kennis met andere gemeenten', 'Lagere kosten dan alles zelf bouwen'],
  },
  vraagt: {
    titel: 'Wat het van je gemeente vraagt',
    lijst: ['Tijd om mee te denken en te testen', 'Mensen die helpen als jullie met MijnInkomen gaan werken', 'Geld: een bijdrage in de kosten'],
  },
  stappenTitel: 'Zo word je communitylid',
  stappen: [
    { titel: 'Volg een webinar', tekst: 'Je hoort wat MijnInkomen is en hoe de samenwerking werkt.', link: { label: 'Over het webinar', href: '/meer-weten/webinar' } },
    { titel: 'Kennismakingsgesprek', tekst: 'Je bespreekt met de stuurgroep wat MijnInkomen voor jouw gemeente kan betekenen.', link: { label: 'Over het kennismakingsgesprek', href: '/meer-weten/kennismaking' } },
    { titel: 'Toegang aanvragen', tekst: 'Na het gesprek vraag je toegang aan tot de communityomgeving.', link: { label: 'Toegang aanvragen', href: '/toegang-aanvragen' } },
    { titel: 'Inloggen', tekst: 'Je krijgt een account. Je logt in met je wachtwoord en een code op je telefoon.', link: { label: 'Naar Inloggen', href: '/inloggen' } },
  ],
};
