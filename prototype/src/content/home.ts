/**
 * TEKSTEN VAN DE HOMEPAGE (versie 2)
 * ----------------------------------
 * Gebaseerd op de paginastructuur van Isabella (versie 2, na de feedback van de
 * opdrachtgever). Uitgangspunt: informeren, niet werven, in gewone taal.
 * De definitieve teksten keurt de opdrachtgever goed.
 */
import type { IconNaam } from '../components/Icon/Icon';
import logoAmsterdam from '../assets/gemeenten/logo-amsterdam.png';
import logoDenHaag from '../assets/gemeenten/logo-den-haag.png';
import logoSHertogenbosch from '../assets/gemeenten/logo-s-hertogenbosch.png';
import logoUtrecht from '../assets/gemeenten/logo-utrecht.png';

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
  // Logo's van de gemeenten: voor een openbare site is toestemming nodig.
  gemeenten: [
    { naam: 'Gemeente Den Haag', logo: logoDenHaag, rol: 'Bouwt en financiert mee' },
    { naam: 'Gemeente Utrecht', logo: logoUtrecht, rol: 'Bouwt en financiert mee' },
    { naam: 'Gemeente Amsterdam', logo: logoAmsterdam, rol: 'Sluit aan' },
    { naam: "Gemeente 's-Hertogenbosch", logo: logoSHertogenbosch, rol: 'Sluit aan' },
  ],
  organisatie:
    'Een stuurgroep neemt de besluiten, een programmateam voert ze uit en een community van gemeenten denkt mee.',
};

export const laatsteOntwikkelingen = {
  bovenkop: 'Laatste ontwikkelingen',
  titel: 'Wat er gebeurt',
  aantal: 3,
  link: 'Alle ontwikkelingen',
};

export const aansluitenVerwijzing = {
  titel: 'Wil je weten hoe je kunt aansluiten?',
  tekst: 'In een webinar vertellen we wat MijnInkomen is en hoe de samenwerking werkt.',
  volgende: 'Het volgende webinar is op',
  link: 'Lees hoe aansluiten werkt',
};
