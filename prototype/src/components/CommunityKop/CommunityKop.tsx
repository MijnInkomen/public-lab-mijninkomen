/**
 * CommunityKop en CommunityVoet – kop en voet van niveau 2 (de communityomgeving)
 *
 * Anders dan op de openbare website (niveau 1):
 * - geen horizontaal hoofdmenu: niveau 2 heeft een verticaal zijmenu (keuze Isabella)
 * - rechts staat alleen de knop Uitloggen. Wie er is ingelogd, staat op de
 *   pagina Account in het zijmenu (keuze Isabella: rustigere kop)
 * - een gele balk zegt dat alle gegevens voorbeelden zijn (prototype)
 * Het logo en het streepje zijn hetzelfde als op niveau 1, zodat je ziet dat het
 * dezelfde organisatie is. Kop en voet gaan over de hele breedte van het scherm,
 * net als het zijmenu (variant 'app').
 */
import { Link } from '@nl-design-system-candidate/link-react/css';
import { prototypeMelding } from '../../content/community';
import { KnopLink } from '../KnopLink/KnopLink';
import { Logo } from '../Logo/Logo';
import '../PageHeader/PageHeader.css';
import '../PageFooter/PageFooter.css';
import './CommunityKop.css';

export function CommunityKop() {
  return (
    <header className="mijninkomen-page-header mijninkomen-page-header--community">
      <div className="mijninkomen-container mijninkomen-container--breed mijninkomen-page-header__inner">
        <a className="mijninkomen-page-header__logo" href="/community">
          <Logo />
        </a>
        <p className="mijninkomen-community-kop__label">Communityomgeving</p>

        <div className="mijninkomen-community-kop__gebruiker">
          {/* Uitloggen gaat terug naar de openbare website */}
          <KnopLink href="/" purpose="secondary">
            Uitloggen
          </KnopLink>
        </div>
      </div>

      {/* Decoratie, dus verborgen voor schermlezers */}
      <div className="mijninkomen-container mijninkomen-container--breed" aria-hidden="true">
        <div className="mijninkomen-stripe">
          <span className="mijninkomen-stripe__deel mijninkomen-stripe__deel--1" />
          <span className="mijninkomen-stripe__deel mijninkomen-stripe__deel--2" />
          <span className="mijninkomen-stripe__deel mijninkomen-stripe__deel--3" />
          <span className="mijninkomen-stripe__deel mijninkomen-stripe__deel--4" />
        </div>
      </div>

      <div className="mijninkomen-container mijninkomen-container--breed">
        <p className="mijninkomen-community-kop__melding">
          <span className="mijninkomen-community-kop__icoon" aria-hidden="true">
            i
          </span>
          {prototypeMelding}
        </p>
      </div>
    </header>
  );
}

export function CommunityVoet() {
  return (
    <footer className="mijninkomen-page-footer mijninkomen-page-footer--community">
      <div className="mijninkomen-container mijninkomen-container--breed mijninkomen-community-voet">
        <p>Communityomgeving van MijnInkomen. Alleen voor communityleden.</p>
        <p>
          <Link href="/">Naar de openbare website</Link>
        </p>
      </div>
    </footer>
  );
}
