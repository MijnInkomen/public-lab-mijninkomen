/**
 * Kruimelpad – laat zien waar de pagina in de site zit, bijvoorbeeld
 * Home › Meer weten › Webinar. Elke stap (behalve de huidige pagina) is een link,
 * zodat je makkelijk een niveau terug kunt.
 *
 * Waarom (UX-onderzoek Isabella):
 * - Heuristiek 1 van Nielsen: de bezoeker weet altijd waar hij is.
 * - Heuristiek 3 van Nielsen: je kunt makkelijk terug.
 * - WCAG 2.4.8 Locatie (AAA): meer dan de AA-eis van ons project.
 *
 * Toegankelijkheid (volgens de NLDS-richtlijnen voor Breadcrumb Navigation):
 * - Een <nav> met de naam "Kruimelpad", zodat schermlezers hem vinden.
 * - Een genummerde lijst (<ol>): de volgorde van de stappen telt.
 * - De huidige pagina krijgt aria-current="page" en is geen link.
 * - Het pijltje (›) is alleen versiering en wordt niet voorgelezen.
 *
 * NLDS heeft nog geen officiële (Candidate) component voor een kruimelpad;
 * dit gebruikt de officiële NLDS Link.
 * Op de homepage en in de communityomgeving (niveau 2) staat geen kruimelpad.
 */
import { Link } from '@nl-design-system-candidate/link-react/css';
import { kruimelsVoor } from '../../content/kruimelpad';
import './Kruimelpad.css';

export function Kruimelpad({ pad }: { pad: string }) {
  const kruimels = kruimelsVoor(pad);
  if (kruimels.length < 2) return null;

  return (
    <nav className="mijninkomen-container mijninkomen-kruimelpad" aria-label="Kruimelpad">
      <ol>
        {kruimels.map((kruimel, i) => {
          const laatste = i === kruimels.length - 1;
          return (
            <li key={kruimel.href}>
              {i > 0 && (
                <span className="mijninkomen-kruimelpad__pijl" aria-hidden="true">
                  ›
                </span>
              )}
              {laatste ? (
                <span aria-current="page">{kruimel.label}</span>
              ) : (
                <Link href={kruimel.href}>{kruimel.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
