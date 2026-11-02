import { ButtonLink, Heading, PreHeading, SpotlightSection } from '@utrecht/component-library-react';
import { ButtonGroup as ActionGroup, Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { wat } from './content';
import './home.css';

export const HomeIntroductie = () => (
  <SpotlightSection className="ma-homepage-spotlight-section">
    <div className="container mijninkomen-hero">
      <div>
        <PreHeading>{wat.bovenkop}</PreHeading>
        <Heading level={1}>{wat.titel}</Heading>
        <Paragraph appearance="lead">{wat.tekst[0]}</Paragraph>
        <Paragraph>{wat.tekst[1]}</Paragraph>
        <ActionGroup>
          <ButtonLink href="/ontwikkelingen/" appearance="primary-action-button">
            {wat.ontwikkelingen}
          </ButtonLink>
          <ButtonLink href="/meer-weten/" appearance="secondary-action-button">
            {wat.meerWeten}
          </ButtonLink>
        </ActionGroup>
      </div>
      <img className="mijninkomen-hero__beeld" src="/img/home-netwerk.png" alt="" width={1000} height={674} />
    </div>
  </SpotlightSection>
);
