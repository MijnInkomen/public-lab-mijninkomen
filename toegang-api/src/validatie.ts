export interface Aanvraag {
  naam: string;
  organisatie: string;
  functie: string;
  email: string;
  gesprekDatum: string;
}

export type Fouten = Partial<Record<'naam' | 'organisatie' | 'functie' | 'email' | 'gesprek', string>>;

type Controle = { aanvraag: Aanvraag; fouten?: undefined } | { aanvraag?: undefined; fouten: Fouten };

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
      functie: controleerTekst(functie, 'Vul je functie in.', 'Je functie is te lang.'),
      email: controleerEmail(email),
      gesprek: controleerGesprek(gesprek, gesprekDatum, vandaag),
    }).filter(([, fout]) => fout),
  );

  return gesprekDatum && Object.keys(fouten).length === 0
    ? { aanvraag: { naam, organisatie, functie, email, gesprekDatum } }
    : { fouten };
};
