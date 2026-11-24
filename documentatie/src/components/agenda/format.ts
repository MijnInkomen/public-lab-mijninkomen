import type { AgendaItem, Soort } from './types';

/** Zet JJJJ-MM-DD om naar bijvoorbeeld "10 december 2026". */
export const datumVoluit = (datum: string) =>
  new Date(`${datum}T12:00:00`).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });

export const soortNaam = (soorten: Soort[], id: string) => soorten.find((soort) => soort.id === id)?.naam ?? id;

/** De items staan op volgorde van datum en begintijd, zodat de eerstvolgende bovenaan staat. */
export const opDatum = (eerste: AgendaItem, tweede: AgendaItem) =>
  `${eerste.datum}${eerste.begintijd}`.localeCompare(`${tweede.datum}${tweede.begintijd}`);

/** Vandaag in Nederland, als JJJJ-MM-DD. */
export const vandaag = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Amsterdam' });
