/** Het vaste format van een agenda-item. Het formulier vult precies deze velden. */
export interface AgendaItem {
  id: string;
  titel: string;
  /** Verwijst naar een id uit `soorten`. */
  soort: string;
  /** JJJJ-MM-DD. */
  datum: string;
  /** UU:MM. */
  begintijd: string;
  eindtijd: string;
  locatie: string;
  voorWie: string;
  omschrijving: string;
  organisator: {
    wie: string;
    email: string;
  };
  /** Adres om je aan te melden, of null als dat niet nodig is. */
  aanmelden: string | null;
}

export interface Soort {
  id: string;
  naam: string;
  uitleg: string;
}

export interface Agenda {
  /** Zolang de echte bijeenkomsten nog niet zijn aangemeld, staat er een melding boven de agenda. */
  voorbeelddata?: boolean;
  toelichting: string;
  soorten: Soort[];
  items: AgendaItem[];
}
