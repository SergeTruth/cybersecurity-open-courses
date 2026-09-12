window.COURSE_CODE_MODULE = {
  "title": "Bypass-Oriented Assurance",
  "codeIntro": "Security tests call the server directly and assert protected state without relying on browser behavior. The declared runner, request, and fixture contracts are the narrow interfaces supplied by the real Express 5.2.1 integration harness; this focused fragment remains independently type-checkable.",
  "codeExamples": [
    {
      "title": "Prove success, peer denial, tenant denial, and over-post rejection",
      "language": "typescript",
      "blurb": "The positive control prevents an always-deny implementation from passing. Separate tests avoid conflating malformed over-posting with authorization, and scalar snapshots prove that targets, protected fields, and unrelated records remain unchanged after every denial.",
      "code": `// test/document-enforcement.test.ts
type DocumentRecord = Readonly<{
  id: string;
  tenantId: string;
  ownerId: string;
  editorIds: readonly string[];
  title: string;
  state: "active" | "archived";
  deletedAt: null;
  version: number;
}>;

type TestUser = Readonly<{
  id: string;
  tenantId: string;
  roles: readonly (
    "customer" | "approver" | "document-admin"
  )[];
  authorizationHeader: string;
}>;

interface EnforcementFixture {
  readonly alphaUser: TestUser;
  readonly alphaPeerUser: TestUser;
  readonly betaUser: TestUser;
  readonly alphaDocument: DocumentRecord;
  readonly alphaPeerDocument: DocumentRecord;
  readonly alphaOtherDocument: DocumentRecord;
  readonly betaDocument: DocumentRecord;
  reset(): Promise<void>;
  loadDocument(id: string): Promise<DocumentRecord>;
}

interface TestRequest {
  set(name: "authorization", value: string): TestRequest;
  send(body: unknown): TestRequest;
  expect(status: number): Promise<void>;
}

declare const api: {
  patch(path: string): TestRequest;
};
declare const fixture: EnforcementFixture;
declare function describe(name: string, body: () => void): void;
declare function beforeEach(body: () => Promise<void>): void;
declare function it(name: string, body: () => Promise<void>): void;
declare function expect<T>(actual: T): {
  toBe(expected: T): void;
  toEqual(expected: unknown): void;
  not: { toBe(expected: T): void };
};

type DocumentSnapshot = Readonly<{
  tenantId: string;
  ownerId: string;
  editorIds: readonly string[];
  title: string;
  state: "active" | "archived";
  deletedAt: null;
  version: number;
}>;

function snapshot(document: DocumentRecord): DocumentSnapshot {
  return Object.freeze({
    tenantId: document.tenantId,
    ownerId: document.ownerId,
    editorIds: Object.freeze([...document.editorIds]),
    title: document.title,
    state: document.state,
    deletedAt: document.deletedAt,
    version: document.version
  });
}

function expectUnchanged(
  actual: DocumentRecord,
  before: DocumentSnapshot
): void {
  expect(actual.tenantId).toBe(before.tenantId);
  expect(actual.ownerId).toBe(before.ownerId);
  expect(actual.editorIds).toEqual(before.editorIds);
  expect(actual.title).toBe(before.title);
  expect(actual.state).toBe(before.state);
  expect(actual.deletedAt).toBe(before.deletedAt);
  expect(actual.version).toBe(before.version);
}

describe("server-side document enforcement", () => {
  beforeEach(async () => fixture.reset());

  it("updates only an authorized requested document", async () => {
    const target = await fixture.loadDocument(fixture.alphaDocument.id);
    const unrelated = await fixture.loadDocument(
      fixture.alphaOtherDocument.id
    );
    const otherTenant = await fixture.loadDocument(
      fixture.betaDocument.id
    );
    expect(target.id).toBe(fixture.alphaDocument.id);
    expect(target.tenantId).toBe(fixture.alphaUser.tenantId);
    expect(target.ownerId).toBe(fixture.alphaUser.id);
    expect(target.state).toBe("active");
    expect(target.title).not.toBe("authorized change");
    expect(unrelated.id).not.toBe(target.id);
    expect(unrelated.tenantId).toBe(target.tenantId);
    const targetBefore = snapshot(target);
    const unrelatedBefore = snapshot(unrelated);
    const otherTenantBefore = snapshot(otherTenant);

    await api.patch("/documents/" + target.id)
      .set("authorization", fixture.alphaUser.authorizationHeader)
      .send({
        title: "authorized change",
        expectedVersion: targetBefore.version
      })
      .expect(200);

    const changed = await fixture.loadDocument(target.id);
    expect(changed.tenantId).toBe(targetBefore.tenantId);
    expect(changed.ownerId).toBe(targetBefore.ownerId);
    expect(changed.editorIds).toEqual(targetBefore.editorIds);
    expect(changed.state).toBe(targetBefore.state);
    expect(changed.deletedAt).toBe(targetBefore.deletedAt);
    expect(changed.title).toBe("authorized change");
    expect(changed.version).toBe(targetBefore.version + 1);
    expectUnchanged(
      await fixture.loadDocument(unrelated.id),
      unrelatedBefore
    );
    expectUnchanged(
      await fixture.loadDocument(otherTenant.id),
      otherTenantBefore
    );
  });

  it("rejects another owner's document in the same tenant", async () => {
    const target = await fixture.loadDocument(
      fixture.alphaPeerDocument.id
    );
    const bystander = await fixture.loadDocument(fixture.alphaDocument.id);
    expect(target.tenantId).toBe(fixture.alphaUser.tenantId);
    expect(target.ownerId).toBe(fixture.alphaPeerUser.id);
    expect(fixture.alphaPeerUser.tenantId).toBe(target.tenantId);
    expect(target.ownerId).not.toBe(fixture.alphaUser.id);
    expect(target.editorIds.includes(fixture.alphaUser.id)).toBe(false);
    expect(fixture.alphaUser.roles.includes("document-admin")).toBe(false);
    expect(target.state).toBe("active");
    const targetBefore = snapshot(target);
    const bystanderBefore = snapshot(bystander);

    await api.patch("/documents/" + target.id)
      .set("authorization", fixture.alphaUser.authorizationHeader)
      .send({ title: "forbidden", expectedVersion: targetBefore.version })
      .expect(404);

    expectUnchanged(await fixture.loadDocument(target.id), targetBefore);
    expectUnchanged(
      await fixture.loadDocument(bystander.id),
      bystanderBefore
    );
  });

  it("rejects a valid update for another tenant", async () => {
    const target = await fixture.loadDocument(fixture.betaDocument.id);
    const bystander = await fixture.loadDocument(fixture.alphaDocument.id);
    expect(target.tenantId).toBe(fixture.betaUser.tenantId);
    expect(target.id).toBe(fixture.betaDocument.id);
    expect(target.tenantId).not.toBe(fixture.alphaUser.tenantId);
    expect(fixture.alphaUser.authorizationHeader)
      .not.toBe(fixture.betaUser.authorizationHeader);
    expect(target.state).toBe("active");
    const targetBefore = snapshot(target);
    const bystanderBefore = snapshot(bystander);

    await api.patch("/documents/" + target.id)
      .set("authorization", fixture.alphaUser.authorizationHeader)
      .send({ title: "forbidden", expectedVersion: targetBefore.version })
      .expect(404);

    expectUnchanged(await fixture.loadDocument(target.id), targetBefore);
    expectUnchanged(
      await fixture.loadDocument(bystander.id),
      bystanderBefore
    );
  });

  it("rejects server-owned fields even on an authorized object", async () => {
    const target = await fixture.loadDocument(fixture.alphaDocument.id);
    const targetBefore = snapshot(target);

    await api.patch("/documents/" + target.id)
      .set("authorization", fixture.alphaUser.authorizationHeader)
      .send({
        title: "over-posted",
        expectedVersion: targetBefore.version,
        tenantId: fixture.betaUser.tenantId,
        ownerId: fixture.alphaPeerUser.id,
        state: "archived"
      })
      .expect(400);

    expectUnchanged(await fixture.loadDocument(target.id), targetBefore);
  });
});`
    }
  ]
};
