import { useEffect, useState } from 'react';

interface Gebruiker {
  groups?: string[];
}

let gebruiker: Promise<Gebruiker | null> | undefined;

// Zonder Nginx, zoals bij `pnpm start`, geeft dit adres geen JSON en is niemand ingelogd.
const haalGebruikerOp = () =>
  (gebruiker ??= fetch('/oauth2/userinfo').then(
    (antwoord) =>
      antwoord.ok && antwoord.headers.get('content-type')?.includes('json')
        ? (antwoord.json() as Promise<Gebruiker>)
        : null,
    () => null,
  ));

const useGebruiker = () => {
  const [huidigeGebruiker, setGebruiker] = useState<Gebruiker | null>(null);

  useEffect(() => {
    haalGebruikerOp().then(setGebruiker);
  }, []);

  return huidigeGebruiker;
};

export const useIngelogd = () => useGebruiker() !== null;

/** Alleen voor de weergave. Nginx en de API controleren de rol zelf. */
export const useIsAdmin = () => useGebruiker()?.groups?.includes('admin') ?? false;
