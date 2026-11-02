import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { AccountBestaatAl, type Keycloak } from './keycloak.ts';
import type { Opslag, Resultaat } from './opslag.ts';
import { controleerAanvraag } from './validatie.ts';

const MAX_GROOTTE = 16 * 1024;
const LIJST = '/api/beheer/aanvragen';
const BEHANDELEN = /^\/api\/beheer\/aanvragen\/([0-9a-f-]{36})\/(toelaten|weigeren)$/;

const MELDINGEN: Record<Exclude<Resultaat, 'gelukt'>, [number, string]> = {
  'niet-gevonden': [404, 'Deze aanvraag bestaat niet'],
  'al-behandeld': [409, 'Deze aanvraag is al behandeld'],
};

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

/** Nginx zet deze kop zelf na de login-controle en overschrijft wat een bezoeker meestuurt. */
const isAdmin = (verzoek: IncomingMessage) => {
  const groepen = verzoek.headers['x-auth-groups'];
  return typeof groepen === 'string' && groepen.split(',').some((groep) => groep.trim() === 'admin');
};

const stuurFout = (antwoord: ServerResponse, fout: unknown) => {
  // Log geen aanvraag: daar staan persoonsgegevens in.
  console.error('Verzoek mislukt:', fout instanceof Error ? fout.message : 'onbekend');
  stuurJson(antwoord, 500, { fout: 'Er ging iets mis. Probeer het later opnieuw' });
};

export const maakServer = (opslag: Opslag, keycloak: Keycloak) => {
  const verwerkAanvraag = async (verzoek: IncomingMessage, antwoord: ServerResponse) => {
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

    await opslag.slaAanvraagOp(aanvraag);

    // Ook bij een dubbele aanvraag: zo verraadt het antwoord niet welke e-mailadressen bekend zijn.
    return stuurJson(antwoord, 201, { status: 'in behandeling' });
  };

  const verwerkBeheer = async (verzoek: IncomingMessage, antwoord: ServerResponse, pad: string) => {
    if (!isAdmin(verzoek)) return stuurJson(antwoord, 403, { fout: 'Geen toegang' });

    if (pad === LIJST && verzoek.method === 'GET') {
      return stuurJson(antwoord, 200, { aanvragen: await opslag.haalAanvragenOp() });
    }

    const [, id, actie] = pad.match(BEHANDELEN) ?? [];
    if (!id || verzoek.method !== 'POST') return stuurJson(antwoord, 404, { fout: 'Niet gevonden' });

    try {
      const resultaat =
        actie === 'toelaten'
          ? await opslag.behandelAanvraag(id, 'toegelaten', keycloak.maakCommunitylid)
          : await opslag.behandelAanvraag(id, 'geweigerd');

      if (resultaat === 'gelukt') return stuurJson(antwoord, 200, { status: 'gelukt' });
      const [status, fout] = MELDINGEN[resultaat];
      return stuurJson(antwoord, status, { fout });
    } catch (fout) {
      if (fout instanceof AccountBestaatAl) {
        return stuurJson(antwoord, 409, { fout: 'Er bestaat al een account met dit e-mailadres' });
      }
      throw fout;
    }
  };

  return createServer(async (verzoek, antwoord) => {
    const pad = new URL(verzoek.url ?? '/', 'http://localhost').pathname;

    try {
      if (pad === '/api/toegang-aanvragen') return await verwerkAanvraag(verzoek, antwoord);
      if (pad.startsWith('/api/beheer/')) return await verwerkBeheer(verzoek, antwoord, pad);
      return stuurJson(antwoord, 404, { fout: 'Niet gevonden' });
    } catch (fout) {
      return stuurFout(antwoord, fout);
    }
  });
};
