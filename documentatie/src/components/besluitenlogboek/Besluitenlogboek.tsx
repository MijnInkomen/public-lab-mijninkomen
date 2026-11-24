import {
  Alert,
  FormField,
  FormFieldErrorMessage,
  FormLabel,
  Select,
  SelectOption,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Textbox,
} from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { useEffect, useState } from 'react';
import { Badge } from '../home/Badge';
import { type Besluit, type Besluitenlogboek as Logboek, STATUSSEN } from './types';
import './besluitenlogboek.css';

// De inhoud staat bewust niet in de build: alles in de build is openbaar. Nginx geeft dit bestand alleen na inloggen vrij.
const ADRES = '/community/besluitenlogboek.json';
const ALLE = 'alle';
const ALLE_GEMEENTEN = 'Alle gemeenten';
const STORING = 'Het besluitenlogboek kon niet worden geladen. Probeer het later opnieuw.';
const FOUT_PERIODE = 'De datum "Tot en met" moet op of na de datum "Vanaf" liggen.';

export interface Filters {
  zoek: string;
  status: string;
  gemeente: string;
  vanaf: string;
  tot: string;
}

const datum = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });

const statusNaam = (id: Besluit['status']) => STATUSSEN.find((status) => status.id === id)?.naam ?? id;

/** Kleine letters en zonder accenten, zodat "een" ook "één" vindt. */
const normaliseer = (tekst: string) =>
  tekst
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

export const periodeKlopt = ({ vanaf, tot }: Pick<Filters, 'vanaf' | 'tot'>) => !vanaf || !tot || vanaf <= tot;

/** Nieuwste besluit eerst. Zoeken en filters werken samen; een onjuiste periode telt niet mee. */
export const filterBesluiten = (besluiten: Besluit[], { zoek, status, gemeente, vanaf, tot }: Filters) => {
  const woorden = normaliseer(zoek).split(/\s+/).filter(Boolean);
  const periode = periodeKlopt({ vanaf, tot });

  return [...besluiten]
    .sort((a, b) => b.datum.localeCompare(a.datum))
    .filter((besluit) => {
      const tekst = normaliseer(`${besluit.besluit} ${besluit.overleg}`);
      return (
        woorden.every((woord) => tekst.includes(woord)) &&
        (status === ALLE || besluit.status === status) &&
        (gemeente === ALLE || besluit.gemeenten.length === 0 || besluit.gemeenten.includes(gemeente)) &&
        (!periode || ((!vanaf || besluit.datum >= vanaf) && (!tot || besluit.datum <= tot)))
      );
    });
};

const Inhoud = () => {
  const [logboek, setLogboek] = useState<Logboek>();
  const [fout, setFout] = useState(false);
  const [filters, setFilters] = useState<Filters>({ zoek: '', status: ALLE, gemeente: ALLE, vanaf: '', tot: '' });

  useEffect(() => {
    fetch(ADRES)
      .then(async (antwoord) => {
        if (antwoord.status === 401) return window.location.assign('/inloggen/');
        if (!antwoord.ok) throw new Error(`Status ${antwoord.status}`);
        return setLogboek(await antwoord.json());
      })
      .catch(() => setFout(true));
  }, []);

  if (fout) {
    return (
      <Alert type="error">
        <Paragraph>{STORING}</Paragraph>
      </Alert>
    );
  }
  if (!logboek) return <Paragraph>Het besluitenlogboek wordt geladen…</Paragraph>;

  const zet = (veld: keyof Filters) => (gebeurtenis: { target: { value: string } }) =>
    setFilters((huidig) => ({ ...huidig, [veld]: gebeurtenis.target.value }));

  const gemeenten = [...new Set(logboek.besluiten.flatMap((besluit) => besluit.gemeenten))].sort((a, b) =>
    a.localeCompare(b, 'nl'),
  );
  const periodeFout = !periodeKlopt(filters);
  const zichtbaar = filterBesluiten(logboek.besluiten, filters);

  return (
    <>
      <div className="mijninkomen-besluiten__filters">
        <FormField type="text">
          <FormLabel htmlFor="besluiten-zoek">Zoeken</FormLabel>
          <Textbox id="besluiten-zoek" type="search" value={filters.zoek} onChange={zet('zoek')} />
        </FormField>

        <FormField type="select">
          <FormLabel htmlFor="besluiten-status">Status</FormLabel>
          <Select id="besluiten-status" value={filters.status} onChange={zet('status')}>
            <SelectOption value={ALLE}>Alle statussen</SelectOption>
            {STATUSSEN.map(({ id, naam }) => (
              <SelectOption key={id} value={id}>
                {naam}
              </SelectOption>
            ))}
          </Select>
        </FormField>

        <FormField type="select">
          <FormLabel htmlFor="besluiten-gemeente">Gemeente</FormLabel>
          <Select id="besluiten-gemeente" value={filters.gemeente} onChange={zet('gemeente')}>
            <SelectOption value={ALLE}>{ALLE_GEMEENTEN}</SelectOption>
            {gemeenten.map((naam) => (
              <SelectOption key={naam} value={naam}>
                {naam}
              </SelectOption>
            ))}
          </Select>
        </FormField>

        <FormField type="text">
          <FormLabel htmlFor="besluiten-vanaf">Vanaf datum</FormLabel>
          <Textbox id="besluiten-vanaf" type="date" value={filters.vanaf} max={filters.tot || undefined} onChange={zet('vanaf')} />
        </FormField>

        <FormField type="text" invalid={periodeFout}>
          <FormLabel htmlFor="besluiten-tot">Tot en met datum</FormLabel>
          {periodeFout && <FormFieldErrorMessage id="besluiten-tot-fout">{FOUT_PERIODE}</FormFieldErrorMessage>}
          <Textbox
            id="besluiten-tot"
            type="date"
            value={filters.tot}
            min={filters.vanaf || undefined}
            invalid={periodeFout}
            aria-describedby={periodeFout ? 'besluiten-tot-fout' : undefined}
            onChange={zet('tot')}
          />
        </FormField>
      </div>

      <p role="status" className="mijninkomen-besluiten__aantal">
        {zichtbaar.length === 1 ? '1 besluit' : `${zichtbaar.length} besluiten`}
      </p>

      {zichtbaar.length === 0 && <Paragraph>Er zijn geen besluiten die passen bij je zoekopdracht.</Paragraph>}

      {zichtbaar.length > 0 && (
        <TableContainer className="mijninkomen-besluiten__tabel">
          <Table>
            <TableCaption className="sr-only">Besluitenlogboek, nieuwste besluit eerst</TableCaption>
            <TableHeader>
              <TableRow>
                {['Datum', 'Besluit', 'Overleg', 'Gemeenten', 'Status'].map((kop) => (
                  <TableHeaderCell key={kop} scope="col">
                    {kop}
                  </TableHeaderCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {zichtbaar.map((besluit) => (
                <TableRow key={besluit.id}>
                  <TableCell className="mijninkomen-besluiten__datum">{datum(besluit.datum)}</TableCell>
                  <TableCell>{besluit.besluit}</TableCell>
                  <TableCell className="mijninkomen-besluiten__overleg">{besluit.overleg}</TableCell>
                  <TableCell>{besluit.gemeenten.length ? besluit.gemeenten.join(', ') : ALLE_GEMEENTEN}</TableCell>
                  <TableCell>
                    <Badge soort="status">{statusNaam(besluit.status)}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

/** De styling hangt aan deze klasse, zodat het component ook op een docs-pagina werkt. */
export const Besluitenlogboek = () => (
  <div className="mijninkomen-besluiten">
    <Inhoud />
  </div>
);
