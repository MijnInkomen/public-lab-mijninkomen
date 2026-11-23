/**
 * NIVEAU 2 › Home
 * Doel: binnen 30 seconden zien wat er speelt, wanneer het volgende overleg is
 * en welke acties en besluiten voor jou belangrijk zijn.
 * Bewust niet hier: uitleg over wat MijnInkomen is (dat staat op niveau 1).
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Link } from '@nl-design-system-candidate/link-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import { Badge } from '../../components/Badge/Badge';
import { acties, besluiten, highlights, home, isMijnActie, volgendeOverleggen } from '../../content/community';
import { useGebruiker } from './gebruiker';
import { CommunityPagina, Datum } from './CommunityPagina';

export function CommunityHome() {
  // Rolgericht (document niveau 2): wat je ziet, hangt af van je rol
  const gebruiker = useGebruiker();
  // Mijn acties: van mij, van mijn gemeente, of (programmamanager) alle landelijke; nog niet afgerond
  const mijnActies = acties.filter((a) => a.status !== 'Afgerond' && isMijnActie(gebruiker, a));
  // De eerstvolgende 2 overleggen waar ik bij ben, uitgerekend uit het vaste ritme
  const volgende = volgendeOverleggen(12)
    .filter((m) => gebruiker.overleggen.includes(m.overleg.id))
    .slice(0, 2);
  const actiesTekst =
    gebruiker.gemeente === 'Programmateam'
      ? 'Openstaande acties voor jou en alle landelijke acties.'
      : `Openstaande acties voor jou of voor de gemeente ${gebruiker.gemeente}.`;

  return (
    <CommunityPagina titel={`${home.welkom}, ${gebruiker.voornaam}`} tekst={home.tekst}>
      {/* SNEL NAAR: per rol andere pagina's */}
      <section className="mijninkomen-c-sectie" aria-labelledby="c-snel">
        <Heading level={2} id="c-snel">{home.snelTitel}</Heading>
        <Paragraph>{home.snelTekst.replace('{rol}', gebruiker.rol.toLowerCase())}</Paragraph>
        <ul className="mijninkomen-c-snel">
          {gebruiker.snelNaar.map((s) => (
            <li key={s.href}>
              <Link href={s.href}>
                {s.label} <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* HIGHLIGHTS */}
      <section className="mijninkomen-c-sectie" aria-labelledby="c-highlights">
        <Heading level={2} id="c-highlights">{home.highlightsTitel}</Heading>
        <ul className="mijninkomen-c-highlights">
          {highlights.map((h) => (
            <li key={h.titel}>
              <Datum iso={h.datum} />
              <strong>{h.titel}</strong>
              <p>{h.tekst}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mijninkomen-c-twee mijninkomen-c-sectie">
        {/* EERSTVOLGENDE OVERLEGGEN */}
        <section aria-labelledby="c-overleg">
          <Heading level={2} id="c-overleg">{home.overlegTitel}</Heading>
          <ul className="mijninkomen-c-overleggen">
            {volgende.map(({ datum, overleg: o }) => (
              <li key={o.id + datum}>
                <strong>{o.naam}</strong>
                <p>
                  <Datum iso={datum} />, {o.tijd} · {o.waar}
                </p>
              </li>
            ))}
          </ul>
          <p>
            <Link href="/community/vergaderingen">{home.overlegLink}</Link>
          </p>
        </section>

        {/* MIJN ACTIES */}
        <section aria-labelledby="c-acties">
          <Heading level={2} id="c-acties">{home.actiesTitel}</Heading>
          <Paragraph>{actiesTekst}</Paragraph>
          {mijnActies.length === 0 && <Paragraph>Je hebt geen openstaande acties.</Paragraph>}
          <ul className="mijninkomen-c-overleggen">
            {mijnActies.map((a) => (
              <li key={a.actie}>
                <strong>{a.actie}</strong>
                <p>
                  Uiterlijk <Datum iso={a.streefdatum} /> ·{' '}
                  <span className="mijninkomen-visually-hidden">Status: </span>
                  <Badge soort="status">{a.status}</Badge>
                </p>
              </li>
            ))}
          </ul>
          <Link href="/community/vergaderingen/actielijst">
            {home.actiesLink} <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>

      {/* LAATSTE BESLUITEN */}
      <section className="mijninkomen-c-sectie" aria-labelledby="c-besluiten">
        <Heading level={2} id="c-besluiten">{home.besluitenTitel}</Heading>
        <ul className="mijninkomen-c-overleggen">
          {besluiten.slice(0, 3).map((b) => (
            <li key={b.besluit}>
              <strong>{b.besluit}</strong>
              <p>
                <Datum iso={b.datum} /> · {b.overleg}
              </p>
            </li>
          ))}
        </ul>
        <Link href="/community/vergaderingen/besluitenlogboek">
          {home.besluitenLink} <span aria-hidden="true">→</span>
        </Link>
      </section>
    </CommunityPagina>
  );
}
