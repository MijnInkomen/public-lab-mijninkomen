/**
 * NIVEAU 2 › Account (staat los onderaan in het zijmenu)
 * Keuze Isabella:
 * - De naam van de gebruiker staat niet in de kop van de site, maar hier.
 * - Je naam en e-mailadres wijzig je zelf, elk apart en direct op de plek zelf
 *   (met een potlood-knop), zodat je niet beide tegelijk hoeft te wijzigen.
 * - Voor al het andere (functie, gemeente, telefoon voor de inlogcode) doe je een
 *   aanvraag bij beheer. Beheer beslist of de wijziging mag.
 * Drie eigen pagina's: Mijn gegevens, Wijziging aanvragen, Inloggen en beveiliging.
 */
import { Button } from '@nl-design-system-candidate/button-react/css';
import { Link } from '@nl-design-system-candidate/link-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Formulier, type Veld } from '../../components/Formulier/Formulier';
import { account } from '../../content/community';
import { CommunityPagina } from './CommunityPagina';
import { useGebruiker, wijzigGebruiker } from './gebruiker';

/** Klein potlood-icoon (alleen versiering, de knop heeft zelf tekst) */
const Potlood = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 20h4L19 9l-4-4L4 16v4z" />
    <path d="M14 6l4 4" />
  </svg>
);

/**
 * Eén gegeven dat je zelf kunt wijzigen, direct op de plek zelf (keuze Isabella):
 * klik op het potlood, pas aan, en sla op. Naam en e-mailadres wijzig je los van elkaar.
 * - Bij openen gaat de focus naar het invoerveld.
 * - Na opslaan of annuleren gaat de focus terug naar de knop Wijzigen.
 * - Een fout staat bij het veld en wordt voorgelezen (aria-invalid + aria-describedby).
 */
function WijzigbaarGegeven({
  id,
  label,
  waarde,
  soort,
  omschrijving,
  autoComplete,
  opslaan,
}: {
  id: string;
  label: string;
  waarde: string;
  soort: 'text' | 'email';
  omschrijving?: string;
  autoComplete: string;
  opslaan: (nieuw: string) => void;
}) {
  const [bewerken, setBewerken] = useState(false);
  const [invoer, setInvoer] = useState(waarde);
  const [fout, setFout] = useState('');
  const [melding, setMelding] = useState('');
  const invoerRef = useRef<HTMLInputElement>(null);
  const knopRef = useRef<HTMLButtonElement>(null);
  const terugNaarKnop = useRef(false);

  useEffect(() => {
    if (bewerken) invoerRef.current?.focus();
    else if (terugNaarKnop.current) knopRef.current?.focus();
  }, [bewerken]);

  const sluiten = () => {
    terugNaarKnop.current = true;
    setBewerken(false);
    setFout('');
  };

  const bewaar = (e: FormEvent) => {
    e.preventDefault();
    const nieuw = invoer.trim();
    if (!nieuw) return setFout(`Vul je ${label.toLowerCase()} in.`);
    if (soort === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nieuw))
      return setFout('Vul een geldig e-mailadres in, bijvoorbeeld naam@gemeente.nl.');
    opslaan(nieuw);
    setMelding(`${label} opgeslagen. Dit is een prototype: er is niets echt opgeslagen.`);
    sluiten();
  };

  const beschrijving = [omschrijving ? `${id}-uitleg` : '', fout ? `${id}-fout` : ''].filter(Boolean).join(' ') || undefined;

  return (
    <div className="mijninkomen-account__rij">
      {/* Tijdens het wijzigen is het kopje het label van het invoerveld */}
      <dt>{bewerken ? <label htmlFor={id}>{label}</label> : label}</dt>
      <dd>
        {bewerken ? (
          <form className="mijninkomen-account__bewerken" onSubmit={bewaar} noValidate>
            {omschrijving && (
              <p id={`${id}-uitleg`} className="mijninkomen-formulier__omschrijving">
                {omschrijving}
              </p>
            )}
            {fout && (
              <p id={`${id}-fout`} className="mijninkomen-formulier__fout">
                <span aria-hidden="true">⚠ </span>
                {fout}
              </p>
            )}
            <input
              ref={invoerRef}
              id={id}
              type={soort}
              autoComplete={autoComplete}
              className={`mijninkomen-formulier__invoer${fout ? ' mijninkomen-formulier__invoer--fout' : ''}`}
              value={invoer}
              onChange={(e) => setInvoer(e.target.value)}
              aria-invalid={fout ? true : undefined}
              aria-describedby={beschrijving}
            />
            <div className="mijninkomen-account__knoppen">
              <Button type="submit" purpose="primary">
                Opslaan
              </Button>
              <Button
                type="button"
                purpose="subtle"
                onClick={() => {
                  setInvoer(waarde);
                  sluiten();
                }}
              >
                Annuleren
              </Button>
            </div>
          </form>
        ) : (
          <div className="mijninkomen-account__waarde">
            <span>{waarde}</span>
            <Button
              ref={knopRef}
              type="button"
              purpose="subtle"
              iconStart={<Potlood />}
              onClick={() => {
                setInvoer(waarde);
                setMelding('');
                setBewerken(true);
              }}
            >
              Wijzigen<span className="mijninkomen-visually-hidden"> {label.toLowerCase()}</span>
            </Button>
          </div>
        )}
        {/* Bevestiging na opslaan, wordt voorgelezen */}
        <p role="status" className="mijninkomen-account__melding">
          {melding}
        </p>
      </dd>
    </div>
  );
}

