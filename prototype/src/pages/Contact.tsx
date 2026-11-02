/**
 * PAGINA "CONTACT" (niveau 1 – informatief), volgens de opzet van Isabella
 *
 * Opbouw:
 *   1. Hero                 – titel, uitleg en een envelop
 *   2. Twee kolommen:
 *      links  – contactformulier (prototype: er wordt niets verstuurd)
 *      rechts – contactgegevens (voorbeeldgegevens!) en veelgestelde vragen
 *   3. Liever direct samenwerken? – verwijzing naar de pagina Samenwerken
 *
 * De inhoud wordt nog afgestemd met de opdrachtgever. De teksten staan in content/contact.ts.
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import { ButtonLink } from '../components/ButtonLink/ButtonLink';
import { ContactFormulier } from '../components/ContactFormulier/ContactFormulier';
import { Icon } from '../components/Icon/Icon';
import { BallonnenIllustratie, EnvelopIllustratie } from '../components/Illustration/ContactIllustraties';
import { GemeentehuisIllustratie } from '../components/Illustration/SamenwerkenIllustraties';
import { contactgegevens, contactHero, directSamenwerken, formulier, veelgesteldeVragen } from '../content/contact';
import './Contact.css';

export function Contact() {
  return (
    <>
      {/* 1. HERO */}
      <section className="mijninkomen-contact-hero" aria-labelledby="contact-titel">
        <div className="mijninkomen-container mijninkomen-contact-twee">
          <div>
            <p className="mijninkomen-bovenkop mijninkomen-bovenkop--groen">{contactHero.bovenkop}</p>
            <Heading level={1} id="contact-titel">{contactHero.titel}</Heading>
            <Paragraph purpose="lead">{contactHero.intro}</Paragraph>
          </div>
          <div className="mijninkomen-contact-hero__beeld">
            <EnvelopIllustratie />
          </div>
        </div>
      </section>

      {/* 2. FORMULIER + GEGEVENS */}
      <div className="mijninkomen-container mijninkomen-contact-raster">
        <section id="formulier" className="mijninkomen-contact-kaart" aria-labelledby="formulier-titel">
          <Heading level={2} id="formulier-titel">{formulier.titel}</Heading>
          <Paragraph>{formulier.intro}</Paragraph>
          <ContactFormulier />
        </section>

        <div className="mijninkomen-contact-zijkant">
          <section className="mijninkomen-contact-kaart mijninkomen-contact-kaart--licht" aria-labelledby="gegevens-titel">
            <Heading level={2} id="gegevens-titel">{contactgegevens.titel}</Heading>
            {contactgegevens.intro.map((t) => (
              <Paragraph key={t}>{t}</Paragraph>
            ))}
            {/* Een lijst met naam + waarde: <dl> zodat schermlezers de koppeling voorlezen */}
            <dl className="mijninkomen-contact-gegevens">
              {contactgegevens.lijst.map((g) => (
                <div key={g.label} className="mijninkomen-contact-gegevens__regel">
                  <Icon naam={g.icoon} />
                  <div>
                    <dt>{g.label}</dt>
                    {g.waarde.map((w) => (
                      <dd key={w}>{w}</dd>
                    ))}
                  </div>
                </div>
              ))}
            </dl>
          </section>

          <section className="mijninkomen-contact-kaart mijninkomen-contact-kaart--licht mijninkomen-contact-faq" aria-labelledby="faq-titel">
            <div>
              <Heading level={2} id="faq-titel">{veelgesteldeVragen.titel}</Heading>
              <Paragraph>{veelgesteldeVragen.tekst}</Paragraph>
              {/* De pagina met vragen bestaat nog niet: daarom (nog) geen knop */}
              <p className="mijninkomen-contact-faq__binnenkort">{veelgesteldeVragen.binnenkort}</p>
            </div>
            <div className="mijninkomen-contact-faq__beeld">
              <BallonnenIllustratie />
            </div>
          </section>
        </div>
      </div>

      {/* 3. LIEVER DIRECT SAMENWERKEN */}
      <section className="mijninkomen-container mijninkomen-section--smal" aria-labelledby="direct-titel">
        <div className="mijninkomen-contact-kaart mijninkomen-contact-kaart--licht mijninkomen-contact-twee">
          <div>
            <Heading level={2} id="direct-titel">{directSamenwerken.titel}</Heading>
            <Paragraph>{directSamenwerken.tekst}</Paragraph>
            <ButtonLink href="/samenwerken" purpose="secondary">
              {directSamenwerken.knop} <span aria-hidden="true">→</span>
            </ButtonLink>
          </div>
          <div className="mijninkomen-contact-direct__beeld">
            <GemeentehuisIllustratie />
          </div>
        </div>
      </section>
    </>
  );
}
