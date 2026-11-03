import { Heading, PreHeading } from '@utrecht/component-library-react';
import { Link } from '../Link';
import { Badge } from './Badge';
import { datumKort, laatstBijgewerkt, recent } from './content';
import './home.css';

export const HomeRecent = () => (
  <div className="container mijninkomen-sectie">
    <PreHeading>{recent.bovenkop}</PreHeading>
    <Heading level={2}>
      {recent.titel} <Badge />
    </Heading>
    <ul className="mijninkomen-recent">
      {laatstBijgewerkt(recent.aantal).map(({ slug, naam, status, bijgewerkt }) => (
        <li key={slug}>
          <time dateTime={bijgewerkt}>{datumKort(bijgewerkt)}</time>
          <Link href={`/ontwikkelingen/project/${slug}`}>{naam}</Link>
          <span>
            <span className="sr-only">Status: </span>
            <Badge soort="status">{status}</Badge>
          </span>
        </li>
      ))}
    </ul>
    <Link href="/wat-kan-het">
      {recent.link} <span aria-hidden="true">→</span>
    </Link>
  </div>
);
