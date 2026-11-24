import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { useEffect, useState } from 'react';
import { AgendaKaart } from './AgendaKaart';
import type { Vergaderingen } from './types';
import './vergaderingen.css';

// De inhoud staat bewust niet in de build: alles in de build is openbaar. Nginx geeft dit bestand alleen na inloggen vrij.
const haalVergaderingenOp = async (): Promise<Vergaderingen> => {
  const antwoord = await fetch('/community/vergaderingen.json');
  if (!antwoord.ok) throw new Error('Niet ingelogd');
  return antwoord.json();
};

export const OverlegAgendas = () => {
  const [vergaderingen, setVergaderingen] = useState<Vergaderingen>();

  useEffect(() => {
    haalVergaderingenOp().then(setVergaderingen, () => window.location.assign('/inloggen/'));
  }, []);

  if (!vergaderingen) return <Paragraph>De agenda&apos;s worden geladen…</Paragraph>;

  return (
    <div className="mijninkomen-agenda-kaarten">
      {vergaderingen.overleggen.map((overleg) => (
        <AgendaKaart key={overleg.id} {...overleg} />
      ))}
    </div>
  );
};
