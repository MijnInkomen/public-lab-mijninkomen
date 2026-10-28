/**
 * Logo – het logo van MijnInkomen
 *
 * Ontwerp van Isabella, op basis van een idee van de opdrachtgevers:
 * de M bestaat uit twee personen die elkaar een hand geven. De puntjes
 * op de i en de j zijn weggelaten, zodat alleen de twee hoofdjes opvallen.
 *
 * Het logo is een afbeelding (PNG met doorzichtige achtergrond) in src/assets.
 * Bij de echte bouw: vraag een SVG-versie van het definitieve logo, die blijft
 * op elk formaat scherp.
 *
 * Twee varianten:
 *   - "volledig" → de M met de rest van het woord (in de kop van de site)
 *   - "icoon"    → alleen de M, voor kleine plekken
 *
 * Toegankelijkheid: alt="MijnInkomen", zodat een schermlezer het logo
 * voorleest als het woord MijnInkomen.
 */
import logoVolledig from '../../assets/logo-mijninkomen.png';
import logoIcoon from '../../assets/logo-icoon.png';
import './Logo.css';

type LogoProps = {
  variant?: 'volledig' | 'icoon';
};

export function Logo({ variant = 'volledig' }: LogoProps) {
  if (variant === 'icoon') {
    return <img className="mijninkomen-logo mijninkomen-logo--icoon" src={logoIcoon} alt="MijnInkomen" />;
  }
  return <img className="mijninkomen-logo" src={logoVolledig} alt="MijnInkomen" />;
}
