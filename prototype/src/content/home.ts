/**
 * TEKSTEN VAN DE HOMEPAGE
 * -----------------------
 * Alle teksten staan hier bij elkaar, los van de opmaak.
 * Zo kun je een tekst aanpassen zonder in de componenten te hoeven zoeken.
 *
 * De teksten komen uit het ontwerp (schets) van Isabella.
 * De definitieve teksten stemmen we af met de opdrachtgever.
 */
import type { IconNaam } from '../components/Icon/Icon';
import logoAmsterdam from '../assets/gemeenten/logo-amsterdam.png';
import logoDenHaag from '../assets/gemeenten/logo-den-haag.png';
import logoUtrecht from '../assets/gemeenten/logo-utrecht.png';

export const hero = {
  bovenkop: 'Gemeenten werken samen',
  // \u00AD is een 'zacht afbreekstreepje': op een smal scherm breekt het woord daar netjes af.
  titel: 'Samen voor betere inkomens\u00ADondersteuning',
  intro:
    'MijnInkomen is een gezamenlijke oplossing van gemeenten voor het beheer van inkomensondersteuning. Door samen te werken delen we kennis, ontwikkelen we door en maken we het verschil voor inwoners.',
  knop: 'Ontdek hoe je kunt samenwerken',
};

export const waarom = {
  bovenkop: 'Waarom MijnInkomen?',
  titel: 'Samen sterker',
  intro:
    'Gemeenten staan voor vergelijkbare uitdagingen. Door samen te werken aan één oplossing besparen we kosten, verbeteren we de dienstverlening en benutten we elkaars kennis en ervaring.',
  voordelen: [
    { icoon: 'mensen', titel: 'Krachten bundelen', tekst: 'Gemeenten werken samen aan één gemeenschappelijke oplossing.' },
    { icoon: 'tandwiel', titel: 'Efficiënter werken', tekst: 'We besparen tijd en kosten door kennis en middelen te delen.' },
    { icoon: 'grafiek', titel: 'Betere dienstverlening', tekst: 'We verbeteren samen de ondersteuning voor inwoners.' },
    { icoon: 'lamp', titel: 'Samen doorontwikkelen', tekst: 'We leren van elkaar en blijven de oplossing verder verbeteren.' },
  ] satisfies { icoon: IconNaam; titel: string; tekst: string }[],
};

export const gemeenten = {
  bovenkop: 'Deelnemende gemeenten',
  titel: 'Samen bouwen aan de toekomst',
  intro:
    'MijnInkomen is gestart met de gemeenten Amsterdam, Den Haag en Utrecht. In de toekomst kunnen meer gemeenten aansluiten.',
  // Officiële logo's van de gemeenten (van hun eigen huisstijlsites).
  // Let op: voor gebruik op een echte, openbare site is toestemming van de gemeenten nodig.
  lijst: [
    { naam: 'Gemeente Amsterdam', logo: logoAmsterdam },
    { naam: 'Gemeente Den Haag', logo: logoDenHaag },
    { naam: 'Gemeente Utrecht', logo: logoUtrecht },
  ],
};

export const voorWie = {
  bovenkop: 'Voor wie is MijnInkomen?',
  titel: 'Voor alle gemeenten',
  tekst: [
    'MijnInkomen is er voor gemeenten die willen samenwerken aan een betrouwbare, toegankelijke en toekomstbestendige oplossing voor inkomensondersteuning.',
    'Of je nu al ervaring hebt of nog aan het oriënteren bent: je bent van harte welkom.',
  ],
  knop: 'Meer over samenwerken',
};
