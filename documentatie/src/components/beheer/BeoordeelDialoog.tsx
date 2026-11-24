import {
  AlertDialog,
  Button,
  ButtonGroup,
  FormField,
  FormFieldDescription,
  FormFieldErrorMessage,
  FormLabel,
  Heading,
  Textarea,
} from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { type FormEvent, useEffect, useRef, useState } from 'react';

export type Actie = 'toelaten' | 'weigeren';

interface Props {
  naam: string;
  actie: Actie;
  bezig: boolean;
  /** Foutmelding van de server bij de reden, bijvoorbeeld als die te lang is. */
  redenFout?: string;
  onBevestig: (_reden?: string) => void;
  onAnnuleer: () => void;
}

const FOUT_LEEG = 'Vul de reden van weigering in.';
const MAX_LENGTE = 1000;

const teksten = {
  toelaten: {
    titel: (naam: string) => `Weet je zeker dat je de aanvraag van ${naam} wilt accepteren?`,
    uitleg: (naam: string) =>
      `${naam} wordt communitylid en krijgt een e-mail om een wachtwoord en de code-app in te stellen.`,
    knop: 'Ja, accepteren',
  },
  weigeren: {
    titel: (naam: string) => `Weet je zeker dat je de aanvraag van ${naam} wilt weigeren?`,
    uitleg: (naam: string) => `${naam} krijgt een e-mail dat de aanvraag is geweigerd, met de reden hieronder.`,
    knop: 'Ja, weigeren',
  },
};

/** Bevestigingsvenster voor accepteren of weigeren. Annuleren of Esc laat de aanvraag ongewijzigd. */
export const BeoordeelDialoog = ({ naam, actie, bezig, redenFout, onBevestig, onAnnuleer }: Props) => {
  const dialoog = useRef<HTMLDialogElement>(null);
  const redenVeld = useRef<HTMLTextAreaElement>(null);
  const [reden, setReden] = useState('');
  const [fout, setFout] = useState<string>();
  const tekst = teksten[actie];
  const foutTekst = fout ?? redenFout;

  useEffect(() => {
    const venster = dialoog.current;
    if (venster && !venster.open) venster.showModal();
    return () => venster?.close();
  }, []);

  useEffect(() => {
    if (redenFout) redenVeld.current?.focus();
  }, [redenFout]);

  const bevestig = (gebeurtenis: FormEvent) => {
    gebeurtenis.preventDefault();
    if (actie === 'toelaten') return onBevestig();

    const schoon = reden.trim();
    const melding = !schoon ? FOUT_LEEG : schoon.length > MAX_LENGTE ? `Gebruik maximaal ${MAX_LENGTE} tekens.` : '';
    if (melding) {
      setFout(melding);
      redenVeld.current?.focus();
      return undefined;
    }
    return onBevestig(schoon);
  };

  return (
    <AlertDialog
      ref={dialoog}
      className="mijninkomen-dialoog"
      role="alertdialog"
      aria-labelledby="beoordeel-titel"
      aria-describedby="beoordeel-uitleg"
      onCancel={(gebeurtenis) => {
        gebeurtenis.preventDefault();
        if (!bezig) onAnnuleer();
      }}
    >
      <form onSubmit={bevestig} noValidate>
        <Heading level={2} id="beoordeel-titel">
          {tekst.titel(naam)}
        </Heading>
        <Paragraph id="beoordeel-uitleg">{tekst.uitleg(naam)}</Paragraph>

        {actie === 'weigeren' && (
          <FormField type="text" invalid={Boolean(foutTekst)}>
            <FormLabel htmlFor="reden-weigering">Reden van weigering</FormLabel>
            <FormFieldDescription id="reden-weigering-omschrijving">
              Deze tekst staat in de e-mail aan de aanvrager.
            </FormFieldDescription>
            {foutTekst && <FormFieldErrorMessage id="reden-weigering-fout">{foutTekst}</FormFieldErrorMessage>}
            <Textarea
              ref={redenVeld}
              id="reden-weigering"
              name="reden"
              rows={4}
              value={reden}
              invalid={Boolean(foutTekst)}
              aria-describedby={['reden-weigering-omschrijving', foutTekst && 'reden-weigering-fout']
                .filter(Boolean)
                .join(' ')}
              onChange={(gebeurtenis) => {
                setReden(gebeurtenis.target.value);
                setFout(undefined);
              }}
              autoFocus
            />
          </FormField>
        )}

        <ButtonGroup>
          <Button type="submit" appearance="primary-action-button" disabled={bezig}>
            {bezig ? 'Bezig…' : tekst.knop}
          </Button>
          <Button type="button" appearance="secondary-action-button" disabled={bezig} onClick={onAnnuleer}>
            Annuleren
          </Button>
        </ButtonGroup>
      </form>
    </AlertDialog>
  );
};
