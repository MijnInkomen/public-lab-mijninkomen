/**
 * Functies voor de keuzelijst "Functie" in de formulieren
 * (Toegang aanvragen en Kennismakingsgesprek).
 * Eén lijst op één plek: pas je hier iets aan, dan verandert het in beide formulieren.
 * Staat je functie er niet bij? Dan kies je "Niet van toepassing".
 */
export const functieOpties = [
  { waarde: 'beleidsmedewerker', label: 'Beleidsmedewerker' },
  { waarde: 'klantmanager', label: 'Klantmanager of consulent inkomen' },
  { waarde: 'teamleider', label: 'Teamleider of manager' },
  { waarde: 'projectleider', label: 'Projectleider of programmamanager' },
  { waarde: 'informatie', label: 'Informatiemanager of ICT' },
  { waarde: 'bestuur', label: 'Bestuurder (bijvoorbeeld wethouder of directeur)' },
  { waarde: 'nvt', label: 'Niet van toepassing' },
];

export const functieFout = 'Kies je functie. Staat je functie er niet bij? Kies dan "Niet van toepassing".';
