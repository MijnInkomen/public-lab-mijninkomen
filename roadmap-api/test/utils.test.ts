import assert from "node:assert";
import test, { describe } from "node:test";
import { creëerDebouncer } from "../src/utils.ts";
import { setTimeout } from "node:timers/promises";

describe("Debounce functie creator", () => {
  function testFunctie(comp: Function, ...args: any) {
    comp([...args]);
  }

  test("De functie wordt pas aangeroepen na de gezette tijd", () => {
    const PERIODE = 1000;
    const debouncer = creëerDebouncer(testFunctie, PERIODE);
    const start = Date.now();
    debouncer(() => assert(Date.now() - start > PERIODE));
  });

  test("De functie wordt één keer aangeroepen bij meerdere aanroepingen van debouncer binnen de tijd", async () => {
    const PERIODE = 2000;
    const AANROEP_AANTAL = 3;
    const aanroepingen: number[] = [];
    const debouncer = creëerDebouncer(testFunctie, PERIODE);
    
    let counter = 0;
    for (let i = 0; i < AANROEP_AANTAL; i++) {
      await setTimeout(PERIODE / 2);
      aanroepingen.push(Date.now());
      debouncer(() => counter++);
    }

    await setTimeout(PERIODE * 1.5);
    assert(counter === 1);
  });

  test("De functie wordt meerdere keren aangeroepen bij meerdere aanroepingen van debouncer buiten de tijd", async () => {
    const PERIODE = 1000;
    const AANROEP_AANTAL = 3;
    const aanroepingen: number[] = [];
    const debouncer = creëerDebouncer(testFunctie, PERIODE);
    
    let counter = 0;
    for (let i = 0; i < AANROEP_AANTAL; i++) {
      aanroepingen.push(Date.now());
      debouncer(() => counter++);
      await setTimeout(PERIODE * 1.5);
    }

    assert(counter === AANROEP_AANTAL);
  });

  test("Argumenten meegegeven aan de debouncer worden ook meegegeven naar de callback functie", () => {
    const PERIODE = 1;
    const testArgs = [1, "String", true, null, [1, 2, 3], {test: 4}];
    const debouncer = creëerDebouncer(testFunctie, PERIODE);

    debouncer((args: any) => assert.partialDeepStrictEqual(args, testArgs), ...testArgs);
  });
});