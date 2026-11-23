/**
 * ZijmenuPagina – pagina met een verticaal menu aan de linkerkant
 *
 * Voor de onderdelen met meer informatie (Ontwikkelingen en Meer weten).
 * Feedback van de opdrachtgever: een verticaal menu is overzichtelijker bij
 * veel informatie, en moet op alle pagina's van een onderdeel hetzelfde zijn.
 *
 * - Het menu is een <nav> met een eigen naam, zodat schermlezers het vinden.
 * - De huidige pagina krijgt aria-current="page" (via de NLDS Link, prop current).
 * - Op een detailpagina (bijv. /ontwikkelingen/project/stadspas) wordt het
 *   bovenliggende menu-item gemarkeerd met aria-current="true".
 * - Op een smal scherm staat het menu boven de inhoud.
 * - De naam van het onderdeel staat niet in het menu zelf, maar als vast kopje
 *   boven de titel van de pagina (keuze Isabella: overal dezelfde opbouw).
 *   Schermlezers horen de naam via aria-label op de <nav>.
 *
 * - Een menu-item kan subitems hebben: eigen pagina's binnen dat onderdeel, zoals
 *   in het menu van de NL Design System-website (keuze Isabella). Ze staan alleen
 *   open bij het onderdeel waar je bent, zodat het menu kort en rustig blijft.
 *   Het onderdeel krijgt dan aria-current="true", de subpagina aria-current="page".
 *
 * NLDS heeft (nog) geen officiële component voor een zijmenu; dit gebruikt de
 * officiële NLDS Link.
 */
import { Link } from '@nl-design-system-candidate/link-react/css';
import type { ReactNode } from 'react';
import { useHuidigPad } from '../../navigatie';
import './Zijmenu.css';

export type ZijmenuSubitem = { label: string; href: string };
/** apart: dit item staat los van de rest, met een lijn erboven (bijv. Account) */
export type ZijmenuItem = { label: string; href: string; sub?: ZijmenuSubitem[]; apart?: boolean };

type ZijmenuPaginaProps = {
  titel: string;
  items: ZijmenuItem[];
  /** Bij een detailpagina: welk menu-item hoort erbij? */
  actiefItem?: string;
  /**
   * 'pagina' (standaard, niveau 1): menu en inhoud samen in het midden van de pagina.
   * 'app' (niveau 2): menu helemaal tegen de linkerkant van het scherm, zoals in
   * een werkprogramma; de inhoud krijgt de rest van de breedte (keuze Isabella).
   */
  variant?: 'pagina' | 'app';
  children: ReactNode;
};

export function ZijmenuPagina({ titel, items, actiefItem, variant = 'pagina', children }: ZijmenuPaginaProps) {
  const pad = useHuidigPad();

  const menu = (
    <nav className="mijninkomen-zijmenu" aria-label={titel}>
        <ul>
          {items.map((item) => {
            // Zit je op een subpagina van dit item? Dan is het item 'true' en de subpagina 'page'
            const opSubpagina = item.sub?.some((sub) => sub.href === pad) ?? false;
            const huidig = opSubpagina
              ? 'true'
              : item.href === pad
                ? 'page'
                : item.href === actiefItem
                  ? 'true'
                  : undefined;
            return (
              <li key={item.href} className={item.apart ? 'mijninkomen-zijmenu__apart' : undefined}>
                <Link href={item.href} current={huidig}>
                  {item.label}
                </Link>
                {/* Subpagina's: alleen open bij het onderdeel waar je bent */}
                {huidig && item.sub && item.sub.length > 0 && (
                  <ul className="mijninkomen-zijmenu__sub">
                    {item.sub.map((sub) => (
                      <li key={sub.href}>
                        <Link href={sub.href} current={sub.href === pad ? 'page' : undefined}>
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
    </nav>
  );

  if (variant === 'app') {
    return (
      <div className="mijninkomen-zijmenu-app">
        {/* De lichtgroene balk loopt over de hele hoogte; het menu zelf blijft in beeld */}
        <div className="mijninkomen-zijmenu-app__zijkant">{menu}</div>
        <div className="mijninkomen-zijmenu-app__inhoud">{children}</div>
      </div>
    );
  }

  return (
    <div className="mijninkomen-container mijninkomen-zijmenu-pagina">
      {menu}
      <div className="mijninkomen-zijmenu-pagina__inhoud">{children}</div>
    </div>
  );
}
