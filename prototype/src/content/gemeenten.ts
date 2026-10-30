/**
 * DEELNEMENDE GEMEENTEN
 * ---------------------
 * Eén lijst voor de hele site: de homepage toont de logo's, de pagina
 * "Hoe werken we samen?" toont de logo's met de rol.
 * Komt er een gemeente bij? Zet het logo in assets/gemeenten/ en voeg hier één regel toe.
 *
 * Logo's van de gemeenten: voor een openbare site is toestemming nodig.
 * Bij de echte bouw komt deze lijst waarschijnlijk uit het CMS.
 */
import logoAmsterdam from '../assets/gemeenten/logo-amsterdam.png';
import logoDenHaag from '../assets/gemeenten/logo-den-haag.png';
import logoSHertogenbosch from '../assets/gemeenten/logo-s-hertogenbosch.png';
import logoUtrecht from '../assets/gemeenten/logo-utrecht.png';

/**
 * Alle deelnemende gemeenten zijn communitylid. Den Haag en Utrecht bouwen en
 * betalen daarnaast ook mee aan de ontwikkeling.
 */
export type Rol = 'Bouwt en betaalt mee' | 'Communitylid';

export const gemeenten: { naam: string; logo: string; rol: Rol }[] = [
  { naam: 'Gemeente Den Haag', logo: logoDenHaag, rol: 'Bouwt en betaalt mee' },
  { naam: 'Gemeente Utrecht', logo: logoUtrecht, rol: 'Bouwt en betaalt mee' },
  { naam: 'Gemeente Amsterdam', logo: logoAmsterdam, rol: 'Communitylid' },
  { naam: "Gemeente 's-Hertogenbosch", logo: logoSHertogenbosch, rol: 'Communitylid' },
];
