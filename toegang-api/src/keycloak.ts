import type { Aanvraag } from './validatie.ts';

export class AccountBestaatAl extends Error {}

/** Het e-mailadres hoort al bij een ander account. */
export class EmailInGebruik extends Error {}

/** Rol op de site. Beheerder is de Keycloak-rol admin, hoofdbeheerder is de main admin. */
export type Rol = 'lid' | 'beheerder' | 'hoofdbeheerder';

export interface KeycloakLid {
  id: string;
  naam: string;
  email: string;
  rol: Rol;
}

/** De gegevens van een ingelogd lid, voor de pagina Mijn gegevens. */
export interface Account {
  id: string;
  naam: string;
  email: string;
  lidSinds: number | null;
}

export interface AccountWijziging {
  naam?: string;
  email?: string;
}

export interface Keycloak {
  maakCommunitylid: (aanvraag: Aanvraag) => Promise<void>;
  haalLedenOp: () => Promise<KeycloakLid[]>;
  haalLidOp: (id: string) => Promise<KeycloakLid | undefined>;
  /** Zet de rol van een lid op lid of beheerder. De rol hoofdbeheerder blijft altijd ongewijzigd. */
  zetRol: (id: string, rol: Exclude<Rol, 'hoofdbeheerder'>) => Promise<void>;
  /** De rollen zoals ze nu in Keycloak staan, zodat een wijziging direct doorwerkt. */
  haalRollenOp: (email: string) => Promise<string[]>;
  /** Zoekt op het Keycloak-id: dat verandert niet als het e-mailadres verandert. */
  haalAccountOp: (id: string) => Promise<Account | undefined>;
  /** Wijzigt naam of e-mailadres. Gooit EmailInGebruik als het e-mailadres al bij een ander account hoort. */
  wijzigAccount: (id: string, wijziging: AccountWijziging) => Promise<void>;
}

interface Instellingen {
  url: string;
  clientSecret: string;
  siteUrl: string;
}

const REALM = 'mijninkomen';
const LID = 'communitylid';
const ADMIN = 'admin';
const HOOFDBEHEERDER = 'hoofdbeheerder';
const ACTIES = ['UPDATE_PASSWORD', 'CONFIGURE_TOTP'];
const LINK_GELDIG_SECONDEN = 7 * 24 * 60 * 60;
const MAX_LEDEN = 1000;

interface Gebruiker {
  id: string;
  email?: string;
  username: string;
  firstName?: string;
  lastName?: string;
  createdTimestamp?: number;
}

const splitsNaam = (naam: string) => {
  const [voornaam = naam, ...rest] = naam.split(/\s+/);
  return { firstName: voornaam, lastName: rest.join(' ') || voornaam };
};

const naamVan = ({ firstName, lastName, username }: Gebruiker) =>
  [firstName, lastName].filter(Boolean).join(' ') || username;

const rolVan = (rollen: Set<string>): Rol =>
  rollen.has(HOOFDBEHEERDER) ? 'hoofdbeheerder' : rollen.has(ADMIN) ? 'beheerder' : 'lid';

const controleer = async (antwoord: Response, stap: string) => {
  if (!antwoord.ok) throw new Error(`Keycloak: ${stap} mislukt met status ${antwoord.status}`);
  return antwoord;
};

