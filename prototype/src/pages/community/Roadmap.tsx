/**
 * NIVEAU 2 › Roadmap & backlog
 * De epics per tertiaal (T1, T2, T3) met hun fase, en een overzicht van de
 * koppeling met Jira en GitHub (één bron van waarheid).
 * Je kunt filteren op fase; de tijdlijn laat dan alleen die epics zien.
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import { useState } from 'react';
import { Badge } from '../../components/Badge/Badge';
import '../../components/Formulier/Formulier.css';
import { fasen, roadmap, synclog, tertialen } from '../../content/community';
import { CommunityPagina, TabelVak } from './CommunityPagina';

const syncIcoon = { Gelukt: '✓', Waarschuwing: '!', Mislukt: '✕' } as const;

export function Roadmap() {
  const [fase, setFase] = useState('');
  const aantal = tertialen.reduce((n, t) => n + t.epics.filter((e) => !fase || e.fase === fase).length, 0);

  return (
    <CommunityPagina titel={roadmap.titel} tekst={roadmap.tekst}>
      <section className="mijninkomen-c-sectie" aria-labelledby="c-fasen">
        <Heading level={2} id="c-fasen" appearance="level-3">{roadmap.fasenTitel}</Heading>
        <dl className="mijninkomen-c-fasen">
          {fasen.map((f) => (
            <div key={f.fase}>
              <dt><Badge soort="status">{f.fase}</Badge></dt>
              <dd>{f.uitleg}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mijninkomen-c-sectie" aria-labelledby="c-tijdlijn">
        <Heading level={2} id="c-tijdlijn" className="mijninkomen-visually-hidden">Tijdlijn</Heading>
        <div className="mijninkomen-filters">
          <div className="mijninkomen-formulier__veld">
            <label htmlFor="r-fase" className="mijninkomen-formulier__label">Laat zien</label>
            <select id="r-fase" className="mijninkomen-formulier__invoer" value={fase} onChange={(e) => setFase(e.target.value)}>
              <option value="">Alle fasen</option>
              {fasen.map((f) => (
                <option key={f.fase} value={f.fase}>Alleen {f.fase}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="mijninkomen-filters__aantal" aria-live="polite">
          {aantal === 1 ? '1 onderdeel' : `${aantal} onderdelen`}
        </p>
        <div className="mijninkomen-c-roadmap">
          {tertialen.map((t) => {
            const epics = t.epics.filter((e) => !fase || e.fase === fase);
            return (
              <section key={t.id} aria-labelledby={t.id} className={t.nu ? 'mijninkomen-c-roadmap__nu' : undefined}>
                <Heading level={3} id={t.id}>
                  {t.naam} {t.nu && <Badge soort="status">Nu</Badge>}
                </Heading>
                <p className="mijninkomen-c-roadmap__periode">{t.periode}</p>
                {epics.length > 0 ? (
                  <ul>
                    {epics.map((e) => (
                      <li key={e.naam}>
                        <span className="mijninkomen-visually-hidden">Fase: </span>
                        <Badge soort="status">{e.fase}</Badge>
                        <strong>{e.naam}</strong>
                        <span className="mijninkomen-tabel__klein">{e.gemeenten}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mijninkomen-c-roadmap__periode">Niets in deze fase.</p>
                )}
              </section>
            );
          })}
        </div>
      </section>

      <section className="mijninkomen-c-sectie" aria-labelledby="c-sync">
        <Heading level={2} id="c-sync">{roadmap.synclogTitel}</Heading>
        <Paragraph>{roadmap.synclogTekst}</Paragraph>
        <TabelVak label={roadmap.synclogTitel}>
          <table className="mijninkomen-tabel">
            <thead>
              <tr>
                <th scope="col">Bron</th>
                <th scope="col">Wat is er gebeurd?</th>
                <th scope="col">Wanneer</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {synclog.map((s) => (
                <tr key={s.bron + s.wanneer}>
                  <th scope="row">{s.bron}</th>
                  <td>{s.wat}</td>
                  <td className="mijninkomen-tabel__klein">{s.wanneer}</td>
                  <td>
                    {/* Icoon + tekst: niet alleen kleur (WCAG 1.4.1) */}
                    <span className={`mijninkomen-sync mijninkomen-sync--${s.status.toLowerCase()}`}>
                      <span aria-hidden="true">{syncIcoon[s.status]} </span>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabelVak>
      </section>
    </CommunityPagina>
  );
}
