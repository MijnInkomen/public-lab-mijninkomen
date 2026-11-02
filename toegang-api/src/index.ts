import { maakOpslag } from './opslag.ts';
import { maakServer } from './server.ts';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error('DATABASE_URL ontbreekt');

const opslag = await maakOpslag(databaseUrl);

maakServer(opslag).listen(4000, () => {
  console.log('Toegang-API luistert op poort 4000');
});
