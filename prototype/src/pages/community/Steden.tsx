/**
 * NIVEAU 2 › Stand van zaken steden
 * Rollenmatrix, regelingen per gemeente en contactpersonen.
 * De tabellen hebben echte koppen (th met scope), zodat schermlezers bij elke
 * cel voorlezen bij welke gemeente en regeling hij hoort.
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Link } from '@nl-design-system-candidate/link-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import { Badge } from '../../components/Badge/Badge';
import {
  alleGemeenten,
  contactpersonen,
  deelnemers,
  regelingUitleg,
  regelingen,
  regelingenPerGemeente,
  steden,
} from '../../content/community';
import { CommunityPagina, TabelVak } from './CommunityPagina';

const jaNee = (b: boolean) => (b ? 'Ja' : 'Nee');

export function Steden() {
  return (
    <CommunityPagina titel={steden.titel} tekst={steden.tekst}>
      {/* DEELNEMERS EN ROLLEN */}
      <section className="mijninkomen-c-sectie" aria-labelledby="c-rollen">
        <Heading level={2} id="c-rollen">{steden.rollenTitel}</Heading>
        <Paragraph>{steden.rollenTekst}</Paragraph>
        <TabelVak label={steden.rollenTitel}>
          <table className="mijninkomen-tabel">
            <thead>
              <tr>
                <th scope="col">Gemeente</th>
                <th scope="col">Rol</th>
                <th scope="col">Bouwt mee</th>
                <th scope="col">Betaalt mee</th>
                <th scope="col">Doet mee sinds</th>
              </tr>
            </thead>
            <tbody>
              {deelnemers.map((d) => (
                <tr key={d.gemeente}>
                  <th scope="row">{d.gemeente}</th>
                  <td><Badge soort="status">{d.rol}</Badge></td>
                  <td>{jaNee(d.bouwtMee)}</td>
                  <td>{jaNee(d.betaaltMee)}</td>
                  <td>{d.sinds}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabelVak>
      </section>

      {/* REGELINGEN PER GEMEENTE */}
      <section className="mijninkomen-c-sectie" aria-labelledby="c-regelingen">
        <Heading level={2} id="c-regelingen">{steden.regelingenTitel}</Heading>
        <Paragraph>{steden.regelingenTekst}</Paragraph>
        <TabelVak label={steden.regelingenTitel}>
          <table className="mijninkomen-tabel mijninkomen-tabel--matrix">
            <thead>
              <tr>
                <th scope="col">Gemeente</th>
                {regelingen.map((r) => (
                  <th scope="col" key={r}>
                    {r}
                    <br />
                    <span className="mijninkomen-tabel__klein">{regelingUitleg[r]}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {alleGemeenten.map((g) => (
                <tr key={g}>
                  <th scope="row">{g}</th>
                  {regelingenPerGemeente[g].map((s, i) => (
                    <td key={regelingen[i]} className={`mijninkomen-regeling mijninkomen-regeling--${s.replace(' ', '-').toLowerCase()}`}>
                      {s}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </TabelVak>
      </section>

      {/* CONTACTPERSONEN */}
      <section className="mijninkomen-c-sectie" aria-labelledby="c-contact">
        <Heading level={2} id="c-contact">{steden.contactTitel}</Heading>
        <Paragraph>{steden.contactTekst}</Paragraph>
        <ul className="mijninkomen-c-contacten">
          {contactpersonen.map((c) => (
            <li key={c.naam}>
              <strong>{c.naam}</strong>
              <p>
                {c.rol}, gemeente {c.gemeente}
              </p>
              <p>
                <Link href={`mailto:${c.email}`}>{c.email}</Link>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </CommunityPagina>
  );
}
