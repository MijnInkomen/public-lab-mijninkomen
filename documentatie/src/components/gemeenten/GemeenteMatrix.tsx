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

/** Per gemeente de rollen, de actieve regelingen en de persoon om mee af te stemmen. */
const GemeenteBlok = ({
  gemeente,
  rollen,
  regelingen,
}: {
  gemeente: Gemeente;
  rollen: Rol[];
  regelingen: ActieveRegeling[];
}) => {
  const eigenRollen = rollen.filter(({ id }) => gemeente.rollen.includes(id));
  const { wie, rol, aanTeVullen } = gemeente.contactpersoon;

  return (
    <article id={gemeente.id} className="mijninkomen-gemeenten__gemeente">
      <Heading level={3}>{gemeente.naam}</Heading>
      <Paragraph className="mijninkomen-gemeenten__meta">
        {eigenRollen.length > 0
          ? `Bestuurlijke rol: ${eigenRollen.map(({ naam }) => naam.toLowerCase()).join(' en ')}`
          : 'Bestuurlijke rol: nog niet vastgesteld'}
      </Paragraph>

      <Heading level={4}>Actieve regelingen</Heading>
      {regelingen.length === 0 ? (
        <Paragraph className="mijninkomen-gemeenten__aan-te-vullen">
          <em>Er is hier nog geen regeling actief.</em>
        </Paragraph>
      ) : (
        <ul className="mijninkomen-gemeenten__lijst">
          {regelingen.map(({ id, naam, status }) => (
            <li key={id}>
              <Link href={`/regelingen/${id}/`}>{naam}</Link> <Badge soort="status">{status}</Badge>
            </li>
          ))}
        </ul>
      )}

      <Heading level={4}>Afstemmen met</Heading>
      <Paragraph className={aanTeVullen ? 'mijninkomen-gemeenten__aan-te-vullen' : undefined}>
        {aanTeVullen ? <em>{wie}</em> : <strong>{wie}</strong>} — {rol}
      </Paragraph>
    </article>
  );
};

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
                  <TableHeaderCell scope="row">
                    <a href={`#${gemeente.id}`}>{gemeente.naam}</a>
                  </TableHeaderCell>
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

      <section aria-labelledby="gemeenten-per-stad" className="mijninkomen-gemeenten__blok">
        <Heading level={2} id="gemeenten-per-stad">
          Per gemeente
        </Heading>
        {gemeenten.gemeenten.map((gemeente) => (
          <GemeenteBlok
            key={gemeente.id}
            gemeente={gemeente}
            rollen={gemeenten.rollen}
            regelingen={regelingenVan(gemeente)}
          />
        ))}
        <Paragraph>{gemeenten.contactTekst}</Paragraph>
      </section>

      <Alert type="warning">
        <Heading level={2}>{gemeenten.oproep.titel}</Heading>
        <Paragraph>{gemeenten.oproep.tekst}</Paragraph>
      </Alert>

      <section aria-labelledby="gemeenten-bronnen" className="mijninkomen-gemeenten__blok">
        <Heading level={2} id="gemeenten-bronnen">
          Bronnen
        </Heading>
        <ul className="mijninkomen-gemeenten__lijst">
          {gemeenten.bronnen.map((bron) => (
            <li key={bron}>{bron}</li>
          ))}
        </ul>
      </section>
    </>
  );
};
