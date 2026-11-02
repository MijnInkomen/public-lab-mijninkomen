import { IconBrandLinkedin } from '@tabler/icons-react';
import { Heading } from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { Link } from '../Link';
import { gegevens, volgOns, waarvoor } from './content';
import './contact.css';

const { email, reactie } = gegevens;

export const ContactGegevens = () => (
  <div className="container mijninkomen-sectie mijninkomen-contact__raster">
    <div className="mijninkomen-contact__kaart">
      <section aria-labelledby="contact-waarvoor">
        <Heading level={2} id="contact-waarvoor">
          {waarvoor.titel}
        </Heading>
        <ul className="mijninkomen-contact__lijst">
          {waarvoor.lijst.map((punt) => (
            <li key={punt}>{punt}</li>
          ))}
        </ul>
      </section>

      <section className="mijninkomen-contact__onderdeel" aria-labelledby="contact-gegevens">
        <Heading level={2} id="contact-gegevens">
          {gegevens.titel}
        </Heading>
        <dl className="mijninkomen-contact__gegevens">
          <div>
            <span className="mijninkomen-icoon" aria-hidden="true">
              <email.icoon size={22} stroke={1.7} />
            </span>
            <div>
              <dt>{email.label}</dt>
              <dd>
                <Link href={`mailto:${email.adres}`}>{email.adres}</Link>
              </dd>
            </div>
          </div>
          <div>
            <span className="mijninkomen-icoon" aria-hidden="true">
              <reactie.icoon size={22} stroke={1.7} />
            </span>
            <div>
              <dt>{reactie.label}</dt>
              <dd>{reactie.tekst}</dd>
            </div>
          </div>
        </dl>
      </section>
    </div>

    <section
      className="mijninkomen-contact__kaart mijninkomen-contact__kaart--licht"
      aria-labelledby="contact-volg-ons"
    >
      <Heading level={2} id="contact-volg-ons">
        {volgOns.titel}
      </Heading>
      <Paragraph>{volgOns.tekst}</Paragraph>
      <Link href={volgOns.href} className="mijninkomen-contact__linkedin">
        <IconBrandLinkedin size={22} aria-hidden="true" />
        {volgOns.link}
        <span className="sr-only"> (opent in een nieuw tabblad)</span>
      </Link>
    </section>
  </div>
);
