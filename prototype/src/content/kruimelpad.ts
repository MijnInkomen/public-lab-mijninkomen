/**
 * Kruimelpad – welke stappen er boven een pagina staan.
 * Pas je een paginanaam aan? Doe dat dan hier. Elke pagina van niveau 1 staat erin.
 */
import { projecten } from './ontwikkelingen';

export type Kruimel = { label: string; href: string };

const home: Kruimel = { label: 'Home', href: '/' };
const ontwikkelingen: Kruimel = { label: 'Ontwikkelingen', href: '/ontwikkelingen' };
const meerWeten: Kruimel = { label: 'Meer weten', href: '/meer-weten' };
const nuBezig: Kruimel = { label: 'Waar we nu aan werken', href: '/ontwikkelingen/nu' };

/** Adres → de stappen van het kruimelpad (de laatste stap is de pagina zelf). */
const vasteKruimels: Record<string, Kruimel[]> = {
  '/ontwikkelingen': [home, ontwikkelingen],
  '/ontwikkelingen/nu': [home, ontwikkelingen, nuBezig],
  '/meer-weten': [home, meerWeten],
  '/meer-weten/webinar': [home, meerWeten, { label: 'Webinar', href: '/meer-weten/webinar' }],
  '/meer-weten/kennismaking': [home, meerWeten, { label: 'Kennismakingsgesprek', href: '/meer-weten/kennismaking' }],
  '/meer-weten/communitylid': [home, meerWeten, { label: 'Communitylid worden', href: '/meer-weten/communitylid' }],
  '/initiatief-melden': [home, { label: 'Initiatief melden', href: '/initiatief-melden' }],
  '/contact': [home, { label: 'Contact', href: '/contact' }],
  '/inloggen': [home, { label: 'Inloggen', href: '/inloggen' }],
  '/toegang-aanvragen': [home, { label: 'Toegang aanvragen', href: '/toegang-aanvragen' }],
  '/privacy': [home, { label: 'Privacyverklaring', href: '/privacy' }],
};

export function kruimelsVoor(pad: string): Kruimel[] {
  if (vasteKruimels[pad]) return vasteKruimels[pad];

  // Projectpagina: onder "Ontwikkelingen", en bij een project in ontwikkeling
  // ook onder "Waar we nu aan werken"
  const match = pad.match(/^\/ontwikkelingen\/project\/([a-z0-9-]+)$/);
  const project = match && projecten.find((p) => p.slug === match[1]);
  if (project) {
    const stappen = project.soort === 'bezig' ? [home, ontwikkelingen, nuBezig] : [home, ontwikkelingen];
    return [...stappen, { label: project.naam, href: pad }];
  }

  return []; // Home en niveau 2: geen kruimelpad
}
