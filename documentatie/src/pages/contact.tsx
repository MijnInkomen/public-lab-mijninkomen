import Head from '@docusaurus/Head';
import { IconBrandLinkedin } from '@tabler/icons-react';
import Layout from '@theme/Layout';
import { ButtonLink, Heading, PreHeading } from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { EnvelopIllustratie, GebouwenIllustratie } from '../components/contact/ContactIllustraties';
import { aansluiten, gegevens, intro, volgOns, waarvoor } from '../components/contact/content';
import { Link } from '../components/Link';
import '../components/contact/contact.css';
import '../components/home/home.css';

const { email, reactie } = gegevens;

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact – MijnInkomen</title>
        <meta name="description" content="Waar je terechtkunt met een vraag over MijnInkomen." />
      </Head>
      <Layout>
        <main className="mijninkomen-home mijninkomen-contact">
          <div className="container mijninkomen-sectie mijninkomen-contact__twee">
            <div>
              <PreHeading>{intro.bovenkop}</PreHeading>
              <Heading level={1}>{intro.titel}</Heading>
              <Paragraph appearance="lead">{intro.tekst}</Paragraph>
            </div>
            <div className="mijninkomen-contact__beeld">
              <EnvelopIllustratie />
            </div>
          </div>

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
              <div className="mijninkomen-contact__beeld">
                <GebouwenIllustratie />
              </div>
            </section>
          </div>
        </main>
      </Layout>
    </>
  );
}
