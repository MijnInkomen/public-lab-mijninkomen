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
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { OverMijnInkomen } from './pages/OverMijnInkomen';
import { Samenwerken } from './pages/Samenwerken';

/** Alle pagina's van het prototype: adres → titel en inhoud */
const paginas: Record<string, { titel: string; inhoud: ComponentType }> = {
  '/': { titel: 'MijnInkomen – Samen werken aan inkomensondersteuning', inhoud: Home },
  '/over-mijninkomen': { titel: 'Over MijnInkomen – MijnInkomen', inhoud: OverMijnInkomen },
  '/samenwerken': { titel: 'Samenwerken – MijnInkomen', inhoud: Samenwerken },
  '/contact': { titel: 'Contact – MijnInkomen', inhoud: Contact },
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
      window.scrollTo(0, 0);
      mainRef.current?.focus();
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
