/**
 * KnopLink – een link die eruitziet als een NLDS-knop
 *
 * Gaat iets naar een andere pagina, dan hoort daar een link (<a>) bij en geen
 * knop (<button>). De officiële NLDS Button is altijd een <button>. Daarom
 * gebruikt KnopLink een <a> met de klassen van de NLDS Button (nl-button), zodat
 * hij er hetzelfde uitziet.
 *
 * Gebruik: <KnopLink href="/ontwikkelingen">Bekijk de ontwikkelingen</KnopLink>
 *          <KnopLink href="/meer-weten" purpose="secondary">Meer weten</KnopLink>
 */
import type { AnchorHTMLAttributes, ReactNode } from 'react';
// Alleen de opmaak van de NLDS Button laden
import '@nl-design-system-candidate/button-react/css';
import './KnopLink.css';

type KnopLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  purpose?: 'primary' | 'secondary';
  children: ReactNode;
};

export function KnopLink({ href, purpose = 'primary', className, children, ...rest }: KnopLinkProps) {
  return (
    <a href={href} className={`nl-button nl-button--${purpose} mijninkomen-knoplink ${className ?? ''}`.trim()} {...rest}>
      <span className="nl-button__label">{children}</span>
    </a>
  );
}
