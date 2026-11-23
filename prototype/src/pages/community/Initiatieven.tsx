/**
 * NIVEAU 2 › Initiatieven & innovaties
 * Een aparte backlog voor nieuwe ideeën, los van de vaste roadmap.
 * Vier eigen pagina's (keuze Isabella: elk subkopje uit het zijmenu een eigen pagina):
 * - Ingediende initiatieven (/community/initiatieven)
 * - Zo beoordelen we (/community/initiatieven/beoordeling): stappen en criteria
 * - Initiatief indienen (/community/initiatieven/indienen)
 * - Initiatief bijwerken (/community/initiatieven/bijwerken), door de indiener
 *   via een link in een e-mail (feedback Vincent)
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import { Badge } from '../../components/Badge/Badge';
import { Formulier, type Veld } from '../../components/Formulier/Formulier';
import { beoordelingStappen, criteria, ingediend, initiatieven } from '../../content/community';
import { CommunityPagina, Datum, TabelVak } from './CommunityPagina';
import { useGebruiker } from './gebruiker';

const velden: Veld[] = [
  { naam: 'initiatief', label: 'Naam van het initiatief', soort: 'tekst', fout: 'Vul de naam van het initiatief in.' },
  {
    naam: 'soort',
    label: 'Wat voor initiatief is het?',
    soort: 'keuzelijst',
    opties: [
      { waarde: 'functie', label: 'Een nieuwe functie in MijnInkomen' },
      { waarde: 'regeling', label: 'Een nieuwe regeling' },
      { waarde: 'software', label: 'Een bestaande software-oplossing' },
      { waarde: 'anders', label: 'Iets anders' },
    ],
    fout: 'Kies wat voor initiatief het is.',
  },
  { naam: 'omschrijving', label: 'Wat is het initiatief?', omschrijving: 'Beschrijf in een paar zinnen wat het is en wat het oplevert.', soort: 'tekstvak', fout: 'Beschrijf wat het initiatief is.' },
  { naam: 'link', label: 'Link naar meer informatie', omschrijving: 'Bijvoorbeeld een GitHub-repository of projectpagina.', soort: 'tekst', verplicht: false },
];

// Bijwerken door de indiener (feedback Vincent). Voorbeeldvragen.
const bijwerkVelden: Veld[] = [
  {
    naam: 'welk',
    label: 'Welk initiatief wil je bijwerken?',
    soort: 'keuzelijst',
    kies: 'Kies je initiatief',
    opties: ingediend.map((i) => ({ waarde: i.naam, label: i.naam })),
    fout: 'Kies het initiatief dat je wilt bijwerken.',
  },
  {
    naam: 'stand',
    label: 'Hoe ver is het initiatief nu?',
    soort: 'keuzelijst',
    kies: 'Maak een keuze',
    opties: [
      { waarde: 'idee', label: 'Het is nog een idee' },
      { waarde: 'bezig', label: 'We zijn ermee bezig' },
      { waarde: 'werkt', label: 'Het werkt al' },
      { waarde: 'gestopt', label: 'We zijn ermee gestopt' },
    ],
    fout: 'Kies hoe ver het initiatief nu is.',
  },
  { naam: 'veranderd', label: 'Wat is er veranderd sinds de vorige keer?', soort: 'tekstvak', fout: 'Vertel wat er is veranderd.' },
  { naam: 'contact', label: 'Is er een nieuwe contactpersoon? Vul dan het e-mailadres in.', soort: 'email', verplicht: false },
];

/** Ingediende initiatieven met hun beoordeling */
export function InitiatievenOverzicht() {
  return (
    <CommunityPagina onderdeel={initiatieven.titel} titel={initiatieven.backlogTitel} tekst={initiatieven.tekst}>
      <TabelVak label={initiatieven.backlogTitel}>
        <table className="mijninkomen-tabel">
          <thead>
            <tr>
              <th scope="col">Initiatief</th>
              <th scope="col">Ingediend door</th>
              <th scope="col">Ingediend op</th>
              <th scope="col">Laatst bijgewerkt</th>
              <th scope="col">Beoordeling</th>
            </tr>
          </thead>
          <tbody>
            {ingediend.map((i) => (
              <tr key={i.naam}>
                <th scope="row">{i.naam}</th>
                <td>{i.door}</td>
                <td><Datum iso={i.datum} /></td>
                <td><Datum iso={i.bijgewerkt} /></td>
                <td>
                  <Badge soort="status">{i.status}</Badge>
                  {i.toelichting && (
                    <>
                      <br />
                      <span className="mijninkomen-tabel__klein">{i.toelichting}</span>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TabelVak>
    </CommunityPagina>
  );
}

/** Hoe een initiatief wordt beoordeeld, en waarop */
export function InitiatievenBeoordeling() {
  return (
    <CommunityPagina onderdeel={initiatieven.titel} titel={initiatieven.procesTitel} tekst={initiatieven.procesTekst}>
      <ol className="mijninkomen-stappen">
        {beoordelingStappen.map((s) => (
          <li key={s.titel} className="mijninkomen-stappen__stap">
            <Heading level={2} appearance="level-3">{s.titel}</Heading>
            <Paragraph>{s.tekst}</Paragraph>
          </li>
        ))}
      </ol>

      <section className="mijninkomen-c-sectie" aria-labelledby="c-criteria">
        <Heading level={2} id="c-criteria">{initiatieven.criteriaTitel}</Heading>
        <ul className="mijninkomen-lijst">
          {criteria.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>
    </CommunityPagina>
  );
}

/** Een nieuw initiatief indienen */
export function InitiatievenIndienen() {
  const gebruiker = useGebruiker();
  return (
    <CommunityPagina onderdeel={initiatieven.titel} titel={initiatieven.formulierTitel} tekst={initiatieven.formulierVoorbeeld} voorbeeld>
      <section className="mijninkomen-kaart mijninkomen-formulierkaart" aria-label={initiatieven.formulierTitel}>
        <Paragraph>
          Je dient het initiatief in als {gebruiker.naam}, {gebruiker.gemeente === 'Programmateam' ? 'programmateam' : `gemeente ${gebruiker.gemeente}`}.
        </Paragraph>
        <Formulier velden={velden} knop={initiatieven.formulierKnop} bevestiging={initiatieven.bevestiging} />
      </section>
    </CommunityPagina>
  );
}

/** Je initiatief bijwerken (feedback Vincent): de indiener krijgt hiervoor een link per e-mail */
export function InitiatievenBijwerken() {
  return (
    <CommunityPagina onderdeel={initiatieven.titel} titel={initiatieven.bijwerkenTitel} tekst={initiatieven.bijwerkenTekst} voorbeeld>
      <section className="mijninkomen-kaart mijninkomen-formulierkaart" aria-label={initiatieven.bijwerkenTitel}>
        <Formulier velden={bijwerkVelden} knop={initiatieven.bijwerkenKnop} bevestiging={initiatieven.bijwerkenBevestiging} />
      </section>
    </CommunityPagina>
  );
}
