/**
 * TEKSTEN VAN DE PAGINA "CONTACT" (versie 2)
 * Kort en praktisch. Kennismaken en initiatieven gaan via hun eigen pagina, niet via contact.
 * LET OP: e-mailadres en LinkedIn-link zijn VOORBEELDEN.
 */

export const contactIntro = {
  bovenkop: 'Contact',
  titel: 'Neem contact op',
  tekst: 'Heb je een vraag? Hier lees je waar je terechtkunt.',
};

export const waarvoor = {
  titel: 'Waarvoor kun je contact opnemen?',
  lijst: ['Algemene vragen over MijnInkomen', 'Vragen van de pers', 'Vragen over de samenwerking'],
  anders: [
    { tekst: 'Wil je weten of jouw gemeente kan meedoen?', link: 'Over het kennismakingsgesprek', href: '/meer-weten/kennismaking' },
    { tekst: 'Wil je een idee of project delen?', link: 'Initiatief melden', href: '/initiatief-melden' },
  ],
};

export const gegevens = {
  titel: 'Contactgegevens',
  email: { label: 'E-mail programmateam', waarde: 'programmateam@mijninkomen-voorbeeld.nl' },
  reactie: { label: 'Reactietijd', waarde: 'We reageren binnen 5 werkdagen.' },
  kopieer: 'Kopieer e-mailadres',
  gekopieerd: 'E-mailadres gekopieerd',
};

export const volgOns = {
  titel: 'Volg ons',
  tekst: 'Nieuws over MijnInkomen delen we op LinkedIn.',
  link: { label: 'MijnInkomen op LinkedIn', href: 'https://www.linkedin.com/' },
};
