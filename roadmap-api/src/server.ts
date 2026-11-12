import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import fsPromises from "node:fs/promises";

export function maakServer() {
  return createServer(async (verzoek, antwoord) => {
    const pad = new URL(verzoek.url ?? '/', 'http://localhost').pathname;
    try {
      if (pad.startsWith('/api/roadmap')) {
        const jsonString = await fsPromises.readFile("example.json", { encoding: 'utf8' });
        const json = JSON.parse(jsonString);
        return stuurJson(antwoord, 200, json);
      }
      return stuurJson(antwoord, 404, { fout: 'Niet gevonde '});
    } catch (fout) {
      return stuurFout(antwoord, fout);
    }
  });
}

function stuurFout (antwoord: ServerResponse, fout: unknown): void {
  // Log geen aanvraag: daar staan persoonsgegevens in.
  console.error('Verzoek mislukt:', fout instanceof Error ? fout.message : 'onbekend');
  stuurJson(antwoord, 500, { fout: 'Er ging iets mis. Probeer het later opnieuw' });
};

function stuurJson (antwoord: ServerResponse, status: number, inhoud: object): void {
  antwoord.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  antwoord.end(JSON.stringify(inhoud));
};