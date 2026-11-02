import { Card } from '@utrecht/card-react/css';
import { Heading, PreHeading } from '@utrecht/component-library-react';
import { waarom } from './content';
import './home.css';

export const HomeWaaromSamen = () => (
  <div className="container mijninkomen-sectie">
    <PreHeading>{waarom.bovenkop}</PreHeading>
    <Heading level={2}>{waarom.titel}</Heading>
    <ul className="ma-homepage-card-group mijninkomen-voordelen">
      {waarom.punten.map(({ icoon: Icoon, titel, tekst }) => (
        <li key={titel}>
          <Card
            body={tekst}
            heading={titel}
            headingLevel={3}
            Link="span"
            image={
              <span className="mijninkomen-icoon" aria-hidden="true">
                <Icoon size={28} stroke={1.7} />
              </span>
            }
          />
        </li>
      ))}
    </ul>
  </div>
);
