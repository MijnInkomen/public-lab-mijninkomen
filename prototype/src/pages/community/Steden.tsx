/**
 * NIVEAU 2 › Stand van zaken steden
 * Twee eigen pagina's (keuze Isabella: elk subkopje uit het zijmenu een eigen pagina):
 * 1. Rollen en contactpersonen (/community/steden): per gemeente de rol
 *    (bouwt / betaalt mee, toetreder) én de contactpersoon (feedback Vincent).
 * 2. Status per regeling (/community/steden/regelingen), met vier statussen
 *    (feedback Vincent: niet in gebruik, in onderzoek, in ontwikkeling, in gebruik).
 * De tabellen hebben echte koppen (th met scope), zodat schermlezers bij elke
 * cel voorlezen bij welke gemeente en regeling hij hoort.
 */
import { Link } from '@nl-design-system-candidate/link-react/css';
import { Badge } from '../../components/Badge/Badge';
import {
  alleGemeenten,
  contactpersonen,
  deelnemers,
  regelingStatussen,
  regelingUitleg,
  regelingen,
  regelingenPerGemeente,
  steden,
} from '../../content/community';
import { CommunityPagina, TabelVak } from './CommunityPagina';

const jaNee = (b: boolean) => (b ? 'Ja' : 'Nee');
const klasse = (s: string) => `mijninkomen-regeling mijninkomen-regeling--${s.toLowerCase().replace(/ /g, '-')}`;

/** Rollen en contactpersonen per gemeente */
export function StedenRollen() {
  return (
    <CommunityPagina onderdeel={steden.titel} titel={steden.rollenTitel} tekst={steden.rollenTekst}>
      <TabelVak label={steden.rollenTitel}>
        <table className="mijninkomen-tabel">
          <thead>
            <tr>
              <th scope="col">Gemeente</th>
              <th scope="col">Rol</th>
              <th scope="col">Bouwt mee</th>
              <th scope="col">Betaalt mee</th>
              <th scope="col">Doet mee sinds</th>
              <th scope="col">Contactpersoon</th>
            </tr>
          </thead>
          <tbody>
            {deelnemers.map((d) => {
              const c = contactpersonen.find((p) => p.gemeente === d.gemeente);
              return (
                <tr key={d.gemeente}>
                  <th scope="row">{d.gemeente}</th>
                  <td><Badge soort="status">{d.rol}</Badge></td>
                  <td>{jaNee(d.bouwtMee)}</td>
                  <td>{jaNee(d.betaaltMee)}</td>
                  <td>{d.sinds}</td>
                  <td>
                    {c && (
                      <>
                        <strong>{c.naam}</strong>
                        <br />
                        <span className="mijninkomen-tabel__klein">{c.rol}</span>
                        <br />
                        <Link href={`mailto:${c.email}`}>{c.email}</Link>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TabelVak>
    </CommunityPagina>
  );
}

/** Status van elke regeling per gemeente */
export function StedenRegelingen() {
  return (
    <CommunityPagina onderdeel={steden.titel} titel={steden.regelingenTitel} tekst={steden.regelingenTekst}>
      <dl className="mijninkomen-c-fasen">
        {regelingStatussen.map((r) => (
          <div key={r.status}>
            <dt><span className={klasse(r.status)}>{r.status}</span></dt>
            <dd>{r.uitleg}</dd>
          </div>
        ))}
      </dl>
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
                  <td key={regelingen[i]} className={klasse(s)}>
                    {s}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </TabelVak>
    </CommunityPagina>
  );
}
