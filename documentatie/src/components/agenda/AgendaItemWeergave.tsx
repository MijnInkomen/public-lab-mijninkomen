import { Heading } from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { Badge } from '../home/Badge';
import { Link } from '../Link';
import { datumVoluit, soortNaam } from './format';
import type { AgendaItem, Soort } from './types';

/**
 * De enige weergave van een agenda-item. De agenda en het formulier gebruiken allebei dit component,
 * zodat een aangemeld item er precies zo uitziet als een item dat al in de agenda staat.
 */
export const AgendaItemWeergave = ({
  item,
  soorten,
  niveau = 3,
}: {
  item: AgendaItem;
  soorten: Soort[];
  niveau?: 3 | 4;
}) => (
  <article className="mijninkomen-agenda__item">
    <Heading level={niveau}>{item.titel}</Heading>
    <Paragraph className="mijninkomen-agenda__wanneer">
      <Badge soort="status">{soortNaam(soorten, item.soort)}</Badge>{' '}
      <time dateTime={`${item.datum}T${item.begintijd}`}>{datumVoluit(item.datum)}</time>, {item.begintijd}–
      {item.eindtijd}
    </Paragraph>
    <Paragraph>{item.omschrijving}</Paragraph>
    <dl className="mijninkomen-agenda__gegevens">
      <div>
        <dt>Waar</dt>
        <dd>{item.locatie}</dd>
      </div>
      <div>
        <dt>Voor wie</dt>
        <dd>{item.voorWie}</dd>
      </div>
      <div>
        <dt>Organisator</dt>
        <dd>
          {item.organisator.wie} (<Link href={`mailto:${item.organisator.email}`}>{item.organisator.email}</Link>)
        </dd>
      </div>
      {item.aanmelden && (
        <div>
          <dt>Aanmelden</dt>
          <dd>
            <Link href={item.aanmelden}>Meld je aan</Link>
          </dd>
        </div>
      )}
    </dl>
  </article>
);
