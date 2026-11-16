import type { Navbar } from '@docusaurus/theme-common';

const navbar: Navbar = {
  title: '',
  hideOnScroll: false,
  logo: {
    alt: 'MijnInkomen: naar de homepage',
    src: '/img/logo-mijninkomen.png',
  },
  items: [
    {
      to: '/',
      label: 'Home',
      position: 'left',
      activeBaseRegex: '^/$',
    },
    {
      type: 'doc',
      docId: 'ontwikkelingen/huidig',
      label: 'Ontwikkelingen',
      position: 'left',
    },
    {
      to: '/meer-weten/',
      label: 'Meer weten',
      position: 'left',
    },
    {
      to: '/initiatief-melden/',
      label: 'Initiatief melden',
      position: 'left',
    },
    {
      type: 'custom-roadmap',
      to: '/roadmap/',
      label: 'Roadmap',
      position: 'left',
    },
    {
      type: 'custom-innovatie-backlog',
      to: '/innovatie-backlog/',
      label: 'Innovatie-backlog',
      position: 'left',
    },
    {
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
