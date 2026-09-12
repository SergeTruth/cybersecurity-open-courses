window.COURSE_CODE_MODULE = {
  "title": "Bind Values Separately",
  "codeIntro": "These PostgreSQL-style examples are checked independently with TypeScript 7.0.2, target ES2022, strict, noImplicitReturns, noUncheckedIndexedAccess, and exactOptionalPropertyTypes. After the HTTP adapter bounds request-target bytes, the driver receives fixed SQL and a separate value collection; validation, permission, tenant scope, cardinality, and result projection remain explicit.",
  "codeExamples": [
    {
      "title": "Parameterized and tenant-scoped email lookup",
      "language": "typescript",
      "blurb": "A trusted builder captures the database adapter. The verified principal supplies tenant and permission scope, the application-specific email parser returns one canonical value, and the fixed query binds both values. A bounded result contract detects duplicate or mismatched rows.",
      "code": `// src/users/find-user-by-email.ts
const IDENTIFIER = /^[A-Za-z0-9_-]{1,64}$/;
const EMAIL_LOCAL = /^[a-z0-9.!#$%&'*+/=?^_{|}~-]{1,64}$/;
const EMAIL_LABEL = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

declare class AuthenticatedPrincipal {
  readonly userId: string;
  readonly tenantId: string;
  readonly permissions: readonly string[];
  private readonly authenticationBrand: void;
}
declare function assertAuthenticatedPrincipal(
  value: unknown
): asserts value is AuthenticatedPrincipal;

declare const NORMALIZED_EMAIL: unique symbol;
type NormalizedEmail = string & {
  readonly [NORMALIZED_EMAIL]: true;
};

type UserSummary = Readonly<{
  id: string;
  email: NormalizedEmail;
}>;

interface ParameterizedDatabase {
  // The trusted adapter uses the driver's binding API and translates expected
  // driver failures into sanitized application-domain errors.
  query(
    sqlText: string,
    values: readonly unknown[]
  ): Promise<unknown>;
}

class ForbiddenError extends Error {}
class DatabaseContractError extends Error {}

function parseNormalizedEmail(input: unknown): NormalizedEmail {
  if (typeof input !== "string" ||
      input.length < 3 ||
      input.length > 254 ||
      input !== input.trim() ||
      input !== input.normalize("NFC") ||
      input !== input.toLowerCase()) {
    throw new TypeError("email rejected");
  }
  const separator = input.indexOf("@");
  if (separator < 1 || separator !== input.lastIndexOf("@")) {
    throw new TypeError("email rejected");
  }
  const local = input.slice(0, separator);
  const domain = input.slice(separator + 1);
  const labels = domain.split(".");
  if (!EMAIL_LOCAL.test(local) ||
      local.startsWith(".") ||
      local.endsWith(".") ||
      local.includes("..") ||
      domain.length > 253 ||
      labels.length < 2 ||
      labels.some(label => !EMAIL_LABEL.test(label))) {
    throw new TypeError("email rejected");
  }
  return input as NormalizedEmail;
}

function buildUserLookup(database: ParameterizedDatabase) {
  return async function findUserByEmail(
    principal: unknown,
    input: unknown
  ): Promise<UserSummary | null> {
    assertAuthenticatedPrincipal(principal);
    if (!principal.permissions.includes("users:read")) {
      throw new ForbiddenError();
    }
    const email = parseNormalizedEmail(input);
    const raw = await database.query(
      "SELECT id, tenant_id, normalized_email " +
        "FROM users WHERE tenant_id = $1 " +
        "AND normalized_email = $2 AND deleted_at IS NULL LIMIT 2",
      Object.freeze([principal.tenantId, email])
    );
    if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
      throw new DatabaseContractError("invalid database result");
    }
    const rows = (raw as Record<string, unknown>).rows;
    if (!Array.isArray(rows) || rows.length > 1) {
      throw new DatabaseContractError("invalid database result");
    }
    if (rows.length === 0) return null;
    const row = rows[0];
    if (typeof row !== "object" || row === null || Array.isArray(row)) {
      throw new DatabaseContractError("invalid database result");
    }
    const value = row as Record<string, unknown>;
    if (typeof value.id !== "string" ||
        !IDENTIFIER.test(value.id) ||
        value.tenant_id !== principal.tenantId ||
        value.normalized_email !== email) {
      throw new DatabaseContractError("invalid database result");
    }
    return Object.freeze({ id: value.id, email });
  };
}`
    },
    {
      "title": "Generate a bounded placeholder list, not value text",
      "language": "typescript",
      "blurb": "The parser accepts at most fifty distinct canonical identifiers. Trusted code derives placeholder positions only from that bounded count, while tenant scope remains the first bound parameter. Returned rows are checked against both the requested set and authenticated tenant.",
      "code": `// src/users/find-users-by-id.ts
const IDENTIFIER = /^[A-Za-z0-9_-]{1,64}$/;
const MAX_USER_IDS = 50;

declare class AuthenticatedPrincipal {
  readonly tenantId: string;
  readonly permissions: readonly string[];
  private readonly authenticationBrand: void;
}
declare function assertAuthenticatedPrincipal(
  value: unknown
): asserts value is AuthenticatedPrincipal;

type UserSummary = Readonly<{ id: string }>;

interface ParameterizedDatabase {
  // The trusted adapter uses the driver's binding API and translates expected
  // driver failures into sanitized application-domain errors.
  query(
    sqlText: string,
    values: readonly unknown[]
  ): Promise<unknown>;
}

class ForbiddenError extends Error {}
class DatabaseContractError extends Error {}

function parseUserIds(input: unknown): readonly string[] {
  if (!Array.isArray(input) || input.length > MAX_USER_IDS) {
    throw new TypeError("user identifiers rejected");
  }
  const ids = [...input];
  for (const id of ids) {
    if (typeof id !== "string" || !IDENTIFIER.test(id)) {
      throw new TypeError("user identifiers rejected");
    }
  }
  if (new Set(ids).size !== ids.length) {
    throw new TypeError("user identifiers rejected");
  }
  return Object.freeze(ids as string[]);
}

function buildUsersByIdLookup(database: ParameterizedDatabase) {
  return async function findUsersById(
    principal: unknown,
    input: unknown
  ): Promise<readonly UserSummary[]> {
    assertAuthenticatedPrincipal(principal);
    if (!principal.permissions.includes("users:read")) {
      throw new ForbiddenError();
    }
    const ids = parseUserIds(input);
    if (ids.length === 0) return Object.freeze([]);

    const placeholders = ids.map((_, index) => "$" + (index + 2));
    const raw = await database.query(
      "SELECT id, tenant_id FROM users " +
        "WHERE tenant_id = $1 AND deleted_at IS NULL AND id IN (" +
        placeholders.join(", ") + ") ORDER BY id ASC LIMIT 51",
      Object.freeze([principal.tenantId, ...ids])
    );
    if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
      throw new DatabaseContractError("invalid database result");
    }
    const rows = (raw as Record<string, unknown>).rows;
    if (!Array.isArray(rows) || rows.length > ids.length) {
      throw new DatabaseContractError("invalid database result");
    }
    const requested = new Set(ids);
    const returned = new Set<string>();
    const users: UserSummary[] = [];
    for (const row of rows) {
      if (typeof row !== "object" || row === null || Array.isArray(row)) {
        throw new DatabaseContractError("invalid database result");
      }
      const value = row as Record<string, unknown>;
      const id = value.id;
      if (typeof id !== "string" ||
          !requested.has(id) ||
          returned.has(id) ||
          value.tenant_id !== principal.tenantId) {
        throw new DatabaseContractError("invalid database result");
      }
      returned.add(id);
      users.push(Object.freeze({ id }));
    }
    return Object.freeze(users);
  };
}`
    }
  ]
};
