/**
 * PAGINA "SAMENWERKEN" (niveau 1 – informatief), volgens het ontwerp van Isabella
 *
 * Opbouw:
 *   1. Hero          – titel, uitleg en de twee personen uit het logo
 *   2. Waarom        – drie redenen om samen te werken, met iconen
 *   3. Voor wie      – lichtgroen blok met een gemeentehuis
 *   4. Aansluiten    – oproep met een knop naar het formulier
 *
 * De teksten komen uit content/samenwerken.ts.
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import { ButtonLink } from '../components/ButtonLink/ButtonLink';
import { Icon } from '../components/Icon/Icon';
import {
  GemeentehuisIllustratie,
  SamenwerkenHeroIllustratie,
} from '../components/Illustration/SamenwerkenIllustraties';
import { aansluiten, samenwerkenHero, voorWieSamenwerken, waaromSamenwerken } from '../content/samenwerken';
import './Samenwerken.css';

export function Samenwerken() {
  return (
    <>
      {/* 1. HERO */}
      <section className="mijninkomen-sw-hero" aria-labelledby="sw-titel">
        <div className="mijninkomen-container mijninkomen-sw-twee-kolommen">
          <div>
            <p className="mijninkomen-bovenkop mijninkomen-bovenkop--groen">{samenwerkenHero.bovenkop}</p>
            <Heading level={1} id="sw-titel">{samenwerkenHero.titel}</Heading>
            <Paragraph purpose="lead">{samenwerkenHero.intro}</Paragraph>
          </div>
          <div>
            <SamenwerkenHeroIllustratie />
          </div>
        </div>
      </section>

      {/* 2. WAAROM SAMENWERKEN */}
      <section className="mijninkomen-section" aria-labelledby="sw-waarom">
        <div className="mijninkomen-container">
          {/* In het ontwerp is dit kleine kopje de enige titel van het blok,
              daarom is het een echte kop (h2) in de stijl van een klein kopje */}
          <h2 id="sw-waarom" className="mijninkomen-bovenkop mijninkomen-bovenkop--groen">
            {waaromSamenwerken.bovenkop}
          </h2>
          <ul className="mijninkomen-sw-redenen">
            {waaromSamenwerken.punten.map((p) => (
              <li key={p.titel}>
                <Icon naam={p.icoon} />
                <Heading level={3}>{p.titel}</Heading>
                <Paragraph>{p.tekst}</Paragraph>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. VOOR WIE */}
      <section className="mijninkomen-container mijninkomen-section--smal" aria-labelledby="sw-voorwie">
        <div className="mijninkomen-sw-blok mijninkomen-sw-twee-kolommen">
          <div>
            <p className="mijninkomen-bovenkop mijninkomen-bovenkop--groen">{voorWieSamenwerken.bovenkop}</p>
            <Heading level={2} id="sw-voorwie">{voorWieSamenwerken.titel}</Heading>
            <Paragraph>{voorWieSamenwerken.tekst}</Paragraph>
          </div>
          <div className="mijninkomen-sw-blok__beeld">
            <GemeentehuisIllustratie />
          </div>
        </div>
      </section>

      {/* 4. AANSLUITEN */}
      <section className="mijninkomen-section mijninkomen-sw-aansluiten" aria-labelledby="sw-aansluiten">
        <div className="mijninkomen-container">
          <p className="mijninkomen-bovenkop mijninkomen-bovenkop--groen">{aansluiten.bovenkop}</p>
          <Heading level={2} id="sw-aansluiten">{aansluiten.titel}</Heading>
          {aansluiten.tekst.map((t) => (
            <Paragraph key={t}>{t}</Paragraph>
          ))}
          {/* De knop gaat naar het formulier op de contactpagina */}
          <ButtonLink href="/contact#formulier">
            {aansluiten.knop} <span aria-hidden="true">→</span>
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
