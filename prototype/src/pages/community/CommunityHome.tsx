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
import { acties, besluiten, gebruiker, highlights, home, overleggen } from '../../content/community';
import { CommunityPagina, Datum } from './CommunityPagina';

export function CommunityHome() {
  // Mijn acties: van mij of van mijn gemeente, en nog niet afgerond
  const mijnActies = acties.filter(
    (a) => a.status !== 'Afgerond' && (a.eigenaar === gebruiker.naam || a.gemeente === gebruiker.gemeente),
  );
  const volgende = overleggen.slice(0, 2);

  return (
    <CommunityPagina titel={home.titel} tekst={home.tekst}>
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
            {volgende.map((o) => (
              <li key={o.id}>
                <strong>{o.naam}</strong>
                <p>
                  <Datum iso={o.volgende.datum} />, {o.volgende.tijd} · {o.volgende.waar}
                </p>
                <p>
                  <Link href={`/community/vergaderingen#${o.id}`}>
                    {home.overlegLink}
                    <span className="mijninkomen-visually-hidden"> van het {o.naam}</span>
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* MIJN ACTIES */}
        <section aria-labelledby="c-acties">
          <Heading level={2} id="c-acties">{home.actiesTitel}</Heading>
          <Paragraph>{home.actiesTekst}</Paragraph>
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
          <Link href="/community/vergaderingen#actielijst">
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
        <Link href="/community/vergaderingen#besluitenlogboek">
          {home.besluitenLink} <span aria-hidden="true">→</span>
        </Link>
      </section>
    </CommunityPagina>
  );
}
