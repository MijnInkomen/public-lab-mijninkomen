import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import fsPromises from "node:fs/promises";
import { updateData } from './github.ts';

export function maakServer() {
  return createServer(async (verzoek, antwoord) => {
    const pad = new URL(verzoek.url ?? '/', 'http://localhost').pathname.slice(12);
    try {
      switch (pad) {
        case "/publiek/huidig":
        case "/publiek/toekomstig":
          const jsonString = await fsPromises.readFile("./src/example.json", { encoding: 'utf8' });
          const json = JSON.parse(jsonString);

          const type = pad.slice(9);
          return stuurJson(antwoord, 200, json.publiek[type]);
        
        case "/update":
          await updateData();
          console.log("Updated data");
          stuurStatus(antwoord, 200);
          return;
        
        // TEMP ENDPOINT FOR CHECKING
        case "/update-failed":
          console.log("Failed update");
          stuurStatus(antwoord, 500);
          return;

        default:
          return stuurJson(antwoord, 404, { fout: 'Niet gevonde '});
      }
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

function stuurStatus(antwoord: ServerResponse, statusCode: number) {
  antwoord.writeHead(statusCode)
  antwoord.end()
}