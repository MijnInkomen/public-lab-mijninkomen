import type { Aanvraag } from './validatie.ts';

export class AccountBestaatAl extends Error {}

export interface Keycloak {
  maakCommunitylid: (aanvraag: Aanvraag) => Promise<void>;
}

interface Instellingen {
  url: string;
  clientSecret: string;
  siteUrl: string;
}

const REALM = 'mijninkomen';
const ROL = 'communitylid';
const ACTIES = ['UPDATE_PASSWORD', 'CONFIGURE_TOTP'];
const LINK_GELDIG_SECONDEN = 7 * 24 * 60 * 60;

const splitsNaam = (naam: string) => {
  const [voornaam = naam, ...rest] = naam.split(/\s+/);
  return { firstName: voornaam, lastName: rest.join(' ') || voornaam };
};

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

  return {
    maakCommunitylid: async ({ naam, email }) => {
      const token = await haalToken();
      const beheer = (pad: string, init: RequestInit = {}) =>
        fetch(`${url}/admin/realms/${REALM}${pad}`, {
          ...init,
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });

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
        const rol = await controleer(await beheer(`/roles/${ROL}`), 'rol ophalen');
        await controleer(
          await beheer(`/users/${id}/role-mappings/realm`, {
            method: 'POST',
            body: JSON.stringify([await rol.json()]),
          }),
          'rol toekennen',
        );

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
  };
};
