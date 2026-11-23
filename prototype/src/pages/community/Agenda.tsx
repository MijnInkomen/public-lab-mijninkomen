/**
 * NIVEAU 2 › Vergaderondersteuning › Agenda's
 * Een echte agenda met de weergaven Dag, Week en Maand (keuze Isabella).
 * De overlegmomenten worden uitgerekend uit het vaste ritme van elk overleg
 * (zie overleggen en overlegMomenten in content/community.ts).
 *
 * Toegankelijkheid:
 * - Dag / Week / Maand zijn NLDS-knoppen met `toggle` en `pressed` (aria-pressed), zodat je
 *   hoort welke weergave aan staat.
 * - De periode (bijv. "november 2026") is een kop met aria-live: na Vorige of
 *   Volgende hoor je de nieuwe periode.
 * - De maand is een tabel met dagen als kolomkoppen. Elk overleg is een knop;
 *   de volledige datum staat erbij voor schermlezers.
 * - Klik je op een overleg, dan gaat de focus naar de details eronder.
 * - Op een telefoon kun je de maandtabel opzij scrollen; de week en de dag
 *   staan onder elkaar.
 */
import { Button } from '@nl-design-system-candidate/button-react/css';
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { useEffect, useState } from 'react';
import '../../components/Formulier/Formulier.css';
import { overlegMomenten, overleggen, type OverlegMoment } from '../../content/community';
import { TabelVak } from './CommunityPagina';

type Weergave = 'dag' | 'week' | 'maand';

