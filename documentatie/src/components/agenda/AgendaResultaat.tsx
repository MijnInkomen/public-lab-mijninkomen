import { Button, Heading } from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { useState } from 'react';
import { AgendaItemWeergave } from './AgendaItemWeergave';
import type { Invoer } from './AgendaFormulier';
import type { AgendaItem, Soort } from './types';

/** Maakt van de titel een id voor in het bestand, bijvoorbeeld "Webinar: aansluiten" wordt "webinar-aansluiten". */
const maakId = (titel: string) =>
  titel
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);

export const maakItem = (invoer: Invoer): AgendaItem => {
  const schoon = (waarde: string) => waarde.trim();
  const aanmelden = schoon(invoer.aanmelden);

  return {
    id: maakId(invoer.titel),
    titel: schoon(invoer.titel),
    soort: invoer.soort,
    datum: invoer.datum,
    begintijd: invoer.begintijd,
    eindtijd: invoer.eindtijd,
    locatie: schoon(invoer.locatie),
    voorWie: schoon(invoer.voorWie),
    omschrijving: schoon(invoer.omschrijving),
    organisator: { wie: schoon(invoer.organisator), email: schoon(invoer.email).toLowerCase() },
    aanmelden: aanmelden || null,
  };
};

const Kopieerknop = ({ tekst }: { tekst: string }) => {
  const [gekopieerd, setGekopieerd] = useState(false);

  // Kopiëren kan de browser weigeren; dan blijft de tekst gewoon te selecteren.
  const kopieer = () =>
    navigator.clipboard?.writeText(tekst).then(
      () => setGekopieerd(true),
      () => setGekopieerd(false),
    );

  return (
    <>
      <Button appearance="secondary-action-button" onClick={kopieer}>
        Kopieer het agenda-item
      </Button>
      <span role="status" className="mijninkomen-agenda__gekopieerd">
        {gekopieerd ? 'Gekopieerd.' : ''}
      </span>
    </>
  );
};

export const AgendaResultaat = ({ invoer, soorten }: { invoer: Invoer; soorten: Soort[] }) => {
  const item = maakItem(invoer);
  const json = JSON.stringify(item, null, 2);

  return (
    <section aria-labelledby="agenda-resultaat" className="mijninkomen-agenda__resultaat">
      <Heading level={2} id="agenda-resultaat">
        Je agenda-item
      </Heading>
      <Paragraph>Zo komt de bijeenkomst in de agenda te staan:</Paragraph>
      <AgendaItemWeergave item={item} soorten={soorten} niveau={3} />

      <Heading level={3}>Doorgeven aan het programmateam</Heading>
      <Paragraph>
        Kopieer het blok hieronder en mail het naar het programmateam, of zet het zelf in{' '}
        <code>community/agenda.json</code>. Het staat al in het format dat de agenda gebruikt.
      </Paragraph>
      <pre className="mijninkomen-agenda__json">
        <code>{json}</code>
      </pre>
      <Kopieerknop tekst={json} />
    </section>
  );
};
