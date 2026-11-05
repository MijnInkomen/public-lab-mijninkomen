/**
 * Vaste opbouw van elke pagina in de communityomgeving (niveau 2):
 * verticaal zijmenu links, en rechts het vaste kopje "Communityomgeving",
 * de titel (h1) en een korte intro. Zelfde opbouw als op niveau 1, zodat
 * schermlezergebruikers zich meteen thuis voelen.
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import type { ReactNode } from 'react';
import { ZijmenuPagina } from '../../components/Zijmenu/Zijmenu';
import { communityMenu } from '../../content/community';
import './community.css';

export function CommunityPagina({ titel, tekst, children }: { titel: string; tekst: string; children: ReactNode }) {
  return (
    <ZijmenuPagina titel={communityMenu.titel} items={communityMenu.items} variant="app">
      <p className="mijninkomen-bovenkop mijninkomen-bovenkop--groen">{communityMenu.titel}</p>
      <Heading level={1}>{titel}</Heading>
      <Paragraph purpose="lead">{tekst}</Paragraph>
      {children}
    </ZijmenuPagina>
  );
}

/** Een tabel die op een smal scherm opzij kan scrollen (ook met het toetsenbord) */
export function TabelVak({ label, children }: { label: string; children: ReactNode }) {
  return (
    // tabIndex en role="region": toetsenbordgebruikers kunnen de tabel opzij scrollen (WCAG 2.1.1)
    <div className="mijninkomen-tabel-vak" role="region" aria-label={label} tabIndex={0}>
      {children}
    </div>
  );
}

/** Een datum als "12 november 2026" */
export function Datum({ iso }: { iso: string }) {
  const tekst = new Date(`${iso}T12:00:00`).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
  return <time dateTime={iso}>{tekst}</time>;
}
