const REALM = 'mijninkomen';
export const ROLLEN = {
  LID: 'communitylid',
  ADMIN: 'admin',
  HOOFDBEHEERDER: 'hoofdbeheerder',
};

type Gebruiker = {
  id: string;
  email?: string;
  username: string;
  firstName?: string;
  lastName?: string;
};

export class Keycloak {
  public url: string;
  public clientSecret: string;
  constructor(url: string, secret: string) {
    this.url = url;
    this.clientSecret = secret;
  }

  async haalToken() {
    let token: unknown = null;
    try {
      const antwoord = await fetch(`${this.url}/realms/${REALM}/protocol/openid-connect/token`, {
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: 'roadmap-api',
          client_secret: this.clientSecret,
        }),
      });

      if (!antwoord.ok) {
        throw new Error("Keycloak: token ophalen faalde");
      }

      token = (await antwoord.json()).access_token;
    } catch(e) {
      console.error(e);
    }

    return (typeof token === "string") ? token : null;
  }

  async maakBeheer() {
    const token = await this.haalToken();
    if (!token) {
      throw new Error("Keycloak: server geeft geen token");
    }

    return (pad: string, init: RequestInit = {}) => {
      return fetch(`${this.url}/admin/realms/${REALM}${pad}`, {
        ...init,
        headers: { Authorization: `Bearer ${token}`, "Content-type": "application/json" },
      });
    }
  }

  async haalRollenOp(email: string) {
    try {
      const beheer = await this.maakBeheer();
      const params = new URLSearchParams({ email, exact: 'true', briefRepresentation: 'true' });
      const gevonden: Gebruiker[] = await (await beheer(`/users?${params}`)).json();
      if (!Array.isArray(gevonden)) {
        throw new Error("Keycloak: response type bij ophalen van gebuikers met email is onverwacht");
      }

      const gebruiker = gevonden.find((kandidaat) => kandidaat.email?.toLowerCase() === email.toLowerCase());
      if (!gebruiker) {
        throw new Error("Keycloak: deze gebruiker bestaat geeneens");
      }

      const rollen: unknown = await (await beheer(`/users/${gebruiker.id}/role-mappings/realm/composite`)).json();
      if (!Array.isArray(rollen)) {
        throw new Error("Keycloak: response type bij ophalen rollen is onverwacht");
      }

      return new Set<string>(rollen.map(({name}) => name));
    } catch (e) {
      console.error(e);
    }
    return new Set<string>();
  }
}