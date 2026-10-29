/**
 * PageFooter – eigen component (NL Design System heeft nog geen officiële
 * Page Footer; dit volgt het patroon "Page Footer" van de community)
 *
 * Onderaan elke pagina, licht zoals in het ontwerp.
 */
import { Link } from '@nl-design-system-candidate/link-react/css';
import { Logo } from '../Logo/Logo';
import './PageFooter.css';

export function PageFooter() {
  return (
    <footer className="mijninkomen-page-footer">
      <div className="mijninkomen-container mijninkomen-page-footer__inner">
        <div>
          <div className="mijninkomen-page-footer__logo">
            <Logo />
          </div>
          <p>Gemeenten werken samen aan betere inkomensondersteuning.</p>
        </div>

        <div>
          <h2 className="mijninkomen-page-footer__kop">Contact</h2>
          <p>Vragen over MijnInkomen?</p>
          <p>
            <Link href="/contact">Neem contact op</Link>
          </p>
          <p>
            <Link href="https://www.linkedin.com/">Volg ons op LinkedIn</Link>
          </p>
        </div>

        <nav aria-label="Footermenu">
          <h2 className="mijninkomen-page-footer__kop">Menu</h2>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/ontwikkelingen">Ontwikkelingen</Link></li>
            <li><Link href="/aansluiten">Aansluiten</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy">Privacyverklaring</Link></li>
          </ul>
        </nav>
      </div>
      <div className="mijninkomen-container">
        <p className="mijninkomen-page-footer__prototype">
          Dit is een prototype. De teksten zijn voorbeeldteksten.
        </p>
      </div>
    </footer>
  );
}
