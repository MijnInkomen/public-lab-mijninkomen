/**
 * Formulier – eigen component voor alle formulieren in het prototype
 *
 * NLDS heeft voor formuliervelden (nog) geen Candidate-componenten in dit project.
 * Daarom gewone HTML-velden, volgens de NLDS-richtlijnen voor formulieren:
 * - label boven het veld; uitleg (omschrijving) en foutmelding tussen label en veld,
 *   gekoppeld met aria-describedby zodat schermlezers ze samen voorlezen
 * - geen placeholders: een voorbeeld staat in de omschrijving, niet in het veld
 * - vooraf vermelden dat alle velden verplicht zijn; alleen uitzonderingen
 *   krijgen "(niet verplicht)" in het label
 * - bij fouten een samenvatting bovenaan, met links naar de velden
 * - geen HTML-formuliervalidatie van de browser (noValidate)
 *
 * Je geeft een lijst met velden mee (zie Veld hieronder); dit component regelt
 * het controleren, de foutmeldingen en de bevestiging.
 *
 * PROTOTYPE: er wordt niets verstuurd of opgeslagen.
 */
import { Button } from '@nl-design-system-candidate/button-react/css';
import { useId, useRef, useState, type FormEvent } from 'react';
import './Formulier.css';

export type Veld = {
  naam: string;
  label: string;
  soort: 'tekst' | 'email' | 'wachtwoord' | 'tekstvak' | 'keuzelijst' | 'aanvinken';
  /** Voor keuzelijst en aanvinken */
  opties?: { waarde: string; label: string }[];
  verplicht?: boolean; // standaard: verplicht
  autoComplete?: string;
  /** Korte uitleg tussen label en veld, bijv. "Bijvoorbeeld: naam@gemeente.nl" */
  omschrijving?: string;
  /** Foutmelding als het veld leeg is */
  fout?: string;
};

type FormulierProps = {
  velden: Veld[];
  knop: string;
  bevestiging: string;
  /** Uitleg boven het formulier (NLDS: zeg vooraf welke velden verplicht zijn) */
  uitleg?: string;
};

type Fouten = Record<string, string | undefined>;

const SAMENVATTING = {
  titel: 'Het formulier is nog niet goed ingevuld',
  tekst: 'Controleer de volgende velden:',
};
const FOUT_EMAIL = 'Vul een geldig e-mailadres in, bijvoorbeeld naam@gemeente.nl.';

function controleer(velden: Veld[], data: FormData): Fouten {
  const fouten: Fouten = {};
  for (const v of velden) {
    if (v.verplicht === false) continue;
    const waarden = data.getAll(v.naam).map((w) => String(w).trim()).filter(Boolean);
    if (waarden.length === 0) fouten[v.naam] = v.fout;
    else if (v.soort === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(waarden[0])) fouten[v.naam] = FOUT_EMAIL;
  }
  return fouten;
}

