/**
 * PAGINA "INLOGGEN"
 *
 * Inloggen is alleen voor communityleden (niveau 2). Dat staat bovenaan de
 * pagina. Wie nog geen lid is, vindt ernaast hoe je communitylid wordt, en wie
 * al een kennismakingsgesprek had, kan via een knop toegang aanvragen.
 * PROTOTYPE (keuze Isabella): de knop Inloggen werkt zonder dat je iets invult,
 * en brengt je meteen naar de communityomgeving (niveau 2, /community).
 * Bij de echte bouw komt hier een veilige login met tweestapsverificatie.
 * Teksten: content/inloggen.ts
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Link } from '@nl-design-system-candidate/link-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import { Badge } from '../components/Badge/Badge';
import { Button } from '@nl-design-system-candidate/button-react/css';
import type { FormEvent } from 'react';
import '../components/Formulier/Formulier.css';
import { Icon } from '../components/Icon/Icon';
import { KnopLink } from '../components/KnopLink/KnopLink';
import { geenLid, inlogFormulier, inloggenIntro } from '../content/inloggen';
import { navigeer } from '../navigatie';
import './Inloggen.css';

export function Inloggen() {
  // Prototype: niets controleren, meteen door naar de communityomgeving
  function inloggen(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigeer('/community');
  }

  return (
    <section className="mijninkomen-section" aria-labelledby="inloggen-titel">
      <div className="mijninkomen-container">
        <p className="mijninkomen-bovenkop mijninkomen-bovenkop--groen">{inloggenIntro.bovenkop}</p>
        <Heading level={1} id="inloggen-titel">{inloggenIntro.titel}</Heading>
        <Paragraph purpose="lead">{inloggenIntro.tekst}</Paragraph>

        <div className="mijninkomen-inloggen">
          {/* Het inlogformulier */}
          <div className="mijninkomen-kaart mijninkomen-inloggen__formulier">
            <p className="mijninkomen-inloggen__prototype">{inlogFormulier.prototype}</p>
            <form className="mijninkomen-formulier" onSubmit={inloggen} noValidate>
              <div className="mijninkomen-formulier__veld">
                <label htmlFor="inlog-email" className="mijninkomen-formulier__label">
                  E-mailadres
                </label>
                <p id="inlog-email-uitleg" className="mijninkomen-formulier__omschrijving">
                  Bijvoorbeeld: naam@gemeente.nl
                </p>
                <input id="inlog-email" name="email" type="email" autoComplete="username" aria-describedby="inlog-email-uitleg" className="mijninkomen-formulier__invoer" />
              </div>
              <div className="mijninkomen-formulier__veld">
                <label htmlFor="inlog-wachtwoord" className="mijninkomen-formulier__label">
                  Wachtwoord
                </label>
                <input id="inlog-wachtwoord" name="wachtwoord" type="password" autoComplete="current-password" className="mijninkomen-formulier__invoer" />
              </div>
              <Button type="submit" purpose="primary" iconEnd={<span aria-hidden="true">→</span>}>
                {inlogFormulier.knop}
              </Button>
            </form>
            {/* Tweestapsverificatie: werkt nog niet in het prototype */}
            <p className="mijninkomen-kaart__extra mijninkomen-inloggen__tweestaps">
              {inlogFormulier.tweestaps} <Badge />
            </p>
          </div>

          {/* Voor wie nog geen lid is: hoe word je communitylid, en toegang aanvragen */}
          <aside className="mijninkomen-inloggen__geen-lid" aria-labelledby="geen-lid-titel">
            <Icon naam="mensen" />
            <Heading level={2} appearance="level-3" id="geen-lid-titel">{geenLid.titel}</Heading>
            <Paragraph>{geenLid.tekst}</Paragraph>
            <p>
              <Link href="/meer-weten/communitylid">
                {geenLid.link} <span aria-hidden="true">→</span>
              </Link>
            </p>
            {/* Knop om toegang aan te vragen, voor wie al een kennismakingsgesprek had */}
            <div className="mijninkomen-inloggen__toegang">
              <Heading level={2} appearance="level-3">{geenLid.toegangTitel}</Heading>
              <Paragraph>{geenLid.toegangTekst}</Paragraph>
              <KnopLink href="/toegang-aanvragen" purpose="secondary">
                {geenLid.toegangKnop}
              </KnopLink>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
