window.COURSE_CODE_MODULE = {
  "title": "Authorization Regression Tests",
  "codeIntro": "The integration suite proves both availability and denial. Independent fixtures establish identity relationships, successful updates are target-specific, and same-tenant peer and cross-tenant attempts leave every protected field unchanged. The declared TestRequest contract is the narrow adapter implemented by the Express 5.2.1 integration harness, so this focused fragment remains independently type-checkable.",
  "codeExamples": [
    {
      "title": "Prove an allowed path before peer and tenant denials",
      "language": "typescript",
      "blurb": "The positive control prevents an always-deny implementation from passing and verifies that an unrelated same-tenant object is untouched. The negative case asserts fixture relationships and compares scalar snapshots rather than potentially shared object references.",
      "code": `// test/project-authorization.test.ts
type ProjectRecord = Readonly<{
  id: string;
  tenantId: string;
  ownerId: string;
  administratorIds: readonly string[];
  name: string;
  state: "active" | "archived";
  version: number;
}>;

type TestUser = Readonly<{
  id: string;
  tenantId: string;
  authorizationHeader: string;
}>;

interface AuthorizationFixture {
  readonly tenantAUser: TestUser;
  readonly tenantBUser: TestUser;
  readonly tenantAProject: ProjectRecord;
  readonly tenantAOtherProject: ProjectRecord;
  readonly tenantBProject: ProjectRecord;
  readonly tenantBOtherProject: ProjectRecord;
  reset(): Promise<void>;
  loadProject(projectId: string): Promise<ProjectRecord>;
}

interface TestRequest {
  set(name: "Authorization", value: string): TestRequest;
  send(body: unknown): TestRequest;
  expect(status: number): Promise<void>;
}

declare const app: unknown;
declare const fixture: AuthorizationFixture;
declare function request(application: unknown): {
  patch(path: string): TestRequest;
};
declare function describe(name: string, body: () => void): void;
declare function beforeEach(body: () => Promise<void>): void;
declare function it(name: string, body: () => Promise<void>): void;
declare function expect<T>(actual: T): {
  toBe(expected: T): void;
  toEqual(expected: unknown): void;
  not: { toBe(expected: T): void };
};

describe("project object authorization", () => {
  beforeEach(async () => fixture.reset());

  it("updates only the requested project in the caller's scope", async () => {
    const targetBefore = await fixture.loadProject(
      fixture.tenantAProject.id
    );
    const unrelatedBefore = await fixture.loadProject(
      fixture.tenantAOtherProject.id
    );
    expect(fixture.tenantAUser.tenantId).toBe(targetBefore.tenantId);
    expect(fixture.tenantAUser.id).toBe(targetBefore.ownerId);
    expect(targetBefore.id).toBe(fixture.tenantAProject.id);
    expect(targetBefore.state).toBe("active");
    expect(targetBefore.name).not.toBe("authorized change");
    expect(unrelatedBefore.tenantId).toBe(targetBefore.tenantId);
    expect(unrelatedBefore.id).not.toBe(targetBefore.id);
    expect(unrelatedBefore.ownerId).not.toBe(targetBefore.ownerId);
    const targetSnapshot = Object.freeze({
      tenantId: targetBefore.tenantId,
      ownerId: targetBefore.ownerId,
      administratorIds: Object.freeze([
        ...targetBefore.administratorIds
      ]),
      state: targetBefore.state,
      version: targetBefore.version
    });
    const unrelatedSnapshot = Object.freeze({
      tenantId: unrelatedBefore.tenantId,
      ownerId: unrelatedBefore.ownerId,
      administratorIds: Object.freeze([
        ...unrelatedBefore.administratorIds
      ]),
      name: unrelatedBefore.name,
      state: unrelatedBefore.state,
      version: unrelatedBefore.version
    });

    await request(app)
      .patch("/api/projects/" + targetBefore.id)
      .set("Authorization", fixture.tenantAUser.authorizationHeader)
      .send({
        expectedVersion: targetSnapshot.version,
        name: "authorized change"
      })
      .expect(200);

    const targetAfter = await fixture.loadProject(targetBefore.id);
    const unrelatedAfter = await fixture.loadProject(unrelatedBefore.id);
    expect(targetAfter.tenantId).toBe(targetSnapshot.tenantId);
    expect(targetAfter.ownerId).toBe(targetSnapshot.ownerId);
    expect(targetAfter.administratorIds)
      .toEqual(targetSnapshot.administratorIds);
    expect(targetAfter.name).toBe("authorized change");
    expect(targetAfter.state).toBe(targetSnapshot.state);
    expect(targetAfter.version).toBe(targetSnapshot.version + 1);
    expect(unrelatedAfter.tenantId).toBe(unrelatedSnapshot.tenantId);
    expect(unrelatedAfter.ownerId).toBe(unrelatedSnapshot.ownerId);
    expect(unrelatedAfter.administratorIds)
      .toEqual(unrelatedSnapshot.administratorIds);
    expect(unrelatedAfter.name).toBe(unrelatedSnapshot.name);
    expect(unrelatedAfter.state).toBe(unrelatedSnapshot.state);
    expect(unrelatedAfter.version).toBe(unrelatedSnapshot.version);
  });

  it("denies a different owner's project in the same tenant", async () => {
    const before = await fixture.loadProject(
      fixture.tenantAOtherProject.id
    );
    expect(before.tenantId).toBe(fixture.tenantAUser.tenantId);
    expect(before.ownerId).not.toBe(fixture.tenantAUser.id);
    expect(before.administratorIds.includes(fixture.tenantAUser.id))
      .toBe(false);
    expect(before.id).toBe(fixture.tenantAOtherProject.id);
    expect(before.state).toBe("active");
    const snapshot = Object.freeze({
      tenantId: before.tenantId,
      ownerId: before.ownerId,
      administratorIds: Object.freeze([...before.administratorIds]),
      name: before.name,
      state: before.state,
      version: before.version
    });

    await request(app)
      .patch("/api/projects/" + before.id)
      .set("Authorization", fixture.tenantAUser.authorizationHeader)
      .send({
        expectedVersion: snapshot.version,
        name: "unauthorized same-tenant change"
      })
      .expect(404);

    const after = await fixture.loadProject(before.id);
    expect(after.tenantId).toBe(snapshot.tenantId);
    expect(after.ownerId).toBe(snapshot.ownerId);
    expect(after.administratorIds).toEqual(snapshot.administratorIds);
    expect(after.name).toBe(snapshot.name);
    expect(after.state).toBe(snapshot.state);
    expect(after.version).toBe(snapshot.version);
  });

  it("denies updating another tenant's project", async () => {
    expect(fixture.tenantAUser.tenantId)
      .not.toBe(fixture.tenantBProject.tenantId);
    expect(fixture.tenantAUser.id)
      .not.toBe(fixture.tenantBProject.ownerId);
    expect(fixture.tenantBUser.tenantId)
      .toBe(fixture.tenantBProject.tenantId);
    expect(fixture.tenantBUser.id)
      .toBe(fixture.tenantBProject.ownerId);
    expect(fixture.tenantAUser.authorizationHeader)
      .not.toBe(fixture.tenantBUser.authorizationHeader);

    const before = await fixture.loadProject(fixture.tenantBProject.id);
    const unrelatedBefore = await fixture.loadProject(
      fixture.tenantBOtherProject.id
    );
    expect(unrelatedBefore.tenantId).toBe(before.tenantId);
    expect(unrelatedBefore.id).not.toBe(before.id);
    expect(before.id).toBe(fixture.tenantBProject.id);
    expect(before.state).toBe("active");
    const snapshot = Object.freeze({
      tenantId: before.tenantId,
      ownerId: before.ownerId,
      administratorIds: Object.freeze([...before.administratorIds]),
      name: before.name,
      state: before.state,
      version: before.version
    });
    const unrelatedSnapshot = Object.freeze({
      tenantId: unrelatedBefore.tenantId,
      ownerId: unrelatedBefore.ownerId,
      administratorIds: Object.freeze([
        ...unrelatedBefore.administratorIds
      ]),
      name: unrelatedBefore.name,
      state: unrelatedBefore.state,
      version: unrelatedBefore.version
    });

    await request(app)
      .patch("/api/projects/" + before.id)
      .set("Authorization", fixture.tenantAUser.authorizationHeader)
      .send({
        expectedVersion: before.version,
        name: "unauthorized change"
      })
      .expect(404);

    const after = await fixture.loadProject(before.id);
    expect(after.tenantId).toBe(snapshot.tenantId);
    expect(after.ownerId).toBe(snapshot.ownerId);
    expect(after.administratorIds).toEqual(snapshot.administratorIds);
    expect(after.name).toBe(snapshot.name);
    expect(after.state).toBe(snapshot.state);
    expect(after.version).toBe(snapshot.version);
    const unrelatedAfter = await fixture.loadProject(unrelatedBefore.id);
    expect(unrelatedAfter.tenantId).toBe(unrelatedSnapshot.tenantId);
    expect(unrelatedAfter.ownerId).toBe(unrelatedSnapshot.ownerId);
    expect(unrelatedAfter.administratorIds)
      .toEqual(unrelatedSnapshot.administratorIds);
    expect(unrelatedAfter.name).toBe(unrelatedSnapshot.name);
    expect(unrelatedAfter.state).toBe(unrelatedSnapshot.state);
    expect(unrelatedAfter.version).toBe(unrelatedSnapshot.version);
  });
});`
    }
  ]
};
