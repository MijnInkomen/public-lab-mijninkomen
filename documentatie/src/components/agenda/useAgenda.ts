import { useEffect, useState } from 'react';
import type { Agenda } from './types';

// De inhoud staat bewust niet in de build: alles in de build is openbaar. Nginx geeft dit bestand alleen na inloggen vrij.
const ADRES = '/community/agenda.json';

const haalAgendaOp = async (): Promise<Agenda> => {
  const antwoord = await fetch(ADRES);
  if (!antwoord.ok) throw new Error('Niet ingelogd');
  return antwoord.json();
};

export const useAgenda = () => {
  const [agenda, setAgenda] = useState<Agenda>();

  useEffect(() => {
    haalAgendaOp().then(setAgenda, () => window.location.assign('/inloggen/'));
  }, []);

  return agenda;
};
