import { maakKeycloak } from './keycloak.ts';
import { maakMail } from './mail.ts';
import { maakOpslag } from './opslag.ts';
import { maakServer } from './server.ts';

const leesInstelling = (naam: string) => {
  const waarde = process.env[naam];
  if (!waarde) throw new Error(`${naam} ontbreekt`);
  return waarde;
};

const opslag = await maakOpslag(leesInstelling('DATABASE_URL'));
const keycloak = maakKeycloak({
  url: leesInstelling('KEYCLOAK_URL'),
  clientSecret: leesInstelling('KEYCLOAK_CLIENT_SECRET'),
  siteUrl: leesInstelling('SITE_URL'),
});

const mail = maakMail({
  host: leesInstelling('SMTP_HOST'),
  port: Number(leesInstelling('SMTP_PORT')),
  van: leesInstelling('MAIL_VAN'),
});

maakServer(opslag, keycloak, mail).listen(4000, () => {
  console.log('Toegang-API luistert op poort 4000');
});
