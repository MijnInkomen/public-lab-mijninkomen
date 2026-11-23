import {
  Alert,
  Checkbox,
  FormField,
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
} from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { useEffect, useState } from 'react';
import { Badge } from '../home/Badge';
import { useEmail } from '../useIngelogd';
import { type Actie, type Actielijst as Lijst, STATUSSEN } from './types';
import './actielijst.css';

// De inhoud staat bewust niet in de build: alles in de build is openbaar. Nginx geeft dit bestand alleen na inloggen vrij.
const ADRES = '/community/actielijst.json';
const ALLE = 'alle';
const STORING = 'De actielijst kon niet worden geladen. Probeer het later opnieuw.';

const datum = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });

const statusNaam = (id: Actie['status']) => STATUSSEN.find((status) => status.id === id)?.naam ?? id;

/** Openstaande acties eerst, de vroegste streefdatum bovenaan. Afgeronde acties onderaan. */
export const sorteer = (acties: Actie[]) =>
  [...acties].sort(
    (a, b) =>
      Number(a.status === 'afgerond') - Number(b.status === 'afgerond') || a.streefdatum.localeCompare(b.streefdatum),
  );

export const Actielijst = () => {
  const email = useEmail();
  const [lijst, setLijst] = useState<Lijst>();
  const [fout, setFout] = useState(false);
  const [status, setStatus] = useState(ALLE);
  const [alleenMijn, setAlleenMijn] = useState(false);

  useEffect(() => {
    fetch(ADRES)
      .then(async (antwoord) => {
        if (antwoord.status === 401) return window.location.assign('/inloggen/');
        if (!antwoord.ok) throw new Error(`Status ${antwoord.status}`);
        return setLijst(await antwoord.json());
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
  if (!lijst) return <Paragraph>De actielijst wordt geladen…</Paragraph>;

  const zichtbaar = sorteer(lijst.acties).filter(
    (actie) =>
      (status === ALLE || actie.status === status) && (!alleenMijn || actie.eigenaar.email.toLowerCase() === email),
  );

  return (
    <>
      <div className="mijninkomen-actielijst__filters">
        <FormField type="select">
          <FormLabel htmlFor="actielijst-status">Status</FormLabel>
          <Select
            id="actielijst-status"
            className="mijninkomen-actielijst__status"
            value={status}
            onChange={(gebeurtenis) => setStatus(gebeurtenis.target.value)}
          >
            <SelectOption value={ALLE}>Alle statussen</SelectOption>
            {STATUSSEN.map(({ id, naam }) => (
              <SelectOption key={id} value={id}>
                {naam}
              </SelectOption>
            ))}
          </Select>
        </FormField>

        <FormField type="checkbox" className="mijninkomen-actielijst__mijn">
          <Checkbox
            id="actielijst-mijn"
            appearance="custom"
            checked={alleenMijn}
            onChange={(gebeurtenis) => setAlleenMijn(gebeurtenis.target.checked)}
          />
          <FormLabel htmlFor="actielijst-mijn" type="checkbox">
            Alleen mijn acties
          </FormLabel>
        </FormField>
      </div>

      <p role="status" className="mijninkomen-actielijst__aantal">
        {zichtbaar.length === 1 ? '1 actie' : `${zichtbaar.length} acties`}
      </p>

      {zichtbaar.length === 0 && <Paragraph>Er zijn geen acties met dit filter.</Paragraph>}

      {zichtbaar.length > 0 && (
        <TableContainer className="mijninkomen-actielijst__tabel">
          <Table>
            <TableCaption className="sr-only">Actielijst, openstaande acties eerst</TableCaption>
            <TableHeader>
              <TableRow>
                {['Actie', 'Eigenaar', 'Landelijk of lokaal', 'Streefdatum', 'Status'].map((kop) => (
                  <TableHeaderCell key={kop} scope="col">
                    {kop}
                  </TableHeaderCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {zichtbaar.map(({ id, actie, eigenaar, niveau, streefdatum, status: actieStatus }) => (
                <TableRow key={id}>
                  <TableCell>{actie}</TableCell>
                  <TableCell>
                    {eigenaar.naam}
                    <span className="mijninkomen-actielijst__gemeente">{eigenaar.gemeente}</span>
                  </TableCell>
                  <TableCell>{niveau === 'landelijk' ? 'Landelijk' : 'Lokaal'}</TableCell>
                  <TableCell className="mijninkomen-actielijst__datum">{datum(streefdatum)}</TableCell>
                  <TableCell>
                    <Badge soort="status">{statusNaam(actieStatus)}</Badge>
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
