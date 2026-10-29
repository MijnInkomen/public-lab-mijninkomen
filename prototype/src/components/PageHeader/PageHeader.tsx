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
// Alleen de opmaak van de NLDS Button laden (voor de link Inloggen)
import '@nl-design-system-candidate/button-react/css';
import { Link } from '@nl-design-system-candidate/link-react/css';
import { Logo } from '../Logo/Logo';
import './PageHeader.css';

// Het hoofdmenu (versie 2). De volgorde volgt de vragen van een bezoeker:
// wat is het? → waar werken ze aan? → hoe doe ik mee? → wie kan ik bellen?
const menu = [
  { label: 'Home', href: '/' },
  { label: 'Ontwikkelingen', href: '/ontwikkelingen' },
  { label: 'Aansluiten', href: '/aansluiten' },
  { label: 'Contact', href: '/contact' },
];

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
                {/* NLDS Link; current="page" laat schermlezers "huidige pagina" zeggen */}
                <Link href={item.href} current={item.href === huidigPad ? 'page' : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Inloggen is een link naar een andere pagina, dus een <a> en geen <button>.
            Hij krijgt wel de opmaak van de officiële NLDS Button (klassen nl-button). */}
        <a
          href="/inloggen"
          className="nl-button nl-button--primary mijninkomen-page-header__inloggen"
          aria-current={huidigPad === '/inloggen' ? 'page' : undefined}
        >
          <span className="nl-button__label">Inloggen</span>
        </a>
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