export function Formulier({
  velden,
  knop,
  bevestiging,
  uitleg = 'Vul alle velden in, behalve als er "(niet verplicht)" bij staat.',
}: FormulierProps) {
  const prefix = useId();
  const [fouten, setFouten] = useState<Fouten>({});
  const [verzonden, setVerzonden] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const samenvattingRef = useRef<HTMLDivElement>(null);

  // Het id van het veld (bij aanvinken: het eerste vakje), om naartoe te springen
  const veldId = (v: Veld) => `${prefix}-${v.naam}${v.soort === 'aanvinken' ? '-0' : ''}`;
  const foutVelden = velden.filter((v) => fouten[v.naam]);

  function versturen(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nieuweFouten = controleer(velden, new FormData(e.currentTarget));
    setFouten(nieuweFouten);
    if (Object.values(nieuweFouten).some(Boolean)) {
      setVerzonden(false);
      // Focus naar de samenvatting, zodat schermlezers die voorlezen
      setTimeout(() => samenvattingRef.current?.focus(), 0);
      return;
    }
    setVerzonden(true);
    formRef.current?.reset();
  }

  return (
    <form ref={formRef} className="mijninkomen-formulier" onSubmit={versturen} noValidate>
      <p className="mijninkomen-formulier__uitleg">{uitleg}</p>

      <div role="status">
        {verzonden && <p className="mijninkomen-formulier__bevestiging">{bevestiging}</p>}
      </div>

      {foutVelden.length > 0 && (
        <div ref={samenvattingRef} className="mijninkomen-formulier__samenvatting" tabIndex={-1} aria-labelledby={`${prefix}-fouten`}>
          <p id={`${prefix}-fouten`} className="mijninkomen-formulier__samenvatting-titel">
            <span aria-hidden="true">⚠ </span>
            {SAMENVATTING.titel}
          </p>
          <p>{SAMENVATTING.tekst}</p>
          <ul>
            {foutVelden.map((v) => (
              <li key={v.naam}>
                <a
                  href={`#${veldId(v)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(veldId(v))?.focus();
                  }}
                >
                  {fouten[v.naam]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {velden.map((v) => {
        const id = `${prefix}-${v.naam}`;
        const fout = fouten[v.naam];
        const foutId = `${id}-fout`;
        const omschrijvingId = `${id}-omschrijving`;
        // Alles wat bij het veld hoort en voorgelezen moet worden
        const beschrijving = [v.omschrijving ? omschrijvingId : '', fout ? foutId : ''].filter(Boolean).join(' ') || undefined;
        const omschrijving = v.omschrijving && (
          <p id={omschrijvingId} className="mijninkomen-formulier__omschrijving">
            {v.omschrijving}
          </p>
        );
        const labelTekst = `${v.label}${v.verplicht === false ? ' (niet verplicht)' : ''}`;
        const foutmelding = fout && (
          <p id={foutId} className="mijninkomen-formulier__fout">
            <span aria-hidden="true">⚠ </span>
            {fout}
          </p>
        );
        const gedeeld = {
          name: v.naam,
          'aria-invalid': fout ? true : undefined,
          'aria-describedby': beschrijving,
          className: `mijninkomen-formulier__invoer${fout ? ' mijninkomen-formulier__invoer--fout' : ''}`,
        };

        // Meerdere vakjes: een fieldset met legend, zodat de vraag bij elk vakje hoort
        if (v.soort === 'aanvinken') {
          return (
            <fieldset key={v.naam} className="mijninkomen-formulier__veld mijninkomen-formulier__groep" aria-describedby={beschrijving}>
              <legend className="mijninkomen-formulier__label">{labelTekst}</legend>
              {omschrijving}
              {foutmelding}
              {v.opties?.map((o, i) => (
                <div key={o.waarde} className="mijninkomen-formulier__vakje">
                  <input type="checkbox" id={`${id}-${i}`} name={v.naam} value={o.waarde} />
                  <label htmlFor={`${id}-${i}`}>{o.label}</label>
                </div>
              ))}
            </fieldset>
          );
        }

        return (
          <div key={v.naam} className="mijninkomen-formulier__veld">
            <label htmlFor={id} className="mijninkomen-formulier__label">
              {labelTekst}
            </label>
            {omschrijving}
            {foutmelding}
            {v.soort === 'tekstvak' && <textarea id={id} rows={4} {...gedeeld} />}
            {v.soort === 'keuzelijst' && (
              <select id={id} {...gedeeld} defaultValue="">
                <option value="">Kies een datum</option>
                {v.opties?.map((o) => (
                  <option key={o.waarde} value={o.waarde}>
                    {o.label}
                  </option>
                ))}
              </select>
            )}
            {(v.soort === 'tekst' || v.soort === 'email' || v.soort === 'wachtwoord') && (
              <input
                id={id}
                type={v.soort === 'email' ? 'email' : v.soort === 'wachtwoord' ? 'password' : 'text'}
                autoComplete={v.autoComplete}
                {...gedeeld}
              />
            )}
          </div>
        );
      })}

      <Button type="submit" purpose="primary" iconEnd={<span aria-hidden="true">→</span>}>
        {knop}
      </Button>
    </form>
  );
}
