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
      to: '/ontwikkelingen/',
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
      to: '/contact/',
      label: 'Contact',
      position: 'left',
    },
    {
      to: '/inloggen/',
      label: 'Inloggen',
      position: 'right',
      className: 'mijninkomen-inloggen',
    },
  ],
};

export default navbar;
