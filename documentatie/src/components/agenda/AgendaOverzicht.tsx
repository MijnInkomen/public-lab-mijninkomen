import { Alert, Heading } from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { Link } from '../Link';
import { AgendaItemWeergave } from './AgendaItemWeergave';
import { opDatum, vandaag } from './format';
import type { AgendaItem, Soort } from './types';
import { useAgenda } from './useAgenda';
import './agenda.css';

const Lijst = ({ items, soorten, leeg }: { items: AgendaItem[]; soorten: Soort[]; leeg: string }) =>
  items.length === 0 ? (
    <Paragraph className="mijninkomen-agenda__leeg">{leeg}</Paragraph>
  ) : (
    <>
      {items.map((item) => (
        <AgendaItemWeergave key={item.id} item={item} soorten={soorten} />
      ))}
    </>
  );

export const AgendaOverzicht = () => {
  const agenda = useAgenda();

  if (!agenda) return <Paragraph>De agenda wordt geladen…</Paragraph>;

  const vanaf = vandaag();
  const gesorteerd = [...agenda.items].sort(opDatum);
  const binnenkort = gesorteerd.filter(({ datum }) => datum >= vanaf);
  const geweest = gesorteerd.filter(({ datum }) => datum < vanaf).reverse();

  return (
    <>
      {agenda.voorbeelddata && (
        <Alert type="info">
          <Paragraph>Dit zijn voorbeeldbijeenkomsten. Meld je eigen bijeenkomst aan met het formulier.</Paragraph>
        </Alert>
      )}

      <Paragraph>{agenda.toelichting}</Paragraph>
      <Paragraph>
        <Link href="/agenda/aanmelden/">Een bijeenkomst aanmelden</Link>
      </Paragraph>

      <section aria-labelledby="agenda-binnenkort" className="mijninkomen-agenda__blok">
        <Heading level={2} id="agenda-binnenkort">
          Binnenkort
        </Heading>
        <Lijst items={binnenkort} soorten={agenda.soorten} leeg="Er staat nog geen bijeenkomst gepland." />
      </section>

      <section aria-labelledby="agenda-geweest" className="mijninkomen-agenda__blok">
        <Heading level={2} id="agenda-geweest">
          Geweest
        </Heading>
        <Lijst items={geweest} soorten={agenda.soorten} leeg="Er is nog geen bijeenkomst geweest." />
      </section>

      <section aria-labelledby="agenda-soorten" className="mijninkomen-agenda__blok">
        <Heading level={2} id="agenda-soorten">
          Soorten bijeenkomsten
        </Heading>
        <dl className="mijninkomen-agenda__soorten">
          {agenda.soorten.map(({ id, naam, uitleg }) => (
            <div key={id}>
              <dt>{naam}</dt>
              <dd>{uitleg}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
};
