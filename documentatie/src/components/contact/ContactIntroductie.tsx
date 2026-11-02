import { Heading, PreHeading } from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { intro } from './content';
import './contact.css';

export const ContactIntroductie = () => (
  <div className="container mijninkomen-sectie mijninkomen-contact__twee">
    <div>
      <PreHeading>{intro.bovenkop}</PreHeading>
      <Heading level={1}>{intro.titel}</Heading>
      <Paragraph appearance="lead">{intro.tekst}</Paragraph>
    </div>
    <img className="mijninkomen-contact__beeld" src="/img/contact-envelop.svg" alt="" width={440} height={300} />
  </div>
);
