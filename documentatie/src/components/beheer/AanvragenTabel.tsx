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
import { type Actie, BeoordeelDialoog } from './BeoordeelDialoog';
import './beheer.css';

interface Aanvraag {
  id: string;
  naam: string;
  organisatie: string;
  functie: string;
  email: string;
  gesprekDatum: string;
  status: 'in behandeling' | 'toegelaten' | 'geweigerd';
  redenWeigering: string | null;
}

const STATUS_TEKST: Record<Aanvraag['status'], string> = {
  'in behandeling': 'in behandeling',
  toegelaten: 'geaccepteerd',
  geweigerd: 'geweigerd',
};

const ADRES = '/api/beheer/aanvragen';
const STORING = 'Er ging iets mis. Probeer het later opnieuw.';

const datum = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });

export const AanvragenTabel = () => {
  const [aanvragen, setAanvragen] = useState<Aanvraag[]>();
  const [bezig, setBezig] = useState<string>();
  const [melding, setMelding] = useState<{ type: 'ok' | 'error'; tekst: string }>();
  const [keuze, setKeuze] = useState<{ aanvraag: Aanvraag; actie: Actie }>();
  const [redenFout, setRedenFout] = useState<string>();

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

  const kies = (aanvraag: Aanvraag, actie: Actie) => {
    setRedenFout(undefined);
    setKeuze({ aanvraag, actie });
  };

  const behandel = async ({ id, naam }: Aanvraag, actie: Actie, reden?: string) => {
    setBezig(id);
    setMelding(undefined);
    try {
      const antwoord = await fetch(`${ADRES}/${id}/${actie}`, {
        method: 'POST',
        ...(reden === undefined
          ? {}
          : { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reden }) }),
      });
      if (antwoord.status === 422) {
        const { fouten }: { fouten?: { reden?: string } } = await antwoord.json();
        return setRedenFout(fouten?.reden ?? STORING);
      }
      setKeuze(undefined);
      if (antwoord.ok) {
        const tekst =
          actie === 'toelaten'
            ? `${naam} is geaccepteerd en krijgt een e-mail om een account in te stellen.`
            : `${naam} is geweigerd en krijgt een e-mail met de reden.`;
        setMelding({ type: 'ok', tekst });
      } else {
        const { fout }: { fout?: string } = await antwoord.json();
        setMelding({ type: 'error', tekst: fout ? `${fout}.` : STORING });
      }
      return await haalOp();
    } catch {
      setKeuze(undefined);
      return setMelding({ type: 'error', tekst: STORING });
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
                    <Badge soort="status">{STATUS_TEKST[aanvraag.status]}</Badge>
                    {aanvraag.redenWeigering && (
                      <p className="mijninkomen-beheer__reden">Reden: {aanvraag.redenWeigering}</p>
                    )}
                  </TableCell>
                  <TableCell>
                    {aanvraag.status === 'in behandeling' && (
                      <ButtonGroup>
                        <Button
                          appearance="primary-action-button"
                          aria-label={`${aanvraag.naam} accepteren`}
                          disabled={bezig === aanvraag.id}
                          onClick={() => kies(aanvraag, 'toelaten')}
                        >
                          Accepteren
                        </Button>
                        <Button
                          appearance="secondary-action-button"
                          aria-label={`${aanvraag.naam} weigeren`}
                          disabled={bezig === aanvraag.id}
                          onClick={() => kies(aanvraag, 'weigeren')}
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
      {keuze && (
        <BeoordeelDialoog
          key={`${keuze.aanvraag.id}-${keuze.actie}`}
          naam={keuze.aanvraag.naam}
          actie={keuze.actie}
          bezig={bezig === keuze.aanvraag.id}
          redenFout={redenFout}
          onBevestig={(reden) => behandel(keuze.aanvraag, keuze.actie, reden)}
          onAnnuleer={() => setKeuze(undefined)}
        />
      )}
    </>
  );
};
