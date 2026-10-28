/**
 * ButtonLink – een link die eruitziet als een NL Design System-knop
 *
 * De officiële NLDS Button (@nl-design-system-candidate/button-react) is altijd
 * een <button>: die is voor acties op dezelfde pagina. Een knop die je naar een
 * andere plek brengt, moet volgens de toegankelijkheidsregels een link (<a>) zijn.
 *
 * Daarom gebruiken we hier een gewone link met de officiële NLDS-klassen
 * (nl-button, nl-button--primary). Zo ziet hij er precies hetzelfde uit als de
 * NLDS Button, met dezelfde tokens uit tokens.css.
 */
import type { ReactNode } from 'react';
// Laadt de officiële NLDS-opmaak van de knop (de klassen nl-button...)
import '@nl-design-system-candidate/button-react/css';

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  purpose?: 'primary' | 'secondary';
};

export function ButtonLink({ href, children, purpose = 'primary' }: ButtonLinkProps) {
  return (
    <a className={`nl-button nl-button--${purpose}`} href={href}>
      <span className="nl-button__label">{children}</span>
    </a>
  );
}
