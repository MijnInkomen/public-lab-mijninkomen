import { maakServer, verwerkUpdateVerzoek } from "./server.ts";
import { Opslag } from "./opslag.ts";
import { leesInstelling } from "./utils.ts";
import { Keycloak } from "./keycloak.ts";

const opslag = new Opslag(leesInstelling("DATABASE_URL"));
const keycloak = new Keycloak(
  leesInstelling("KEYCLOAK_URL"), leesInstelling("KEYCLOAK_CLIENT_SECRET")
);
maakServer(opslag, keycloak).listen(4000, () => {
  console.log('Roadmap-API luistert op poort 4000');
  console.log(opslag);
  verwerkUpdateVerzoek(opslag);
});