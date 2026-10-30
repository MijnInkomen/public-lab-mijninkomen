/**
 * TEKSTEN VAN HET ONDERDEEL "ONTWIKKELINGEN" (versie 2.1)
 * --------------------------------------------------------
 * Twee pagina's met een zijmenu. Elke pagina heeft een eigen functie, zodat
 * er geen informatie dubbel staat:
 *   - Wat MijnInkomen al kan  → wat AF is en gebruikt wordt
 *   - Waar we nu aan werken   → wat NU loopt, met een status
 * Bewuste keuzes van Isabella: alleen feiten, dus geen pagina met plannen
 * zonder datum ("Wat eraan komt") en geen aparte pagina met nieuwsberichten.
 * De homepage toont "Recent bijgewerkt", automatisch uit de datum bij elk project.
 *
 * Bij de echte bouw komt deze informatie waarschijnlijk uit GitHub of het CMS
 * (zie componenten.md). De volledige roadmap hoort bij niveau 2.
 *
 * LET OP: alle projecten, statussen en datums zijn VOORBEELDEN.
 */

export const ontwikkelingenMenu = {
  titel: 'Ontwikkelingen',
  items: [
    { label: 'Wat MijnInkomen al kan', href: '/ontwikkelingen' },
    { label: 'Waar we nu aan werken', href: '/ontwikkelingen/nu' },
  ],
};

export type Status = 'Beschikbaar' | 'In ontwikkeling' | 'In test' | 'In voorbereiding';

/** Een project op de detailpagina. Niet elk project heeft al een volledige pagina. */
export type Project = {
  slug: string; // het stukje adres: /ontwikkelingen/project/<slug>
  naam: string;
  samenvatting: string;
  soort: 'beschikbaar' | 'bezig';
  status: Status;
  gemeenten: string;
  bijgewerkt: string; // JJJJ-MM-DD – bepaalt ook "Recent bijgewerkt" op de homepage
  detail?: {
    blokken: { titel: string; tekst?: string; lijst?: string[] }[];
  };
};

