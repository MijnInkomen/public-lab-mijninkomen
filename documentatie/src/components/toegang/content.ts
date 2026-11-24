export const intro = {
  bovenkop: 'Alleen na een kennismakingsgesprek',
  titel: 'Toegang aanvragen',
  tekst: 'Heb je een kennismakingsgesprek gehad? Dan kun je hier toegang tot de communityomgeving aanvragen.',
  letOp: 'Nog geen kennismakingsgesprek gehad? Dan kun je nog geen toegang aanvragen.',
  letOpLink: 'Lees hoe je communitylid wordt',
};

export const formulier = {
  privacy: 'Dit formulier vraagt om gegevens over jou, zoals je naam en e-mailadres. Lees wat we daarmee doen in de ',
  privacyLink: 'privacyverklaring',
  uitleg: 'Vul alle velden in, behalve als er "(niet verplicht)" bij staat.',
  knop: 'Toegang aanvragen',
  bezig: 'Bezig met versturen…',
  bevestiging: 'Bedankt! We hebben je aanvraag ontvangen.',
  samenvattingTitel: 'Het formulier is nog niet goed ingevuld',
  samenvattingTekst: 'Controleer de volgende velden:',
  storing: 'Je aanvraag kon niet worden verstuurd. Probeer het later opnieuw.',
};

/** Functies waaruit een aanvrager kiest. Houd gelijk met FUNCTIES in toegang-api/src/validatie.ts. */
export const functies = [
  'Beleidsadviseur sociaal domein',
  'Klantmanager werk en inkomen',
  'Schuldhulpverlener',
  'Teamleider sociaal domein',
  'Adviseur digitale dienstverlening',
];

export type VeldNaam = 'naam' | 'organisatie' | 'functie' | 'email' | 'gesprek';

export const velden: {
  naam: VeldNaam;
  label: string;
  type: 'text' | 'email' | 'date' | 'select';
  autoComplete?: string;
  opties?: string[];
  keuzeTekst?: string;
  omschrijving?: string;
  fout: string;
}[] = [
  { naam: 'naam', label: 'Naam', type: 'text', autoComplete: 'name', fout: 'Vul je naam in.' },
  {
    naam: 'organisatie',
    label: 'Gemeente of organisatie',
    type: 'text',
    autoComplete: 'organization',
    fout: 'Vul je gemeente of organisatie in.',
  },
  {
    naam: 'functie',
    label: 'Functie',
    type: 'select',
    autoComplete: 'organization-title',
    opties: functies,
    keuzeTekst: 'Kies je functie',
    fout: 'Kies je functie.',
  },
  {
    naam: 'email',
    label: 'E-mailadres van je werk',
    type: 'email',
    autoComplete: 'email',
    omschrijving: 'Bijvoorbeeld: naam@gemeente.nl',
    fout: 'Vul het e-mailadres van je werk in.',
  },
  {
    naam: 'gesprek',
    label: 'Wanneer had je het kennismakingsgesprek?',
    type: 'date',
    fout: 'Kies wanneer je het kennismakingsgesprek had.',
  },
];

export const daarna = {
  titel: 'Wat gebeurt er daarna?',
  stappen: [
    'Het programmateam controleert je aanvraag. Dat duurt ongeveer 5 werkdagen.',
    'Je krijgt een e-mail. Daarmee maak je een account en zet je de code-app op je telefoon klaar.',
  ],
};
