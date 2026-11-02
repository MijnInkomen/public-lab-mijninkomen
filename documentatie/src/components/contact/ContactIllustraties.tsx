const LICHT = '#e6f0ec';
const MIDDEN = '#b9d4c6';
const GROEN = '#5e9b72';
const DONKER = '#1d5e43';

export const EnvelopIllustratie = () => (
  <svg className="mijninkomen-contact__illustratie" viewBox="0 0 440 300" aria-hidden="true" focusable="false">
    <path d="M40 260C10 170 80 60 210 40s230 40 220 140-60 120-200 120S60 320 40 260z" fill={LICHT} />
    <path d="M110 150l110-80 110 80v110H110z" fill={GROEN} />
    <rect x="140" y="90" width="160" height="130" rx="6" fill="#fff" />
    <g stroke={GROEN} strokeWidth="8" strokeLinecap="round">
      <path d="M168 125h104" />
      <path d="M168 150h104" />
      <path d="M168 175h70" />
    </g>
    <path d="M110 150l110 75 110-75v110H110z" fill={MIDDEN} />
    <path d="M110 260l90-70M330 260l-90-70" stroke={GROEN} strokeWidth="4" />
    <path d="M110 150l110 75 110-75" fill="none" stroke={DONKER} strokeWidth="4" strokeLinejoin="round" opacity="0.3" />
  </svg>
);

export const GebouwenIllustratie = () => (
  <svg className="mijninkomen-contact__illustratie" viewBox="0 0 400 260" aria-hidden="true" focusable="false">
    <path d="M40 260c0-90 60-170 170-180s170 70 170 180z" fill={LICHT} />
    <g fill="#fff" stroke={DONKER} strokeWidth="6" strokeLinejoin="round">
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
    <rect x="218" y="34" width="5" height="34" fill={DONKER} />
    <path d="M223 36h24v16h-24z" fill={DONKER} />
    <ellipse cx="110" cy="190" rx="20" ry="32" fill={GROEN} />
    <rect x="108" y="200" width="4" height="32" fill={DONKER} />
    <path d="M80 232c60-6 200-8 260 0" fill="none" stroke={DONKER} strokeWidth="6" strokeLinecap="round" />
  </svg>
);
