window.COURSE_CODE_MODULE = {
  "title": "Assert on Serialized Telemetry",
  "codeIntro": "Conceptual Jest/Supertest integration test. The capturing sink returns JSON-round-tripped event payloads from the real serializer. Transport-envelope fields, if present, need their own exact contract. The fixture seeds a real document and an authenticated actor who is denied deletion; it supplies a synthetic bearer credential usable only in this isolated test.",
  "codeExamples": [
    {
      "title": "Output-focused telemetry test",
      "language": "typescript",
      "blurb": "Assert the response, complete event shape, and absence of secret values as well as source keys. createDeniedDocumentFixture must establish the expected actor, tenant, document, and denial relationship in the application's test adapters. Never use production credentials in this test.",
      "code": `it("emits a minimal authorization event", async () => {
  const sink = new CapturingSink();
  const app = createApp({ telemetrySink: sink });
  const fixture = await createDeniedDocumentFixture(app);
  const privateValue = "must-not-appear";

  const response = await request(app)
    .delete("/documents/" + fixture.documentId)
    .set("Authorization", "Bearer " + fixture.syntheticBearerToken)
    .send({ newlyAddedPrivateField: privateValue });
  expect(response.status).toBe(403);

  const output = sink.serializedRecords();
  expect(output).toStrictEqual([{
    event: "authorization.denied",
    actorId: fixture.actorId,
    tenantId: fixture.tenantId,
    resourceType: "document",
    resourceId: fixture.documentId,
    action: "delete",
    outcome: "deny"
  }]);
  const serialized = JSON.stringify(output);
  expect(serialized).not.toContain(fixture.syntheticBearerToken);
  expect(serialized).not.toContain(privateValue);
  expect(serialized).not.toContain("Authorization");
  expect(serialized).not.toContain("newlyAddedPrivateField");
});`
    }
  ]
};
