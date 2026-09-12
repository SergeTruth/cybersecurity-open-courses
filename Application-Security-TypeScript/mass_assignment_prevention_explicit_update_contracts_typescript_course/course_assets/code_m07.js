window.COURSE_CODE_MODULE = {
  "title": "Test the Fields the UI Never Sends",
  "codeIntro": "Exercise production handlers in memory through their public request boundary. Positive controls prove that approved operations work; negative cases compare the complete persisted state and side-effect counts.",
  "codeExamples": [
    {
      "title": "Mass-assignment and authorization contract suite",
      "language": "typescript",
      "blurb": "The fixture must wire the real runtime parser, mapper, authorization service, transaction, and repository against an isolated database. The suite needs no listening web server and cannot pass merely because every operation is rejected.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode. Save as an integration test.
type TestActor = "member-a" | "admin-a" | "admin-b";
type TestRoute = "/me/profile" | "/me/bio" | "/admin/change-role";

type StoredAccount = Readonly<{
  userId: string;
  tenantId: string;
  displayName: string;
  timezone: string;
  bio: string | null;
  role: string;
  ownerId: string;
  emailVerified: boolean;
  balanceCents: number;
  isSupportAgent: boolean; // A newly added model field must stay server-owned.
  version: number;
}>;

type TestResponse = Readonly<{ status: number }>;
type StoredAudit = Readonly<{
  actorId: string;
  targetUserId: string;
  tenantId: string;
  operation: "role-change";
  newRole: string;
}>;

interface UpdateContractHarness {
  // Build this with production handlers and an isolated transactional database.
  reset(): Promise<void>;
  request(
    actor: TestActor,
    route: TestRoute,
    body: unknown
  ): Promise<TestResponse>;
  accounts(): Promise<readonly StoredAccount[]>;
  // Both counters describe durable effects since the latest reset().
  writeCount(): Promise<number>;
  auditCount(): Promise<number>;
  audits(): Promise<readonly StoredAudit[]>;

  // Trusted fixture controls, never application endpoints.
  setRoleAdministrationPermission(actor: "admin-a", allowed: boolean): Promise<void>;
  failNextAuditWrite(): Promise<void>;
}

const MEMBER_A = "user_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const MEMBER_B = "user_bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";
const TENANT_B_TARGET = "user_cccccccccccccccccccccccccccccccc";
const ADMIN_A = "user_dddddddddddddddddddddddddddddddd";
const TENANT_A = "tenant_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function canonicalState(accounts: readonly StoredAccount[]): string {
  return JSON.stringify([...accounts].sort((left, right) =>
    left.userId.localeCompare(right.userId)));
}

function requireAccount(
  accounts: readonly StoredAccount[],
  userId: string
): StoredAccount {
  const matches = accounts.filter(account => account.userId === userId);
  assert(matches.length === 1, "test fixture account cardinality is invalid");
  const account = matches[0];
  assert(account !== undefined, "test fixture account is missing");
  return account;
}

function assertFixtureScope(accounts: readonly StoredAccount[]): void {
  const memberA = requireAccount(accounts, MEMBER_A);
  const memberB = requireAccount(accounts, MEMBER_B);
  const tenantBTarget = requireAccount(accounts, TENANT_B_TARGET);
  const adminA = requireAccount(accounts, ADMIN_A);
  assert(memberA.tenantId === TENANT_A && memberB.tenantId === TENANT_A &&
    adminA.tenantId === TENANT_A && adminA.role === "administrator",
    "Tenant A fixtures are invalid");
  assert(tenantBTarget.tenantId !== TENANT_A,
    "cross-tenant fixture does not cross a tenant boundary");
}

async function snapshot(harness: UpdateContractHarness): Promise<string> {
  return canonicalState(await harness.accounts());
}

async function accountSnapshot(
  harness: UpdateContractHarness
): Promise<readonly StoredAccount[]> {
  // Detach the before-image so an ORM identity map or in-memory fixture cannot
  // mutate the test's expected state through shared object references.
  return structuredClone(await harness.accounts());
}

async function expectDeniedWithoutEffects(
  harness: UpdateContractHarness,
  actor: TestActor,
  route: TestRoute,
  body: unknown,
  expectedStatus: 400 | 403 | 409 | 503
): Promise<void> {
  const stateBefore = await snapshot(harness);
  const writesBefore = await harness.writeCount();
  const auditsBefore = await harness.auditCount();
  const response = await harness.request(actor, route, body);

  assert(response.status === expectedStatus, "unexpected denial status");
  assert(await snapshot(harness) === stateBefore, "denial changed stored state");
  assert(await harness.writeCount() === writesBefore, "denial issued a write");
  assert(await harness.auditCount() === auditsBefore, "denial wrote an audit event");
}

function ownProtoPayload(): object {
  const value = Object.create(null) as Record<PropertyKey, unknown>;
  Object.defineProperty(value, "__proto__", {
    value: { role: "administrator" },
    enumerable: true
  });
  return value;
}

function inheritedPayload(): object {
  const value = Object.create({ role: "administrator" }) as {
    displayName?: string;
  };
  value.displayName = "Looks valid";
  return value;
}

function accessorPayload(): object {
  const value: object = {};
  Object.defineProperty(value, "displayName", {
    enumerable: true,
    get(): never {
      throw new Error("an input getter must never execute");
    }
  });
  return value;
}

async function runUpdateContractSuite(
  harness: UpdateContractHarness
): Promise<void> {
  // Positive control: a narrow own-profile update succeeds and changes only
  // the intended account and approved fields.
  await harness.reset();
  const profileBefore = await accountSnapshot(harness);
  assertFixtureScope(profileBefore);
  const profileResponse = await harness.request("member-a", "/me/profile", {
    displayName: "Updated member",
    timezone: "UTC"
  });
  assert(profileResponse.status === 204, "approved profile update failed");
  const profileAfter = await harness.accounts();
  const expectedProfile = profileBefore.map(account => account.userId === MEMBER_A
    ? Object.freeze({
        ...account,
        displayName: "Updated member",
        timezone: "UTC",
        version: account.version + 1
      })
    : account);
  assert(canonicalState(profileAfter) === canonicalState(expectedProfile),
    "profile update changed an unapproved field or record");
  assert(await harness.writeCount() === 1, "profile update write count is not exact");

  // PATCH presence semantics are independently observable.
  await harness.reset();
  const noChangeBefore = await snapshot(harness);
  const noChange = await harness.request("member-a", "/me/bio", {});
  assert(noChange.status === 204, "omitted bio was not a valid no-op");
  assert(await snapshot(harness) === noChangeBefore, "omitted bio changed state");
  assert(await harness.writeCount() === 0, "omitted bio issued a write");

  await harness.reset();
  const clearBefore = await accountSnapshot(harness);
  assert(requireAccount(clearBefore, MEMBER_A).bio !== null,
    "bio-clear fixture does not prove a change");
  const clear = await harness.request("member-a", "/me/bio", { bio: null });
  assert(clear.status === 204, "bio clear failed");
  const expectedClear = clearBefore.map(account => account.userId === MEMBER_A
    ? Object.freeze({ ...account, bio: null, version: account.version + 1 })
    : account);
  assert(await snapshot(harness) === canonicalState(expectedClear),
    "bio clear changed an unapproved field or record");

  await harness.reset();
  const emptyBefore = await accountSnapshot(harness);
  assert(requireAccount(emptyBefore, MEMBER_A).bio !== "",
    "empty-bio fixture does not prove a change");
  const empty = await harness.request("member-a", "/me/bio", { bio: "" });
  assert(empty.status === 204, "empty bio replacement failed");
  const expectedEmpty = emptyBefore.map(account => account.userId === MEMBER_A
    ? Object.freeze({ ...account, bio: "", version: account.version + 1 })
    : account);
  assert(await snapshot(harness) === canonicalState(expectedEmpty),
    "empty bio replacement changed an unapproved field or record");

  await harness.reset();
  await expectDeniedWithoutEffects(
    harness, "member-a", "/me/bio", { bio: undefined }, 400);

  // Inputs that normal UI clients never send.
  const forbiddenBodies: readonly unknown[] = [
    { displayName: "Changed", role: "administrator" },
    { displayName: "Changed", tenantId: "tenant_b" },
    { displayName: "Changed", ownerId: MEMBER_B },
    { displayName: "Changed", emailVerified: true },
    { displayName: "Changed", balanceCents: 1_000_000 },
    { displayName: "Changed", isSupportAgent: true },
    { displayName: "Changed", version: 999 },
    { displayName: "Changed", createdAt: "1970-01-01T00:00:00Z" },
    { displayName: "Changed", audit: { actorId: MEMBER_A } },
    { displayName: "Changed", projects: { connect: [{ id: "project-1" }] } },
    { displayName: "Changed", bio: "valid only on another endpoint" },
    { displayName: undefined },
    { displayName: null },
    { displayName: "" },
    { displayName: "name\\nforged" },
    { displayName: "name\\u202Eforged" },
    ["not", "an", "object"],
    ownProtoPayload(),
    inheritedPayload(),
    accessorPayload(),
    { displayName: "Changed", [Symbol("hidden")]: "value" }
  ];

  for (const body of forbiddenBodies) {
    await harness.reset();
    await expectDeniedWithoutEffects(
      harness, "member-a", "/me/profile", body, 400);
  }

  // Positive control: the dedicated administrative operation works, records
  // one audit event, and changes only its exact same-tenant target.
  await harness.reset();
  const roleBefore = await accountSnapshot(harness);
  assertFixtureScope(roleBefore);
  const roleResponse = await harness.request("admin-a", "/admin/change-role", {
    targetUserId: MEMBER_B,
    role: "manager"
  });
  assert(roleResponse.status === 204, "approved role transition failed");
  const roleAfter = await harness.accounts();
  const expectedRoles = roleBefore.map(account => account.userId === MEMBER_B
    ? Object.freeze({ ...account, role: "manager", version: account.version + 1 })
    : account);
  assert(canonicalState(roleAfter) === canonicalState(expectedRoles),
    "role transition changed an unapproved field or record");
  assert(await harness.writeCount() === 1, "role transition write count is not exact");
  assert(await harness.auditCount() === 1, "role transition audit count is not exact");
  const audits = await harness.audits();
  const audit = audits[0];
  assert(audit !== undefined &&
    audit.actorId === ADMIN_A &&
    audit.targetUserId === MEMBER_B &&
    audit.tenantId === TENANT_A &&
    audit.operation === "role-change" &&
    audit.newRole === "manager",
    "role transition audit is not bound to authenticated intent");

  const forbiddenRoleBodies: readonly unknown[] = [
    { targetUserId: MEMBER_B, role: "manager", tenantId: TENANT_A },
    { targetUserId: MEMBER_B, role: "manager", actorId: MEMBER_A },
    { targetUserId: MEMBER_B, role: "manager", auditId: "audit_client" },
    { targetUserId: { $ne: null }, role: "manager" },
    { targetUserId: MEMBER_B, role: { set: "administrator" } }
  ];
  for (const body of forbiddenRoleBodies) {
    await harness.reset();
    await expectDeniedWithoutEffects(
      harness, "admin-a", "/admin/change-role", body, 400);
  }

  // Object authorization and permission are independent from field validation.
  await harness.reset();
  await expectDeniedWithoutEffects(harness, "admin-a", "/admin/change-role", {
    targetUserId: TENANT_B_TARGET,
    role: "manager"
  }, 403);

  await harness.reset();
  await expectDeniedWithoutEffects(harness, "member-a", "/admin/change-role", {
    targetUserId: MEMBER_B,
    role: "manager"
  }, 403);

  // The transaction must recheck current authority, not rely on an earlier
  // request or cached decision.
  await harness.reset();
  await harness.setRoleAdministrationPermission("admin-a", false);
  await expectDeniedWithoutEffects(harness, "admin-a", "/admin/change-role", {
    targetUserId: MEMBER_B,
    role: "manager"
  }, 403);

  // Audit persistence is part of the same privileged transaction.
  await harness.reset();
  await harness.failNextAuditWrite();
  await expectDeniedWithoutEffects(harness, "admin-a", "/admin/change-role", {
    targetUserId: MEMBER_B,
    role: "manager"
  }, 503);
}`
    }
  ]
};
