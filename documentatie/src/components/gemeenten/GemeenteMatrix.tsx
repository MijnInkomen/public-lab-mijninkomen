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
import { Badge } from '../home/Badge';
import { Link } from '../Link';
import type { ActieveRegeling, Gemeente, Rol } from './types';
import { useGemeenten } from './useGemeenten';
import './gemeenten.css';

/** Het vinkje is alleen een beeld; de voorleessoftware krijgt de rol in woorden. */
const RolCel = ({ rol, gemeente, actief }: { rol: Rol; gemeente: string; actief: boolean }) => (
  <TableCell className="mijninkomen-gemeenten__rol">
    <span aria-hidden="true">{actief ? '✔' : '–'}</span>
    <span className="sr-only">
      {gemeente} {rol.naam.toLowerCase()}
      {actief ? '' : ' niet'}
    </span>
  </TableCell>
);

const RegelingenCel = ({ regelingen }: { regelingen: ActieveRegeling[] }) =>
  regelingen.length === 0 ? (
    <TableCell className="mijninkomen-gemeenten__aan-te-vullen">
      <em>Nog geen regeling actief</em>
    </TableCell>
  ) : (
    <TableCell>
      <ul className="mijninkomen-gemeenten__regelingen">
        {regelingen.map(({ id, naam, status }) => (
          <li key={id}>
            <Link href={`/regelingen/${id}/`}>{naam}</Link> <Badge soort="status">{status}</Badge>
          </li>
        ))}
      </ul>
    </TableCell>
  );

export const GemeenteMatrix = () => {
  const gegevens = useGemeenten();

  if (!gegevens) return <Paragraph>De matrix wordt geladen…</Paragraph>;

  const { gemeenten, regelingenPerGemeente } = gegevens;
  const regelingenVan = (gemeente: Gemeente) => regelingenPerGemeente[gemeente.naam] ?? [];

  return (
    <>
      {gemeenten.voorbeelddata && (
        <Alert type="info">
          <Paragraph>
            De bestuurlijke rollen zijn nog voorbeeldgegevens. Gemeenten vullen hun eigen rol en contactpersoon aan.
          </Paragraph>
        </Alert>
      )}

      <Paragraph>{gemeenten.toelichting}</Paragraph>

      <section aria-labelledby="gemeenten-rollen" className="mijninkomen-gemeenten__blok">
        <Heading level={2} id="gemeenten-rollen">
          Wat de rollen betekenen
        </Heading>
        <dl className="mijninkomen-gemeenten__rollen">
          {gemeenten.rollen.map(({ id, naam, uitleg }) => (
            <div key={id}>
              <dt>{naam}</dt>
              <dd>{uitleg}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="gemeenten-matrix" className="mijninkomen-gemeenten__blok">
        <Heading level={2} id="gemeenten-matrix">
          Matrix per gemeente
        </Heading>
        <TableContainer>
          <Table>
            <TableCaption>Bestuurlijke rol, actieve regelingen en contactpersoon per gemeente</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHeaderCell scope="col">Gemeente</TableHeaderCell>
                {gemeenten.rollen.map(({ id, naam }) => (
                  <TableHeaderCell key={id} scope="col">
                    {naam}
                  </TableHeaderCell>
                ))}
                <TableHeaderCell scope="col">Actieve regelingen</TableHeaderCell>
                <TableHeaderCell scope="col">Contactpersoon</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gemeenten.gemeenten.map((gemeente) => (
                <TableRow key={gemeente.id}>
                  <TableHeaderCell scope="row">{gemeente.naam}</TableHeaderCell>
                  {gemeenten.rollen.map((rol) => (
                    <RolCel
                      key={rol.id}
                      rol={rol}
                      gemeente={gemeente.naam}
                      actief={gemeente.rollen.includes(rol.id)}
                    />
                  ))}
                  <RegelingenCel regelingen={regelingenVan(gemeente)} />
                  <TableCell
                    className={gemeente.contactpersoon.aanTeVullen ? 'mijninkomen-gemeenten__aan-te-vullen' : undefined}
                  >
                    {gemeente.contactpersoon.aanTeVullen ? (
                      <em>{gemeente.contactpersoon.wie}</em>
                    ) : (
                      gemeente.contactpersoon.wie
                    )}
                    <span className="mijninkomen-gemeenten__rolnaam">{gemeente.contactpersoon.rol}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </>
  );
};
