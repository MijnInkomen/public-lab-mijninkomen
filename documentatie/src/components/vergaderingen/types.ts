export interface Overleg {
  id: string;
  naam: string;
  wie: string;
  hoeVaak: string;
  volgendeKeer: string;
  agenda: string[];
}

export interface Vergaderingen {
  overleggen: Overleg[];
}
