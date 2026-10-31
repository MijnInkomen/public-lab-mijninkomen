import { useEffect, useState } from 'react';

let status: Promise<boolean> | undefined;

// Zonder Nginx, zoals bij `pnpm start`, geeft dit adres geen JSON en is niemand ingelogd.
const haalStatusOp = () =>
  (status ??= fetch('/oauth2/userinfo').then(
    (antwoord) => antwoord.ok && Boolean(antwoord.headers.get('content-type')?.includes('json')),
    () => false,
  ));

export const useIngelogd = () => {
  const [ingelogd, setIngelogd] = useState(false);

  useEffect(() => {
    haalStatusOp().then(setIngelogd);
  }, []);

  return ingelogd;
};
