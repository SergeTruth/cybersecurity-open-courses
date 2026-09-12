window.COURSE_CODE_MODULE = {
  "title": "Defensive Construction Tests",
  "codeIntro": "This TypeScript 7.0.2 strict-mode test fragment declares the narrow contracts supplied by the real integration harness. It proves exact statement structure, bound value placement, tenant scope, and rejection of unapproved structural input without requiring an exploit-payload catalog.",
  "codeExamples": [
    {
      "title": "Assert SQL structure, bindings, scope, and rejection",
      "language": "typescript",
      "blurb": "The positive test prevents an always-reject implementation from passing and checks the complete database call. A separate test proves that an attempted ORDER BY fragment is rejected before the database adapter runs. Selected tests should also execute these paths against the supported PostgreSQL version.",
      "code": `// test/query-construction.test.ts
type QueryCall = Readonly<{
  text: string;
  values: readonly unknown[];
}>;

type UserSummary = Readonly<{ id: string; email: string }>;
type UserListItem = Readonly<{
  id: string;
  displayName: string;
  createdAt: string;
}>;
type UserListPreview = Readonly<{
  items: readonly UserListItem[];
  truncated: boolean;
}>;
type UserIdItem = Readonly<{ id: string }>;

declare class AuthenticatedPrincipal {
  readonly userId: string;
  readonly tenantId: string;
  readonly permissions: readonly string[];
  private readonly authenticationBrand: void;
}

interface QueryRecorder {
  reset(): void;
  enqueueResult(result: unknown): void;
  calls(): readonly QueryCall[];
}

declare const database: QueryRecorder;
declare const principal: AuthenticatedPrincipal;
declare function findUserByEmail(
  principal: AuthenticatedPrincipal,
  email: unknown
): Promise<UserSummary | null>;
declare function previewUsers(
  principal: AuthenticatedPrincipal,
  options: unknown
): Promise<UserListPreview>;
declare function findUsersById(
  principal: AuthenticatedPrincipal,
  ids: unknown
): Promise<readonly UserIdItem[]>;

declare function describe(name: string, body: () => void): void;
declare function beforeEach(body: () => void): void;
declare function it(name: string, body: () => Promise<void>): void;
declare function expect(actual: unknown): {
  toBe(expected: unknown): void;
  toEqual(expected: unknown): void;
  not: { toContain(expected: unknown): void };
  rejects: { toThrow(expected: unknown): Promise<void> };
};

describe("parameterized query construction", () => {
  beforeEach(() => database.reset());

  it("binds the complete email and authenticated tenant as data", async () => {
    const unexpectedEmail = "punctuation+'@example.test";
    database.enqueueResult({ rows: [] });

    const result = await findUserByEmail(principal, unexpectedEmail);

    expect(result).toBe(null);
    const calls = database.calls();
    expect(calls.length).toBe(1);
    const call = calls[0];
    if (call === undefined) throw new Error("missing query call");
    expect(call.text).toBe(
      "SELECT id, tenant_id, normalized_email " +
        "FROM users WHERE tenant_id = $1 " +
        "AND normalized_email = $2 AND deleted_at IS NULL LIMIT 2"
    );
    expect(call.text).not.toContain(unexpectedEmail);
    expect(call.values).toEqual([principal.tenantId, unexpectedEmail]);
  });

  it("rejects an unapproved structural choice before querying", async () => {
    database.enqueueResult({ rows: [] });
    const valid = await previewUsers(principal, {
      sort: "name",
      direction: "ascending",
      limit: 20
    });
    expect(valid).toEqual({ items: [], truncated: false });
    const validCalls = database.calls();
    expect(validCalls.length).toBe(1);
    const validCall = validCalls[0];
    if (validCall === undefined) throw new Error("missing query call");
    expect(validCall.text).toBe(
      "SELECT id, tenant_id, display_name, created_at FROM users " +
        "WHERE tenant_id = $1 AND deleted_at IS NULL " +
        "ORDER BY display_name ASC, id ASC LIMIT $2"
    );
    expect(validCall.values).toEqual([principal.tenantId, 21]);

    database.reset();
    await expect(previewUsers(principal, {
      sort: "name DESC; SELECT secret FROM credentials",
      direction: "ascending",
      limit: 20
    })).rejects.toThrow(TypeError);

    expect(database.calls()).toEqual([]);
  });

  it("derives IN placeholders only from a validated value count", async () => {
    database.enqueueResult({ rows: [] });
    const ids = ["user-a", "user-b"];

    const result = await findUsersById(principal, ids);

    expect(result).toEqual([]);
    const calls = database.calls();
    expect(calls.length).toBe(1);
    const call = calls[0];
    if (call === undefined) throw new Error("missing query call");
    expect(call.text).toBe(
      "SELECT id, tenant_id FROM users WHERE tenant_id = $1 " +
        "AND deleted_at IS NULL AND id IN ($2, $3) " +
        "ORDER BY id ASC LIMIT 51"
    );
    expect(call.text).not.toContain(ids[0]);
    expect(call.text).not.toContain(ids[1]);
    expect(call.values).toEqual([principal.tenantId, ...ids]);
  });
});`
    }
  ]
};
