/**
 * PageHeader – eigen component (NL Design System heeft nog geen officiële
 * Page Header; dit volgt het patroon "Page Header" van de community)
 *
 * Bovenaan elke pagina: logo, hoofdmenu en de knop Inloggen.
 * Het logo is ook een link naar de homepage.
 * Daaronder het streepje in vier kleuren (groen, rood, geel en blauw), voor de
 * samenwerking tussen de gemeenten. Blauw komt uit het logo van 's-Hertogenbosch.
 *
 * Inloggen gaat naar de pagina /inloggen (voor communityleden, niveau 2).
 */
import { Link } from '@nl-design-system-candidate/link-react/css';
import { KnopLink } from '../KnopLink/KnopLink';
import { Logo } from '../Logo/Logo';
import './PageHeader.css';

// Het hoofdmenu (versie 2.1, na feedback van de opdrachtgever).
// "Initiatief melden" staat apart, want het is een actie en geen informatie.
const menu = [
  { label: 'Home', href: '/' },
  { label: 'Ontwikkelingen', href: '/ontwikkelingen' },
  { label: 'Meer weten', href: '/meer-weten' },
  { label: 'Initiatief melden', href: '/initiatief-melden' },
  { label: 'Contact', href: '/contact' },
];

/** Is dit menu-item de huidige pagina ('page'), of hoort de pagina eronder ('true')? */
function huidig(href: string, pad: string) {
  if (href === pad) return 'page' as const;
  if (href !== '/' && pad.startsWith(href + '/')) return 'true' as const;
  return undefined;
}

export function PageHeader({ huidigPad }: { huidigPad: string }) {
  return (
    <header className="mijninkomen-page-header">
      <div className="mijninkomen-container mijninkomen-page-header__inner">
        <a className="mijninkomen-page-header__logo" href="/">
          <Logo />
        </a>

        <nav aria-label="Hoofdmenu" className="mijninkomen-page-header__nav">
          <ul>
            {menu.map((item) => (
              <li key={item.href}>
                {/* NLDS Link; current="page" laat schermlezers "huidige pagina" zeggen.
                    Op een pagina eronder (bijv. /meer-weten/webinar) is het "true". */}
                <Link href={item.href} current={huidig(item.href, huidigPad)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Inloggen gaat naar een andere pagina, dus een link (KnopLink) met de
            opmaak van de officiële NLDS Button */}
        <KnopLink
          href="/inloggen"
          className="mijninkomen-page-header__inloggen"
          aria-current={huidigPad === '/inloggen' ? 'page' : undefined}
        >
          Inloggen
        </KnopLink>
      </div>

      {/* Decoratie, dus verborgen voor schermlezers */}
      <div className="mijninkomen-container" aria-hidden="true">
        <div className="mijninkomen-stripe">
          <span className="mijninkomen-stripe__deel mijninkomen-stripe__deel--1" />
          <span className="mijninkomen-stripe__deel mijninkomen-stripe__deel--2" />
          <span className="mijninkomen-stripe__deel mijninkomen-stripe__deel--3" />
          <span className="mijninkomen-stripe__deel mijninkomen-stripe__deel--4" />
        </div>
      </div>
    </header>
  );
}
