/**
 * PAGINA "INLOGGEN"
 *
 * Inloggen is alleen voor communityleden (niveau 2). Dat staat bovenaan de
 * pagina. Wie nog geen lid is, vindt ernaast een duidelijke link naar Aansluiten.
 * PROTOTYPE: inloggen werkt nog niet; het formulier controleert alleen de velden.
 * Teksten: content/inloggen.ts
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Link } from '@nl-design-system-candidate/link-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import { Formulier, type Veld } from '../components/Formulier/Formulier';
import { Icon } from '../components/Icon/Icon';
import { geenLid, inlogFormulier, inloggenIntro } from '../content/inloggen';
import './Inloggen.css';

const velden: Veld[] = [
  { naam: 'email', label: 'E-mailadres', soort: 'email', autoComplete: 'username', omschrijving: 'Bijvoorbeeld: naam@gemeente.nl', fout: 'Vul je e-mailadres in.' },
  { naam: 'wachtwoord', label: 'Wachtwoord', soort: 'wachtwoord', autoComplete: 'current-password', fout: 'Vul je wachtwoord in.' },
];

export function Inloggen() {
  return (
    <section className="mijninkomen-section" aria-labelledby="inloggen-titel">
      <div className="mijninkomen-container">
        <p className="mijninkomen-bovenkop mijninkomen-bovenkop--groen">{inloggenIntro.bovenkop}</p>
        <Heading level={1} id="inloggen-titel">{inloggenIntro.titel}</Heading>
        <Paragraph purpose="lead">{inloggenIntro.tekst}</Paragraph>

        <div className="mijninkomen-inloggen">
          {/* Het inlogformulier */}
          <div className="mijninkomen-kaart mijninkomen-inloggen__formulier">
            <Heading level={2} appearance="level-3">{inlogFormulier.titel}</Heading>
            <Formulier velden={velden} knop={inlogFormulier.knop} bevestiging={inlogFormulier.bevestiging} uitleg={inlogFormulier.uitleg} />
          </div>

          {/* Voor wie nog geen lid is: door naar Aansluiten */}
          <aside className="mijninkomen-inloggen__geen-lid" aria-labelledby="geen-lid-titel">
            <Icon naam="mensen" />
            <Heading level={2} appearance="level-3" id="geen-lid-titel">{geenLid.titel}</Heading>
            <Paragraph>{geenLid.tekst}</Paragraph>
            <p>
              <Link href="/aansluiten">
                {geenLid.link} <span aria-hidden="true">→</span>
              </Link>
            </p>
            <p className="mijninkomen-inloggen__vraag">
              {geenLid.vraag} <Link href="/contact">{geenLid.contact}</Link>
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
