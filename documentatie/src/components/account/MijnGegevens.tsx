import { IconPencil } from '@tabler/icons-react';
import {
  Alert,
  Button,
  ButtonGroup,
  FormField,
  FormFieldDescription,
  FormFieldErrorMessage,
  FormLabel,
  Textbox,
} from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import { Link } from '../Link';
import './account.css';

interface Gegevens {
  naam: string;
  email: string;
  functie: string | null;
  organisatie: string | null;
  lidSinds: number | null;
}

type Veld = 'naam' | 'email';
type Melding = { type: 'ok' | 'error'; tekst: string };

const ADRES = '/api/account';
const STORING = 'Er ging iets mis. Probeer het later opnieuw.';
const ONBEKEND = 'Nog niet bekend';

const VELDEN: Record<
  Veld,
  { label: string; nieuwLabel: string; type: 'text' | 'email'; autoComplete: string; gelukt: string; uitleg?: string }
> = {
  naam: { label: 'Naam', nieuwLabel: 'Nieuwe naam', type: 'text', autoComplete: 'name', gelukt: 'Je naam is gewijzigd.' },
  email: {
    label: 'E-mailadres',
    nieuwLabel: 'Nieuw e-mailadres',
    type: 'email',
    autoComplete: 'email',
    gelukt: 'Je e-mailadres is gewijzigd. Log voortaan in met dit adres.',
    uitleg: 'Hiermee log je voortaan in.',
  },
};

interface FormulierProps {
  veld: Veld;
  waarde: string;
  onOpgeslagen: (gegevens: Gegevens) => void;
  onAnnuleer: () => void;
}

/** Wijzigt één veld. Annuleren laat de gegevens ongewijzigd. */
const WijzigFormulier = ({ veld, waarde, onOpgeslagen, onAnnuleer }: FormulierProps) => {
  const { nieuwLabel, type, autoComplete, uitleg } = VELDEN[veld];
  const invoer = useRef<HTMLInputElement>(null);
  const [nieuw, setNieuw] = useState(waarde);
  const [fout, setFout] = useState<string>();
  const [bezig, setBezig] = useState(false);
  const id = `wijzig-${veld}`;
  const beschrijving = [uitleg && `${id}-uitleg`, fout && `${id}-fout`].filter(Boolean).join(' ') || undefined;

  useEffect(() => invoer.current?.focus(), []);

  const slaOp = async (gebeurtenis: FormEvent) => {
    gebeurtenis.preventDefault();
    setBezig(true);
    setFout(undefined);
    try {
      const antwoord = await fetch(ADRES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [veld]: nieuw }),
      });
      if (antwoord.status === 401) return window.location.assign('/inloggen/');
      const inhoud = await antwoord.json();
      if (antwoord.ok) return onOpgeslagen(inhoud as Gegevens);
      setFout(inhoud.fouten?.[veld] ?? STORING);
      invoer.current?.focus();
    } catch {
      setFout(STORING);
    } finally {
      setBezig(false);
    }
    return undefined;
  };

  return (
    <form className="mijninkomen-gegevens__formulier" onSubmit={slaOp} noValidate>
      <FormField type="text" invalid={Boolean(fout)}>
        <FormLabel htmlFor={id}>{nieuwLabel}</FormLabel>
        {uitleg && <FormFieldDescription id={`${id}-uitleg`}>{uitleg}</FormFieldDescription>}
        {fout && <FormFieldErrorMessage id={`${id}-fout`}>{fout}</FormFieldErrorMessage>}
        <Textbox
          ref={invoer}
          id={id}
          name={veld}
          type={type}
          autoComplete={autoComplete}
          value={nieuw}
          invalid={Boolean(fout)}
          aria-describedby={beschrijving}
          onChange={(gebeurtenis) => setNieuw(gebeurtenis.target.value)}
        />
      </FormField>
      <ButtonGroup>
        <Button type="submit" appearance="primary-action-button" disabled={bezig}>
          {bezig ? 'Bezig…' : 'Opslaan'}
        </Button>
        <Button type="button" appearance="secondary-action-button" disabled={bezig} onClick={onAnnuleer}>
          Annuleren
        </Button>
      </ButtonGroup>
    </form>
  );
};

