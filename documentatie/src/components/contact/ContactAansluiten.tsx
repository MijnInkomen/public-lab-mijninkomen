import { ButtonLink, Heading } from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { aansluiten } from './content';
import './contact.css';

export const ContactAansluiten = () => (
  <div className="container mijninkomen-sectie">
    <section
      className="mijninkomen-contact__kaart mijninkomen-contact__kaart--licht mijninkomen-contact__twee"
      aria-labelledby="contact-aansluiten"
    >
      <div>
        <Heading level={2} id="contact-aansluiten">
          {aansluiten.titel}
        </Heading>
        <Paragraph>{aansluiten.tekst}</Paragraph>
        <ButtonLink href={`${aansluiten.href}/`} appearance="secondary-action-button">
          {aansluiten.knop} <span aria-hidden="true">→</span>
        </ButtonLink>
      </div>
      <img className="mijninkomen-contact__beeld" src="/img/contact-gebouwen.svg" alt="" width={400} height={260} />
    </section>
  </div>
);
