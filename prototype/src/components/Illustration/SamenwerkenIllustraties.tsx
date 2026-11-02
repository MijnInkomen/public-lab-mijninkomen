/**
 * Illustraties voor de pagina "Samenwerken".
 * Zelf getekend als SVG in de huisstijlkleuren; decoratie (aria-hidden).
 */
import logoIcoon from '../../assets/logo-icoon.png';
import { Glans, Wolk } from './OverIllustraties';
import './Illustration.css';

const LICHT = '#e6f0ec';
const MIDDEN = '#b9d4c6';
const GROEN = '#5e9b72';
const DONKER = '#1d5e43';

/** Hero: de twee personen uit het logo op een lichtgroene vlek */
export function SamenwerkenHeroIllustratie() {
  return (
    <svg className="mijninkomen-illustration" viewBox="0 0 480 340" aria-hidden="true" focusable="false">
      <path d="M60 300C20 200 80 80 220 40s250 30 240 150-40 150-180 150S90 360 60 300z" fill={LICHT} />
      <path d="M0 340c90-40 220-50 300-20s140 0 180-30v50z" fill={MIDDEN} opacity="0.5" />
      <image href={logoIcoon} x="115" y="70" width="250" height="250" />
      <Glans x={245} y={58} />
    </svg>
  );
}

/** Voor wie: een gemeentehuis met vlag en een boom */
export function GemeentehuisIllustratie() {
  return (
    <svg className="mijninkomen-illustration" viewBox="0 0 400 260" aria-hidden="true" focusable="false">
      <path d="M40 260c0-90 60-170 170-180s170 70 170 180z" fill={LICHT} />
      <Wolk x={60} y={70} />
      <Wolk x={300} y={50} />
      <g fill="#ffffff" stroke={DONKER} strokeWidth="6" strokeLinejoin="round">
        <rect x="140" y="130" width="50" height="100" />
        <rect x="250" y="130" width="50" height="100" />
        <rect x="185" y="100" width="70" height="130" />
        <path d="M175 104l45-38 45 38z" />
      </g>
      <circle cx="220" cy="118" r="11" fill={DONKER} />
      <g fill={DONKER}>
        <rect x="152" y="146" width="11" height="13" />
        <rect x="167" y="146" width="11" height="13" />
        <rect x="152" y="174" width="11" height="13" />
        <rect x="262" y="146" width="11" height="13" />
        <rect x="277" y="146" width="11" height="13" />
        <rect x="277" y="174" width="11" height="13" />
        <rect x="200" y="146" width="11" height="13" />
        <rect x="229" y="146" width="11" height="13" />
        <rect x="208" y="196" width="24" height="34" />
      </g>
      {/* vlag */}
      <rect x="218" y="34" width="5" height="34" fill={DONKER} />
      <path d="M223 36h24v16h-24z" fill={DONKER} />
      {/* boom */}
      <ellipse cx="110" cy="190" rx="20" ry="32" fill={GROEN} />
      <rect x="108" y="200" width="4" height="32" fill={DONKER} />
      <path d="M80 232c60-6 200-8 260 0" fill="none" stroke={DONKER} strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}
