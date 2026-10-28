/**
 * TEKSTEN VAN DE PAGINA "OVER MIJNINKOMEN"
 * De teksten komen uit het ontwerp van Isabella.
 * De definitieve teksten stemmen we af met de opdrachtgever.
 */

export const overHero = {
  bovenkop: 'Over MijnInkomen',
  titel: 'Samen voor een sterker inkomen',
  intro:
    'MijnInkomen is een samenwerking van en voor gemeenten. Wij geloven in een eerlijke, toegankelijke en toekomstbestendige manier van inkomensondersteuning, waarin inwoners centraal staan.',
};

/** De drie hoofdstukken van de pagina, in volgorde */
export const overSecties = [
  {
    nummer: '01',
    bovenkop: 'Wie we zijn',
    titel: 'Van en voor gemeenten',
    illustratie: 'mensen',
    tekst: [
      'MijnInkomen is ontwikkeld in samenwerking met gemeenten, voor gemeenten. We bundelen onze kennis en ervaring om inkomensondersteuning eenvoudiger, toegankelijker en menselijker te maken – voor zowel professionals als inwoners.',
      'We geloven in de kracht van samenwerking. Door kennis te delen, samen te ontwikkelen en elkaar te ondersteunen, kunnen gemeenten beter inspelen op de uitdagingen van nu en morgen.',
    ],
  },
  {
    nummer: '02',
    bovenkop: 'Hoe het is begonnen',
    titel: 'Ontstaan vanuit een gezamenlijke uitdaging',
    illustratie: 'pad',
    tekst: [
      'MijnInkomen is ontstaan vanuit de behoefte van gemeenten om samen te werken aan een betere en meer toegankelijke vorm van inkomensondersteuning.',
      'In de praktijk merkten we dat veel gemeenten tegen dezelfde uitdagingen aanliepen. Door onze krachten te bundelen, ontwikkelden we een oplossing die aansluit bij de praktijk van gemeenten en de behoeften van inwoners.',
    ],
  },
  {
    nummer: '03',
    bovenkop: 'Onze drijfveer',
    titel: 'Klaar voor de toekomst',
    illustratie: 'groei',
    tekst: [
      'De wereld om ons heen verandert. De vraag naar inkomensondersteuning blijft, en de verwachtingen van inwoners en gemeenten groeien.',
      'MijnInkomen wil bijdragen aan een toekomstbestendige aanpak, waarin we samen blijven ontwikkelen, kennis delen en verbeteren. Zo zorgen we dat inkomensondersteuning echt het verschil blijft maken – nu én in de toekomst.',
    ],
  },
] as const;
