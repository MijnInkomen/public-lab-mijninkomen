/** Een stuk vrije tekst. Staat `aanTeVullen` aan, dan is het een plek die gemeenten zelf invullen. */
export interface Tekst {
  tekst: string;
  aanTeVullen?: boolean;
}

export interface Opmerking {
  titel: string;
  tekst: string;
}

export interface GemeenteGebruik {
  gemeente: string;
  status: string;
}

export interface WerkItem {
  onderwerp: string;
  status: string;
  planning: string;
}

export interface ContactPersoon {
  wie: string;
  rol: string;
  aanTeVullen?: boolean;
}

export interface Regeling {
  id: string;
  naam: string;
  /** Korte samenvatting voor de overzichtstabel. */
  gemeentenSamenvatting: string;
  intro: Tekst | null;
  opmerking: Opmerking | null;
  gemeenten: GemeenteGebruik[];
  werk: WerkItem[];
  lokaleImplementatie: Tekst;
  geleerdeLessen: Tekst[];
  contactPersonen: ContactPersoon[];
  contactTekst: Tekst | null;
  bronnen: string[];
}

export interface Regelingen {
  toelichting: string;
  oproep: Opmerking;
  regelingen: Regeling[];
}
