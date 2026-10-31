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
