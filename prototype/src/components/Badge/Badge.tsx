/**
 * Badge – klein label naast een kop of in een lijst
 *
 * Twee soorten:
 *   - "voorbeeld" → markeert inhoud die nog niet echt is (voorbeeldtekst)
 *   - "status"    → de status van een onderwerp, bijv. "In ontwikkeling"
 *
 * NLDS heeft hiervoor (nog) geen Candidate-component; vergelijkbaar met de
 * community-component "Status Badge". De betekenis staat altijd in de tekst
 * zelf, niet alleen in de kleur (WCAG 1.4.1).
 */
import type { ReactNode } from 'react';
import './Badge.css';

type BadgeProps = {
  soort?: 'voorbeeld' | 'status';
  children?: ReactNode;
};

export function Badge({ soort = 'voorbeeld', children }: BadgeProps) {
  return <span className={`mijninkomen-badge mijninkomen-badge--${soort}`}>{children ?? 'Voorbeeld'}</span>;
}
