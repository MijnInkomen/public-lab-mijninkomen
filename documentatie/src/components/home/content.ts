import { IconBulb, IconChartBar, IconUsers } from '@tabler/icons-react';

export const wat = {
  bovenkop: 'Gemeenten werken samen',
  titel: 'Wat is MijnInkomen?',
  tekst: [
    'MijnInkomen is één digitale oplossing die gemeenten samen maken. Inwoners met een laag inkomen vragen er hulp mee aan, zoals bijstand of bijzondere bijstand.',
    'Inwoners volgen in MijnInkomen de status van hun aanvraag. Medewerkers van de gemeente handelen de aanvraag af.',
  ],
  ontwikkelingen: 'Bekijk de ontwikkelingen',
  meerWeten: 'Meer weten',
};

export const waarom = {
  bovenkop: 'Waarom samen?',
  titel: 'Eén oplossing voor meerdere gemeenten',
  punten: [
    {
      icoon: IconUsers,
      titel: 'Eén oplossing',
      tekst: 'Gemeenten gebruiken samen één oplossing, in plaats van ieder zijn eigen software.',
    },
    {
      icoon: IconChartBar,
      titel: 'Lagere kosten',
      tekst: 'Samen betalen en samen beheren kost minder dan alles zelf doen.',
    },
    {
      icoon: IconBulb,
      titel: 'Dezelfde goede ervaring',
      tekst: 'Inwoners krijgen in elke deelnemende gemeente dezelfde goede ervaring.',
    },
  ],
};

export const deelnemers = {
  bovenkop: 'Wie doen mee?',
  titel: 'Deelnemende gemeenten',
  gemeenten: [
    { naam: 'Gemeente Den Haag', logo: '/img/gemeenten/logo-den-haag.png' },
    { naam: 'Gemeente Utrecht', logo: '/img/gemeenten/logo-utrecht.png' },
    { naam: 'Gemeente Amsterdam', logo: '/img/gemeenten/logo-amsterdam.png' },
    { naam: "Gemeente 's-Hertogenbosch", logo: '/img/gemeenten/logo-s-hertogenbosch.png' },
  ],
  tekst: 'Deze gemeenten werken samen aan MijnInkomen. Elke gemeente heeft een eigen rol in de samenwerking.',
  link: 'Lees hoe we samenwerken',
};

export const recent = {
  bovenkop: 'Recent bijgewerkt',
  titel: 'Wat er gebeurt',
  aantal: 3,
  link: 'Alle ontwikkelingen',
};

// Alle projecten, statussen en datums zijn voorbeelden.
const projecten = [
  { slug: 'stadspas', naam: 'Stadspas', status: 'Beschikbaar', bijgewerkt: '2026-09-15' },
  { slug: 'algemene-bijstand', naam: 'Algemene bijstand (ALO)', status: 'Beschikbaar', bijgewerkt: '2026-06-01' },
  { slug: 'ioaw', naam: 'IOAW (uitkering voor oudere werklozen)', status: 'Beschikbaar', bijgewerkt: '2026-05-12' },
  { slug: 'bbz', naam: 'Bbz (bijstand voor zelfstandigen)', status: 'Beschikbaar', bijgewerkt: '2026-04-20' },
  { slug: 'bijzondere-bijstand', naam: 'Bijzondere bijstand', status: 'Beschikbaar', bijgewerkt: '2026-03-30' },
  {
    slug: 'basisproces-bijzondere-bijstand',
    naam: 'Basisproces bijzondere bijstand',
    status: 'In ontwikkeling',
    bijgewerkt: '2026-10-10',
  },
  { slug: 'aansluiting-amsterdam', naam: 'Aansluiting van Amsterdam', status: 'In test', bijgewerkt: '2026-08-28' },
  {
    slug: 'aansluiting-s-hertogenbosch',
    naam: "Aansluiting van 's-Hertogenbosch",
    status: 'In voorbereiding',
    bijgewerkt: '2026-10-01',
  },
  {
    slug: 'status-voor-inwoners',
    naam: 'Duidelijker status voor inwoners',
    status: 'In ontwikkeling',
    bijgewerkt: '2026-09-30',
  },
];

export const laatstBijgewerkt = (aantal: number) =>
  [...projecten].sort((a, b) => b.bijgewerkt.localeCompare(a.bijgewerkt)).slice(0, aantal);

export const webinar = {
  titel: 'Wil je meer weten?',
  tekst: 'In een webinar vertellen we wat MijnInkomen is en hoe de samenwerking werkt.',
  volgende: 'Het volgende webinar is op',
  link: 'Lees meer over het webinar',
};

const webinarDatums = ['2026-07-08', '2026-09-09', '2026-10-14', '2026-11-11', '2026-12-09', '2027-01-13'];

// Datum in Nederland als JJJJ-MM-DD. Een webinar van vandaag telt nog als komend.
const vandaag = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Amsterdam' });

export const volgendWebinar = (datums = webinarDatums, datum = vandaag()) => datums.find((d) => d >= datum);

export const datumVoluit = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export const datumKort = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