export const maakKeycloak = ({ url, clientSecret, siteUrl }: Instellingen): Keycloak => {
  const haalToken = async () => {
    const antwoord = await fetch(`${url}/realms/${REALM}/protocol/openid-connect/token`, {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: 'toegang-api',
        client_secret: clientSecret,
      }),
    });
    await controleer(antwoord, 'token ophalen');
    const { access_token: token } = (await antwoord.json()) as { access_token: string };
    return token;
  };

  const maakBeheer = async () => {
    const token = await haalToken();
    return (pad: string, init: RequestInit = {}) =>
      fetch(`${url}/admin/realms/${REALM}${pad}`, {
        ...init,
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
  };

  type Beheer = Awaited<ReturnType<typeof maakBeheer>>;

  const leesJson = async <T>(beheer: Beheer, pad: string, stap: string) =>
    (await (await controleer(await beheer(pad), stap)).json()) as T;

  const rollenVan = async (beheer: Beheer, id: string) => {
    const rollen = await leesJson<{ name: string }[]>(beheer, `/users/${id}/role-mappings/realm/composite`, 'rollen ophalen');
    return new Set(rollen.map(({ name }) => name));
  };

  const wijzigRol = async (beheer: Beheer, id: string, rol: string, method: 'POST' | 'DELETE') => {
    const rolInfo = await leesJson<object>(beheer, `/roles/${rol}`, 'rol ophalen');
    await controleer(
      await beheer(`/users/${id}/role-mappings/realm`, { method, body: JSON.stringify([rolInfo]) }),
      method === 'POST' ? 'rol toekennen' : 'rol afnemen',
    );
  };

  return {
    maakCommunitylid: async ({ naam, email }) => {
      const beheer = await maakBeheer();

      const nieuw = await beheer('/users', {
        method: 'POST',
        body: JSON.stringify({
          ...splitsNaam(naam),
          username: email,
          email,
          emailVerified: true,
          enabled: true,
          requiredActions: ACTIES,
        }),
      });
      if (nieuw.status === 409) throw new AccountBestaatAl();
      await controleer(nieuw, 'account maken');

      const id = nieuw.headers.get('location')?.split('/').pop();
      if (!id) throw new Error('Keycloak: geen account-id ontvangen');

      try {
        await wijzigRol(beheer, id, LID, 'POST');

        const terug = new URLSearchParams({
          client_id: 'oauth2-proxy',
          lifespan: String(LINK_GELDIG_SECONDEN),
          redirect_uri: `${siteUrl}/`,
        });
        await controleer(
          await beheer(`/users/${id}/execute-actions-email?${terug}`, {
            method: 'PUT',
            body: JSON.stringify(ACTIES),
          }),
          'e-mail versturen',
        );
      } catch (fout) {
        // Zonder e-mail kan niemand het account gebruiken: ruim het op, zodat toelaten opnieuw kan.
        await beheer(`/users/${id}`, { method: 'DELETE' });
        throw fout;
      }
    },

    haalLedenOp: async () => {
      const beheer = await maakBeheer();
      const [leden, admins, hoofdbeheerders] = await Promise.all(
        [LID, ADMIN, HOOFDBEHEERDER].map((rol) =>
          leesJson<Gebruiker[]>(beheer, `/roles/${rol}/users?first=0&max=${MAX_LEDEN}`, 'leden ophalen'),
        ),
      );

      const rollen = new Map<string, Set<string>>();
      const gebruikers = new Map<string, Gebruiker>();
      for (const [rol, lijst] of [
        [LID, leden],
        [ADMIN, admins],
        [HOOFDBEHEERDER, hoofdbeheerders],
      ] as const) {
        for (const gebruiker of lijst) {
          gebruikers.set(gebruiker.id, gebruiker);
          rollen.set(gebruiker.id, (rollen.get(gebruiker.id) ?? new Set()).add(rol));
        }
      }

      return [...gebruikers.values()]
        .map((gebruiker) => ({
          id: gebruiker.id,
          naam: naamVan(gebruiker),
          email: gebruiker.email ?? gebruiker.username,
          rol: rolVan(rollen.get(gebruiker.id) ?? new Set()),
        }))
        .sort((a, b) => a.naam.localeCompare(b.naam, 'nl'));
    },

    haalLidOp: async (id) => {
      const beheer = await maakBeheer();
      const antwoord = await beheer(`/users/${id}`);
      if (antwoord.status === 404) return undefined;
      const gebruiker = (await (await controleer(antwoord, 'lid ophalen')).json()) as Gebruiker;
      const rollen = await rollenVan(beheer, id);
      if (![LID, ADMIN, HOOFDBEHEERDER].some((rol) => rollen.has(rol))) return undefined;
      return { id, naam: naamVan(gebruiker), email: gebruiker.email ?? gebruiker.username, rol: rolVan(rollen) };
    },

    zetRol: async (id, rol) => {
      const beheer = await maakBeheer();
      const rollen = await rollenVan(beheer, id);
      if (rollen.has(HOOFDBEHEERDER)) throw new Error('Keycloak: de rol van de hoofdbeheerder kan niet veranderen');

      if (!rollen.has(LID)) await wijzigRol(beheer, id, LID, 'POST');
      if (rol === 'beheerder' && !rollen.has(ADMIN)) await wijzigRol(beheer, id, ADMIN, 'POST');
      if (rol === 'lid' && rollen.has(ADMIN)) await wijzigRol(beheer, id, ADMIN, 'DELETE');
    },

    haalRollenOp: async (email) => {
      const beheer = await maakBeheer();
      const params = new URLSearchParams({ email, exact: 'true', briefRepresentation: 'true' });
      const gevonden = await leesJson<Gebruiker[]>(beheer, `/users?${params}`, 'gebruiker zoeken');
      const gebruiker = gevonden.find((kandidaat) => kandidaat.email?.toLowerCase() === email.toLowerCase());
      return gebruiker ? [...(await rollenVan(beheer, gebruiker.id))] : [];
    },

    haalAccountOp: async (id) => {
      const beheer = await maakBeheer();
      const antwoord = await beheer(`/users/${id}`);
      if (antwoord.status === 404) return undefined;
      const gebruiker = (await (await controleer(antwoord, 'account ophalen')).json()) as Gebruiker;
      return {
        id: gebruiker.id,
        naam: naamVan(gebruiker),
        email: gebruiker.email ?? gebruiker.username,
        lidSinds: gebruiker.createdTimestamp ? new Date(gebruiker.createdTimestamp).getFullYear() : null,
      };
    },

    wijzigAccount: async (id, { naam, email }) => {
      const beheer = await maakBeheer();
      const [voornaam = '', ...rest] = (naam ?? '').split(/\s+/);
      const velden = {
        ...(naam && { firstName: voornaam, lastName: rest.join(' ') }),
        ...(email && { email, emailVerified: true }),
      };
      const antwoord = await beheer(`/users/${id}`, { method: 'PUT', body: JSON.stringify(velden) });
      if (antwoord.status === 409) throw new EmailInGebruik();
      await controleer(antwoord, 'account wijzigen');
    },
  };
};
