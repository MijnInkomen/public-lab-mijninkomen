export type Oordeel = 'voldoet' | 'deels' | 'voldoet-niet' | 'nog-niet-beoordeeld';

export interface Criterium {
  id: string;
  naam: string;
  uitleg: string;
}

export interface Status {
  id: string;
  naam: string;
  uitleg: string;
}

export interface Besluit {
  datum: string;
  tekst: string;
  motivatie: string;
}

export interface Initiatief {
  id: string;
  titel: string;
  omschrijving: string;
  gemeente: string;
  ingediend: string;
  status: string;
  beoordeling: Record<string, Oordeel>;
  besluit: Besluit | null;
}

export interface InnovatieBacklog {
  voorbeelddata?: boolean;
  toelichting: string;
  criteria: Criterium[];
  statussen: Status[];
  initiatieven: Initiatief[];
}

export const OORDEEL_TEKST: Record<Oordeel, string> = {
  voldoet: 'Voldoet',
  deels: 'Voldoet deels',
  'voldoet-niet': 'Voldoet niet',
  'nog-niet-beoordeeld': 'Nog niet beoordeeld',
};
