/**
 * HOMEPAGE (niveau 1 – informatief), volgens het ontwerp van Isabella
 *
 * Secties van boven naar beneden:
 *   1. Hero            – titel, uitleg, knop en illustratie van verbonden gemeenten
 *   2. Waarom          – "Samen sterker" met vier voordelen
 *   3. Gemeenten       – de deelnemende gemeenten
 *   4. Voor wie        – "Voor alle gemeenten" met wegwijzer
 *
 * De teksten komen uit content/home.ts. Koppen, tekst en knoppen zijn officiële
 * NL Design System-componenten (Heading, Paragraph, Button), in onze huisstijl via tokens.css.
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import { ButtonLink } from '../components/ButtonLink/ButtonLink';
import { Icon } from '../components/Icon/Icon';
import heroAfbeelding from '../assets/home-netwerk.png';
import { SignpostIllustration } from '../components/Illustration/SignpostIllustration';
import { gemeenten, hero, voorWie, waarom } from '../content/home';
import './Home.css';

/** Klein grijs kopje boven een titel (bijv. "WAAROM MIJNINKOMEN?") */
function Bovenkop({ children }: { children: string }) {
  return <p className="mijninkomen-bovenkop">{children}</p>;
}

const Pijl = () => <span aria-hidden="true">→</span>;

export function Home() {
  return (
    <>
      {/* 1. HERO */}
      <section className="mijninkomen-hero" aria-labelledby="hero-titel">
        <div className="mijninkomen-container mijninkomen-hero__inner">
          <div>
            <p className="mijninkomen-bovenkop mijninkomen-bovenkop--groen">{hero.bovenkop}</p>
            <Heading level={1} id="hero-titel">{hero.titel}</Heading>
            <Paragraph purpose="lead">{hero.intro}</Paragraph>
            <ButtonLink href="/samenwerken">
              {hero.knop} <Pijl />
            </ButtonLink>
          </div>
          <div className="mijninkomen-hero__beeld">
            {/* Illustratie: gemeentehuizen die allemaal verbonden zijn met MijnInkomen
                (gemaakt met ChatGPT, zie AI-verantwoording). Hij voegt geen informatie
                toe aan de tekst, daarom een lege alt (decoratie). */}
            <img src={heroAfbeelding} alt="" width={1000} height={674} />
          </div>
        </div>
      </section>

      {/* 2. WAAROM MIJNINKOMEN */}
      <section id="over" className="mijninkomen-section" aria-labelledby="waarom-titel">
        <div className="mijninkomen-container">
          <Bovenkop>{waarom.bovenkop}</Bovenkop>
          <Heading level={2} id="waarom-titel">{waarom.titel}</Heading>
          <Paragraph>{waarom.intro}</Paragraph>
          <ul className="mijninkomen-voordelen">
            {waarom.voordelen.map((v) => (
              <li key={v.titel}>
                <Icon naam={v.icoon} />
                <Heading level={3}>{v.titel}</Heading>
                <Paragraph>{v.tekst}</Paragraph>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. DEELNEMENDE GEMEENTEN */}
      <section className="mijninkomen-container mijninkomen-section--smal" aria-labelledby="gemeenten-titel">
        <div className="mijninkomen-blok mijninkomen-gemeenten">
          <div>
            <Bovenkop>{gemeenten.bovenkop}</Bovenkop>
            <Heading level={2} id="gemeenten-titel">{gemeenten.titel}</Heading>
            <Paragraph>{gemeenten.intro}</Paragraph>
          </div>
          <ul className="mijninkomen-gemeenten__lijst">
            {gemeenten.lijst.map((g) => (
              <li key={g.naam} className="mijninkomen-gemeente">
                <img src={g.logo} alt={g.naam} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. VOOR WIE */}
      <section id="samenwerken" className="mijninkomen-section" aria-labelledby="voorwie-titel">
        <div className="mijninkomen-container mijninkomen-voorwie">
          <div>
            <Bovenkop>{voorWie.bovenkop}</Bovenkop>
            <Heading level={2} id="voorwie-titel">{voorWie.titel}</Heading>
            {voorWie.tekst.map((t) => (
              <Paragraph key={t}>{t}</Paragraph>
            ))}
            <ButtonLink href="/samenwerken">
              {voorWie.knop} <Pijl />
            </ButtonLink>
          </div>
          <div className="mijninkomen-voorwie__beeld">
            <SignpostIllustration />
          </div>
        </div>
      </section>
    </>
  );
}
