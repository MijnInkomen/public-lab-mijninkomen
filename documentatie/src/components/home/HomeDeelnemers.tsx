import { Heading, PreHeading, SpotlightSection } from '@utrecht/component-library-react';
import { Image, Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { Card, CardGroup, CardIllustration } from '../CardGroup';
import { Link } from '../Link';
import { deelnemers } from './content';
import './home.css';

export const HomeDeelnemers = () => (
  <div className="container mijninkomen-sectie">
    <SpotlightSection className="mijninkomen-blok">
      <PreHeading>{deelnemers.bovenkop}</PreHeading>
      <Heading level={2}>{deelnemers.titel}</Heading>
      <CardGroup appearance="small">
        {deelnemers.gemeenten.map(({ naam, logo }) => (
          <Card key={naam} appearance="small">
            <CardIllustration>
              <Image src={logo} alt={naam} />
            </CardIllustration>
          </Card>
        ))}
      </CardGroup>
      <Paragraph>{deelnemers.tekst}</Paragraph>
      <Link href="/meer-weten">
        {deelnemers.link} <span aria-hidden="true">→</span>
      </Link>
    </SpotlightSection>
  </div>
);
