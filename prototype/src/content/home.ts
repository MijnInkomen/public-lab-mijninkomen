/**
 * TEKSTEN VAN DE HOMEPAGE (versie 2)
 * ----------------------------------
 * Gebaseerd op de paginastructuur van Isabella (versie 2, na de feedback van de
 * opdrachtgever). Uitgangspunt: informeren, niet werven, in gewone taal.
 * De definitieve teksten keurt de opdrachtgever goed.
 */
import type { IconNaam } from '../components/Icon/Icon';
import { gemeenten } from './gemeenten';

export const wat = {
  bovenkop: 'Gemeenten werken samen',
  titel: 'Wat is MijnInkomen?',
  tekst: [
    'MijnInkomen is één digitale oplossing die gemeenten samen maken. Inwoners met een laag inkomen vragen er hulp mee aan, zoals bijstand of bijzondere bijstand.',
    'Inwoners volgen in MijnInkomen de status van hun aanvraag. Medewerkers van de gemeente handelen de aanvraag af.',
  ],
};

export const waarom = {
  bovenkop: 'Waarom samen?',
  titel: 'Eén oplossing voor meerdere gemeenten',
  punten: [
    { icoon: 'mensen', titel: 'Eén oplossing', tekst: 'Gemeenten gebruiken samen één oplossing, in plaats van ieder zijn eigen software.' },
    { icoon: 'grafiek', titel: 'Lagere kosten', tekst: 'Samen betalen en samen beheren kost minder dan alles zelf doen.' },
    { icoon: 'lamp', titel: 'Dezelfde goede ervaring', tekst: 'Inwoners krijgen in elke deelnemende gemeente dezelfde goede ervaring.' },
  ] satisfies { icoon: IconNaam; titel: string; tekst: string }[],
};

export const deelnemers = {
  bovenkop: 'Wie doen mee?',
  titel: 'Deelnemende gemeenten',
  // De lijst staat in content/gemeenten.ts. Op de homepage alleen de logo's;
  // de rollen staan op de pagina "Hoe werken we samen?".
  gemeenten,
  tekst: 'Deze gemeenten werken samen aan MijnInkomen. Elke gemeente heeft een eigen rol in de samenwerking.',
  link: 'Lees hoe we samenwerken',
};

/**
 * Op de homepage: de 3 projecten die het laatst zijn bijgewerkt.
 * Komt vanzelf uit de projecten (datum "bijgewerkt"), dus niemand hoeft apart
 * nieuws te schrijven.
 */
export const recentBijgewerkt = {
  bovenkop: 'Recent bijgewerkt',
  titel: 'Wat er gebeurt',
  aantal: 3,
  link: 'Alle ontwikkelingen',
};

/** Knoppen in de introductie: door naar meer informatie */
export const doorklikken = {
  ontwikkelingen: 'Bekijk de ontwikkelingen',
  meerWeten: 'Meer weten',
};

export const webinarVerwijzing = {
  titel: 'Wil je meer weten?',
  tekst: 'In een webinar vertellen we wat MijnInkomen is en hoe de samenwerking werkt.',
  volgende: 'Het volgende webinar is op',
  link: 'Lees meer over het webinar',
};
