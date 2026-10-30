/**
 * PAGINA "INITIATIEF MELDEN" (versie 2.1)
 *
 * Keuze Isabella: een eigen pagina in het hoofdmenu, want het is een ACTIE die
 * los staat van de informatie onder "Meer weten".
 * Feedback opdrachtgever: initiatief melden is iets anders dan een
 * kennismakingsgesprek, en is ook voor wie nog geen communitylid is.
 * Teksten: content/initiatief.ts
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Link } from '@nl-design-system-candidate/link-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import { Badge } from '../components/Badge/Badge';
import { Formulier, PrivacyRegel, type Veld } from '../components/Formulier/Formulier';
import { MensenIllustratie } from '../components/Illustration/OverIllustraties';
import { initiatiefDaarna, initiatiefFormulier, initiatiefIntro, verschil, voorWie } from '../content/initiatief';

const velden: Veld[] = [
  { naam: 'naam', label: 'Naam', soort: 'tekst', autoComplete: 'name', fout: 'Vul je naam in.' },
  { naam: 'organisatie', label: 'Gemeente of organisatie', soort: 'tekst', autoComplete: 'organization', fout: 'Vul je gemeente of organisatie in.' },
  { naam: 'email', label: 'E-mailadres', soort: 'email', autoComplete: 'email', omschrijving: 'Bijvoorbeeld: naam@gemeente.nl', fout: 'Vul je e-mailadres in.' },
  { naam: 'initiatief', label: 'Naam van het initiatief', soort: 'tekst', fout: 'Vul de naam van het initiatief in.' },
  {
    naam: 'fase',
    label: 'Hoe ver is het initiatief?',
    soort: 'keuzelijst',
    opties: [
      { waarde: 'idee', label: 'Het is nog een idee' },
      { waarde: 'bezig', label: 'We zijn ermee bezig' },
      { waarde: 'klaar', label: 'Het werkt al' },
    ],
    fout: 'Kies hoe ver het initiatief is.',
  },
  {
    naam: 'omschrijving',
    label: 'Wat is het initiatief?',
    omschrijving: 'Beschrijf in een paar zinnen wat het is en voor wie het is.',
    soort: 'tekstvak',
    fout: 'Beschrijf wat het initiatief is.',
  },
  { naam: 'link', label: 'Website of meer informatie', soort: 'tekst', verplicht: false, omschrijving: 'Bijvoorbeeld een link naar een projectpagina.' },
];

export function InitiatiefMelden() {
  return (
    <>
      <section className="mijninkomen-pagina-intro" aria-labelledby="init-titel">
        <div className="mijninkomen-container mijninkomen-pagina-intro__inner">
          <div>
            <p className="mijninkomen-bovenkop mijninkomen-bovenkop--groen">{initiatiefIntro.bovenkop}</p>
            <Heading level={1} id="init-titel">{initiatiefIntro.titel}</Heading>
            <Paragraph purpose="lead">{initiatiefIntro.tekst}</Paragraph>
          </div>
          <div className="mijninkomen-pagina-intro__beeld">
            <MensenIllustratie />
          </div>
        </div>
      </section>

      <div className="mijninkomen-container mijninkomen-section">
        <div className="mijninkomen-smalle-inhoud">
          {/* VOOR WIE */}
          <section className="mijninkomen-blok-ruimte" aria-labelledby="init-voor-wie">
            <Heading level={2} id="init-voor-wie">{voorWie.titel}</Heading>
            <ul className="mijninkomen-lijst">
              {voorWie.lijst.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>

          {/* HET VERSCHIL MET EEN KENNISMAKINGSGESPREK */}
          <section className="mijninkomen-blok-ruimte" aria-labelledby="init-verschil">
            <Heading level={2} id="init-verschil">{verschil.titel}</Heading>
            <div className="mijninkomen-twee-kolommen">
              <div className="mijninkomen-kaart mijninkomen-init-hier">
                <Heading level={3}>{verschil.initiatief.titel}</Heading>
                <Paragraph>{verschil.initiatief.tekst}</Paragraph>
                <p className="mijninkomen-kaart__extra">Dat doe je op deze pagina.</p>
              </div>
              <div className="mijninkomen-kaart">
                <Heading level={3}>{verschil.kennismaking.titel}</Heading>
                <Paragraph>{verschil.kennismaking.tekst}</Paragraph>
                <Link href="/meer-weten/kennismaking">
                  {verschil.link} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </section>

          {/* FORMULIER */}
          <section className="mijninkomen-kaart mijninkomen-formulierkaart mijninkomen-blok-ruimte" aria-labelledby="init-formulier">
            <Heading level={2} id="init-formulier">{initiatiefFormulier.titel}</Heading>
            <PrivacyRegel />
            <Formulier velden={velden} knop={initiatiefFormulier.knop} bevestiging={initiatiefFormulier.bevestiging} />
          </section>

          {/* DAARNA */}
          <section aria-labelledby="init-daarna">
            <Heading level={2} id="init-daarna">
              {initiatiefDaarna.titel} <Badge />
            </Heading>
            {initiatiefDaarna.tekst.map((t) => (
              <Paragraph key={t}>{t}</Paragraph>
            ))}
          </section>
        </div>
      </div>
    </>
  );
}
