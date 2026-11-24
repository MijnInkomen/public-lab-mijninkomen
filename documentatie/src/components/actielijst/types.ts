export const STATUSSEN = [
  { id: 'open', naam: 'Open' },
  { id: 'in-behandeling', naam: 'In behandeling' },
  { id: 'afgerond', naam: 'Afgerond' },
] as const;

export type Status = (typeof STATUSSEN)[number]['id'];

export interface Actie {
  id: string;
  actie: string;
  eigenaar: { naam: string; email: string; gemeente: string };
  niveau: 'landelijk' | 'lokaal';
  /** JJJJ-MM-DD */
  streefdatum: string;
  status: Status;
}

export interface Actielijst {
  acties: Actie[];
}
