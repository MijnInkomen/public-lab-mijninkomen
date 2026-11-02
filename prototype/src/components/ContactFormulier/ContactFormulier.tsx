/**
 * ContactFormulier – eigen component
 *
 * NL Design System heeft voor formuliervelden (nog) geen officiële Candidate-
 * componenten in dit project. We gebruiken daarom gewone HTML-velden, volgens de
 * NLDS-richtlijnen voor formulieren:
 * - label boven het veld, foutmelding tussen label en veld
 * - vooraf vermelden dat alle velden verplicht zijn (alleen uitzonderingen
 *   krijgen "(niet verplicht)" in het label)
 * - bij fouten een samenvatting bovenaan het formulier, met links naar de velden
 * - geen HTML-formuliervalidatie van de browser (noValidate)
 *
 * PROTOTYPE: er wordt niets verstuurd of opgeslagen. Na "Verstuur" verschijnt
 * alleen een bevestiging. Bij de echte bouw: veilig versturen en de AVG volgen.
 *
 * Toegankelijkheid:
 * - elk veld heeft een <label> (WCAG 1.3.1, 3.3.2)
 * - autocomplete, zodat browsers gegevens kunnen invullen (WCAG 1.3.5)
 * - foutmeldingen in tekst met een icoon, gekoppeld aan het veld met
 *   aria-describedby en aria-invalid (WCAG 3.3.1, 1.4.1)
 * - na een fout gaat de focus naar de samenvatting, zodat schermlezers die voorlezen
 */
import { Button } from '@nl-design-system-candidate/button-react/css';
import { useRef, useState, type FormEvent } from 'react';
import { formulier } from '../../content/contact';
import './ContactFormulier.css';

type Veld = keyof typeof formulier.velden;
type Fouten = Partial<Record<Veld, string>>;

const volgorde: Veld[] = ['naam', 'email', 'gemeente', 'bericht'];
const autocomplete: Record<Veld, string> = {
  naam: 'name',
  email: 'email',
  gemeente: 'organization',
  bericht: 'off',
};

function controleer(waarden: Record<Veld, string>): Fouten {
  const fouten: Fouten = {};
  for (const veld of volgorde) {
    if (!waarden[veld].trim()) fouten[veld] = formulier.velden[veld].fout;
  }
  if (!fouten.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(waarden.email.trim())) {
    fouten.email = formulier.velden.email.foutOngeldig;
  }
  return fouten;
}

export function ContactFormulier() {
  const [fouten, setFouten] = useState<Fouten>({});
  const [verzonden, setVerzonden] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const samenvattingRef = useRef<HTMLDivElement>(null);

  function versturen(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const waarden = Object.fromEntries(volgorde.map((v) => [v, String(data.get(v) ?? '')])) as Record<Veld, string>;
    const nieuweFouten = controleer(waarden);
    setFouten(nieuweFouten);

    if (volgorde.some((v) => nieuweFouten[v])) {
      setVerzonden(false);
      // Wacht tot de samenvatting op het scherm staat en zet daar de focus op
      setTimeout(() => samenvattingRef.current?.focus(), 0);
      return;
    }
    setVerzonden(true);
    formRef.current?.reset();
  }

  const foutVelden = volgorde.filter((v) => fouten[v]);

  return (
    <form ref={formRef} className="mijninkomen-formulier" onSubmit={versturen} noValidate>
      {/* Meldingen worden voorgelezen door schermlezers (role="status") */}
      <div role="status">
        {verzonden && <p className="mijninkomen-formulier__bevestiging">{formulier.verzonden}</p>}
      </div>

      <p className="mijninkomen-formulier__uitleg">{formulier.allesVerplicht}</p>

      {/* Samenvatting van de fouten bovenaan het formulier (NLDS-richtlijn) */}
      {foutVelden.length > 0 && (
        <div
          ref={samenvattingRef}
          className="mijninkomen-formulier__samenvatting"
          tabIndex={-1}
          aria-labelledby="fouten-titel"
        >
          <h3 id="fouten-titel" className="mijninkomen-formulier__samenvatting-titel">
            <span aria-hidden="true">⚠ </span>
            {formulier.foutenSamenvatting.titel}
          </h3>
          <p>{formulier.foutenSamenvatting.tekst}</p>
          <ul>
            {foutVelden.map((veld) => (
              <li key={veld}>
                {/* Klik op een fout: de cursor springt naar dat veld */}
                <a
                  href={`#veld-${veld}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(`veld-${veld}`)?.focus();
                  }}
                >
                  {fouten[veld]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {volgorde.map((veld) => {
        const tekst = formulier.velden[veld];
        const fout = fouten[veld];
        const id = `veld-${veld}`;
        const props = {
          id,
          name: veld,
          placeholder: tekst.placeholder,
          autoComplete: autocomplete[veld],
          required: true,
          'aria-invalid': fout ? true : undefined,
          'aria-describedby': fout ? `${id}-fout` : undefined,
          className: `mijninkomen-formulier__invoer${fout ? ' mijninkomen-formulier__invoer--fout' : ''}`,
        };
        return (
          <div key={veld} className="mijninkomen-formulier__veld">
            <label htmlFor={id} className="mijninkomen-formulier__label">
              {tekst.label}
            </label>
            {fout && (
              <p id={`${id}-fout`} className="mijninkomen-formulier__fout">
                <span aria-hidden="true">⚠ </span>
                {fout}
              </p>
            )}
            {veld === 'bericht' ? (
              <textarea {...props} rows={5} />
            ) : (
              <input {...props} type={veld === 'email' ? 'email' : 'text'} />
            )}
          </div>
        );
      })}

      <Button
        type="submit"
        purpose="primary"
        iconEnd={<span aria-hidden="true">→</span>}
      >
        {formulier.knop}
      </Button>
    </form>
  );
}
