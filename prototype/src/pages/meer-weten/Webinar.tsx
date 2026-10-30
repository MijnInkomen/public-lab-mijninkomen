/**
 * MEER WETEN › Webinar
 * Uitleg over het webinar, de eerstvolgende data, en een klein formulier om je
 * aan te melden. Het formulier klapt open met een knop (aria-expanded).
 * Data: content/webinars.ts
 */
import { Button } from '@nl-design-system-candidate/button-react/css';
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { useState } from 'react';
import { Badge } from '../../components/Badge/Badge';
import { Formulier, PrivacyRegel, type Veld } from '../../components/Formulier/Formulier';
import { webinar } from '../../content/meer-weten';
import { datumVoluit, komendeWebinars, webinarTijd } from '../../content/webinars';
import { MeerWetenPagina } from './MeerWetenPagina';

function webinarVelden(): Veld[] {
  return [
    { naam: 'naam', label: 'Naam', soort: 'tekst', autoComplete: 'name', fout: 'Vul je naam in.' },
    { naam: 'email', label: 'E-mailadres', soort: 'email', autoComplete: 'email', omschrijving: 'Bijvoorbeeld: naam@gemeente.nl', fout: 'Vul je e-mailadres in.' },
    { naam: 'organisatie', label: 'Gemeente of organisatie', soort: 'tekst', autoComplete: 'organization', fout: 'Vul je gemeente of organisatie in.' },
    {
      naam: 'datum',
      label: 'Welk webinar wil je volgen?',
      soort: 'keuzelijst',
      kies: 'Kies een datum',
      opties: komendeWebinars().map((d) => ({ waarde: d, label: datumVoluit(d) })),
      fout: 'Kies een datum voor het webinar.',
    },
  ];
}

export function Webinar() {
  const [toonFormulier, setToonFormulier] = useState(false);
  const komend = komendeWebinars().slice(0, 3);

  return (
    <MeerWetenPagina titel={webinar.titel} tekst={webinar.tekst}>
      <Heading level={2}>{webinar.leerTitel}</Heading>
      <ul className="mijninkomen-lijst">
        {webinar.leer.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      <dl className="mijninkomen-gegevens">
        <dt>{webinar.wanneer}</dt>
        <dd>
          {webinarTijd} <Badge />
        </dd>
        <dt>{webinar.data}</dt>
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

      <Button
        purpose={toonFormulier ? 'secondary' : 'primary'}
        aria-expanded={toonFormulier}
        aria-controls="webinar-formulier"
        onClick={() => setToonFormulier((v) => !v)}
      >
        {toonFormulier ? webinar.sluiten : webinar.knop}
      </Button>
      <div id="webinar-formulier" hidden={!toonFormulier} className="mijninkomen-kaart mijninkomen-formulierkaart mijninkomen-webinar-formulier">
        <PrivacyRegel />
        <Formulier
          velden={webinarVelden()}
          knop="Aanmelden"
          bevestiging="Bedankt voor je aanmelding! Dit is een prototype: je aanmelding is niet echt verstuurd en er zijn geen gegevens opgeslagen."
        />
      </div>
    </MeerWetenPagina>
  );
}