/** Mijn gegevens: een lid ziet de eigen gegevens en wijzigt zelf naam en e-mailadres. */
const Inhoud = () => {
  const [gegevens, setGegevens] = useState<Gegevens>();
  const [bewerkt, setBewerkt] = useState<Veld>();
  const [melding, setMelding] = useState<Melding>();
  const knoppen = useRef<Partial<Record<Veld, HTMLButtonElement | null>>>({});

  useEffect(() => {
    fetch(ADRES)
      .then(async (antwoord) => {
        if (antwoord.status === 401) return window.location.assign('/inloggen/');
        if (!antwoord.ok) throw new Error(`Status ${antwoord.status}`);
        return setGegevens(await antwoord.json());
      })
      .catch(() => setMelding({ type: 'error', tekst: STORING }));
  }, []);

  // Na opslaan of annuleren staat de focus weer op de knop Wijzigen van dat veld.
  const sluit = (veld: Veld) => {
    setBewerkt(undefined);
    requestAnimationFrame(() => knoppen.current[veld]?.focus());
  };

  const vasteGegevens: [string, string][] = gegevens
    ? [
        ['Functie', gegevens.functie ?? ONBEKEND],
        ['Gemeente', gegevens.organisatie ?? ONBEKEND],
        ['Communitylid sinds', gegevens.lidSinds ? String(gegevens.lidSinds) : ONBEKEND],
      ]
    : [];

  return (
    <>
      <div role="status">
        {melding && (
          <Alert type={melding.type}>
            <Paragraph>{melding.tekst}</Paragraph>
          </Alert>
        )}
      </div>

      {!gegevens && !melding && <Paragraph>Je gegevens worden geladen…</Paragraph>}

      {gegevens && (
        <>
          <dl className="mijninkomen-gegevens">
            {(Object.keys(VELDEN) as Veld[]).map((veld) => (
              <div key={veld} className="mijninkomen-gegevens__rij">
                <dt className="mijninkomen-gegevens__label">{VELDEN[veld].label}</dt>
                <dd className="mijninkomen-gegevens__waarde">
                  {bewerkt === veld ? (
                    <WijzigFormulier
                      veld={veld}
                      waarde={gegevens[veld]}
                      onAnnuleer={() => sluit(veld)}
                      onOpgeslagen={(nieuw) => {
                        setGegevens(nieuw);
                        setMelding({ type: 'ok', tekst: VELDEN[veld].gelukt });
                        sluit(veld);
                      }}
                    />
                  ) : (
                    <div className="mijninkomen-gegevens__regel">
                      <span className="mijninkomen-gegevens__tekst">{gegevens[veld]}</span>
                      <Button
                        ref={(knop) => {
                          knoppen.current[veld] = knop;
                        }}
                        appearance="subtle-button"
                        className="mijninkomen-gegevens__wijzig"
                        onClick={() => {
                          setMelding(undefined);
                          setBewerkt(veld);
                        }}
                      >
                        <IconPencil aria-hidden="true" size={20} />
                        Wijzigen<span className="sr-only"> {VELDEN[veld].label.toLowerCase()}</span>
                      </Button>
                    </div>
                  )}
                </dd>
              </div>
            ))}
            {vasteGegevens.map(([label, waarde]) => (
              <div key={label} className="mijninkomen-gegevens__rij">
                <dt className="mijninkomen-gegevens__label">{label}</dt>
                <dd className="mijninkomen-gegevens__waarde">{waarde}</dd>
              </div>
            ))}
          </dl>
          <Paragraph className="mijninkomen-gegevens__hulp">
            Klopt je functie of gemeente niet? <Link href="/contact/">Neem contact op</Link> met een beheerder.
          </Paragraph>
        </>
      )}
    </>
  );
};

/** De styling hangt aan deze klasse, zodat het component ook op een docs-pagina werkt. */
export const MijnGegevens = () => (
  <div className="mijninkomen-account">
    <Inhoud />
  </div>
);
