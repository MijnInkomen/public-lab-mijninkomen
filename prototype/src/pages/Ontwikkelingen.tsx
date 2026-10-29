/**
 * PAGINA "ONTWIKKELINGEN" (niveau 1, versie 2)
 *
 * Wat MijnInkomen al doet, waar nu aan gewerkt wordt en wat eraan komt.
 * Dit is de pagina die het vaakst verandert. Alleen de openbare samenvatting;
 * de volledige roadmap hoort bij niveau 2.
 *
 * Blokken: intro · Wat MijnInkomen al kan · Waar we nu aan werken ·
 *          Wat eraan komt · Updates · door naar Aansluiten
 * Teksten: content/ontwikkelingen.ts
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Link } from '@nl-design-system-candidate/link-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import { Badge } from '../components/Badge/Badge';
import { PadIllustratie } from '../components/Illustration/OverIllustraties';
import { naarAansluiten, nuBezig, ontwikkelingenIntro, plannen, regelingen, updates } from '../content/ontwikkelingen';
import { datumKort } from '../content/webinars';
import './Ontwikkelingen.css';

export function Ontwikkelingen() {
  return (
    <>
      <section className="mijninkomen-pagina-intro" aria-labelledby="ontw-titel">
        <div className="mijninkomen-container mijninkomen-pagina-intro__inner">
          <div>
            <p className="mijninkomen-bovenkop mijninkomen-bovenkop--groen">{ontwikkelingenIntro.bovenkop}</p>
            <Heading level={1} id="ontw-titel">{ontwikkelingenIntro.titel}</Heading>
            <Paragraph purpose="lead">{ontwikkelingenIntro.tekst}</Paragraph>
          </div>
          <div className="mijninkomen-pagina-intro__beeld">
            <PadIllustratie />
          </div>
        </div>
      </section>

      {/* WAT MIJNINKOMEN AL KAN */}
      <section className="mijninkomen-section" aria-labelledby="regelingen-titel">
        <div className="mijninkomen-container">
          <Heading level={2} id="regelingen-titel">{regelingen.titel}</Heading>
          <Paragraph>{regelingen.tekst}</Paragraph>
          <ul className="mijninkomen-kaarten">
            {regelingen.lijst.map((r) => (
              <li key={r.naam} className="mijninkomen-kaart">
                <Heading level={3}>{r.naam}</Heading>
                <Paragraph>{r.uitleg}</Paragraph>
                <p className="mijninkomen-kaart__extra">
                  Gebruikt door: {r.gemeenten} <Badge />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WAAR WE NU AAN WERKEN */}
      <section className="mijninkomen-section mijninkomen-section--licht" aria-labelledby="nu-titel">
        <div className="mijninkomen-container">
          <Heading level={2} id="nu-titel">
            {nuBezig.titel} <Badge />
          </Heading>
          <ul className="mijninkomen-kaarten">
            {nuBezig.lijst.map((o) => (
              <li key={o.naam} className="mijninkomen-kaart">
                <p className="mijninkomen-kaart__status">
                  <span className="mijninkomen-visually-hidden">Status: </span>
                  <Badge soort="status">{o.status}</Badge>
                </p>
                <Heading level={3}>{o.naam}</Heading>
                <Paragraph>{o.uitleg}</Paragraph>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WAT ERAAN KOMT + UPDATES */}
      <div className="mijninkomen-container mijninkomen-section mijninkomen-ontw-twee">
        <section aria-labelledby="plannen-titel">
          <Heading level={2} id="plannen-titel">
            {plannen.titel} <Badge />
          </Heading>
          <Paragraph>{plannen.tekst}</Paragraph>
          <ul className="mijninkomen-lijst">
            {plannen.lijst.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="updates-titel">
          <Heading level={2} id="updates-titel">
            {updates.titel} <Badge />
          </Heading>
          <ul className="mijninkomen-updates">
            {updates.lijst.map((u) => (
              <li key={u.datum + u.tekst}>
                <time dateTime={u.datum}>{datumKort(u.datum)}</time>
                <span>{u.tekst}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* DOOR NAAR AANSLUITEN */}
      <div className="mijninkomen-container mijninkomen-doorverwijzing">
        <p>
          {naarAansluiten.tekst}{' '}
          <Link href="/aansluiten">
            {naarAansluiten.link} <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </>
  );
}
