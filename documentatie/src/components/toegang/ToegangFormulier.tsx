import {
  Alert,
  Button,
  FormField,
  FormFieldDescription,
  FormFieldErrorMessage,
  FormLabel,
  Textbox,
} from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from '../Link';
import { formulier, velden, type VeldNaam } from './content';
import './toegang.css';

type Invoer = Record<VeldNaam, string>;

const veldId = (naam: VeldNaam) => `toegang-${naam}`;
const E_MAILADRES = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const vandaag = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Amsterdam' });
const FOUT_EMAIL = 'Vul een geldig e-mailadres in, bijvoorbeeld naam@gemeente.nl.';

const verstuur = async (invoer: Invoer): Promise<{ fouten?: Partial<Invoer> }> => {
  const antwoord = await fetch('/api/toegang-aanvragen', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(invoer),
  });
  if (antwoord.ok) return {};
  if (antwoord.status === 422) return antwoord.json();
  throw new Error(`Status ${antwoord.status}`);
};

export const ToegangFormulier = () => {
  const {
    formState: { errors, isSubmitting, submitCount },
    handleSubmit,
    register,
    setError,
  } = useForm<Invoer>({ shouldFocusError: false });
  const [verzonden, setVerzonden] = useState(false);
  const [storing, setStoring] = useState(false);
  const melding = useRef<HTMLDivElement>(null);
  const isBrowser = useIsBrowser();
  const foutVelden = velden.filter(({ naam }) => errors[naam]);

  // Na versturen gaat de focus naar de melding, zodat schermlezers die voorlezen.
  useEffect(() => {
    if (verzonden || storing || foutVelden.length > 0) melding.current?.focus();
  }, [verzonden, storing, submitCount, foutVelden.length]);

  const versturen = async (invoer: Invoer) => {
    setStoring(false);
    try {
      const { fouten } = await verstuur(invoer);
      if (fouten) {
        Object.entries(fouten).forEach(([naam, message]) => setError(naam as VeldNaam, { message }));
      } else {
        setVerzonden(true);
      }
    } catch {
      setStoring(true);
    }
  };

  if (verzonden) {
    return (
      <div ref={melding} tabIndex={-1}>
        <Alert type="ok" role="status">
          <Paragraph>{formulier.bevestiging}</Paragraph>
        </Alert>
      </div>
    );
  }

  return (
    <div className="mijninkomen-formulierkaart">
      <Paragraph>
        {formulier.privacy}
        <Link href="/privacy">{formulier.privacyLink}</Link>.
      </Paragraph>
      <Paragraph>{formulier.uitleg}</Paragraph>

      <div ref={melding} tabIndex={-1}>
        {storing && (
          <Alert type="error" role="alert">
            <Paragraph>{formulier.storing}</Paragraph>
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

      <form onSubmit={handleSubmit(versturen)} noValidate>
        {velden.map(({ naam, label, type, autoComplete, omschrijving, fout }) => {
          const id = veldId(naam);
          const foutTekst = errors[naam]?.message;
          const beschrijving = [omschrijving && `${id}-omschrijving`, foutTekst && `${id}-fout`].filter(Boolean);

          return (
            <FormField key={naam} type={type} invalid={Boolean(foutTekst)}>
              <FormLabel htmlFor={id}>{label}</FormLabel>
              {omschrijving && <FormFieldDescription id={`${id}-omschrijving`}>{omschrijving}</FormFieldDescription>}
              {foutTekst && <FormFieldErrorMessage id={`${id}-fout`}>{foutTekst}</FormFieldErrorMessage>}
              <Textbox
                id={id}
                type={type}
                autoComplete={autoComplete}
                invalid={Boolean(foutTekst)}
                max={type === 'date' && isBrowser ? vandaag() : undefined}
                aria-describedby={beschrijving.join(' ') || undefined}
                {...register(naam, {
                  validate: (waarde) => {
                    if (!waarde.trim()) return fout;
                    if (type === 'email' && !E_MAILADRES.test(waarde.trim())) return FOUT_EMAIL;
                    return true;
                  },
                })}
              />
            </FormField>
          );
        })}
        <Button type="submit" appearance="primary-action-button" disabled={isSubmitting}>
          {isSubmitting ? formulier.bezig : formulier.knop} <span aria-hidden="true">→</span>
        </Button>
      </form>
    </div>
  );
};
