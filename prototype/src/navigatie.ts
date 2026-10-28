/**
 * NAVIGATIE TUSSEN PAGINA'S
 * -------------------------
 * Een heel eenvoudige "router": hij kijkt naar het adres in de browser
 * (bijv. /over-mijninkomen) en laat de juiste pagina zien, zonder dat de
 * hele website opnieuw wordt geladen.
 *
 * Gewone links (<a href="/over-mijninkomen">) werken vanzelf: we vangen de
 * klik op en wisselen alleen de pagina. Links met een # erin (bijv. /#samenwerken)
 * springen daarna naar dat stuk van de pagina.
 *
 * Bij de echte bouw: gebruik een echte router (bijv. React Router of de
 * routing van Docusaurus). Dit bestand is alleen bedoeld voor het prototype.
 */
import { useEffect, useState } from 'react';

const EVENT = 'mijninkomen:navigatie';

/** Ga naar een ander adres binnen de site, bijv. navigeer('/over-mijninkomen') */
export function navigeer(adres: string) {
  window.history.pushState({}, '', adres);
  window.dispatchEvent(new Event(EVENT));
  // Zit er een # in het adres? Spring daarna naar dat stuk van de pagina
  setTimeout(() => {
    if (window.location.hash) document.querySelector(window.location.hash)?.scrollIntoView();
  }, 0);
}

/** Geeft het huidige pad terug (bijv. "/" of "/over-mijninkomen") en ververst bij wisselen */
export function useHuidigPad() {
  const [pad, setPad] = useState(window.location.pathname);

  useEffect(() => {
    const bijwerken = () => setPad(window.location.pathname);

    // Klikken op interne links opvangen
    const opKlik = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as HTMLElement).closest('a');
      const href = link?.getAttribute('href');
      if (!link || !href || !href.startsWith('/') || link.target) return;
      e.preventDefault();
      navigeer(href);
    };

    window.addEventListener('popstate', bijwerken);
    window.addEventListener(EVENT, bijwerken);
    document.addEventListener('click', opKlik);
    return () => {
      window.removeEventListener('popstate', bijwerken);
      window.removeEventListener(EVENT, bijwerken);
      document.removeEventListener('click', opKlik);
    };
  }, []);

  return pad;
}
