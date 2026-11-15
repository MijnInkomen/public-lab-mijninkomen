loadEnvFile("./test.env");

import assert from "node:assert";
import test, { describe } from "node:test";
import { valideerWebhookEvent, valideerWebhookSignature } from "../src/github.ts";
import { loadEnvFile } from "node:process";
import type { IncomingMessage } from "node:http";

function creëerMockSignatureVerzoek(waarde: string | null) {
  return {headersDistinct: {"x-hub-signature-256": [waarde]}} as unknown as IncomingMessage;
}

function creëerMockWebhookEvent(type: string | null, body: object) {
  return [
    {headersDistinct: {"x-github-event": [type]}},
    Buffer.from(JSON.stringify(body)),
  ] as unknown as [IncomingMessage, Buffer];
}

describe("Webhook signature validatie functie", () => {
  let verzoek;
  let body = Buffer.from("test body");;

  test("Slaagt een correcte signature", () => {
    verzoek = creëerMockSignatureVerzoek("sha256=c8733c93ec530cfb1ae6f539d89f33b03671149cb74efe5b58718370b3b2b95f");
    console.log(valideerWebhookSignature(verzoek, body))
    assert(valideerWebhookSignature(verzoek, body));
    
  });

  test("Faalt een incorrecte signature", () => {
    verzoek = creëerMockSignatureVerzoek("sha256=a441b15fe9a3cf56661190a0b93b9dec7d04127288cc87250967cf3b52894d11");
    assert.equal(valideerWebhookSignature(verzoek, body), false);
  });

  test("Faalt een signature zonder sha256=", () => {
    verzoek = creëerMockSignatureVerzoek("a441b15fe9a3cf56661190a0b93b9dec7d04127288cc87250967cf3b52894d11");
    assert.equal(valideerWebhookSignature(verzoek, body), false);
  });
  
  test("Faalt een signature met verkeerde lengte", () => {
    verzoek = creëerMockSignatureVerzoek("sha256=63efb315ed71cc7e5a1fc202434bb3aec2091e7838707e148a017");
    assert.equal(valideerWebhookSignature(verzoek, body), false);
  });

  test("Fallt een verzoek zonder signature", () => {
    verzoek = creëerMockSignatureVerzoek(null);
    assert.equal(valideerWebhookSignature(verzoek, body), false)
  })
});

describe("Webhook event validatie functie", () => {
  let args: [IncomingMessage, Buffer];

  test("Slaagt correcte webhook events", () => {
    args = creëerMockWebhookEvent("workflow_job", {action: "completed"});
    assert(valideerWebhookEvent(...args));

    args = creëerMockWebhookEvent("issues", {action: "opened", issue: {type: {name: "Feature"}}});
    assert(valideerWebhookEvent(...args));

    args = creëerMockWebhookEvent("issues", {action: "closed", issue: {type: {name: "Epic"}}});
    assert(valideerWebhookEvent(...args));

    args = creëerMockWebhookEvent("issues", {action: "status_changed", issue: {type: {name: "Feature"}}});
    assert(valideerWebhookEvent(...args));
  });

  test("Faalt incorrecte actions", () => {
    args = creëerMockWebhookEvent("workflow_job", {action: "waiting"});
    assert.equal(valideerWebhookEvent(...args), false);

    args = creëerMockWebhookEvent("issues", {action: "pinned", issue: {type: {name: "Feature"}}});
    assert.equal(valideerWebhookEvent(...args), false);

    args = creëerMockWebhookEvent("issues", {});
    assert.equal(valideerWebhookEvent(...args), false);
  });

  test("Faalt incorrecte types", () => {
    args = creëerMockWebhookEvent("push", {});
    assert.equal(valideerWebhookEvent(...args), false);

    args = creëerMockWebhookEvent("release", {action: "edited"});
    assert.equal(valideerWebhookEvent(...args), false);
  });
});
