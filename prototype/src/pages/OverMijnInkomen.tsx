/**
 * PAGINA "OVER MIJNINKOMEN" (niveau 1 – informatief), volgens het ontwerp van Isabella
 *
 * Opbouw:
 *   1. Hero      – titel, korte uitleg en illustratie met de twee personen uit het logo
 *   2. Drie genummerde hoofdstukken (01, 02, 03), om en om:
 *      illustratie links/tekst rechts, en andersom
 *
 * De teksten komen uit content/over.ts. Koppen en tekst zijn officiële
 * NL Design System-componenten (Heading, Paragraph).
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import {
  GroeiIllustratie,
  MensenIllustratie,
  OverHeroIllustratie,
  PadIllustratie,
} from '../components/Illustration/OverIllustraties';
import { overHero, overSecties } from '../content/over';
import './OverMijnInkomen.css';

const illustraties = {
  mensen: MensenIllustratie,
  pad: PadIllustratie,
  groei: GroeiIllustratie,
};

export function OverMijnInkomen() {
  return (
    <>
      {/* 1. HERO */}
      <section className="mijninkomen-over-hero" aria-labelledby="over-titel">
        <div className="mijninkomen-container mijninkomen-over-hero__inner">
          <div>
            <p className="mijninkomen-bovenkop mijninkomen-bovenkop--groen">{overHero.bovenkop}</p>
            <Heading level={1} id="over-titel">{overHero.titel}</Heading>
            <Paragraph purpose="lead">{overHero.intro}</Paragraph>
          </div>
          <div>
            <OverHeroIllustratie />
          </div>
        </div>
      </section>

      {/* 2. DE DRIE HOOFDSTUKKEN */}
      {overSecties.map((sectie, index) => {
        const Illustratie = illustraties[sectie.illustratie];
        const titelId = `over-sectie-${sectie.nummer}`;
        // Om en om: even secties (01, 03) hebben de illustratie links en een lichtgroene achtergrond
        const illustratieLinks = index % 2 === 0;
        return (
          <section
            key={sectie.nummer}
            className={`mijninkomen-over-sectie${illustratieLinks ? ' mijninkomen-over-sectie--licht' : ''}`}
            aria-labelledby={titelId}
          >
            <div
              className={`mijninkomen-container mijninkomen-over-sectie__inner${
                illustratieLinks ? '' : ' mijninkomen-over-sectie__inner--omgekeerd'
              }`}
            >
              <div className="mijninkomen-over-sectie__beeld">
                <Illustratie />
              </div>
              <div>
                <p className="mijninkomen-over-sectie__label">
                  <span className="mijninkomen-over-sectie__nummer">{sectie.nummer}</span>
                  <span className="mijninkomen-bovenkop mijninkomen-bovenkop--groen">{sectie.bovenkop}</span>
                </p>
                <Heading level={2} id={titelId}>{sectie.titel}</Heading>
                {sectie.tekst.map((t) => (
                  <Paragraph key={t}>{t}</Paragraph>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
