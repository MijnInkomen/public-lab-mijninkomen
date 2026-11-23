import Link from '@docusaurus/Link';

interface Item {
  label: string;
  /** Zonder adres staat het item er al, maar is de pagina er nog niet. */
  to?: string;
  huidig?: boolean;
  items?: Item[];
}

const ITEMS: Item[] = [
  { label: 'Home', to: '/' },
  {
    label: 'Vergaderingen',
    to: '/vergaderingen/',
    huidig: true,
    items: [{ label: "Agenda's", to: '#agendas' }, { label: 'Besluitenlogboek' }, { label: 'Actielijst' }],
  },
  { label: 'Stand van zaken steden' },
  { label: 'Roadmap & backlog', to: '/roadmap/' },
  { label: 'Initiatieven & innovaties', to: '/innovatie-backlog/' },
];

const ACCOUNT: Item = { label: 'Account', to: 'pathname:///auth/realms/mijninkomen/account/' };

const NavigatieLink = ({ label, to, huidig }: Item) => {
  const klasse = `mijninkomen-zijnavigatie__link${huidig ? ' mijninkomen-zijnavigatie__link--huidig' : ''}`;
  if (!to) return <span className={klasse}>{label}</span>;
  return (
    <Link className={klasse} to={to} aria-current={huidig ? 'page' : undefined}>
      {label}
    </Link>
  );
};

const NavigatieItem = (item: Item) => (
  <li>
    <NavigatieLink {...item} />
    {item.items && (
      <ul className="mijninkomen-zijnavigatie__sublijst">
        {item.items.map((subitem) => (
          <NavigatieItem key={subitem.label} {...subitem} />
        ))}
      </ul>
    )}
  </li>
);

export const VergaderingenNavigatie = () => (
  <nav aria-label="Community" className="mijninkomen-zijnavigatie">
    <ul className="mijninkomen-zijnavigatie__lijst">
      {ITEMS.map((item) => (
        <NavigatieItem key={item.label} {...item} />
      ))}
    </ul>
    <ul className="mijninkomen-zijnavigatie__lijst mijninkomen-zijnavigatie__lijst--onder">
      <NavigatieItem {...ACCOUNT} />
    </ul>
  </nav>
);
