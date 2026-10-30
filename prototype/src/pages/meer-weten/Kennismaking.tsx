/**
 * MEER WETEN › Kennismakingsgesprek
 * Wat het gesprek is, en een formulier om het aan te vragen. Je kunt alleen
 * versturen met de datum van een webinar dat je al hebt gevolgd.
 * Een initiatief melden is iets anders: daarvoor is een aparte pagina.
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Link } from '@nl-design-system-candidate/link-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import { Badge } from '../../components/Badge/Badge';
import { Formulier, PrivacyRegel, type Veld } from '../../components/Formulier/Formulier';
import { kennismaking } from '../../content/meer-weten';
import { datumVoluit, geweestWebinars } from '../../content/webinars';
import { MeerWetenPagina } from './MeerWetenPagina';

function velden(): Veld[] {
  return [
    { naam: 'naam', label: 'Naam', soort: 'tekst', autoComplete: 'name', fout: 'Vul je naam in.' },
    { naam: 'organisatie', label: 'Gemeente of organisatie', soort: 'tekst', autoComplete: 'organization', fout: 'Vul je gemeente of organisatie in.' },
    { naam: 'functie', label: 'Functie', soort: 'tekst', autoComplete: 'organization-title', fout: 'Vul je functie in.' },
    { naam: 'email', label: 'E-mailadres', soort: 'email', autoComplete: 'email', omschrijving: 'Bijvoorbeeld: naam@gemeente.nl', fout: 'Vul je e-mailadres in.' },
    {
      naam: 'webinar',
      label: 'Welk webinar heb je gevolgd?',
      omschrijving: 'Je kunt een gesprek pas aanvragen als je een webinar hebt gevolgd.',
      soort: 'keuzelijst',
      kies: 'Kies een datum',
      opties: geweestWebinars().map((d) => ({ waarde: d, label: datumVoluit(d) })),
      fout: 'Kies de datum van het webinar dat je hebt gevolgd.',
    },
    {
      naam: 'interesse',
      label: 'Waar wil je het over hebben?',
      soort: 'aanvinken',
      opties: [
        { waarde: 'gebruiken', label: 'MijnInkomen gebruiken in mijn gemeente' },
        { waarde: 'community', label: 'Meedenken in de community' },
      ],
      fout: 'Kies minstens één onderwerp.',
    },
    { naam: 'toelichting', label: 'Toelichting', soort: 'tekstvak', verplicht: false },
  ];
}

export function Kennismaking() {
  return (
    <MeerWetenPagina titel={kennismaking.titel} tekst={kennismaking.tekst}>
      <Heading level={2}>{kennismaking.watTitel}</Heading>
      <Paragraph>{kennismaking.wat}</Paragraph>

      <div className="mijninkomen-let-op" role="note">
        <span className="mijninkomen-let-op__icoon" aria-hidden="true">
          i
        </span>
        <p>
          {kennismaking.letOp} <Link href="/meer-weten/webinar">{kennismaking.letOpLink}</Link>
        </p>
      </div>

      <section className="mijninkomen-kaart mijninkomen-formulierkaart mijninkomen-blok-ruimte" aria-labelledby="km-formulier">
        <Heading level={2} appearance="level-3" id="km-formulier">
          {kennismaking.formulierTitel}
        </Heading>
        <PrivacyRegel />
        <Formulier velden={velden()} knop="Gesprek aanvragen" bevestiging={kennismaking.bevestiging} />
      </section>

      <Heading level={2}>
        {kennismaking.daarnaTitel} <Badge />
      </Heading>
      {kennismaking.daarna.map((t) => (
        <Paragraph key={t}>{t}</Paragraph>
      ))}

      <p className="mijninkomen-doorverwijzing">
        {kennismaking.initiatief}{' '}
        <Link href="/initiatief-melden">
          {kennismaking.initiatiefLink} <span aria-hidden="true">→</span>
        </Link>
      </p>
    </MeerWetenPagina>
  );
}
