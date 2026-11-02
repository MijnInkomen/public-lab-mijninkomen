/**
 * Illustratie van een wegwijzer (decoratie bij "Voor wie is MijnInkomen?").
 * De teksten op de bordjes zijn alleen sfeer; dezelfde voordelen staan
 * ook als gewone tekst op de pagina. Daarom is hij aria-hidden.
 */
import './Illustration.css';

const bordjes = [
  { tekst: 'Kennis delen', y: 30, kleur: '#2f7a5d', tekstKleur: '#ffffff' },
  { tekst: 'Kosten besparen', y: 78, kleur: '#cfe0d7', tekstKleur: '#174c39' },
  { tekst: 'Inwoners centraal', y: 126, kleur: '#2f7a5d', tekstKleur: '#ffffff' },
  { tekst: 'Samen verder', y: 174, kleur: '#cfe0d7', tekstKleur: '#174c39' },
];

export function SignpostIllustration() {
  return (
    <svg className="mijninkomen-illustration" viewBox="0 0 320 260" aria-hidden="true" focusable="false">
      <path d="M30 70a14 14 0 0 1 26-5 11 11 0 0 1 17 9H24a8 8 0 0 1 6-4z" fill="#e1ebe6" />
      <rect x="146" y="14" width="10" height="234" rx="4" fill="#8a948f" />
      <path d="M96 96h50v28H96l-14-14z" fill="#a7c4b6" />
      {bordjes.map((b) => (
        <g key={b.tekst}>
          <path d={`M156 ${b.y}h130l12 14-12 14H156z`} fill={b.kleur} />
          <text x="168" y={b.y + 19} fontSize="13" fontWeight="600" fill={b.tekstKleur} fontFamily="inherit">
            {b.tekst}
          </text>
        </g>
      ))}
      <path d="M70 248c0-30 10-50 28-62-4 20 0 40 6 62zM100 248c4-24 18-40 34-46-8 16-10 30-8 46z" fill="#5e8f79" />
      <ellipse cx="190" cy="248" rx="50" ry="8" fill="#a7c4b6" />
      <rect x="40" y="246" width="240" height="3" fill="#a7c4b6" />
    </svg>
  );
}
