/**
 * APP – de opbouw van elke pagina:
 * skiplink → kop (PageHeader) → inhoud (main) → voet (PageFooter)
 *
 * Kop en voet blijven op elke pagina hetzelfde. Alleen het deel in <main>
 * wisselt, afhankelijk van het adres (zie navigatie.ts).
 */
import { SkipLink } from '@nl-design-system-candidate/skip-link-react/css';
import { useEffect, useRef, type ComponentType } from 'react';
import { PageFooter } from './components/PageFooter/PageFooter';
import { PageHeader } from './components/PageHeader/PageHeader';
import { useHuidigPad } from './navigatie';
import { Aansluiten } from './pages/Aansluiten';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { Inloggen } from './pages/Inloggen';
import { Ontwikkelingen } from './pages/Ontwikkelingen';
import { Privacy } from './pages/Privacy';

/** Alle pagina's van het prototype: adres → titel en inhoud */
const paginas: Record<string, { titel: string; inhoud: ComponentType }> = {
  '/': { titel: 'MijnInkomen – Samen werken aan inkomensondersteuning', inhoud: Home },
  '/ontwikkelingen': { titel: 'Ontwikkelingen – MijnInkomen', inhoud: Ontwikkelingen },
  '/aansluiten': { titel: 'Aansluiten – MijnInkomen', inhoud: Aansluiten },
  '/contact': { titel: 'Contact – MijnInkomen', inhoud: Contact },
  '/privacy': { titel: 'Privacyverklaring – MijnInkomen', inhoud: Privacy },
  '/inloggen': { titel: 'Inloggen – MijnInkomen', inhoud: Inloggen },
};

export function App() {
  const pad = useHuidigPad();
  const pagina = paginas[pad] ?? paginas['/'];
  const Inhoud = pagina.inhoud;
  const mainRef = useRef<HTMLElement>(null);
  const eersteKeer = useRef(true);

  useEffect(() => {
    // Titel in het tabblad aanpassen (WCAG 2.4.2: elke pagina een eigen titel)
    document.title = pagina.titel;

    const hash = window.location.hash;
    if (hash) {
      // Spring naar het stuk van de pagina achter de # (bijv. #samenwerken)
      document.querySelector(hash)?.scrollIntoView();
    } else if (!eersteKeer.current) {
      // Nieuwe pagina: naar boven, en de focus naar de inhoud zodat
      // schermlezers en toetsenbordgebruikers op de nieuwe pagina beginnen
      // preventScroll: de focus gaat naar de inhoud, maar de pagina blijft
      // bovenaan staan (anders schuift de browser een stukje naar beneden)
      // 'instant': meteen bovenaan, zonder het zachte scrollen uit base.css
      window.scrollTo({ top: 0, behavior: 'instant' });
      mainRef.current?.focus({ preventScroll: true });
    }
    eersteKeer.current = false;
  }, [pad, pagina.titel]);

  return (
    <div id="top">
      {/* NLDS Skip Link: onzichtbaar tot je op Tab drukt (WCAG 2.4.1) */}
      <SkipLink href="#inhoud">Direct naar de inhoud</SkipLink>
      <PageHeader huidigPad={pad} />
      <main id="inhoud" tabIndex={-1} ref={mainRef}>
        <Inhoud />
      </main>
      <PageFooter />
    </div>
  );
}
