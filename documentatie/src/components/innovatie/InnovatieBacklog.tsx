import {
  Alert,
  FormField,
  FormLabel,
  Heading,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { useEffect, useState } from 'react';
import { Badge } from '../home/Badge';
import { Link } from '../Link';
import { OORDEEL_TEKST, type Initiatief, type InnovatieBacklog as Backlog } from './types';
import './innovatie.css';

// Statisch adres voor testing
const ADRES = '/community/innovatie-backlog.json';

// Dynamische adres connectie aan github API
// const ADRES = "/api/roadmap/"

const ALLE = 'alle';

// De inhoud staat bewust niet in de build: alles in de build is openbaar. Nginx geeft dit bestand alleen na inloggen vrij.
const haalBacklogOp = async (): Promise<Backlog> => {
  const antwoord = await fetch(ADRES);
  if (!antwoord.ok) throw new Error('Niet ingelogd');
  return antwoord.json();
};

const datum = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });

export const InnovatieBacklog = () => {
  const [backlog, setBacklog] = useState<Backlog>();
  const [filter, setFilter] = useState(ALLE);

  useEffect(() => {
    haalBacklogOp().then(setBacklog, () => window.location.assign('/inloggen/'));
  }, []);

  if (!backlog) return <Paragraph>De innovatie-backlog wordt geladen…</Paragraph>;

  const statusNaam = (id: string) => backlog.statussen.find((status) => status.id === id)?.naam ?? id;
  const zichtbaar: Initiatief[] =
    filter === ALLE ? backlog.initiatieven : backlog.initiatieven.filter(({ status }) => status === filter);

  return (
    <>
      {backlog.voorbeelddata && (
        <Alert type="info">
          <Paragraph>Dit zijn voorbeeldgegevens. De echte initiatieven volgen zodra het meldformulier klaar is.</Paragraph>
        </Alert>
      )}

      <Paragraph>{backlog.toelichting}</Paragraph>
      <Paragraph>
        <Link href="/roadmap/">Naar de kern-backlog (roadmap)</Link>
      </Paragraph>

      <section aria-labelledby="innovatie-criteria" className="mijninkomen-innovatie__blok">
        <Heading level={2} id="innovatie-criteria">
          Zo beoordeelt de stuurgroep
        </Heading>
        <Paragraph>Elk initiatief krijgt per criterium een oordeel: voldoet, voldoet deels of voldoet niet.</Paragraph>
        <dl className="mijninkomen-innovatie__criteria">
          {backlog.criteria.map(({ id, naam, uitleg }) => (
            <div key={id}>
              <dt>{naam}</dt>
              <dd>{uitleg}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="innovatie-doorstroom" className="mijninkomen-innovatie__blok">
        <Heading level={2} id="innovatie-doorstroom">
          Doorstroomstatus
        </Heading>
        <ol className="mijninkomen-innovatie__statussen">
          {backlog.statussen.map(({ id, naam, uitleg }) => (
            <li key={id}>
              <Badge soort="status">{naam}</Badge> <span>{uitleg}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="innovatie-overzicht" className="mijninkomen-innovatie__blok">
        <Heading level={2} id="innovatie-overzicht">
          Ingediende initiatieven
        </Heading>

        <FormField type="select">
          <FormLabel htmlFor="innovatie-filter">Toon status</FormLabel>
          <select
            id="innovatie-filter"
            className="utrecht-select utrecht-select--html-select mijninkomen-innovatie__filter"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value={ALLE}>Alle statussen</option>
            {backlog.statussen.map(({ id, naam }) => (
              <option key={id} value={id}>
                {naam}
              </option>
            ))}
          </select>
        </FormField>

        <p role="status" className="mijninkomen-innovatie__aantal">
          {zichtbaar.length === 1 ? '1 initiatief' : `${zichtbaar.length} initiatieven`}
        </p>

        {zichtbaar.length === 0 && <Paragraph>Er zijn geen initiatieven met deze status.</Paragraph>}

        {zichtbaar.length > 0 && (
          <TableContainer>
            <Table>
              <TableCaption>Overzicht van de innovatie-backlog</TableCaption>
              <TableHeader>
                <TableRow>
                  {['Initiatief', 'Gemeente', 'Ingediend', 'Status'].map((kop) => (
                    <TableHeaderCell key={kop} scope="col">
                      {kop}
                    </TableHeaderCell>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {zichtbaar.map(({ id, titel, gemeente, ingediend, status }) => (
                  <TableRow key={id}>
                    <TableCell>
                      <a href={`#${id}`}>{titel}</a>
                    </TableCell>
                    <TableCell>{gemeente}</TableCell>
                    <TableCell>{datum(ingediend)}</TableCell>
                    <TableCell>
                      <Badge soort="status">{statusNaam(status)}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {zichtbaar.map((initiatief) => (
          <article key={initiatief.id} id={initiatief.id} className="mijninkomen-innovatie__initiatief">
            <Heading level={3}>
              {initiatief.titel} <Badge soort="status">{statusNaam(initiatief.status)}</Badge>
            </Heading>
            <Paragraph>{initiatief.omschrijving}</Paragraph>
            <Paragraph className="mijninkomen-innovatie__meta">
              Ingediend door gemeente {initiatief.gemeente} op {datum(initiatief.ingediend)}
            </Paragraph>

            <TableContainer>
              <Table>
                <TableCaption>Beoordeling van {initiatief.titel}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell scope="col">Criterium</TableHeaderCell>
                    <TableHeaderCell scope="col">Oordeel</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backlog.criteria.map(({ id, naam }) => {
                    const oordeel = initiatief.beoordeling[id] ?? 'nog-niet-beoordeeld';
                    return (
                      <TableRow key={id}>
                        <TableCell>{naam}</TableCell>
                        <TableCell>
                          <span className={`mijninkomen-innovatie__oordeel mijninkomen-innovatie__oordeel--${oordeel}`}>
                            {OORDEEL_TEKST[oordeel]}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <div className="mijninkomen-innovatie__besluit">
              <Heading level={4}>Besluit stuurgroep</Heading>
              {initiatief.besluit ? (
                <>
                  <Paragraph>
                    <strong>{initiatief.besluit.tekst}</strong> ({datum(initiatief.besluit.datum)})
                  </Paragraph>
                  <Paragraph>{initiatief.besluit.motivatie}</Paragraph>
                </>
              ) : (
                <Paragraph>De stuurgroep heeft nog geen besluit genomen.</Paragraph>
              )}
            </div>
          </article>
        ))}
      </section>
    </>
  );
};
