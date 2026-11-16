import { maakServer } from "./server.ts";
import { Opslag } from "./opslag.ts";
import { leesInstelling } from "./utils.ts";

const opslag = new Opslag(leesInstelling("DATABASE_URL"));
maakServer(opslag).listen(4000, () => {
  console.log('Roadmap-API luistert op poort 4000');
  console.log(opslag);
});