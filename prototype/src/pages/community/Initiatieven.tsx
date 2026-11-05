/**
 * NIVEAU 2 › Initiatieven & innovaties
 * Een aparte backlog voor nieuwe ideeën, los van de vaste roadmap, met de
 * stappen en criteria van de beoordeling en een formulier om iets in te dienen.
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import { Badge } from '../../components/Badge/Badge';
import { Formulier, type Veld } from '../../components/Formulier/Formulier';
import { beoordelingStappen, criteria, gebruiker, ingediend, initiatieven } from '../../content/community';
import { CommunityPagina, Datum, TabelVak } from './CommunityPagina';

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

export function Initiatieven() {
  return (
    <CommunityPagina titel={initiatieven.titel} tekst={initiatieven.tekst}>
      <section className="mijninkomen-c-sectie" aria-labelledby="c-backlog">
        <Heading level={2} id="c-backlog">{initiatieven.backlogTitel}</Heading>
        <TabelVak label={initiatieven.backlogTitel}>
          <table className="mijninkomen-tabel">
            <thead>
              <tr>
                <th scope="col">Initiatief</th>
                <th scope="col">Ingediend door</th>
                <th scope="col">Datum</th>
                <th scope="col">Beoordeling</th>
              </tr>
            </thead>
            <tbody>
              {ingediend.map((i) => (
                <tr key={i.naam}>
                  <th scope="row">{i.naam}</th>
                  <td>{i.door}</td>
                  <td><Datum iso={i.datum} /></td>
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
      </section>

      <section className="mijninkomen-c-sectie" aria-labelledby="c-proces">
        <Heading level={2} id="c-proces">{initiatieven.procesTitel}</Heading>
        <ol className="mijninkomen-stappen">
          {beoordelingStappen.map((s) => (
            <li key={s.titel} className="mijninkomen-stappen__stap">
              <Heading level={3}>{s.titel}</Heading>
              <Paragraph>{s.tekst}</Paragraph>
            </li>
          ))}
        </ol>
      </section>

      <section className="mijninkomen-c-sectie" aria-labelledby="c-criteria">
        <Heading level={2} id="c-criteria">{initiatieven.criteriaTitel}</Heading>
        <ul className="mijninkomen-lijst">
          {criteria.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <section className="mijninkomen-kaart mijninkomen-formulierkaart" aria-labelledby="c-indienen">
        <Heading level={2} id="c-indienen">{initiatieven.formulierTitel}</Heading>
        <Paragraph>
          Je dient het initiatief in als {gebruiker.naam}, gemeente {gebruiker.gemeente}.
        </Paragraph>
        <Formulier velden={velden} knop={initiatieven.formulierKnop} bevestiging={initiatieven.bevestiging} />
      </section>
    </CommunityPagina>
  );
}
