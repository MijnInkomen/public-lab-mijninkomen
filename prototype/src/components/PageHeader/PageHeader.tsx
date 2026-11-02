/**
 * PageHeader – eigen component (NL Design System heeft nog geen officiële
 * Page Header; dit volgt het patroon "Page Header" van de community)
 *
 * Bovenaan elke pagina: logo, hoofdmenu en de knop Inloggen.
 * Het logo is ook een link naar de homepage.
 * Daaronder het streepje in drie kleuren: één kleur per deelnemende gemeente.
 *
 * Inloggen hoort bij niveau 2 (communityleden) en werkt nog niet.
 * In dit prototype laat de knop daarom een korte melding zien.
 */
import { useState } from 'react';
import { Button } from '@nl-design-system-candidate/button-react/css';
import { Link } from '@nl-design-system-candidate/link-react/css';
import { Logo } from '../Logo/Logo';
import './PageHeader.css';

// Het hoofdmenu (volgens het ontwerp van Isabella)
const menu = [
  { label: 'Home', href: '/' },
  { label: 'Over MijnInkomen', href: '/over-mijninkomen' },
  { label: 'Samenwerken', href: '/samenwerken' },
  { label: 'Contact', href: '/contact' },
];

export function PageHeader({ huidigPad }: { huidigPad: string }) {
  const [toonMelding, setToonMelding] = useState(false);

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

        {/* Officiële NLDS Button met een slot-icoon ervoor */}
        <Button
          purpose="primary"
          onClick={() => setToonMelding(true)}
          iconStart={
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
          }
        >
          Inloggen
        </Button>
      </div>

      {/* aria-live: schermlezers lezen de melding voor zodra hij verschijnt */}
      <div className="mijninkomen-container" aria-live="polite">
        {toonMelding && (
          <p className="mijninkomen-page-header__melding">
            Inloggen voor communityleden komt in de volgende versie (niveau 2).
          </p>
        )}
      </div>

      {/* Decoratie, dus verborgen voor schermlezers */}
      <div className="mijninkomen-container" aria-hidden="true">
        <div className="mijninkomen-stripe">
          <span className="mijninkomen-stripe__deel mijninkomen-stripe__deel--1" />
          <span className="mijninkomen-stripe__deel mijninkomen-stripe__deel--2" />
          <span className="mijninkomen-stripe__deel mijninkomen-stripe__deel--3" />
        </div>
      </div>
    </header>
  );
}
