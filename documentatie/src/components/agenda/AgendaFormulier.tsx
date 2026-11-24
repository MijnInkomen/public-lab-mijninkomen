import useIsBrowser from '@docusaurus/useIsBrowser';
import {
  Alert,
  Button,
  FormField,
  FormFieldDescription,
  FormFieldErrorMessage,
  FormLabel,
  Textarea,
  Textbox,
} from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { AgendaResultaat } from './AgendaResultaat';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FOUT_EINDTIJD,
  FOUT_EMAIL,
  FOUT_LINK,
  FOUT_VERLEDEN,
  foutLang,
  formulier,
  velden,
  type Veld,
  type VeldNaam,
} from './content';
import { vandaag } from './format';
import type { Soort } from './types';
import { useAgenda } from './useAgenda';
import './agenda.css';

export type Invoer = Record<VeldNaam, string>;

const veldId = (naam: VeldNaam) => `agenda-${naam}`;
const E_MAILADRES = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Geeft de foutmelding voor dit veld, of true als het goed is ingevuld. */
const controleer = (veld: Veld, waarde: string, alles: Invoer, vanaf: string) => {
  const schoon = waarde.trim();

  if (!schoon) return veld.fout ?? true;
  if (veld.maxLengte && schoon.length > veld.maxLengte) return foutLang(veld.maxLengte);
  if (veld.type === 'email' && !E_MAILADRES.test(schoon)) return FOUT_EMAIL;
  if (veld.type === 'url' && !schoon.startsWith('https://')) return FOUT_LINK;
  if (veld.naam === 'datum' && schoon < vanaf) return FOUT_VERLEDEN;
  if (veld.naam === 'eindtijd' && alles.begintijd && schoon <= alles.begintijd.trim()) return FOUT_EINDTIJD;

  return true;
};

const Veldje = ({
  veld,
  soorten,
  fout,
  registratie,
  minimumDatum,
}: {
  veld: Veld;
  soorten: Soort[];
  fout?: string;
  registratie: ReturnType<ReturnType<typeof useForm<Invoer>>['register']>;
  minimumDatum?: string;
}) => {
  const id = veldId(veld.naam);
  const beschrijving = [veld.omschrijving && `${id}-omschrijving`, fout && `${id}-fout`].filter(Boolean);
  const gedeeld = {
    id,
    invalid: Boolean(fout),
    'aria-describedby': beschrijving.join(' ') || undefined,
    ...registratie,
  };

  return (
    <FormField type={veld.type === 'select' ? 'select' : veld.type} invalid={Boolean(fout)}>
      <FormLabel htmlFor={id}>{veld.label}</FormLabel>
      {veld.omschrijving && <FormFieldDescription id={`${id}-omschrijving`}>{veld.omschrijving}</FormFieldDescription>}
      {fout && <FormFieldErrorMessage id={`${id}-fout`}>{fout}</FormFieldErrorMessage>}

      {veld.type === 'select' && (
        <select {...gedeeld} className="utrecht-select utrecht-select--html-select">
          <option value="">Maak een keuze</option>
          {soorten.map(({ id: soort, naam }) => (
            <option key={soort} value={soort}>
              {naam}
            </option>
          ))}
        </select>
      )}
      {veld.type === 'textarea' && <Textarea {...gedeeld} rows={5} />}
      {veld.type !== 'select' && veld.type !== 'textarea' && (
        <Textbox {...gedeeld} type={veld.type} min={veld.naam === 'datum' ? minimumDatum : undefined} />
      )}
    </FormField>
  );
};

export const AgendaFormulier = () => {
  const agenda = useAgenda();
  const isBrowser = useIsBrowser();
  const {
    formState: { errors, submitCount },
    handleSubmit,
    register,
    reset,
  } = useForm<Invoer>({ shouldFocusError: false });
  const [gemaakt, setGemaakt] = useState<Invoer>();
  const melding = useRef<HTMLDivElement>(null);
  const foutVelden = velden.filter(({ naam }) => errors[naam]);

  // Na versturen gaat de focus naar de melding, zodat schermlezers die voorlezen.
  useEffect(() => {
    if (gemaakt || foutVelden.length > 0) melding.current?.focus();
  }, [gemaakt, submitCount, foutVelden.length]);

  if (!agenda) return <Paragraph>Het formulier wordt geladen…</Paragraph>;

  const opnieuw = () => {
    setGemaakt(undefined);
    reset();
  };

  return (
    <div className="mijninkomen-formulierkaart">
      <Paragraph>{formulier.uitleg}</Paragraph>

      <div ref={melding} tabIndex={-1}>
        {gemaakt && (
          <Alert type="ok" role="status">
            <Paragraph>Je agenda-item is klaar. Hieronder staat het in het vaste format.</Paragraph>
          </Alert>
        )}
        {foutVelden.length > 0 && (
          <Alert type="error">
            <Paragraph>
              <strong>{formulier.samenvattingTitel}</strong>
            </Paragraph>
            <Paragraph>{formulier.samenvattingTekst}</Paragraph>
            <ul>
              {foutVelden.map(({ naam }) => (
                <li key={naam}>
                  <a href={`#${veldId(naam)}`}>{errors[naam]?.message}</a>
                </li>
              ))}
            </ul>
          </Alert>
        )}
      </div>

      {gemaakt ? (
        <>
          <AgendaResultaat invoer={gemaakt} soorten={agenda.soorten} />
          <Button appearance="secondary-action-button" onClick={opnieuw}>
            {formulier.opnieuw}
          </Button>
        </>
      ) : (
        <form onSubmit={handleSubmit(setGemaakt)} noValidate>
          {velden.map((veld) => (
            <Veldje
              key={veld.naam}
              veld={veld}
              soorten={agenda.soorten}
              fout={errors[veld.naam]?.message}
              minimumDatum={isBrowser ? vandaag() : undefined}
              registratie={register(veld.naam, {
                validate: (waarde, alles) => controleer(veld, waarde ?? '', alles, vandaag()),
              })}
            />
          ))}
          <Button type="submit" appearance="primary-action-button">
            {formulier.knop} <span aria-hidden="true">→</span>
          </Button>
        </form>
      )}
    </div>
  );
};
