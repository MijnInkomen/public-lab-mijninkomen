/**
 * HOMEPAGE (niveau 1, versie 2)
 *
 * Het visitekaartje: kort en rustig. Blokken van boven naar beneden:
 *   1. Wat is MijnInkomen?      – met illustratie van verbonden gemeenten
 *   2. Waarom samen?            – drie korte punten
 *   3. Wie doen mee?            – gemeenten met hun rol + hoe het georganiseerd is
 *   4. Laatste ontwikkelingen   – de nieuwste updates, met link naar Ontwikkelingen
 *   5. Aansluiten               – rustige verwijzing met het volgende webinar
 *
 * Bewust niet op de homepage: spelregels, het formulier en de lijst met regelingen.
 * Teksten: content/home.ts.
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Link } from '@nl-design-system-candidate/link-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import heroAfbeelding from '../assets/home-netwerk.png';
import { Badge } from '../components/Badge/Badge';
import { Icon } from '../components/Icon/Icon';
import { aansluitenVerwijzing, deelnemers, laatsteOntwikkelingen, waarom, wat } from '../content/home';
import { updates } from '../content/ontwikkelingen';
import { datumKort, datumVoluit, komendeWebinars } from '../content/webinars';
import './Home.css';

export function Home() {
  const volgendWebinar = komendeWebinars()[0];
  const nieuwste = updates.lijst.slice(0, laatsteOntwikkelingen.aantal);

  return (
    <>
      {/* 1. WAT IS MIJNINKOMEN */}
      <section className="mijninkomen-hero" aria-labelledby="hero-titel">
        <div className="mijninkomen-container mijninkomen-hero__inner">
          <div>
            <p className="mijninkomen-bovenkop mijninkomen-bovenkop--groen">{wat.bovenkop}</p>
            <Heading level={1} id="hero-titel">{wat.titel}</Heading>
            <Paragraph purpose="lead">{wat.tekst[0]}</Paragraph>
            <Paragraph>{wat.tekst[1]}</Paragraph>
          </div>
          <div className="mijninkomen-hero__beeld">
            {/* Illustratie van verbonden gemeenten (gemaakt met ChatGPT, zie
                AI-verantwoording). Decoratie, daarom een lege alt. */}
            <img src={heroAfbeelding} alt="" width={1000} height={674} />
          </div>
        </div>
      </section>

      {/* 2. WAAROM SAMEN */}
      <section className="mijninkomen-section" aria-labelledby="waarom-titel">
        <div className="mijninkomen-container">
          <p className="mijninkomen-bovenkop">{waarom.bovenkop}</p>
          <Heading level={2} id="waarom-titel">{waarom.titel}</Heading>
          <ul className="mijninkomen-voordelen">
            {waarom.punten.map((p) => (
              <li key={p.titel}>
                <Icon naam={p.icoon} />
                <Heading level={3}>{p.titel}</Heading>
                <Paragraph>{p.tekst}</Paragraph>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. WIE DOEN MEE */}
      <section className="mijninkomen-container mijninkomen-section--smal" aria-labelledby="deelnemers-titel">
        <div className="mijninkomen-blok">
          <p className="mijninkomen-bovenkop">{deelnemers.bovenkop}</p>
          <Heading level={2} id="deelnemers-titel">{deelnemers.titel}</Heading>
          <ul className="mijninkomen-deelnemers">
            {deelnemers.gemeenten.map((g) => (
              <li key={g.naam} className="mijninkomen-deelnemer">
                <div className="mijninkomen-deelnemer__logo">
                  {g.logo ? (
                    <img src={g.logo} alt={g.naam} />
                  ) : (
                    // Logo volgt nog: tot die tijd de naam als tekst
                    <span className="mijninkomen-deelnemer__naam">{g.naam}</span>
                  )}
                </div>
                <p className="mijninkomen-deelnemer__rol">{g.rol}</p>
              </li>
            ))}
          </ul>
          <Paragraph>{deelnemers.organisatie}</Paragraph>
        </div>
      </section>

      {/* 4. LAATSTE ONTWIKKELINGEN */}
      <section className="mijninkomen-section" aria-labelledby="ontwikkelingen-titel">
        <div className="mijninkomen-container">
          <p className="mijninkomen-bovenkop">{laatsteOntwikkelingen.bovenkop}</p>
          <Heading level={2} id="ontwikkelingen-titel">
            {laatsteOntwikkelingen.titel} <Badge />
          </Heading>
          <ul className="mijninkomen-updates">
            {nieuwste.map((u) => (
              <li key={u.datum + u.tekst}>
                <time dateTime={u.datum}>{datumKort(u.datum)}</time>
                <span>{u.tekst}</span>
              </li>
            ))}
          </ul>
          <Link href="/ontwikkelingen">
            {laatsteOntwikkelingen.link} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* 5. AANSLUITEN – rustige verwijzing */}
      <section className="mijninkomen-container mijninkomen-section--smal" aria-labelledby="aansluiten-titel">
        <div className="mijninkomen-verwijzing">
          <Heading level={2} id="aansluiten-titel">{aansluitenVerwijzing.titel}</Heading>
          <Paragraph>
            {aansluitenVerwijzing.tekst}
            {volgendWebinar && (
              <>
                {' '}
                {aansluitenVerwijzing.volgende}{' '}
                <strong>
                  <time dateTime={volgendWebinar}>{datumVoluit(volgendWebinar)}</time>
                </strong>
                .
              </>
            )}
          </Paragraph>
          <Link href="/aansluiten">
            {aansluitenVerwijzing.link} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
