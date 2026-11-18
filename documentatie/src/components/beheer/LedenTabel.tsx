import {
  Alert,
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
import { useCallback, useEffect, useState } from 'react';
import { Badge } from '../home/Badge';
import { functies } from '../toegang/content';
import './beheer.css';

type Rol = 'lid' | 'beheerder' | 'hoofdbeheerder';

interface Lid {
  id: string;
  naam: string;
  email: string;
  rol: Rol;
  soort: string | null;
}

type Wijziging = { rol: Exclude<Rol, 'hoofdbeheerder'> } | { soort: string };

const ADRES = '/api/beheer/leden';
const STORING = 'Er ging iets mis. Probeer het later opnieuw.';
const ROL_TEKST: Record<Rol, string> = { lid: 'Lid', beheerder: 'Beheerder', hoofdbeheerder: 'Hoofdbeheerder' };

export const LedenTabel = () => {
  const [leden, setLeden] = useState<Lid[]>();
  const [bezig, setBezig] = useState<string>();
  const [melding, setMelding] = useState<{ type: 'ok' | 'error'; tekst: string }>();

  const haalOp = useCallback(async () => {
    const antwoord = await fetch(ADRES);
    if (antwoord.status === 401) return window.location.assign('/inloggen/');
    if (antwoord.status === 403) return window.location.assign('/geen-toegang/');
    if (!antwoord.ok) throw new Error(`Status ${antwoord.status}`);
    const inhoud: { leden: Lid[] } = await antwoord.json();
    return setLeden(inhoud.leden);
  }, []);

  useEffect(() => {
    haalOp().catch(() => setMelding({ type: 'error', tekst: STORING }));
  }, [haalOp]);

  const wijzig = async ({ id, naam }: Lid, wijziging: Wijziging) => {
    setBezig(id);
    setMelding(undefined);
    try {
      const antwoord = await fetch(`${ADRES}/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(wijziging),
      });
      if (antwoord.ok) {
        const tekst =
          'rol' in wijziging
            ? `${naam} is nu ${ROL_TEKST[wijziging.rol].toLowerCase()}. Dit werkt direct door in de rechten.`
            : `Het soort communitylid van ${naam} is nu: ${wijziging.soort}.`;
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
      {leden?.length === 0 && <Paragraph>Er zijn nog geen communityleden.</Paragraph>}
      {leden && leden.length > 0 && (
        <TableContainer>
          <Table>
            <TableCaption>Alle communityleden, op naam</TableCaption>
            <TableHeader>
              <TableRow>
                {['Naam', 'E-mailadres', 'Rol', 'Soort communitylid'].map((kop) => (
                  <TableHeaderCell key={kop} scope="col">
                    {kop}
                  </TableHeaderCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {leden.map((lid) => (
                <TableRow key={lid.id}>
                  <TableCell>{lid.naam}</TableCell>
                  <TableCell className="mijninkomen-beheer__email">{lid.email}</TableCell>
                  <TableCell>
                    {lid.rol === 'hoofdbeheerder' ? (
                      <>
                        <Badge soort="status">{ROL_TEKST.hoofdbeheerder}</Badge>
                        <p className="mijninkomen-beheer__reden">Deze rol kan niet veranderen.</p>
                      </>
                    ) : (
                      <Select
                        aria-label={`Rol van ${lid.naam}`}
                        className="mijninkomen-beheer__keuze"
                        value={lid.rol}
                        disabled={bezig === lid.id}
                        onChange={(gebeurtenis) =>
                          wijzig(lid, { rol: gebeurtenis.target.value as Exclude<Rol, 'hoofdbeheerder'> })
                        }
                      >
                        <SelectOption value="lid">{ROL_TEKST.lid}</SelectOption>
                        <SelectOption value="beheerder">{ROL_TEKST.beheerder}</SelectOption>
                      </Select>
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                      aria-label={`Soort communitylid van ${lid.naam}`}
                      className="mijninkomen-beheer__keuze"
                      value={lid.soort ?? ''}
                      disabled={bezig === lid.id}
                      onChange={(gebeurtenis) => wijzig(lid, { soort: gebeurtenis.target.value })}
                    >
                      {!lid.soort && (
                        <SelectOption value="" disabled>
                          Nog niet gekozen
                        </SelectOption>
                      )}
                      {functies.map((functie) => (
                        <SelectOption key={functie} value={functie}>
                          {functie}
                        </SelectOption>
                      ))}
                    </Select>
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
