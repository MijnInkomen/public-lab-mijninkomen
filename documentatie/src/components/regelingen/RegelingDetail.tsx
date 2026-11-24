import {
  Alert,
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
import type { ReactNode } from 'react';
import { Badge } from '../home/Badge';
import { Link } from '../Link';
import type { Regeling, Tekst } from './types';
import { useRegelingen } from './useRegelingen';
import './regelingen.css';

/** Plekken die gemeenten zelf invullen staan schuingedrukt, net als in de bronbestanden. */
const VrijeTekst = ({ tekst, aanTeVullen }: Tekst) =>
  aanTeVullen ? (
    <Paragraph className="mijninkomen-regelingen__aan-te-vullen">
      <em>{tekst}</em>
    </Paragraph>
  ) : (
    <Paragraph>{tekst}</Paragraph>
  );

const Blok = ({ id, titel, children }: { id: string; titel: string; children: ReactNode }) => (
  <section aria-labelledby={id} className="mijninkomen-regelingen__blok">
    <Heading level={2} id={id}>
      {titel}
    </Heading>
    {children}
  </section>
);

const Inhoud = ({ regeling }: { regeling: Regeling }) => (
  <>
    {regeling.intro && <VrijeTekst {...regeling.intro} />}

    {regeling.opmerking && (
      <Alert type="warning">
        <Heading level={2}>{regeling.opmerking.titel}</Heading>
        <Paragraph>{regeling.opmerking.tekst}</Paragraph>
      </Alert>
    )}

    <Blok id="regeling-gemeenten" titel="Welke gemeenten gebruiken deze regeling?">
      <TableContainer>
        <Table>
          <TableCaption>Gemeenten die {regeling.naam} gebruiken</TableCaption>
          <TableHeader>
            <TableRow>
              {['Gemeente', 'Status'].map((kop) => (
                <TableHeaderCell key={kop} scope="col">
                  {kop}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {regeling.gemeenten.map(({ gemeente, status }) => (
              <TableRow key={gemeente}>
                <TableCell>{gemeente}</TableCell>
                <TableCell>
                  <Badge soort="status">{status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Blok>

    <Blok id="regeling-werk" titel="Waar wordt aan gewerkt?">
      <TableContainer>
        <Table>
          <TableCaption>Lopende en geplande onderwerpen voor {regeling.naam}</TableCaption>
          <TableHeader>
            <TableRow>
              {['Onderwerp', 'Status', 'Planning'].map((kop) => (
                <TableHeaderCell key={kop} scope="col">
                  {kop}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {regeling.werk.map(({ onderwerp, status, planning }) => (
              <TableRow key={onderwerp}>
                <TableCell>{onderwerp}</TableCell>
                <TableCell>
                  <Badge soort="status">{status}</Badge>
                </TableCell>
                <TableCell>{planning}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Blok>

    <Blok id="regeling-lokaal" titel="Lokale implementatie">
      <VrijeTekst {...regeling.lokaleImplementatie} />
    </Blok>

    <Blok id="regeling-lessen" titel="Geleerde lessen">
      <ul className="mijninkomen-regelingen__lijst">
        {regeling.geleerdeLessen.map(({ tekst, aanTeVullen }) => (
          <li key={tekst} className={aanTeVullen ? 'mijninkomen-regelingen__aan-te-vullen' : undefined}>
            {aanTeVullen ? <em>{tekst}</em> : tekst}
          </li>
        ))}
      </ul>
    </Blok>

    <Blok id="regeling-vragen" titel="Wie kun je vragen?">
      {regeling.contactTekst && <VrijeTekst {...regeling.contactTekst} />}
      {regeling.contactPersonen.length > 0 && (
        <TableContainer>
          <Table>
            <TableCaption>Contactpersonen voor {regeling.naam}</TableCaption>
            <TableHeader>
              <TableRow>
                {['Wie', 'Rol'].map((kop) => (
                  <TableHeaderCell key={kop} scope="col">
                    {kop}
                  </TableHeaderCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {regeling.contactPersonen.map(({ wie, rol, aanTeVullen }) => (
                <TableRow key={wie}>
                  <TableCell className={aanTeVullen ? 'mijninkomen-regelingen__aan-te-vullen' : undefined}>
                    {aanTeVullen ? <em>{wie}</em> : wie}
                  </TableCell>
                  <TableCell>{rol}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Blok>

    <Blok id="regeling-bronnen" titel="Bronnen">
      <ul className="mijninkomen-regelingen__lijst">
        {regeling.bronnen.map((bron) => (
          <li key={bron}>{bron}</li>
        ))}
      </ul>
    </Blok>
  </>
);

export const RegelingDetail = ({ id }: { id: string }) => {
  const inhoud = useRegelingen();
  const regeling = inhoud?.regelingen.find((item) => item.id === id);

  return (
    <>
      {!inhoud && <Paragraph>De regeling wordt geladen…</Paragraph>}
      {inhoud && !regeling && <Paragraph>Deze regeling staat niet in de documentatie.</Paragraph>}
      {regeling && <Inhoud regeling={regeling} />}

      <Paragraph className="mijninkomen-regelingen__terug">
        <Link href="/regelingen/">Terug naar alle regelingen</Link>
      </Paragraph>
    </>
  );
};
