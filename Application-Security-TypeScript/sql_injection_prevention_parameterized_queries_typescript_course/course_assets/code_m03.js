window.COURSE_CODE_MODULE = {
  "title": "Structured APIs and Escape Hatches",
  "codeIntro": "These independently checked fragments distinguish a narrow structured repository contract from an explicitly unsafe raw-text escape hatch. Structured operations keep reviewed fields and values separate; raw methods require a documented binding contract and deliberate review.",
  "codeExamples": [
    {
      "title": "Capture a structured, scoped repository operation",
      "language": "typescript",
      "blurb": "The service accepts only a verified principal and a normalized email value. A captured repository receives a fixed filter and projection, while permission, tenant, lifecycle, and result checks remain visible. The repository adapter must implement these fields through its library's value-binding API.",
      "code": `// src/users/find-active-user.ts
const IDENTIFIER = /^[A-Za-z0-9_-]{1,64}$/;

declare class AuthenticatedPrincipal {
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
declare function parseNormalizedEmail(input: unknown): NormalizedEmail;

type ActiveUserQuery = Readonly<{
  where: Readonly<{
    tenantId: string;
    normalizedEmail: NormalizedEmail;
    active: true;
    deletedAt: null;
  }>;
  select: Readonly<{
    id: true;
    tenantId: true;
    normalizedEmail: true;
    active: true;
    deletedAt: true;
  }>;
}>;

interface UserRepository {
  // The adapter maps this closed operation to its structured binding API.
  // A database uniqueness constraint protects tenantId + normalizedEmail.
  findUniqueActive(query: ActiveUserQuery): Promise<unknown | null>;
}

type UserSummary = Readonly<{
  id: string;
  email: NormalizedEmail;
}>;

class ForbiddenError extends Error {}
class RepositoryContractError extends Error {}

const ACTIVE_USER_SELECTION = Object.freeze({
  id: true,
  tenantId: true,
  normalizedEmail: true,
  active: true,
  deletedAt: true
} as const);

function buildActiveUserFinder(repository: UserRepository) {
  return async function findActiveUser(
    principal: unknown,
    emailInput: unknown
  ): Promise<UserSummary | null> {
    assertAuthenticatedPrincipal(principal);
    if (!principal.permissions.includes("users:read")) {
      throw new ForbiddenError();
    }
    const email = parseNormalizedEmail(emailInput);
    const found = await repository.findUniqueActive(Object.freeze({
      where: Object.freeze({
        tenantId: principal.tenantId,
        normalizedEmail: email,
        active: true,
        deletedAt: null
      }),
      select: ACTIVE_USER_SELECTION
    }));
    if (found === null) return null;
    if (typeof found !== "object" ||
        Array.isArray(found)) {
      throw new RepositoryContractError("invalid repository result");
    }
    const value = found as Record<string, unknown>;
    if (typeof value.id !== "string" ||
        !IDENTIFIER.test(value.id) ||
        value.tenantId !== principal.tenantId ||
        value.normalizedEmail !== email ||
        value.active !== true ||
        value.deletedAt !== null) {
      throw new RepositoryContractError("invalid repository result");
    }
    return Object.freeze({ id: value.id, email });
  };
}`
    },
    {
      "title": "Insecure: pass constructed text to a raw API",
      "language": "typescript",
      "blurb": "Never deploy this function. A raw method name cannot compensate for SQL that was already assembled with request data; the example is intentionally isolated as an anti-pattern.",
      "code": `// Deliberately insecure teaching example. Do not deploy.
interface QueryRequest {
  readonly query: Readonly<Record<string, unknown>>;
}

interface UnsafeRawDatabase {
  raw(sqlText: string): Promise<unknown>;
}

async function insecureRawLookup(
  req: QueryRequest,
  database: UnsafeRawDatabase
): Promise<unknown> {
  const rawEmail = req.query.email;
  const email = typeof rawEmail === "string" ? rawEmail : "";
  // INSECURE: the request value becomes SQL program text.
  const sqlText =
    "SELECT id FROM users WHERE email = '" +
    email +
    "'";
  return database.raw(sqlText);
}`
    }
  ]
};
