/**
 * HOMEPAGE (niveau 1, versie 2.1)
 *
 * Een overzicht dat nieuwsgierig maakt en doorstuurt naar meer informatie
 * (feedback opdrachtgever). Blokken van boven naar beneden:
 *   1. Wat is MijnInkomen?  – korte uitleg + knoppen naar Ontwikkelingen en Meer weten
 *   2. Waarom samen?        – drie korte punten
 *   3. Wie doen mee?        – logo's + korte tekst + link naar "Hoe werken we samen?"
 *   4. Recent bijgewerkt    – de 3 laatst bijgewerkte projecten, met status en "Lees meer"
 *   5. Wil je meer weten?   – het volgende webinar, link naar de webinarpagina
 *
 * Bewust NIET op de homepage: de rollen van de gemeenten, de regelingen, de
 * formulieren. Die staan op hun eigen pagina; zo staat niets dubbel.
 * Teksten: content/home.ts.
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Link } from '@nl-design-system-candidate/link-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import heroAfbeelding from '../assets/home-netwerk.png';
import { Badge } from '../components/Badge/Badge';
import { Icon } from '../components/Icon/Icon';
import { KnopLink } from '../components/KnopLink/KnopLink';
import { deelnemers, doorklikken, recentBijgewerkt, waarom, wat, webinarVerwijzing } from '../content/home';
import { projectDetail, recentBijgewerkt as zoekRecent } from '../content/ontwikkelingen';
import { datumKort, datumVoluit, komendeWebinars } from '../content/webinars';
import './Home.css';

export function Home() {
  const volgendWebinar = komendeWebinars()[0];
  const recent = zoekRecent(recentBijgewerkt.aantal);

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
            <div className="mijninkomen-button-group">
              <KnopLink href="/ontwikkelingen">{doorklikken.ontwikkelingen}</KnopLink>
              <KnopLink href="/meer-weten" purpose="secondary">
                {doorklikken.meerWeten}
              </KnopLink>
            </div>
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
                  <img src={g.logo} alt={g.naam} />
                </div>
              </li>
            ))}
          </ul>
          <Paragraph>{deelnemers.tekst}</Paragraph>
          <Link href="/meer-weten">
            {deelnemers.link} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* 4. RECENT BIJGEWERKT – de laatst bijgewerkte projecten */}
      <section className="mijninkomen-section" aria-labelledby="recent-titel">
        <div className="mijninkomen-container">
          <p className="mijninkomen-bovenkop">{recentBijgewerkt.bovenkop}</p>
          <Heading level={2} id="recent-titel">
            {recentBijgewerkt.titel} <Badge />
          </Heading>
          <ul className="mijninkomen-recent">
            {recent.map((p) => (
              <li key={p.slug}>
                <time dateTime={p.bijgewerkt}>{datumKort(p.bijgewerkt)}</time>
                <span className="mijninkomen-recent__naam">
                  <Link href={`/ontwikkelingen/project/${p.slug}`}>{p.naam}</Link>
                </span>
                <span>
                  <span className="mijninkomen-visually-hidden">{projectDetail.status}: </span>
                  <Badge soort="status">{p.status}</Badge>
                </span>
              </li>
            ))}
          </ul>
          <Link href="/ontwikkelingen">
            {recentBijgewerkt.link} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* 5. WIL JE MEER WETEN – rustige verwijzing naar het webinar */}
      <section className="mijninkomen-container mijninkomen-section--smal" aria-labelledby="meer-titel">
        <div className="mijninkomen-verwijzing">
          <Heading level={2} id="meer-titel">{webinarVerwijzing.titel}</Heading>
          <Paragraph>
            {webinarVerwijzing.tekst}
            {volgendWebinar && (
              <>
                {' '}
                {webinarVerwijzing.volgende}{' '}
                <strong>
                  <time dateTime={volgendWebinar}>{datumVoluit(volgendWebinar)}</time>
                </strong>
                .
              </>
            )}
          </Paragraph>
          <Link href="/meer-weten/webinar">
            {webinarVerwijzing.link} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
