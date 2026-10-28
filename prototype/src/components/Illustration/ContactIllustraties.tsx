/**
 * Illustraties voor de pagina "Contact".
 * Zelf getekend als SVG in de huisstijlkleuren; decoratie (aria-hidden).
 */
import { Glans } from './OverIllustraties';
import './Illustration.css';

const LICHT = '#e6f0ec';
const MIDDEN = '#b9d4c6';
const GROEN = '#5e9b72';
const DONKER = '#1d5e43';

/** Hero: een open envelop met een brief */
export function EnvelopIllustratie() {
  return (
    <svg className="mijninkomen-illustration" viewBox="0 0 440 300" aria-hidden="true" focusable="false">
      <path d="M40 260C10 170 80 60 210 40s230 40 220 140-60 120-200 120S60 320 40 260z" fill={LICHT} />
      {/* achterkant envelop */}
      <path d="M110 150l110-80 110 80v110H110z" fill={GROEN} />
      {/* brief */}
      <rect x="140" y="90" width="160" height="130" rx="6" fill="#ffffff" />
      <g stroke={GROEN} strokeWidth="8" strokeLinecap="round">
        <path d="M168 125h104" />
        <path d="M168 150h104" />
        <path d="M168 175h70" />
      </g>
      {/* voorkant envelop */}
      <path d="M110 150l110 75 110-75v110H110z" fill={MIDDEN} />
      <path d="M110 260l90-70M330 260l-90-70" stroke={GROEN} strokeWidth="4" />
      <path d="M110 150l110 75 110-75" fill="none" stroke={DONKER} strokeWidth="4" strokeLinejoin="round" opacity="0.3" />
      <Glans x={350} y={74} />
    </svg>
  );
}

/** Veelgestelde vragen: twee tekstballonnen */
export function BallonnenIllustratie() {
  return (
    <svg className="mijninkomen-illustration" viewBox="0 0 200 150" aria-hidden="true" focusable="false">
      <path d="M20 150c10-40 60-60 110-50s70 30 70 50z" fill={LICHT} />
      <path d="M100 66a40 34 0 1 1 30 33l12 20-26-14a40 34 0 0 1-16-39z" fill={MIDDEN} />
      <path d="M40 60a44 38 0 1 1 22 33l-18 18 4-25A40 36 0 0 1 40 60z" fill={GROEN} />
      <g fill="#ffffff">
        <circle cx="62" cy="58" r="5" />
        <circle cx="82" cy="58" r="5" />
        <circle cx="102" cy="58" r="5" />
      </g>
      <g stroke={DONKER} strokeWidth="4" strokeLinecap="round">
        <path d="M142 18l-6 14" />
        <path d="M160 30l-14 7" />
      </g>
    </svg>
  );
}
