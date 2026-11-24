import type { Navbar } from '@docusaurus/theme-common';

const navbar: Navbar = {
  title: '',
  hideOnScroll: false,
  logo: {
    alt: 'MijnInkomen: naar de homepage',
    src: '/img/logo-mijninkomen.png',
  },
  items: [
    // Ingelogd verdwijnen de openbare menu-items: dan staat alles in het zijmenu van de communityomgeving.
    {
      type: 'custom-communitylabel',
      to: '/vergaderingen/',
      label: 'Communityomgeving',
      position: 'left',
      className: 'mijninkomen-communitylabel',
    },
    {
      type: 'custom-publiek',
      to: '/',
      label: 'Home',
      position: 'left',
      activeBaseRegex: '^/$',
    },
    {
      type: 'custom-publiek',
      to: '/wat-kan-het/',
      label: 'Ontwikkelingen',
      position: 'left',
      activeBaseRegex: '^/(wat-kan-het|waar-werkt-het-naar-toe)/',
    },
    {
      type: 'custom-publiek',
      to: '/meer-weten/',
      label: 'Meer weten',
      position: 'left',
    },
    {
      type: 'custom-publiek',
      to: '/initiatief-melden/',
      label: 'Initiatief melden',
      position: 'left',
    },
    {
      type: 'custom-publiek',
      to: '/contact/',
      label: 'Contact',
      position: 'left',
    },
    {
      // Alleen voor beheerders. Leden en rollen staat er alleen in voor de hoofdbeheerder.
      type: 'custom-beheermenu',
      label: 'Beheer',
      position: 'right',
      items: [
        {
          type: 'custom-beheer',
          to: 'pathname:///community/beheer/',
          target: '_self',
          label: 'Aanvragen',
        },
        {
          type: 'custom-leden',
          to: 'pathname:///community/leden/',
          target: '_self',
          label: 'Leden en rollen',
        },
      ],
    },
    {
      type: 'custom-inloggen',
      target: '_self',
      position: 'right',
      className: 'mijninkomen-inloggen',
    },
  ],
};

export default navbar;
