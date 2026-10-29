/**
 * PAGINA "AANSLUITEN" (niveau 1, versie 2)
 *
 * Eerlijk uitleggen wat meedoen inhoudt en in welke volgorde het gaat, zonder
 * aan te dringen. Blokken:
 *   Wat houdt aansluiten in? · Spelregels · Zo werkt het (3 stappen) ·
 *   Stap 1 webinar (met aanmeldformulier) · Stap 2 formulier · Stap 3 daarna
 *
 * Het aanmeldformulier (stap 2) kan alleen worden verstuurd met de datum van
 * een gevolgd webinar: zo blijft de volgorde webinar → formulier hard.
 * Teksten: content/aansluiten.ts en content/webinars.ts
 */
import { Button } from '@nl-design-system-candidate/button-react/css';
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Link } from '@nl-design-system-candidate/link-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import { useState } from 'react';
import { Badge } from '../components/Badge/Badge';
import { Formulier, type Veld } from '../components/Formulier/Formulier';
import { GemeentehuisIllustratie } from '../components/Illustration/SamenwerkenIllustraties';
import { aansluitenIntro, naarContact, spelregels, stap1, stap2, stap3, stappen, watHoudtHetIn } from '../content/aansluiten';
import { datumVoluit, geweestWebinars, komendeWebinars, webinarTijd } from '../content/webinars';
import './Aansluiten.css';

const PRIVACY_TEKST = 'Dit formulier vraagt om persoonsgegevens. Lees hoe we daarmee omgaan in de';

function webinarVelden(): Veld[] {
  return [
    { naam: 'naam', label: 'Naam', soort: 'tekst', autoComplete: 'name', fout: 'Vul je naam in.' },
    { naam: 'email', label: 'E-mailadres', soort: 'email', autoComplete: 'email', omschrijving: 'Bijvoorbeeld: naam@gemeente.nl', fout: 'Vul je e-mailadres in.' },
    { naam: 'organisatie', label: 'Gemeente of organisatie', soort: 'tekst', autoComplete: 'organization', fout: 'Vul je gemeente of organisatie in.' },
    {
      naam: 'datum',
      label: 'Welk webinar wil je volgen?',
      soort: 'keuzelijst',
      opties: komendeWebinars().map((d) => ({ waarde: d, label: datumVoluit(d) })),
      fout: 'Kies een datum voor het webinar.',
    },
  ];
}

function aanmeldVelden(): Veld[] {
  return [
    { naam: 'naam', label: 'Naam', soort: 'tekst', autoComplete: 'name', fout: 'Vul je naam in.' },
    { naam: 'organisatie', label: 'Gemeente of organisatie', soort: 'tekst', autoComplete: 'organization', fout: 'Vul je gemeente of organisatie in.' },
    { naam: 'functie', label: 'Functie', soort: 'tekst', autoComplete: 'organization-title', fout: 'Vul je functie in.' },
    { naam: 'email', label: 'E-mailadres', soort: 'email', autoComplete: 'email', omschrijving: 'Bijvoorbeeld: naam@gemeente.nl', fout: 'Vul je e-mailadres in.' },
    {
      naam: 'webinar',
      label: 'Welk webinar heb je gevolgd?',
      omschrijving: 'Je kunt dit formulier pas versturen als je een webinar hebt gevolgd.',
      soort: 'keuzelijst',
      opties: geweestWebinars().map((d) => ({ waarde: d, label: datumVoluit(d) })),
      fout: 'Kies de datum van het webinar dat je hebt gevolgd. Nog geen webinar gevolgd? Meld je dan eerst aan bij stap 1.',
    },
    {
      naam: 'interesse',
      label: 'Waar heb je interesse in?',
      soort: 'aanvinken',
      opties: [
        { waarde: 'gebruiken', label: 'MijnInkomen gebruiken' },
        { waarde: 'community', label: 'Meedenken in de community' },
        { waarde: 'initiatief', label: 'Een eigen initiatief melden' },
      ],
      fout: 'Kies minstens één onderwerp waar je interesse in hebt.',
    },
    { naam: 'toelichting', label: 'Toelichting', soort: 'tekstvak', verplicht: false },
  ];
}

function PrivacyRegel() {
  return (
    <p className="mijninkomen-aansluiten__privacy">
      {PRIVACY_TEKST} <Link href="/privacy">privacyverklaring</Link>.
    </p>
  );
}

