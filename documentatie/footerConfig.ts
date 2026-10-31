import type { Footer } from '@docusaurus/theme-common';

const footer: Footer = {
  style: 'light',
  logo: {
    alt: 'MijnInkomen',
    src: '/img/logo-mijninkomen.png',
    height: 44,
  },
  links: [
    {
      title: 'Contact',
      items: [
        { html: 'Vragen over MijnInkomen?' },
        { label: 'Neem contact op', to: '/contact/' },
        { label: 'Volg ons op LinkedIn', href: 'https://www.linkedin.com/' },
      ],
    },
    {
      title: 'Menu',
      items: [
        { label: 'Home', to: '/' },
        { label: 'Ontwikkelingen', to: '/ontwikkelingen/' },
        { label: 'Meer weten', to: '/meer-weten/' },
        { label: 'Initiatief melden', to: '/initiatief-melden/' },
        { label: 'Contact', to: '/contact/' },
        { label: 'Privacyverklaring', to: '/privacy/' },
      ],
    },
  ],
};

export default footer;
