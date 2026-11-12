import { maakServer } from "./server.ts";

maakServer().listen(4000, () => {
  console.log('Roadmap-API luistert op poort 4000');
});