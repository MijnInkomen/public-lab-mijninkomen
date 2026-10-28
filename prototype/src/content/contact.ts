/**
 * TEKSTEN VAN DE PAGINA "CONTACT"
 * De teksten komen uit het ontwerp van Isabella. Wat er precies op de
 * contactpagina moet staan, stemmen we nog af met de opdrachtgever.
 *
 * LET OP: de contactgegevens zijn VOORBEELDGEGEVENS en geen echte gegevens.
 */
import type { IconNaam } from '../components/Icon/Icon';

export const contactHero = {
  bovenkop: 'Contact',
  titel: 'Neem contact op',
  intro:
    'Gemeenten kunnen bij ons terecht met vragen of om in contact te komen over samenwerking met MijnInkomen. We denken graag met je mee.',
};

export const formulier = {
  titel: 'Stuur ons een bericht',
  intro: 'Vul onderstaand formulier in en we nemen zo snel mogelijk contact met je op.',
  // NLDS: markeer niet de verplichte velden, maar zeg vooraf dat alles verplicht is
  // (en zet bij een veld dat je mag overslaan "(niet verplicht)" in het label).
  allesVerplicht: 'Vul alle velden in.',
  velden: {
    naam: { label: 'Naam', placeholder: 'Je naam', fout: 'Vul je naam in.' },
    email: {
      label: 'E-mailadres',
      placeholder: 'je@voorbeeld.nl',
      fout: 'Vul je e-mailadres in.',
      foutOngeldig: 'Vul een geldig e-mailadres in, bijvoorbeeld naam@gemeente.nl.',
    },
    gemeente: { label: 'Gemeente', placeholder: 'Naam van je gemeente', fout: 'Vul de naam van je gemeente in.' },
    bericht: { label: 'Bericht', placeholder: 'Waar kunnen we je mee helpen?', fout: 'Vul je bericht in.' },
  },
  knop: 'Verstuur bericht',
  foutenSamenvatting: {
    titel: 'Het formulier is nog niet goed ingevuld',
    tekst: 'Controleer de volgende velden:',
  },
  verzonden:
    'Bedankt voor je bericht! Dit is een prototype: je bericht is niet echt verstuurd en er zijn geen gegevens opgeslagen.',
};

export const contactgegevens = {
  titel: 'Contactgegevens',
  intro: [
    'Hieronder vind je onze contactgegevens.',
    'Let op: dit zijn voorbeeldgegevens en geen actuele contactinformatie.',
  ],
  lijst: [
    { icoon: 'mail', label: 'E-mail', waarde: ['contact@mijninkomen-voorbeeld.nl'] },
    { icoon: 'telefoon', label: 'Telefoon', waarde: ['020 123 45 67'] },
    { icoon: 'klok', label: 'Bereikbaar', waarde: ['ma t/m vr, 09:00 – 17:00'] },
    { icoon: 'locatie', label: 'Adres', waarde: ['Voorbeeldstraat 12', '1234 AB Utrecht'] },
  ] satisfies { icoon: IconNaam; label: string; waarde: string[] }[],
};

export const veelgesteldeVragen = {
  titel: 'Veelgestelde vragen',
  tekst: 'Misschien staat je antwoord al bij de veelgestelde vragen.',
  binnenkort: 'De pagina met veelgestelde vragen komt in een volgende versie.',
};

export const directSamenwerken = {
  titel: 'Liever direct samenwerken?',
  tekst:
    'Wil je meer weten over de mogelijkheden om met MijnInkomen samen te werken? Ga dan naar de pagina Samenwerken voor meer informatie.',
  knop: 'Ga naar Samenwerken',
};