/** Mijn gegevens: overzicht; naam en e-mailadres wijzig je direct op de plek zelf */
export function AccountGegevens() {
  // Prototype: wijzigingen blijven bewaard zolang je de pagina open hebt
  const gebruiker = useGebruiker();
  const bijwerken = (veld: 'naam' | 'email') => (nieuw: string) => wijzigGebruiker({ [veld]: nieuw });

  return (
    <CommunityPagina onderdeel={account.titel} titel={account.gegevensTitel} tekst={account.gegevensTekst} voorbeeld>
      <dl className="mijninkomen-gegevens mijninkomen-account">
        <WijzigbaarGegeven key={`naam-${gebruiker.id}`} id="account-naam" label="Naam" waarde={gebruiker.naam} soort="text" autoComplete="name" opslaan={bijwerken('naam')} />
        <WijzigbaarGegeven
          key={`email-${gebruiker.id}`}
          id="account-email"
          label="E-mailadres"
          waarde={gebruiker.email}
          soort="email"
          autoComplete="email"
          omschrijving="Het e-mailadres van je werk. Hiermee log je ook in."
          opslaan={bijwerken('email')}
        />
        <div className="mijninkomen-account__rij">
          <dt>Functie</dt>
          <dd>{gebruiker.rol}</dd>
        </div>
        <div className="mijninkomen-account__rij">
          <dt>Gemeente</dt>
          <dd>{gebruiker.gemeente}</dd>
        </div>
        <div className="mijninkomen-account__rij">
          <dt>Communitylid sinds</dt>
          <dd>{gebruiker.lidSinds}</dd>
        </div>
      </dl>
      <Paragraph>
        Klopt je functie of gemeente niet? <Link href="/community/account/aanvragen">Vraag een wijziging aan</Link>.
      </Paragraph>
    </CommunityPagina>
  );
}

/** Wijziging aanvragen bij beheer */
export function AccountAanvragen() {
  const gebruiker = useGebruiker();
  const velden: Veld[] = [
    {
      naam: 'wat',
      label: 'Wat wil je laten wijzigen?',
      soort: 'keuzelijst',
      kies: 'Maak een keuze',
      opties: [
        { waarde: 'functie', label: `Functie (nu: ${gebruiker.rol})` },
        { waarde: 'gemeente', label: `Gemeente (nu: ${gebruiker.gemeente})` },
        { waarde: 'telefoon', label: 'Telefoon voor de inlogcode' },
        { waarde: 'anders', label: 'Iets anders' },
      ],
      fout: 'Kies wat je wilt laten wijzigen.',
    },
    { naam: 'nieuw', label: 'Wat moet het worden?', soort: 'tekst', fout: 'Vul in wat het moet worden.' },
    {
      naam: 'reden',
      label: 'Waarom wil je dit wijzigen?',
      omschrijving: 'Bijvoorbeeld: ik heb een nieuwe functie, of ik werk bij een andere gemeente.',
      soort: 'tekstvak',
      fout: 'Vertel waarom je dit wilt wijzigen.',
    },
  ];

  return (
    <CommunityPagina onderdeel={account.titel} titel={account.aanvragenTitel} tekst={account.aanvragenTekst} voorbeeld>
      <section className="mijninkomen-kaart mijninkomen-formulierkaart" aria-label={account.aanvragenTitel}>
        <Formulier velden={velden} knop={account.aanvragenKnop} bevestiging={account.aanvragenBevestiging} />
      </section>
    </CommunityPagina>
  );
}

/** Inloggen en beveiliging */
export function AccountBeveiliging() {
  return (
    <CommunityPagina onderdeel={account.titel} titel={account.beveiligingTitel} tekst={account.beveiligingTekst}>
      <Paragraph>
        {account.beveiligingTelefoon} <Link href="/community/account/aanvragen">Wijziging aanvragen</Link>
      </Paragraph>
    </CommunityPagina>
  );
}
