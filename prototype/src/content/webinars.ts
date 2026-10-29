/**
 * WEBINARS
 * --------
 * Elke 2e woensdag van de maand, 15.00–16.00 uur, online.
 * Het tijdstip en de data zijn VOORBEELDEN voor het prototype.
 *
 * Datums staan als JJJJ-MM-DD. De site bepaalt zelf welke webinars al geweest
 * zijn (voor het aanmeldformulier) en welke nog komen (voor het aanmelden).
 */
export const webinarTijd = 'elke 2e woensdag van de maand, 15.00–16.00 uur, online';

export const webinarDatums = [
  '2026-07-08',
  '2026-09-09',
  '2026-10-14',
  '2026-11-11',
  '2026-12-09',
  '2027-01-13',
];

const vandaag = () => new Date().toISOString().slice(0, 10);

/** Webinars die nog komen, eerstvolgende eerst */
export function komendeWebinars(): string[] {
  return webinarDatums.filter((d) => d >= vandaag());
}

/** Webinars die al geweest zijn, nieuwste eerst */
export function geweestWebinars(): string[] {
  return webinarDatums.filter((d) => d < vandaag()).reverse();
}

/** "2026-11-11" → "woensdag 11 november 2026" */
export function datumVoluit(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** "2026-10-21" → "21 oktober 2026" */
export function datumKort(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
