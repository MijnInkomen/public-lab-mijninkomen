/**
 * Illustraties voor de pagina "Over MijnInkomen".
 * Zelf getekend als SVG, in de kleuren van de huisstijl. Ze zijn decoratie
 * (aria-hidden): de tekst ernaast vertelt al wat er te weten valt.
 */
import logoIcoon from '../../assets/logo-icoon.png';
import './Illustration.css';

const LICHT = '#e6f0ec';
const MIDDEN = '#b9d4c6';
const GROEN = '#5e9b72';
const DONKER = '#1d5e43';

/** Kleine "glans"-streepjes boven een figuur */
export function Glans({ x, y }: { x: number; y: number }) {
  return (
    <g stroke={DONKER} strokeWidth="5" strokeLinecap="round">
      <path d={`M${x - 26} ${y + 6}l-12 -14`} />
      <path d={`M${x} ${y}v-18`} />
      <path d={`M${x + 26} ${y + 6}l12 -14`} />
    </g>
  );
}

export function Wolk({ x, y }: { x: number; y: number }) {
  return <path d={`M${x} ${y}a16 16 0 0 1 30-6 12 12 0 0 1 20 10h-56a8 8 0 0 1 6-4z`} fill="#ffffff" opacity="0.8" />;
}

/** Hero: de twee personen uit het logo in een groen landschap */
export function OverHeroIllustratie() {
  return (
    <svg className="mijninkomen-illustration" viewBox="0 0 520 360" aria-hidden="true" focusable="false">
      <path d="M40 360C40 220 120 120 260 70s250 20 260 110v180z" fill={LICHT} />
      <Wolk x={400} y={70} />
      {/* gebouwen */}
      <g fill={MIDDEN} opacity="0.7">
        <rect x="100" y="170" width="44" height="130" />
        <rect x="410" y="140" width="50" height="160" />
        <rect x="372" y="190" width="34" height="110" />
      </g>
      <g fill="#ffffff" opacity="0.7">
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="110" y={182 + i * 26} width="9" height="12" />
            <rect x="126" y={182 + i * 26} width="9" height="12" />
            <rect x="420" y={154 + i * 30} width="10" height="14" />
            <rect x="440" y={154 + i * 30} width="10" height="14" />
          </g>
        ))}
      </g>
      {/* bomen */}
      <g fill={GROEN} opacity="0.6">
        <ellipse cx="78" cy="240" rx="18" ry="30" />
        <ellipse cx="480" cy="236" rx="16" ry="28" />
      </g>
      <rect x="76" y="260" width="4" height="40" fill={GROEN} opacity="0.6" />
      <rect x="478" y="254" width="4" height="46" fill={GROEN} opacity="0.6" />
      {/* heuvels */}
      <path d="M0 360c60-70 150-90 260-70s200 10 260-30v100z" fill={MIDDEN} opacity="0.6" />
      {/* de twee personen (het logo-icoon) */}
      <image href={logoIcoon} x="150" y="70" width="230" height="230" />
      <Glans x={265} y={58} />
    </svg>
  );
}

/** 01 – Wie we zijn: drie personen, de middelste uitgelicht */
export function MensenIllustratie() {
  return (
    <svg className="mijninkomen-illustration" viewBox="0 0 420 300" aria-hidden="true" focusable="false">
      <path d="M30 170C20 90 90 30 200 40s210 30 200 120-80 120-190 120S40 250 30 170z" fill={LICHT} />
      <g fill="none" stroke={GROEN} strokeWidth="9" strokeLinecap="round">
        <circle cx="120" cy="140" r="26" />
        <path d="M70 230a50 50 0 0 1 100 0" />
        <circle cx="300" cy="140" r="26" />
        <path d="M250 230a50 50 0 0 1 100 0" />
      </g>
      <circle cx="210" cy="125" r="32" fill={DONKER} />
      <path d="M148 235a62 62 0 0 1 124 0" fill="none" stroke={DONKER} strokeWidth="11" strokeLinecap="round" />
      <Glans x={210} y={72} />
    </svg>
  );
}

/** 02 – Hoe het is begonnen: een kronkelend pad van startpunt naar vlag */
export function PadIllustratie() {
  return (
    <svg className="mijninkomen-illustration" viewBox="0 0 420 300" aria-hidden="true" focusable="false">
      <path d="M20 180C10 90 100 20 220 30s190 50 180 150-90 110-200 110S30 260 20 180z" fill={LICHT} />
      <Wolk x={140} y={70} />
      <path d="M40 260c40-90 100-140 170-150s120 60 190 40v110H40z" fill={MIDDEN} opacity="0.7" />
      <path d="M150 260c30-70 120-60 140-110s40-50 60-60" fill="none" stroke="#ffffff" strokeWidth="22" strokeLinecap="round" />
      <g fill={GROEN} opacity="0.8">
        <ellipse cx="330" cy="230" rx="22" ry="30" />
        <ellipse cx="360" cy="236" rx="18" ry="24" />
        <ellipse cx="90" cy="250" rx="30" ry="18" />
      </g>
      {/* startpunt */}
      <path d="M110 200c-22 0-36-16-36-34a36 36 0 0 1 72 0c0 18-14 34-36 70z" fill={DONKER} />
      <circle cx="110" cy="166" r="12" fill="#ffffff" />
      {/* vlag */}
      <rect x="338" y="60" width="6" height="70" fill={DONKER} />
      <path d="M344 62l44 16-44 16z" fill={DONKER} />
      <g stroke={DONKER} strokeWidth="5" strokeLinecap="round">
        <path d="M370 40l6-16" />
        <path d="M384 52l14-10" />
      </g>
    </svg>
  );
}

/** 03 – Onze drijfveer: een plantje dat groeit */
export function GroeiIllustratie() {
  return (
    <svg className="mijninkomen-illustration" viewBox="0 0 420 300" aria-hidden="true" focusable="false">
      <path d="M30 170C20 80 110 20 220 30s200 40 190 140-90 110-190 110S40 260 30 170z" fill={LICHT} />
      <Wolk x={70} y={110} />
      <Wolk x={300} y={150} />
      <path d="M60 270c30-60 80-70 120-40s90 20 120-20 70 20 80 60z" fill={MIDDEN} opacity="0.7" />
      <path d="M130 270c20-40 140-40 160 0z" fill={GROEN} />
      {/* stengel en blaadjes */}
      <path d="M210 262c0-50 4-80 22-110" fill="none" stroke={DONKER} strokeWidth="9" strokeLinecap="round" />
      <path d="M212 180c-20-40-60-50-90-40 6 40 46 60 90 40z" fill={DONKER} />
      <path d="M230 156c14-40 54-56 88-50-4 40-44 64-88 50z" fill={GROEN} />
      <Glans x={222} y={84} />
    </svg>
  );
}
