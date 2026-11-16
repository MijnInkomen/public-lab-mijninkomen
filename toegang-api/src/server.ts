import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { AccountBestaatAl, type Keycloak } from './keycloak.ts';
import type { Mail } from './mail.ts';
import type { Opslag, Resultaat } from './opslag.ts';
import { controleerAanvraag, controleerReden, controleerWijziging, FUNCTIES } from './validatie.ts';

const MAX_GROOTTE = 16 * 1024;
const LIJST = '/api/beheer/aanvragen';
const BEHANDELEN = /^\/api\/beheer\/aanvragen\/([0-9a-f-]{36})\/(toelaten|weigeren)$/;
const LEDEN = '/api/beheer/leden';
const LID = /^\/api\/beheer\/leden\/([0-9a-f-]{36})$/;

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

/** Nginx zet deze koppen zelf na de login-controle en overschrijft wat een bezoeker meestuurt. */
const leesKop = (verzoek: IncomingMessage, naam: string) => {
  const waarde = verzoek.headers[naam];
  return typeof waarde === 'string' ? waarde.trim() : '';
};


const stuurFout = (antwoord: ServerResponse, fout: unknown) => {
  // Log geen aanvraag: daar staan persoonsgegevens in.
  console.error('Verzoek mislukt:', fout instanceof Error ? fout.message : 'onbekend');
  stuurJson(antwoord, 500, { fout: 'Er ging iets mis. Probeer het later opnieuw' });
};

export const maakServer = (opslag: Opslag, keycloak: Keycloak, mail: Mail) => {
  /**
   * De rollen in de login kunnen tot een minuut oud zijn. Daarom vraagt de API de rollen
   * bij elk verzoek aan Keycloak: zo werkt een rolwijziging direct door.
   */
  const heeftRol = async (verzoek: IncomingMessage, rol: string) => {
    const email = leesKop(verzoek, 'x-auth-email');
    return Boolean(email) && (await keycloak.haalRollenOp(email)).includes(rol);
  };

  const verwerkLeden = async (verzoek: IncomingMessage, antwoord: ServerResponse, pad: string) => {
    if (!(await heeftRol(verzoek, 'hoofdbeheerder'))) return stuurJson(antwoord, 403, { fout: 'Geen toegang' });

    if (pad === LEDEN && verzoek.method === 'GET') {
      const leden = await keycloak.haalLedenOp();
      const soorten = await opslag.haalSoortenOp(leden);
      // Oude aanvragen hebben soms een zelf getypte functie: die telt als nog niet gekozen.
      const soortVan = (id: string) => {
        const soort = soorten.get(id);
        return soort && FUNCTIES.includes(soort) ? soort : null;
      };
      return stuurJson(antwoord, 200, { leden: leden.map((lid) => ({ ...lid, soort: soortVan(lid.id) })) });
    }

    const [, id] = pad.match(LID) ?? [];
    if (!id || verzoek.method !== 'POST') return stuurJson(antwoord, 404, { fout: 'Niet gevonden' });

    let invoer: unknown;
    try {
      invoer = await leesJson(verzoek);
    } catch {
      return stuurJson(antwoord, 400, { fout: 'Ongeldig verzoek' });
    }
    const { wijziging, fout } = controleerWijziging(invoer);
    if (!wijziging) return stuurJson(antwoord, 422, { fout });

    const lid = await keycloak.haalLidOp(id);
    if (!lid) return stuurJson(antwoord, 404, { fout: 'Dit lid bestaat niet' });
    if (wijziging.rol && lid.rol === 'hoofdbeheerder') {
      return stuurJson(antwoord, 409, { fout: 'De rol van de hoofdbeheerder kan niet veranderen' });
    }

    if (wijziging.rol) await keycloak.zetRol(id, wijziging.rol);
    if (wijziging.soort) await opslag.zetSoort(id, wijziging.soort);
    return stuurJson(antwoord, 200, { status: 'gelukt' });
  };

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
    if (pad === LEDEN || pad.startsWith(`${LEDEN}/`)) return verwerkLeden(verzoek, antwoord, pad);
    if (!(await heeftRol(verzoek, 'admin'))) return stuurJson(antwoord, 403, { fout: 'Geen toegang' });

    if (pad === LIJST && verzoek.method === 'GET') {
      return stuurJson(antwoord, 200, { aanvragen: await opslag.haalAanvragenOp() });
    }

    const [, id, actie] = pad.match(BEHANDELEN) ?? [];
    if (!id || verzoek.method !== 'POST') return stuurJson(antwoord, 404, { fout: 'Niet gevonden' });

    let reden = '';
    if (actie === 'weigeren') {
      let invoer: unknown;
      try {
        invoer = await leesJson(verzoek);
      } catch {
        return stuurJson(antwoord, 400, { fout: 'Ongeldig verzoek' });
      }
      const controle = controleerReden(invoer);
      if (controle.reden === undefined) return stuurJson(antwoord, 422, { fouten: { reden: controle.fout } });
      reden = controle.reden;
    }

    try {
      // Lukt het account of de e-mail niet, dan blijft de aanvraag in behandeling.
      const resultaat =
        actie === 'toelaten'
          ? await opslag.behandelAanvraag(id, 'toegelaten', keycloak.maakCommunitylid)
          : await opslag.behandelAanvraag(id, 'geweigerd', (aanvraag) => mail.stuurWeigering(aanvraag, reden), reden);

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