export const projecten: Project[] = [
  // ── Wat MijnInkomen al kan ──
  {
    slug: 'stadspas',
    naam: 'Stadspas',
    samenvatting: 'Korting op sport, cultuur en activiteiten voor inwoners met een laag inkomen.',
    soort: 'beschikbaar',
    status: 'Beschikbaar',
    gemeenten: 'Den Haag, Utrecht',
    bijgewerkt: '2026-09-15',
    detail: {
      blokken: [
        {
          titel: 'Wat is de Stadspas?',
          tekst: 'Met de Stadspas krijgen inwoners met een laag inkomen korting. Bijvoorbeeld op sport, cultuur en uitjes in hun gemeente.',
        },
        {
          titel: 'Wat kan een inwoner in MijnInkomen?',
          lijst: [
            'De Stadspas online aanvragen.',
            'Zien hoe ver de aanvraag is.',
            'Een bericht krijgen als de pas klaar is.',
          ],
        },
        {
          titel: 'Wat doet de gemeente?',
          tekst: 'Een medewerker van de gemeente bekijkt de aanvraag in MijnInkomen en handelt hem af. Elke gemeente bepaalt zelf de regels, zoals tot welk inkomen je de pas kunt krijgen.',
        },
        {
          titel: 'Wat is de volgende stap?',
          tekst: 'Andere gemeenten die aansluiten, kunnen de Stadspas ook via MijnInkomen aanbieden.',
        },
      ],
    },
  },
  { slug: 'algemene-bijstand', naam: 'Algemene bijstand (ALO)', samenvatting: 'Geld om van te leven als je te weinig inkomen hebt en geen andere uitkering kunt krijgen.', soort: 'beschikbaar', status: 'Beschikbaar', gemeenten: 'Den Haag, Utrecht', bijgewerkt: '2026-06-01' },
  { slug: 'ioaw', naam: 'IOAW (uitkering voor oudere werklozen)', samenvatting: 'Een uitkering voor mensen die op latere leeftijd werkloos zijn geworden en geen WW meer krijgen.', soort: 'beschikbaar', status: 'Beschikbaar', gemeenten: 'Den Haag', bijgewerkt: '2026-05-12' },
  { slug: 'bbz', naam: 'Bbz (bijstand voor zelfstandigen)', samenvatting: 'Hulp voor ondernemers die tijdelijk te weinig inkomen hebben.', soort: 'beschikbaar', status: 'Beschikbaar', gemeenten: 'Utrecht', bijgewerkt: '2026-04-20' },
  { slug: 'bijzondere-bijstand', naam: 'Bijzondere bijstand', samenvatting: 'Geld voor kosten die je echt moet maken, maar zelf niet kunt betalen.', soort: 'beschikbaar', status: 'Beschikbaar', gemeenten: 'Den Haag, Utrecht', bijgewerkt: '2026-03-30' },

  // ── Waar we nu aan werken ──
  {
    slug: 'basisproces-bijzondere-bijstand',
    naam: 'Basisproces bijzondere bijstand',
    samenvatting: 'Eén vaste manier om bijzondere bijstand aan te vragen en af te handelen, voor alle gemeenten.',
    soort: 'bezig',
    status: 'In ontwikkeling',
    gemeenten: 'Den Haag, Utrecht',
    bijgewerkt: '2026-10-10',
    detail: {
      blokken: [
        {
          titel: 'Waar gaat het over?',
          tekst: 'Nu werkt elke gemeente op een eigen manier met bijzondere bijstand. Samen maken we één basisproces dat alle gemeenten kunnen gebruiken.',
        },
        {
          titel: 'Wat levert het op?',
          lijst: [
            'Inwoners vragen bijzondere bijstand in elke gemeente op dezelfde manier aan.',
            'Gemeenten hoeven het proces niet allemaal zelf te bedenken.',
            'Verbeteringen komen meteen bij alle gemeenten terecht.',
          ],
        },
        {
          titel: 'Hoe ver zijn we?',
          tekst: 'Het basisproces is in ontwikkeling. Den Haag en Utrecht denken mee en testen de eerste versie.',
        },
      ],
    },
  },
  { slug: 'aansluiting-amsterdam', naam: 'Aansluiting van Amsterdam', samenvatting: 'Amsterdam gaat MijnInkomen gebruiken. We testen samen of alles goed werkt.', soort: 'bezig', status: 'In test', gemeenten: 'Amsterdam', bijgewerkt: '2026-08-28' },
  { slug: 'aansluiting-s-hertogenbosch', naam: "Aansluiting van 's‑Hertogenbosch", samenvatting: "'s‑Hertogenbosch bereidt de overstap naar MijnInkomen voor.", soort: 'bezig', status: 'In voorbereiding', gemeenten: "'s-Hertogenbosch", bijgewerkt: '2026-10-01' },
  { slug: 'status-voor-inwoners', naam: 'Duidelijker status voor inwoners', samenvatting: 'Inwoners zien beter waar hun aanvraag is en wat de volgende stap is.', soort: 'bezig', status: 'In ontwikkeling', gemeenten: 'Alle gemeenten', bijgewerkt: '2026-09-30' },
];

export const alKan = {
  titel: 'Wat MijnInkomen al kan',
  tekst: 'Deze regelingen zijn af en worden al gebruikt in MijnInkomen.',
};

export const nuBezig = {
  titel: 'Waar we nu aan werken',
  tekst: 'Deze onderwerpen lopen nu. Bij elk onderwerp zie je hoe ver het is.',
};

/** De projecten die het laatst zijn bijgewerkt, nieuwste eerst (voor de homepage) */
export function recentBijgewerkt(aantal: number): Project[] {
  return [...projecten].sort((a, b) => b.bijgewerkt.localeCompare(a.bijgewerkt)).slice(0, aantal);
}

export const projectDetail = {
  terug: { beschikbaar: 'Terug naar Wat MijnInkomen al kan', bezig: 'Terug naar Waar we nu aan werken' },
  status: 'Status',
  gemeenten: 'Gemeenten',
  bijgewerkt: 'Laatst bijgewerkt',
  nogNiet: 'Over dit onderwerp is nog geen uitgebreide informatie. Deze pagina wordt later aangevuld.',
  leesMeer: 'Lees meer',
};

export const naarMeerWeten = {
  tekst: 'Wil je weten hoe de gemeenten samenwerken?',
  link: 'Lees meer',
};
