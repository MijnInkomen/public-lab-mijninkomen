import { Heading } from '@utrecht/component-library-react';
import type { Overleg } from './types';

export const AgendaKaart = ({ id, naam, wie, hoeVaak, volgendeKeer, agenda }: Overleg) => (
  <article aria-labelledby={`overleg-${id}`} className="mijninkomen-agenda-kaart">
    <Heading level={3} id={`overleg-${id}`}>
      {naam}
    </Heading>
    <dl className="mijninkomen-agenda-kaart__gegevens">
      <dt>Wie</dt>
      <dd>{wie}</dd>
      <dt>Hoe vaak</dt>
      <dd>{hoeVaak}</dd>
      <dt>Volgende keer</dt>
      <dd>{volgendeKeer}</dd>
    </dl>
    <Heading level={4}>Vaste agenda</Heading>
    <ol className="mijninkomen-agenda-kaart__agenda">
      {agenda.map((punt) => (
        <li key={punt}>{punt}</li>
      ))}
    </ol>
  </article>
);
