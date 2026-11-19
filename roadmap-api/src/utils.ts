export function leesInstelling (naam: string) {
  const waarde = process.env[naam];
  if (!waarde) {
    throw new Error(`${naam} ontbreekt`);
  }
  return waarde;
};