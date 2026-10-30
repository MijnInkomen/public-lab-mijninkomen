/**
 * Vaste opbouw van elke pagina onder "Ontwikkelingen":
 * zijmenu links, en rechts een bovenkop, de titel (h1) en een korte intro.
 * Teksten: content/ontwikkelingen.ts
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import type { ReactNode } from 'react';
import { ZijmenuPagina } from '../../components/Zijmenu/Zijmenu';
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
  return (
    <ZijmenuPagina titel={ontwikkelingenMenu.titel} items={ontwikkelingenMenu.items} actiefItem={actiefItem}>
      {boven}
      <p className="mijninkomen-bovenkop mijninkomen-bovenkop--groen">{ontwikkelingenMenu.titel}</p>
      <Heading level={1}>{titel}</Heading>
      <Paragraph purpose="lead">{tekst}</Paragraph>
      {children}
    </ZijmenuPagina>
  );
}
