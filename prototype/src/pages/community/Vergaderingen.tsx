/**
 * NIVEAU 2 › Vergaderingen (vergaderondersteuning)
 * Vaste agenda's per overleg, een doorzoekbaar besluitenlogboek en de actielijst.
 * De filters werken direct; het aantal resultaten wordt voorgelezen (aria-live).
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import { useState } from 'react';
import { Badge } from '../../components/Badge/Badge';
import '../../components/Formulier/Formulier.css';
import {
  actieStatussen,
  acties,
  alleGemeenten,
  besluitStatussen,
  besluiten,
  gebruiker,
  overleggen,
  vergaderingen,
} from '../../content/community';
import { CommunityPagina, Datum, TabelVak } from './CommunityPagina';

function BesluitenLogboek() {
  const [zoek, setZoek] = useState('');
  const [status, setStatus] = useState('');
  const [gemeente, setGemeente] = useState('');

  const resultaat = besluiten.filter(
    (b) =>
      (!zoek || b.besluit.toLowerCase().includes(zoek.toLowerCase())) &&
      (!status || b.status === status) &&
      (!gemeente || b.gemeenten === 'Alle' || b.gemeenten.includes(gemeente as never)),
  );

  return (
    <>
      <div className="mijninkomen-filters">
        <div className="mijninkomen-formulier__veld">
          <label htmlFor="b-zoek" className="mijninkomen-formulier__label">Zoeken</label>
          <input id="b-zoek" type="search" className="mijninkomen-formulier__invoer" value={zoek} onChange={(e) => setZoek(e.target.value)} />
        </div>
        <div className="mijninkomen-formulier__veld">
          <label htmlFor="b-status" className="mijninkomen-formulier__label">Status</label>
          <select id="b-status" className="mijninkomen-formulier__invoer" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Alle statussen</option>
            {besluitStatussen.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="mijninkomen-formulier__veld">
          <label htmlFor="b-gemeente" className="mijninkomen-formulier__label">Gemeente</label>
          <select id="b-gemeente" className="mijninkomen-formulier__invoer" value={gemeente} onChange={(e) => setGemeente(e.target.value)}>
            <option value="">Alle gemeenten</option>
            {alleGemeenten.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>
      {/* aria-live: schermlezers horen hoeveel besluiten er zijn na het filteren */}
      <p className="mijninkomen-filters__aantal" aria-live="polite">
        {resultaat.length === 1 ? '1 besluit' : `${resultaat.length} besluiten`}
      </p>
      <TabelVak label="Besluitenlogboek">
        <table className="mijninkomen-tabel">
          <thead>
            <tr>
              <th scope="col">Datum</th>
              <th scope="col">Besluit</th>
              <th scope="col">Overleg</th>
              <th scope="col">Gemeenten</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {resultaat.map((b) => (
              <tr key={b.besluit}>
                <td><Datum iso={b.datum} /></td>
                <td>{b.besluit}</td>
                <td className="mijninkomen-tabel__klein">{b.overleg}</td>
                <td>{b.gemeenten === 'Alle' ? 'Alle gemeenten' : b.gemeenten.join(', ')}</td>
                <td><Badge soort="status">{b.status}</Badge></td>
              </tr>
            ))}
            {resultaat.length === 0 && (
              <tr>
                <td colSpan={5}>Geen besluiten gevonden. Probeer een ander woord of filter.</td>
              </tr>
            )}
          </tbody>
        </table>
      </TabelVak>
    </>
  );
}

function Actielijst() {
  const [status, setStatus] = useState('');
  const [alleenMijn, setAlleenMijn] = useState(false);

  const resultaat = acties.filter(
    (a) =>
      (!status || a.status === status) &&
      (!alleenMijn || a.eigenaar === gebruiker.naam || a.gemeente === gebruiker.gemeente),
  );

  return (
    <>
      <div className="mijninkomen-filters">
        <div className="mijninkomen-formulier__veld">
          <label htmlFor="a-status" className="mijninkomen-formulier__label">Status</label>
          <select id="a-status" className="mijninkomen-formulier__invoer" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Alle statussen</option>
            {actieStatussen.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="mijninkomen-filters__vinkje">
          <input id="a-mijn" type="checkbox" checked={alleenMijn} onChange={(e) => setAlleenMijn(e.target.checked)} />
          <label htmlFor="a-mijn">Alleen acties van mij of gemeente {gebruiker.gemeente}</label>
        </div>
      </div>
      <p className="mijninkomen-filters__aantal" aria-live="polite">
        {resultaat.length === 1 ? '1 actie' : `${resultaat.length} acties`}
      </p>
      <TabelVak label="Actielijst">
        <table className="mijninkomen-tabel">
          <thead>
            <tr>
              <th scope="col">Actie</th>
              <th scope="col">Eigenaar</th>
              <th scope="col">Landelijk of lokaal</th>
              <th scope="col">Streefdatum</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {resultaat.map((a) => (
              <tr key={a.actie}>
                <td>{a.actie}</td>
                <td>
                  {a.eigenaar}
                  <br />
                  <span className="mijninkomen-tabel__klein">{a.gemeente === 'Alle' ? 'Alle gemeenten' : `Gemeente ${a.gemeente}`}</span>
                </td>
                <td>{a.soort}</td>
                <td><Datum iso={a.streefdatum} /></td>
                <td><Badge soort="status">{a.status}</Badge></td>
              </tr>
            ))}
            {resultaat.length === 0 && (
              <tr>
                <td colSpan={5}>Geen acties gevonden.</td>
              </tr>
            )}
          </tbody>
        </table>
      </TabelVak>
    </>
  );
}

export function Vergaderingen() {
  return (
    <CommunityPagina titel={vergaderingen.titel} tekst={vergaderingen.tekst}>
      {/* VASTE AGENDA'S */}
      <section className="mijninkomen-c-sectie" aria-labelledby="c-agendas">
        <Heading level={2} id="c-agendas">{vergaderingen.agendaTitel}</Heading>
        <Paragraph>{vergaderingen.agendaTekst}</Paragraph>
        <ul className="mijninkomen-c-agendas">
          {overleggen.map((o) => (
            <li key={o.id} id={o.id}>
              <Heading level={3}>{o.naam}</Heading>
              <dl>
                <dt>Wie</dt>
                <dd>{o.wie}</dd>
                <dt>Hoe vaak</dt>
                <dd>{o.hoeVaak}</dd>
                <dt>Volgende keer</dt>
                <dd>
                  <Datum iso={o.volgende.datum} />, {o.volgende.tijd}, {o.volgende.waar}
                </dd>
              </dl>
              <p className="mijninkomen-formulier__label">Vaste agenda</p>
              <ol>
                {o.agenda.map((punt) => (
                  <li key={punt}>{punt}</li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      </section>

      <section id="besluitenlogboek" className="mijninkomen-c-sectie" aria-labelledby="c-besluitenlog">
        <Heading level={2} id="c-besluitenlog">{vergaderingen.besluitenTitel}</Heading>
        <Paragraph>{vergaderingen.besluitenTekst}</Paragraph>
        <BesluitenLogboek />
      </section>

      <section id="actielijst" className="mijninkomen-c-sectie" aria-labelledby="c-actielijst">
        <Heading level={2} id="c-actielijst">{vergaderingen.actiesTitel}</Heading>
        <Paragraph>{vergaderingen.actiesTekst}</Paragraph>
        <Actielijst />
      </section>
    </CommunityPagina>
  );
}
