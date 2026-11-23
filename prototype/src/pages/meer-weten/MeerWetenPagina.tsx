/**
 * Vaste opbouw van elke pagina onder "Meer weten":
 * zijmenu tegen de linkerkant (net als niveau 2, keuze Isabella: overal hetzelfde),
 * en rechts het kruimelpad, een bovenkop, de titel (h1) en een korte intro.
 * Teksten: content/meer-weten.ts
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import type { ReactNode } from 'react';
import { Kruimelpad } from '../../components/Kruimelpad/Kruimelpad';
import { ZijmenuPagina } from '../../components/Zijmenu/Zijmenu';
import { useHuidigPad } from '../../navigatie';
import { meerWetenMenu } from '../../content/meer-weten';

export function MeerWetenPagina({ titel, tekst, children }: { titel: ReactNode; tekst: string; children: ReactNode }) {
  const pad = useHuidigPad();
  return (
    <ZijmenuPagina titel={meerWetenMenu.titel} items={meerWetenMenu.items} variant="app">
      <Kruimelpad pad={pad} inPagina />
      <p className="mijninkomen-bovenkop mijninkomen-bovenkop--groen">{meerWetenMenu.titel}</p>
      <Heading level={1}>{titel}</Heading>
      <Paragraph purpose="lead">{tekst}</Paragraph>
      {children}
    </ZijmenuPagina>
  );
}
