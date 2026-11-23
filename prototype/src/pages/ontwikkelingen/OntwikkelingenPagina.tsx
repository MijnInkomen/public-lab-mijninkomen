/**
 * Vaste opbouw van elke pagina onder "Ontwikkelingen":
 * zijmenu tegen de linkerkant (net als niveau 2, keuze Isabella: overal hetzelfde),
 * en rechts het kruimelpad, een bovenkop, de titel (h1) en een korte intro.
 * Teksten: content/ontwikkelingen.ts
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import type { ReactNode } from 'react';
import { Kruimelpad } from '../../components/Kruimelpad/Kruimelpad';
import { ZijmenuPagina } from '../../components/Zijmenu/Zijmenu';
import { useHuidigPad } from '../../navigatie';
import { ontwikkelingenMenu } from '../../content/ontwikkelingen';
import './ontwikkelingen.css';

type Props = {
  titel: ReactNode;
  tekst: string;
  /** Bij een detailpagina: het menu-item waar hij onder valt */
  actiefItem?: string;
  /** Iets boven de bovenkop, bijv. een terug-link */
  boven?: ReactNode;
  children: ReactNode;
};

export function OntwikkelingenPagina({ titel, tekst, actiefItem, boven, children }: Props) {
  const pad = useHuidigPad();
  return (
    <ZijmenuPagina titel={ontwikkelingenMenu.titel} items={ontwikkelingenMenu.items} variant="app" actiefItem={actiefItem}>
      <Kruimelpad pad={pad} inPagina />
      {boven}
      <p className="mijninkomen-bovenkop mijninkomen-bovenkop--groen">{ontwikkelingenMenu.titel}</p>
      <Heading level={1}>{titel}</Heading>
      <Paragraph purpose="lead">{tekst}</Paragraph>
      {children}
    </ZijmenuPagina>
  );
}