// ── Hulpjes voor datums (altijd om 12.00 uur, zodat zomertijd niet in de weg zit) ──
const naarDatum = (iso: string) => new Date(`${iso}T12:00:00`);
const naarIso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const plusDagen = (iso: string, n: number) => {
  const d = naarDatum(iso);
  d.setDate(d.getDate() + n);
  return naarIso(d);
};
/** Maandag van de week waarin de datum valt */
const maandagVan = (iso: string) => {
  const d = naarDatum(iso);
  return plusDagen(iso, -((d.getDay() + 6) % 7));
};
const tekst = (iso: string, opties: Intl.DateTimeFormatOptions) => naarDatum(iso).toLocaleDateString('nl-NL', opties);
const voluit = (iso: string) => tekst(iso, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const vandaagIso = () => naarIso(new Date());
/** Eerste letter als hoofdletter: "november 2026" wordt "November 2026" */
const hoofdletter = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

const weekdagen = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'];

export function AgendaKalender() {
  const [weergave, setWeergave] = useState<Weergave>('maand');
  const [datum, setDatum] = useState(vandaagIso());
  const [filter, setFilter] = useState('');
  const [gekozen, setGekozen] = useState<OverlegMoment | null>(null);
  const vandaag = vandaagIso();

  // Na het kiezen van een overleg: focus naar de details (toetsenbord en schermlezer)
  useEffect(() => {
    if (gekozen) document.getElementById('agenda-details')?.focus();
  }, [gekozen]);

  // ── Welke periode laten we zien? ──
  const eersteVanMaand = `${datum.slice(0, 8)}01`;
  const laatsteVanMaand = (() => {
    const d = naarDatum(eersteVanMaand);
    d.setMonth(d.getMonth() + 1);
    d.setDate(0);
    return naarIso(d);
  })();
  let van = datum;
  let tot = datum;
  if (weergave === 'week') {
    van = maandagVan(datum);
    tot = plusDagen(van, 6);
  } else if (weergave === 'maand') {
    van = maandagVan(eersteVanMaand);
    tot = plusDagen(maandagVan(laatsteVanMaand), 6);
  }

  const momenten = overlegMomenten(van, tot).filter((m) => !filter || m.overleg.id === filter);
  const opDag = (iso: string) => momenten.filter((m) => m.datum === iso);

  const periode = hoofdletter(
    weergave === 'maand'
      ? tekst(datum, { month: 'long', year: 'numeric' })
      : weergave === 'week'
        ? `Week van ${tekst(van, { day: 'numeric', month: 'long' })} tot en met ${tekst(tot, { day: 'numeric', month: 'long', year: 'numeric' })}`
        : voluit(datum),
  );

  // ── Vorige / Volgende ──
  const verschuif = (richting: 1 | -1) => {
    setGekozen(null);
    if (weergave === 'dag') setDatum(plusDagen(datum, richting));
    else if (weergave === 'week') setDatum(plusDagen(datum, 7 * richting));
    else {
      const d = naarDatum(eersteVanMaand);
      d.setMonth(d.getMonth() + richting);
      setDatum(naarIso(d));
    }
  };
  const eenheid = weergave === 'dag' ? 'dag' : weergave === 'week' ? 'week' : 'maand';

  // Eén overleg als knop (in de maand en de week)
  const OverlegKnop = ({ m }: { m: OverlegMoment }) => (
    <button
      type="button"
      className={`mijninkomen-agenda__item mijninkomen-agenda__item--${m.overleg.id}`}
      onClick={() => setGekozen(m)}
    >
      <span className="mijninkomen-agenda__tijd">{m.overleg.tijd.slice(0, 5)}</span> {m.overleg.kort}
      <span className="mijninkomen-visually-hidden">, {voluit(m.datum)}</span>
    </button>
  );

  // De gegevens van één overleg (in de details en in de dagweergave)
  const OverlegGegevens = ({ m }: { m: OverlegMoment }) => (
    <>
      <dl className="mijninkomen-agenda__gegevens">
        <dt>Wanneer</dt>
        <dd>
          {voluit(m.datum)}, {m.overleg.tijd}
        </dd>
        <dt>Waar</dt>
        <dd>{m.overleg.waar}</dd>
        <dt>Wie</dt>
        <dd>{m.overleg.wie}</dd>
      </dl>
      <p className="mijninkomen-formulier__label">Vaste agenda</p>
      <ol className="mijninkomen-agenda__punten">
        {m.overleg.agenda.map((punt) => (
          <li key={punt}>{punt}</li>
        ))}
      </ol>
    </>
  );

  // Alle dagen van de maandtabel, per week
  const weken: string[][] = [];
  if (weergave === 'maand') {
    for (let d = van; d <= tot; d = plusDagen(d, 7)) {
      weken.push(Array.from({ length: 7 }, (_, i) => plusDagen(d, i)));
    }
  }

  return (
    <div className="mijninkomen-agenda">
      {/* ── BEDIENING ── */}
      <div className="mijninkomen-agenda__balk">
        <div className="mijninkomen-agenda__knoppen" role="group" aria-label="Weergave">
          {(['dag', 'week', 'maand'] as Weergave[]).map((w) => (
            <Button
              key={w}
              purpose="secondary"
              toggle
              pressed={weergave === w}
              onClick={() => {
                setWeergave(w);
                setGekozen(null);
              }}
            >
              {w[0].toUpperCase() + w.slice(1)}
            </Button>
          ))}
        </div>

        <div className="mijninkomen-agenda__knoppen" role="group" aria-label="Bladeren">
          <Button purpose="subtle" onClick={() => verschuif(-1)}>
            ← Vorige <span className="mijninkomen-visually-hidden">{eenheid}</span>
          </Button>
          <Button
            purpose="subtle"
            onClick={() => {
              setDatum(vandaagIso());
              setGekozen(null);
            }}
          >
            Vandaag
          </Button>
          <Button purpose="subtle" onClick={() => verschuif(1)}>
            Volgende <span className="mijninkomen-visually-hidden">{eenheid}</span> →
          </Button>
        </div>

        <div className="mijninkomen-formulier__veld mijninkomen-agenda__filter">
          <label htmlFor="agenda-filter" className="mijninkomen-formulier__label">
            Overleg
          </label>
          <select
            id="agenda-filter"
            className="mijninkomen-formulier__invoer"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setGekozen(null);
            }}
          >
            <option value="">Alle overleggen</option>
            {overleggen.map((o) => (
              <option key={o.id} value={o.id}>
                {o.naam}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* De periode: schermlezers horen hem opnieuw na Vorige of Volgende */}
      <Heading level={2} appearance="level-3" className="mijninkomen-agenda__periode" aria-live="polite">
        {periode}
      </Heading>
      <p className="mijninkomen-filters__aantal">
        {momenten.length === 1 ? '1 overleg' : `${momenten.length} overleggen`}
      </p>

      {/* ── MAAND ── */}
      {weergave === 'maand' && (
        <TabelVak label={`Agenda ${periode}`}>
          <table className="mijninkomen-agenda__maand">
            <thead>
              <tr>
                {weekdagen.map((w) => (
                  <th scope="col" key={w}>
                    <abbr title={w}>{w.slice(0, 2)}</abbr>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weken.map((week) => (
                <tr key={week[0]}>
                  {week.map((dag) => {
                    const andereMaand = dag.slice(0, 7) !== datum.slice(0, 7);
                    return (
                      <td
                        key={dag}
                        className={[
                          andereMaand ? 'mijninkomen-agenda__dag--anders' : '',
                          dag === vandaag ? 'mijninkomen-agenda__dag--vandaag' : '',
                        ].join(' ')}
                      >
                        {/* Klik op het dagnummer: naar die dag */}
                        <button
                          type="button"
                          className="mijninkomen-agenda__dagnummer"
                          onClick={() => {
                            setDatum(dag);
                            setWeergave('dag');
                            setGekozen(null);
                          }}
                        >
                          {Number(dag.slice(8))}
                          <span className="mijninkomen-visually-hidden">
                            {' '}
                            {tekst(dag, { month: 'long' })}, bekijk deze dag
                            {dag === vandaag ? ' (vandaag)' : ''}
                          </span>
                        </button>
                        {opDag(dag).map((m) => (
                          <OverlegKnop key={m.overleg.id} m={m} />
                        ))}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </TabelVak>
      )}

      {/* ── WEEK ── */}
      {weergave === 'week' && (
        <ol className="mijninkomen-agenda__week">
          {Array.from({ length: 7 }, (_, i) => plusDagen(van, i)).map((dag) => (
            <li key={dag} className={dag === vandaag ? 'mijninkomen-agenda__dag--vandaag' : undefined}>
              <Heading level={3} appearance="level-5">
                {hoofdletter(tekst(dag, { weekday: 'long', day: 'numeric', month: 'long' }))}
                {dag === vandaag && <span className="mijninkomen-agenda__vandaag-label"> (vandaag)</span>}
              </Heading>
              {opDag(dag).length > 0 ? (
                opDag(dag).map((m) => <OverlegKnop key={m.overleg.id} m={m} />)
              ) : (
                <p className="mijninkomen-agenda__leeg">Geen overleg</p>
              )}
            </li>
          ))}
        </ol>
      )}

      {/* ── DAG: meteen alle gegevens ── */}
      {weergave === 'dag' &&
        (opDag(datum).length > 0 ? (
          <ul className="mijninkomen-agenda__dag">
            {opDag(datum).map((m) => (
              <li key={m.overleg.id}>
                <Heading level={3}>{m.overleg.naam}</Heading>
                <OverlegGegevens m={m} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mijninkomen-agenda__leeg">Op deze dag is er geen overleg.</p>
        ))}

      {/* ── DETAILS van het gekozen overleg (maand en week) ── */}
      {gekozen && weergave !== 'dag' && (
        <section className="mijninkomen-agenda__details" aria-labelledby="agenda-details">
          <Heading level={2} appearance="level-3" id="agenda-details" tabIndex={-1}>
            {gekozen.overleg.naam}
          </Heading>
          <OverlegGegevens m={gekozen} />
          <Button purpose="secondary" onClick={() => setGekozen(null)}>
            Sluiten
          </Button>
        </section>
      )}

      {/* ── DE VASTE OVERLEGGEN (altijd zichtbaar) ── */}
      <section className="mijninkomen-c-sectie" aria-labelledby="agenda-vast">
        <Heading level={2} id="agenda-vast">
          Vaste overleggen
        </Heading>
        <ul className="mijninkomen-c-agendas">
          {overleggen.map((o) => (
            <li key={o.id}>
              <Heading level={3} appearance="level-4">
                {o.naam}
              </Heading>
              <dl>
                <dt>Hoe vaak</dt>
                <dd>{o.hoeVaak}</dd>
                <dt>Tijd en plaats</dt>
                <dd>
                  {o.tijd}, {o.waar}
                </dd>
                <dt>Wie</dt>
                <dd>{o.wie}</dd>
              </dl>
              <details>
                <summary>Vaste agenda</summary>
                <ol>
                  {o.agenda.map((punt) => (
                    <li key={punt}>{punt}</li>
                  ))}
                </ol>
              </details>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
