/**
 * PAGINA "PRIVACYVERKLARING" (voorbeeld)
 *
 * De formulieren op Aansluiten vragen om persoonsgegevens, dus er hoort een
 * link naar een privacyverklaring bij. De echte tekst komt van de opdrachtgever;
 * dit is een korte VOORBEELDTEKST voor het prototype.
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Link } from '@nl-design-system-candidate/link-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import { Badge } from '../components/Badge/Badge';

const blokken = [
  {
    titel: 'Welke gegevens vragen we?',
    tekst: 'Je naam, je gemeente of organisatie, je functie en je e-mailadres. In het tekstvak kun je zelf extra informatie geven.',
  },
  {
    titel: 'Waarvoor gebruiken we ze?',
    tekst: 'Alleen om je aan te melden voor een webinar en om contact met je op te nemen over aansluiten. We gebruiken je gegevens niet voor iets anders.',
  },
  {
    titel: 'Hoe lang bewaren we ze?',
    tekst: 'We bewaren je gegevens niet langer dan nodig. Daarna verwijderen we ze.',
  },
  {
    titel: 'Wat zijn je rechten?',
    tekst: 'Je mag altijd vragen welke gegevens we van je hebben, en vragen om ze aan te passen of te verwijderen.',
  },
];

export function Privacy() {
  return (
    <section className="mijninkomen-section" aria-labelledby="privacy-titel">
      <div className="mijninkomen-container">
        <Heading level={1} id="privacy-titel">
          Privacyverklaring <Badge />
        </Heading>
        <Paragraph purpose="lead">
          Dit is een voorbeeldtekst voor het prototype. De echte privacyverklaring komt van de opdrachtgever.
        </Paragraph>
        {blokken.map((b) => (
          <div key={b.titel}>
            <Heading level={2} appearance="level-3">{b.titel}</Heading>
            <Paragraph>{b.tekst}</Paragraph>
          </div>
        ))}
        <Paragraph>
          Vragen over privacy? <Link href="/contact">Neem contact met ons op</Link>.
        </Paragraph>
      </div>
    </section>
  );
}