export function Aansluiten() {
  const [toonWebinarFormulier, setToonWebinarFormulier] = useState(false);
  const komend = komendeWebinars().slice(0, 3);

  return (
    <>
      <section className="mijninkomen-pagina-intro" aria-labelledby="aansl-titel">
        <div className="mijninkomen-container mijninkomen-pagina-intro__inner">
          <div>
            <p className="mijninkomen-bovenkop mijninkomen-bovenkop--groen">{aansluitenIntro.bovenkop}</p>
            <Heading level={1} id="aansl-titel">{aansluitenIntro.titel}</Heading>
            <Paragraph purpose="lead">{aansluitenIntro.tekst}</Paragraph>
          </div>
          <div className="mijninkomen-pagina-intro__beeld">
            <GemeentehuisIllustratie />
          </div>
        </div>
      </section>

      {/* WAT HOUDT AANSLUITEN IN */}
      <section className="mijninkomen-section" aria-labelledby="inhoud-titel">
        <div className="mijninkomen-container">
          <Heading level={2} id="inhoud-titel">{watHoudtHetIn.titel}</Heading>
          <div className="mijninkomen-aansluiten__twee">
            {[watHoudtHetIn.oplevert, watHoudtHetIn.vraagt].map((blok) => (
              <div key={blok.titel} className="mijninkomen-kaart">
                <Heading level={3}>{blok.titel}</Heading>
                <ul className="mijninkomen-lijst">
                  {blok.lijst.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPELREGELS */}
      <section className="mijninkomen-section mijninkomen-section--licht" aria-labelledby="spelregels-titel">
        <div className="mijninkomen-container">
          <Heading level={2} id="spelregels-titel">
            {spelregels.titel} <Badge />
          </Heading>
          <ul className="mijninkomen-lijst mijninkomen-aansluiten__spelregels">
            {spelregels.lijst.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ZO WERKT HET: DRIE STAPPEN */}
      <section className="mijninkomen-section" aria-labelledby="stappen-titel">
        <div className="mijninkomen-container">
          <Heading level={2} id="stappen-titel">{stappen.titel}</Heading>
          {/* Genummerde lijst: de volgorde is hier echt belangrijk */}
          <ol className="mijninkomen-stappen">
            {stappen.lijst.map((s) => (
              <li key={s.titel} className="mijninkomen-stappen__stap">
                <Heading level={3}>{s.titel}</Heading>
                <Paragraph>{s.tekst}</Paragraph>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* STAP 1: WEBINAR */}
      <section id="webinar" className="mijninkomen-container mijninkomen-section--smal" aria-labelledby="stap1-titel">
        <div className="mijninkomen-kaart mijninkomen-aansluiten__stap">
          <Heading level={2} id="stap1-titel">{stap1.titel}</Heading>
          <Paragraph>{stap1.tekst}</Paragraph>
          <ul className="mijninkomen-lijst">
            {stap1.leer.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <Paragraph>{stap1.vragen}</Paragraph>
          <dl className="mijninkomen-aansluiten__gegevens">
            <dt>{stap1.wanneer}</dt>
            <dd>
              {webinarTijd} <Badge />
            </dd>
            <dt>{stap1.data}</dt>
            <dd>
              <ul className="mijninkomen-lijst">
                {komend.map((d) => (
                  <li key={d}>
                    <time dateTime={d}>{datumVoluit(d)}</time>
                  </li>
                ))}
              </ul>
            </dd>
          </dl>

          {/* De knop klapt het aanmeldformulier open of dicht (aria-expanded) */}
          <Button
            purpose={toonWebinarFormulier ? 'secondary' : 'primary'}
            aria-expanded={toonWebinarFormulier}
            aria-controls="webinar-formulier"
            onClick={() => setToonWebinarFormulier((v) => !v)}
          >
            {toonWebinarFormulier ? stap1.sluiten : stap1.knop}
          </Button>
          <div id="webinar-formulier" hidden={!toonWebinarFormulier} className="mijninkomen-aansluiten__webinarformulier">
            <PrivacyRegel />
            <Formulier
              velden={webinarVelden()}
              knop="Aanmelden"
              bevestiging="Bedankt voor je aanmelding! Dit is een prototype: je aanmelding is niet echt verstuurd en er zijn geen gegevens opgeslagen."
            />
          </div>
        </div>
      </section>

      {/* STAP 2: FORMULIER */}
      <section id="formulier" className="mijninkomen-container mijninkomen-section--smal" aria-labelledby="stap2-titel">
        <div className="mijninkomen-kaart mijninkomen-aansluiten__stap">
          <Heading level={2} id="stap2-titel">{stap2.titel}</Heading>
          {/* Goed zichtbaar boven het formulier: eerst het webinar */}
          <div className="mijninkomen-aansluiten__let-op" role="note">
            <span className="mijninkomen-aansluiten__let-op-icoon" aria-hidden="true">
              i
            </span>
            <p>
              {stap2.let} <Link href="#webinar">{stap2.naarStap1}</Link>
            </p>
          </div>
          <PrivacyRegel />
          <Formulier
            velden={aanmeldVelden()}
            knop="Verstuur"
            bevestiging="Bedankt! Dit is een prototype: het formulier is niet echt verstuurd en er zijn geen gegevens opgeslagen. Hieronder lees je wat er bij een echte aanmelding daarna gebeurt."
          />
        </div>
      </section>

      {/* STAP 3: DAARNA */}
      <section className="mijninkomen-container mijninkomen-section--smal" aria-labelledby="stap3-titel">
        <div className="mijninkomen-kaart mijninkomen-aansluiten__stap">
          <Heading level={2} id="stap3-titel">
            {stap3.titel} <Badge />
          </Heading>
          {stap3.tekst.map((t) => (
            <Paragraph key={t}>{t}</Paragraph>
          ))}
        </div>
      </section>

      <div className="mijninkomen-container mijninkomen-doorverwijzing">
        <p>
          {naarContact.tekst}{' '}
          <Link href="/contact">
            {naarContact.link} <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </>
  );
}
