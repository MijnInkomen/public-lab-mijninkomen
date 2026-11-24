export interface Aanvraag {
  naam: string;
  organisatie: string;
  functie: string;
  email: string;
  gesprekDatum: string;
}

export type Fouten = Partial<Record<'naam' | 'organisatie' | 'functie' | 'email' | 'gesprek', string>>;

type Controle = { aanvraag: Aanvraag; fouten?: undefined } | { aanvraag?: undefined; fouten: Fouten };

/** Functies waaruit een aanvrager kiest. Houd gelijk met de lijst in het formulier (documentatie/src/components/toegang/content.ts). */
export const FUNCTIES = [
  'Beleidsadviseur sociaal domein',
  'Klantmanager werk en inkomen',
  'Schuldhulpverlener',
  'Teamleider sociaal domein',
  'Adviseur digitale dienstverlening',
];

const MAX_LENGTE = 200;
const E_MAILADRES = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const vandaagInNederland = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Amsterdam' });

/** Een datumkiezer stuurt JJJJ-MM-DD. Geeft die terug als de datum echt bestaat. */
export const leesDatum = (tekst: string) => {
  const delen = tekst.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!delen) return undefined;

  const datum = new Date(`${tekst}T00:00:00Z`);
  const bestaat = !Number.isNaN(datum.getTime()) && datum.toISOString().slice(0, 10) === tekst;
  return bestaat ? tekst : undefined;
};

const leesTekst = (waarde: unknown) => (typeof waarde === 'string' ? waarde.trim() : '');

const controleerTekst = (waarde: string, foutLeeg: string, foutLang: string) => {
  if (!waarde) return foutLeeg;
  if (waarde.length > MAX_LENGTE) return foutLang;
  return undefined;
};

const controleerEmail = (email: string) => {
  if (!email) return 'Vul het e-mailadres van je werk in.';
  if (email.length > MAX_LENGTE || !E_MAILADRES.test(email)) {
    return 'Vul een geldig e-mailadres in, bijvoorbeeld naam@gemeente.nl.';
  }
  return undefined;
};

const controleerGesprek = (tekst: string, datum: string | undefined, vandaag: string) => {
  if (!tekst) return 'Kies wanneer je het kennismakingsgesprek had.';
  if (!datum) return 'Kies een geldige datum.';
  if (datum > vandaag) return 'De datum van het kennismakingsgesprek kan niet in de toekomst liggen.';
  return undefined;
};

/** Geeft de nette aanvraag terug, of per veld de foutmelding. */
export const controleerAanvraag = (invoer: unknown, vandaag = vandaagInNederland()): Controle => {
  const velden = (typeof invoer === 'object' && invoer !== null ? invoer : {}) as Record<string, unknown>;
  const naam = leesTekst(velden.naam);
  const organisatie = leesTekst(velden.organisatie);
  const functie = leesTekst(velden.functie);
  const email = leesTekst(velden.email).toLowerCase();
  const gesprek = leesTekst(velden.gesprek);
  const gesprekDatum = leesDatum(gesprek);

  const fouten = Object.fromEntries(
    Object.entries({
      naam: controleerTekst(naam, 'Vul je naam in.', 'Je naam is te lang.'),
      organisatie: controleerTekst(
        organisatie,
        'Vul je gemeente of organisatie in.',
        'De naam van je gemeente of organisatie is te lang.',
      ),
      functie: FUNCTIES.includes(functie) ? undefined : 'Kies je functie.',
      email: controleerEmail(email),
      gesprek: controleerGesprek(gesprek, gesprekDatum, vandaag),
    }).filter(([, fout]) => fout),
  );

  return gesprekDatum && Object.keys(fouten).length === 0
    ? { aanvraag: { naam, organisatie, functie, email, gesprekDatum } }
    : { fouten };
};

const MAX_LENGTE_REDEN = 1000;

/** De reden van weigering is verplicht, want die staat in de e-mail aan de aanvrager. */
export const controleerReden = (
  invoer: unknown,
): { reden: string; fout?: undefined } | { reden?: undefined; fout: string } => {
  const velden = (typeof invoer === 'object' && invoer !== null ? invoer : {}) as Record<string, unknown>;
  const reden = leesTekst(velden.reden);
  if (!reden) return { fout: 'Vul de reden van weigering in.' };
  if (reden.length > MAX_LENGTE_REDEN) return { fout: `De reden mag maximaal ${MAX_LENGTE_REDEN} tekens zijn.` };
  return { reden };
};

const ROLLEN = ['lid', 'beheerder'] as const;

export interface Wijziging {
  rol?: (typeof ROLLEN)[number];
  soort?: string;
}

/** Een wijziging van een lid: een nieuwe rol, een nieuw soort, of allebei. */
export const controleerWijziging = (invoer: unknown): { wijziging: Wijziging; fout?: undefined } | { wijziging?: undefined; fout: string } => {
  const velden = (typeof invoer === 'object' && invoer !== null ? invoer : {}) as Record<string, unknown>;
  const wijziging: Wijziging = {};

  if (velden.rol !== undefined) {
    const rol = ROLLEN.find((kandidaat) => kandidaat === velden.rol);
    if (!rol) return { fout: 'Kies de rol lid of beheerder.' };
    wijziging.rol = rol;
  }
  if (velden.soort !== undefined) {
    if (typeof velden.soort !== 'string' || !FUNCTIES.includes(velden.soort)) return { fout: 'Kies een soort communitylid uit de lijst.' };
    wijziging.soort = velden.soort;
  }
  if (!wijziging.rol && !wijziging.soort) return { fout: 'Kies een rol of soort communitylid.' };
  return { wijziging };
};

export type AccountFouten = Partial<Record<'naam' | 'email', string>>;

/** Een lid wijzigt zelf de naam of het e-mailadres, één tegelijk. */
export const controleerAccountWijziging = (
  invoer: unknown,
): { wijziging: { naam: string } | { email: string }; fouten?: undefined } | { wijziging?: undefined; fouten: AccountFouten } => {
  const velden = (typeof invoer === 'object' && invoer !== null ? invoer : {}) as Record<string, unknown>;

  if (velden.naam !== undefined) {
    const naam = leesTekst(velden.naam).replace(/\s+/g, ' ');
    const fout = controleerTekst(naam, 'Vul je naam in.', 'Je naam is te lang.');
    return fout ? { fouten: { naam: fout } } : { wijziging: { naam } };
  }
  if (velden.email !== undefined) {
    const email = leesTekst(velden.email).toLowerCase();
    const fout = controleerEmail(email);
    return fout ? { fouten: { email: fout } } : { wijziging: { email } };
  }
  return { fouten: { naam: 'Wijzig je naam of je e-mailadres.' } };
};
