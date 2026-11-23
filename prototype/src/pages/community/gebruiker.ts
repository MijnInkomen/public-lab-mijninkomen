/**
 * Wie is er ingelogd? (prototype)
 * De communityomgeving is rolgericht: elke rol ziet op Home andere
 * snelkoppelingen, overleggen en acties. In het prototype is de ingelogde
 * gebruiker altijd Sanne (Product Owner); de andere rollen staan als voorbeeld
 * in content/community.ts. Bij de echte bouw komt de gebruiker uit het inlogsysteem.
 */
import { useSyncExternalStore } from 'react';
import { voorbeeldGebruikers, type Gebruiker } from '../../content/community';

let huidige: Gebruiker = voorbeeldGebruikers[0];
const luisteraars = new Set<() => void>();

/** Werk de naam of het e-mailadres van de huidige gebruiker bij (pagina Account) */
export function wijzigGebruiker(wijziging: Partial<Pick<Gebruiker, 'naam' | 'email'>>) {
  huidige = { ...huidige, ...wijziging };
  const i = voorbeeldGebruikers.findIndex((g) => g.id === huidige.id);
  voorbeeldGebruikers[i] = huidige;
  luisteraars.forEach((l) => l());
}

export function useGebruiker(): Gebruiker {
  return useSyncExternalStore(
    (l) => {
      luisteraars.add(l);
      return () => luisteraars.delete(l);
    },
    () => huidige,
  );
}
