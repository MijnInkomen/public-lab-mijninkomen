/**
 * TEKSTEN VAN DE PAGINA "SAMENWERKEN"
 * De teksten komen uit het ontwerp van Isabella.
 * De definitieve teksten stemmen we af met de opdrachtgever.
 */
import type { IconNaam } from '../components/Icon/Icon';

export const samenwerkenHero = {
  bovenkop: 'Samenwerken',
  titel: 'De kracht van samenwerken',
  intro:
    'Samen maken we inkomensondersteuning eenvoudiger, toegankelijker en toekomstbestendig – voor zowel gemeenten als inwoners.',
};

export const waaromSamenwerken = {
  bovenkop: 'Waarom samenwerken',
  punten: [
    { icoon: 'lamp', titel: 'Kennis delen', tekst: 'Van en met elkaar leren, praktische ervaringen uitwisselen.' },
    { icoon: 'tandwiel', titel: 'Samen ontwikkelen', tekst: 'Oplossingen verbeteren en vernieuwen op basis van praktijkervaring.' },
    { icoon: 'grafiek', titel: 'Meer impact', tekst: 'Inwoners beter ondersteunen, nu en in de toekomst.' },
  ] satisfies { icoon: IconNaam; titel: string; tekst: string }[],
};

export const voorWieSamenwerken = {
  bovenkop: 'Voor wie',
  titel: 'Voor alle gemeenten',
  tekst:
    'MijnInkomen is ontwikkeld in samenwerking met gemeenten, voor gemeenten. Of je nu al ervaring hebt met inkomensondersteuning of nog aan het oriënteren bent: je bent van harte welkom.',
};

export const aansluiten = {
  bovenkop: 'Samen aan de slag',
  titel: 'Interesse om aan te sluiten?',
  tekst: [
    'Vul het formulier in en we nemen contact met je op.',
    'We bespreken graag de mogelijkheden voor jouw gemeente.',
  ],
  knop: 'Vul het formulier in',
};
