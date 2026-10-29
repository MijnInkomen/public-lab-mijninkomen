/**
 * PAGINA "CONTACT" (niveau 1, versie 2)
 *
 * Kort en praktisch: waarvoor je contact opneemt, één algemeen e-mailadres
 * (geen persoonlijke namen), de reactietijd en een link naar LinkedIn.
 * Wil je aansluiten? Dan stuurt deze pagina je door naar Aansluiten.
 * Teksten: content/contact.ts
 */
import { Button } from '@nl-design-system-candidate/button-react/css';
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Link } from '@nl-design-system-candidate/link-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import { useState } from 'react';
import { Badge } from '../components/Badge/Badge';
import { Icon } from '../components/Icon/Icon';
import { EnvelopIllustratie } from '../components/Illustration/ContactIllustraties';
import { contactIntro, gegevens, volgOns, waarvoor } from '../content/contact';
import './Contact.css';

/** Zet tekst op het klembord. Werkt dat niet (oude browser), dan gebeurt er niets ergs. */
async function kopieer(tekst: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(tekst);
    return true;
  } catch {
    return false;
  }
}

export function Contact() {
  const [gekopieerd, setGekopieerd] = useState(false);

  return (
    <>
      <section className="mijninkomen-pagina-intro" aria-labelledby="contact-titel">
        <div className="mijninkomen-container mijninkomen-pagina-intro__inner">
          <div>
            <p className="mijninkomen-bovenkop mijninkomen-bovenkop--groen">{contactIntro.bovenkop}</p>
            <Heading level={1} id="contact-titel">{contactIntro.titel}</Heading>
            <Paragraph purpose="lead">{contactIntro.tekst}</Paragraph>
          </div>
          <div className="mijninkomen-pagina-intro__beeld">
            <EnvelopIllustratie />
          </div>
        </div>
      </section>

      <section className="mijninkomen-section" aria-label="Contact">
        <div className="mijninkomen-container mijninkomen-contact">
          {/* WAARVOOR */}
          <div className="mijninkomen-kaart">
            <Heading level={2} appearance="level-3">{waarvoor.titel}</Heading>
            <ul className="mijninkomen-lijst">
              {waarvoor.lijst.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="mijninkomen-contact__aansluiten">
              {waarvoor.aansluiten}{' '}
              <Link href="/aansluiten">
                {waarvoor.aansluitenLink} <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>

          {/* CONTACTGEGEVENS */}
          <div className="mijninkomen-kaart">
            <Heading level={2} appearance="level-3">
              {gegevens.titel} <Badge />
            </Heading>
            <dl className="mijninkomen-contact__gegevens">
              <div>
                <dt>
                  <Icon naam="mail" />
                  {gegevens.email.label}
                </dt>
                <dd>
                  <Link href={`mailto:${gegevens.email.waarde}`}>{gegevens.email.waarde}</Link>
                  <div className="mijninkomen-contact__kopieer">
                    <Button
                      purpose="secondary"
                      onClick={async () => setGekopieerd(await kopieer(gegevens.email.waarde))}
                    >
                      {gegevens.kopieer}
                    </Button>
                    {/* role="status": schermlezers lezen de melding voor zodra die verschijnt */}
                    <span role="status" className="mijninkomen-contact__melding">
                      {gekopieerd ? `✓ ${gegevens.gekopieerd}` : ''}
                    </span>
                  </div>
                </dd>
              </div>
              <div>
                <dt>
                  <Icon naam="klok" />
                  {gegevens.reactie.label}
                </dt>
                <dd>{gegevens.reactie.waarde}</dd>
              </div>
            </dl>
          </div>

          {/* VOLG ONS */}
          <div className="mijninkomen-kaart">
            <Heading level={2} appearance="level-3">{volgOns.titel}</Heading>
            <Paragraph>{volgOns.tekst}</Paragraph>
            <p>
              <Link href={volgOns.link.href}>
                {volgOns.link.label} <span className="mijninkomen-visually-hidden">(opent LinkedIn)</span>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
