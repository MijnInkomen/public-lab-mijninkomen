/** Een rol die een gemeente kan hebben binnen het programma. */
export interface Rol {
  id: string;
  naam: string;
  uitleg: string;
}

/** Staat `aanTeVullen` aan, dan is dit een plek die de gemeente zelf invult. */
export interface ContactPersoon {
  wie: string;
  rol: string;
  aanTeVullen?: boolean;
}

export interface Gemeente {
  id: string;
  naam: string;
  /** Verwijst naar de ids uit `rollen`. Een gemeente kan meer dan één rol hebben. */
  rollen: string[];
  contactpersoon: ContactPersoon;
}

export interface Gemeenten {
  /** Zolang de rollen nog niet bevestigd zijn, staat er een melding boven de matrix. */
  voorbeelddata?: boolean;
  toelichting: string;
  oproep: {
    titel: string;
    tekst: string;
  };
  rollen: Rol[];
  gemeenten: Gemeente[];
  contactTekst: string;
  bronnen: string[];
}

/** Een actieve regeling van een gemeente, afgeleid uit de regelingen. */
export interface ActieveRegeling {
  id: string;
  naam: string;
  status: string;
}
