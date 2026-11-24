import { setTimeout, clearTimeout } from "node:timers";

type gedbouncdeFunctie = {
  (...args: any[]): any,
  timeoutID?: number,
}

export function leesInstelling (naam: string) {
  const waarde = process.env[naam];
  if (!waarde) {
    throw new Error(`${naam} ontbreekt`);
  }
  return waarde;
};

// Creërt een functie die, wanneer aangeroepen, wachtPeriode in millieseconde wacht
// Hierna zal de callback zelf aangeroepen worden
// Als de functie vaker wordt aangeroepen voor het einde van de wachtPeriode, begint de periode opnieuw
export function creëerDebouncer(callback: Function, wachtPeriode: number) {
  const gedbouncde: gedbouncdeFunctie = (...args) => {
    if (!gedbouncde.timeoutID) {
      gedbouncde.timeoutID = setTimeout(callback, wachtPeriode, ...args);
      return;
    }

    clearTimeout(gedbouncde.timeoutID);
    gedbouncde.timeoutID = setTimeout(callback, wachtPeriode, ...args);
  }

  return gedbouncde;
}