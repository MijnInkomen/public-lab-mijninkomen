import { useEffect, useState } from 'react';
import type { Regelingen } from '../regelingen/types';
import type { ActieveRegeling, Gemeenten } from './types';

// De inhoud staat bewust niet in de build: alles in de build is openbaar. Nginx geeft deze bestanden alleen na inloggen vrij.
const GEMEENTEN = '/community/gemeenten.json';
const REGELINGEN = '/community/regelingen.json';

const haalOp = async <T,>(adres: string): Promise<T> => {
  const antwoord = await fetch(adres);
  if (!antwoord.ok) throw new Error('Niet ingelogd');
  return antwoord.json();
};

export interface GemeentenMetRegelingen {
  gemeenten: Gemeenten;
  /** Per gemeentenaam de regelingen die daar actief zijn. */
  regelingenPerGemeente: Record<string, ActieveRegeling[]>;
}

/** De actieve regelingen staan al per regeling in regelingen.json. Die draaien we hier om naar per gemeente,
 * zodat er één bron van waarheid blijft. */
const perGemeente = ({ regelingen }: Regelingen): Record<string, ActieveRegeling[]> => {
  const verzameld: Record<string, ActieveRegeling[]> = {};

  for (const { id, naam, gemeenten } of regelingen) {
    for (const { gemeente, status } of gemeenten) {
      verzameld[gemeente] = [...(verzameld[gemeente] ?? []), { id, naam, status }];
    }
  }

  return verzameld;
};

export const useGemeenten = () => {
  const [gegevens, setGegevens] = useState<GemeentenMetRegelingen>();

  useEffect(() => {
    Promise.all([haalOp<Gemeenten>(GEMEENTEN), haalOp<Regelingen>(REGELINGEN)]).then(
      ([gemeenten, regelingen]) => setGegevens({ gemeenten, regelingenPerGemeente: perGemeente(regelingen) }),
      () => window.location.assign('/inloggen/'),
    );
  }, []);

  return gegevens;
};
