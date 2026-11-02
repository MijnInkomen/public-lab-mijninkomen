import {
  Alert,
  Button,
  ButtonGroup,
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
import { useCallback, useEffect, useState } from 'react';
import { Badge } from '../home/Badge';
import './beheer.css';

interface Aanvraag {
  id: string;
  naam: string;
  organisatie: string;
  functie: string;
  email: string;
  gesprekDatum: string;
  status: 'in behandeling' | 'toegelaten' | 'geweigerd';
}

type Actie = 'toelaten' | 'weigeren';

const ADRES = '/api/beheer/aanvragen';
const STORING = 'Er ging iets mis. Probeer het later opnieuw.';

const datum = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });

export const AanvragenTabel = () => {
  const [aanvragen, setAanvragen] = useState<Aanvraag[]>();
  const [bezig, setBezig] = useState<string>();
  const [melding, setMelding] = useState<{ type: 'ok' | 'error'; tekst: string }>();

  const haalOp = useCallback(async () => {
    const antwoord = await fetch(ADRES);
    if (antwoord.status === 401) return window.location.assign('/inloggen/');
    if (!antwoord.ok) throw new Error(`Status ${antwoord.status}`);
    const inhoud: { aanvragen: Aanvraag[] } = await antwoord.json();
    return setAanvragen(inhoud.aanvragen);
  }, []);

  useEffect(() => {
    haalOp().catch(() => setMelding({ type: 'error', tekst: STORING }));
  }, [haalOp]);

  const behandel = async ({ id, naam }: Aanvraag, actie: Actie) => {
    setBezig(id);
    setMelding(undefined);
    try {
      const antwoord = await fetch(`${ADRES}/${id}/${actie}`, { method: 'POST' });
      if (antwoord.ok) {
        const tekst = actie === 'toelaten' ? `${naam} is toegelaten en krijgt een e-mail.` : `${naam} is geweigerd.`;
        setMelding({ type: 'ok', tekst });
      } else {
        const { fout }: { fout?: string } = await antwoord.json();
        setMelding({ type: 'error', tekst: fout ? `${fout}.` : STORING });
      }
      await haalOp();
    } catch {
      setMelding({ type: 'error', tekst: STORING });
    } finally {
      setBezig(undefined);
    }
  };

  return (
    <>
      <div role="status">
        {melding && (
          <Alert type={melding.type}>
            <Paragraph>{melding.tekst}</Paragraph>
          </Alert>
        )}
      </div>
      {aanvragen?.length === 0 && <Paragraph>Er zijn nog geen aanvragen.</Paragraph>}
      {aanvragen && aanvragen.length > 0 && (
        <TableContainer>
          <Table>
            <TableCaption>Alle aanvragen, de nieuwste bovenaan</TableCaption>
            <TableHeader>
              <TableRow>
                {['Naam', 'Organisatie', 'Functie', 'E-mailadres', 'Gesprek', 'Status', 'Actie'].map((kop) => (
                  <TableHeaderCell key={kop} scope="col">
                    {kop}
                  </TableHeaderCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {aanvragen.map((aanvraag) => (
                <TableRow key={aanvraag.id}>
                  <TableCell>{aanvraag.naam}</TableCell>
                  <TableCell>{aanvraag.organisatie}</TableCell>
                  <TableCell>{aanvraag.functie}</TableCell>
                  <TableCell className="mijninkomen-beheer__email">{aanvraag.email}</TableCell>
                  <TableCell>{datum(aanvraag.gesprekDatum)}</TableCell>
                  <TableCell>
                    <Badge soort="status">{aanvraag.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {aanvraag.status === 'in behandeling' && (
                      <ButtonGroup>
                        <Button
                          appearance="primary-action-button"
                          aria-label={`${aanvraag.naam} toelaten`}
                          disabled={bezig === aanvraag.id}
                          onClick={() => behandel(aanvraag, 'toelaten')}
                        >
                          Toelaten
                        </Button>
                        <Button
                          appearance="secondary-action-button"
                          aria-label={`${aanvraag.naam} weigeren`}
                          disabled={bezig === aanvraag.id}
                          onClick={() => behandel(aanvraag, 'weigeren')}
                        >
                          Weigeren
                        </Button>
                      </ButtonGroup>
                    )}
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
