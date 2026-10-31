import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import type { Opslag } from './opslag.ts';
import { controleerAanvraag } from './validatie.ts';

const MAX_GROOTTE = 16 * 1024;

const stuurJson = (antwoord: ServerResponse, status: number, inhoud: object) => {
  antwoord.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  antwoord.end(JSON.stringify(inhoud));
};

const leesJson = async (verzoek: IncomingMessage): Promise<unknown> => {
  const delen: Buffer[] = [];
  let grootte = 0;

  for await (const deel of verzoek) {
    grootte += deel.length;
    if (grootte > MAX_GROOTTE) throw new Error('Te groot');
    delen.push(deel);
  }

  return JSON.parse(Buffer.concat(delen).toString('utf8'));
};

export const maakServer = (opslag: Opslag) =>
  createServer(async (verzoek, antwoord) => {
    if (verzoek.url !== '/api/toegang-aanvragen') {
      return stuurJson(antwoord, 404, { fout: 'Niet gevonden' });
    }
    if (verzoek.method !== 'POST') {
      antwoord.setHeader('Allow', 'POST');
      return stuurJson(antwoord, 405, { fout: 'Methode niet toegestaan' });
    }

    let invoer: unknown;
    try {
      invoer = await leesJson(verzoek);
    } catch {
      return stuurJson(antwoord, 400, { fout: 'Ongeldig verzoek' });
    }

    const { aanvraag, fouten } = controleerAanvraag(invoer);
    if (fouten) return stuurJson(antwoord, 422, { fouten });

    try {
      await opslag.slaAanvraagOp(aanvraag);
    } catch (fout) {
      // Log geen aanvraag: daar staan persoonsgegevens in.
      console.error('Aanvraag opslaan mislukt:', fout instanceof Error ? fout.name : 'onbekend');
      return stuurJson(antwoord, 500, { fout: 'De aanvraag kon niet worden opgeslagen' });
    }

    // Ook bij een dubbele aanvraag: zo verraadt het antwoord niet welke e-mailadressen bekend zijn.
    return stuurJson(antwoord, 201, { status: 'in behandeling' });
  });
