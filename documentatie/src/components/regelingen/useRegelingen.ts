import { useEffect, useState } from 'react';
import type { Regelingen } from './types';

// De inhoud staat bewust niet in de build: alles in de build is openbaar. Nginx geeft dit bestand alleen na inloggen vrij.
const ADRES = '/community/regelingen.json';

const haalRegelingenOp = async (): Promise<Regelingen> => {
  const antwoord = await fetch(ADRES);
  if (!antwoord.ok) throw new Error('Niet ingelogd');
  return antwoord.json();
};

export const useRegelingen = () => {
  const [regelingen, setRegelingen] = useState<Regelingen>();

  useEffect(() => {
    haalRegelingenOp().then(setRegelingen, () => window.location.assign('/inloggen/'));
  }, []);

  return regelingen;
};
