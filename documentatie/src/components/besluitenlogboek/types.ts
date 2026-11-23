export const STATUSSEN = [
  { id: 'besloten', naam: 'Besloten' },
  { id: 'in-uitvoering', naam: 'In uitvoering' },
  { id: 'uitgevoerd', naam: 'Uitgevoerd' },
  { id: 'uitgesteld', naam: 'Uitgesteld' },
] as const;

export type Status = (typeof STATUSSEN)[number]['id'];

export interface Besluit {
  id: string;
  /** JJJJ-MM-DD */
  datum: string;
  besluit: string;
  overleg: string;
  /** Leeg betekent: het besluit geldt voor alle gemeenten. */
  gemeenten: string[];
  status: Status;
}

export interface Besluitenlogboek {
  besluiten: Besluit[];
}
