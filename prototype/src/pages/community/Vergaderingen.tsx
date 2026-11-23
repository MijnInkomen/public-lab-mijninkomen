/**
 * NIVEAU 2 › Vergaderondersteuning
 * Drie eigen pagina's (keuze Isabella: elk subkopje uit het zijmenu een eigen pagina):
 * - Agenda's (/community/vergaderingen): agenda met dag, week en maand (zie Agenda.tsx)
 * - Besluitenlogboek (/community/vergaderingen/besluitenlogboek): doorzoekbaar
 * - Actielijst (/community/vergaderingen/actielijst)
 * De filters werken direct; het aantal resultaten wordt voorgelezen (aria-live).
 * Het besluitenlogboek kun je ook filteren op datum (document niveau 2).
 */
import { useState } from 'react';
import { Badge } from '../../components/Badge/Badge';
import '../../components/Formulier/Formulier.css';
import {
  actieStatussen,
  acties,
  alleGemeenten,
  besluitStatussen,
  besluiten,
  isMijnActie,
  vergaderingen,
} from '../../content/community';
import { AgendaKalender } from './Agenda';
import { CommunityPagina, Datum, TabelVak } from './CommunityPagina';
import { useGebruiker } from './gebruiker';

function BesluitenLogboek() {
  const [zoek, setZoek] = useState('');
  const [status, setStatus] = useState('');
  const [gemeente, setGemeente] = useState('');
  const [vanaf, setVanaf] = useState('');
  const [tot, setTot] = useState('');

  const resultaat = besluiten.filter(
    (b) =>
      (!zoek || b.besluit.toLowerCase().includes(zoek.toLowerCase())) &&
      (!status || b.status === status) &&
      (!gemeente || b.gemeenten === 'Alle' || b.gemeenten.includes(gemeente as never)) &&
      // Datums als 'JJJJ-MM-DD' kun je gewoon als tekst vergelijken
      (!vanaf || b.datum >= vanaf) &&
      (!tot || b.datum <= tot),
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
        <div className="mijninkomen-formulier__veld">
          <label htmlFor="b-vanaf" className="mijninkomen-formulier__label">Vanaf datum</label>
          <input id="b-vanaf" type="date" className="mijninkomen-formulier__invoer" value={vanaf} max={tot || undefined} onChange={(e) => setVanaf(e.target.value)} />
        </div>
        <div className="mijninkomen-formulier__veld">
          <label htmlFor="b-tot" className="mijninkomen-formulier__label">Tot en met datum</label>
          <input id="b-tot" type="date" className="mijninkomen-formulier__invoer" value={tot} min={vanaf || undefined} onChange={(e) => setTot(e.target.value)} />
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
  const gebruiker = useGebruiker();
  const [status, setStatus] = useState('');
  const [alleenMijn, setAlleenMijn] = useState(false);

  const resultaat = acties.filter(
    (a) =>
      (!status || a.status === status) &&
      (!alleenMijn || isMijnActie(gebruiker, a)),
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
          <label htmlFor="a-mijn">
            {gebruiker.gemeente === 'Programmateam'
              ? 'Alleen acties van mij en landelijke acties'
              : `Alleen acties van mij of gemeente ${gebruiker.gemeente}`}
          </label>
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

/** Agenda's: een agenda met dag-, week- en maandweergave (keuze Isabella) */
export function VergaderingenAgendas() {
  return (
    <CommunityPagina onderdeel={vergaderingen.titel} titel={vergaderingen.agendaTitel} tekst={vergaderingen.agendaTekst}>
      <AgendaKalender />
    </CommunityPagina>
  );
}

/** Besluitenlogboek: alle besluiten, met zoeken en filteren */
export function VergaderingenBesluiten() {
  return (
    <CommunityPagina onderdeel={vergaderingen.titel} titel={vergaderingen.besluitenTitel} tekst={vergaderingen.besluitenTekst}>
      <BesluitenLogboek />
    </CommunityPagina>
  );
}

/** Actielijst: landelijke en lokale acties */
export function VergaderingenActies() {
  return (
    <CommunityPagina onderdeel={vergaderingen.titel} titel={vergaderingen.actiesTitel} tekst={vergaderingen.actiesTekst}>
      <Actielijst />
    </CommunityPagina>
  );
}
