export const formulier = {
  uitleg: 'Vul alle velden in, behalve als er "(niet verplicht)" bij staat. Zo volgen alle agenda-items hetzelfde format.',
  knop: 'Agenda-item maken',
  samenvattingTitel: 'Het formulier is nog niet goed ingevuld',
  samenvattingTekst: 'Controleer de volgende velden:',
  opnieuw: 'Nog een bijeenkomst aanmelden',
};

export type VeldNaam =
  | 'titel'
  | 'soort'
  | 'datum'
  | 'begintijd'
  | 'eindtijd'
  | 'locatie'
  | 'voorWie'
  | 'omschrijving'
  | 'organisator'
  | 'email'
  | 'aanmelden';

export interface Veld {
  naam: VeldNaam;
  label: string;
  type: 'text' | 'date' | 'time' | 'email' | 'url' | 'select' | 'textarea';
  omschrijving?: string;
  /** Melding als het veld leeg is. Ontbreekt die, dan is het veld niet verplicht. */
  fout?: string;
  maxLengte?: number;
}

export const velden: Veld[] = [
  {
    naam: 'titel',
    label: 'Titel',
    type: 'text',
    omschrijving: 'Begin met het soort, bijvoorbeeld: Webinar: aansluiten op MijnInkomen.',
    fout: 'Vul een titel in.',
    maxLengte: 120,
  },
  {
    naam: 'soort',
    label: 'Soort bijeenkomst',
    type: 'select',
    fout: 'Kies het soort bijeenkomst.',
  },
  {
    naam: 'datum',
    label: 'Datum',
    type: 'date',
    fout: 'Kies een datum.',
  },
  {
    naam: 'begintijd',
    label: 'Begintijd',
    type: 'time',
    fout: 'Vul de begintijd in.',
  },
  {
    naam: 'eindtijd',
    label: 'Eindtijd',
    type: 'time',
    fout: 'Vul de eindtijd in.',
  },
  {
    naam: 'locatie',
    label: 'Waar',
    type: 'text',
    omschrijving: 'Online, of de plaats en het adres.',
    fout: 'Vul in waar de bijeenkomst is.',
    maxLengte: 120,
  },
  {
    naam: 'voorWie',
    label: 'Voor wie',
    type: 'text',
    omschrijving: 'Bijvoorbeeld: alle communityleden, of product owners van deelnemende gemeenten.',
    fout: 'Vul in voor wie de bijeenkomst is.',
    maxLengte: 120,
  },
  {
    naam: 'omschrijving',
    label: 'Waar gaat het over?',
    type: 'textarea',
    omschrijving: 'Twee of drie zinnen: wat behandel je en wat levert het de deelnemer op.',
    fout: 'Vul een omschrijving in.',
    maxLengte: 600,
  },
  {
    naam: 'organisator',
    label: 'Organisator',
    type: 'text',
    omschrijving: 'De persoon of het team dat de bijeenkomst organiseert.',
    fout: 'Vul de organisator in.',
    maxLengte: 120,
  },
  {
    naam: 'email',
    label: 'E-mailadres van de organisator',
    type: 'email',
    omschrijving: 'Hier kunnen deelnemers vragen naartoe sturen.',
    fout: 'Vul het e-mailadres van de organisator in.',
    maxLengte: 200,
  },
  {
    naam: 'aanmelden',
    label: 'Aanmeldlink (niet verplicht)',
    type: 'url',
    omschrijving: 'Moeten deelnemers zich ergens aanmelden? Plak dan het adres, beginnend met https://.',
    maxLengte: 300,
  },
];

export const FOUT_EMAIL = 'Vul een geldig e-mailadres in, bijvoorbeeld naam@gemeente.nl.';
export const FOUT_LINK = 'Vul een adres in dat begint met https:// of laat het veld leeg.';
export const FOUT_VERLEDEN = 'De datum van een nieuwe bijeenkomst kan niet in het verleden liggen.';
export const FOUT_EINDTIJD = 'De eindtijd moet na de begintijd liggen.';
export const foutLang = (maximum: number) => `Dit veld mag hoogstens ${maximum} tekens lang zijn.`;
