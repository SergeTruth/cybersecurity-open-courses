window.COURSE_CODE_MODULE = {
  "title": "Trusted Request Context",
  "codeIntro": "Authentication mints one immutable, runtime-verifiable principal. Service code rejects structurally similar objects and accepts only bounded commands that it validates at runtime.",
  "codeExamples": [
    {
      "title": "Mint an opaque principal inside authentication middleware",
      "language": "typescript",
      "blurb": "An application-owned verifier is captured by the authentication middleware. A module-private token and WeakSet establish runtime provenance, while copied and frozen bounded claims prevent aliases from changing identity, tenant, or roles.",
      "code": `// src/auth/authenticated-principal.ts
const AUTHENTICATION_TOKEN = Symbol("authentication boundary");
const VERIFIED_PRINCIPALS = new WeakSet<AuthenticatedPrincipal>();
const IDENTIFIER = /^[A-Za-z0-9_-]{1,64}$/;
const ALLOWED_ROLES = new Set(["member", "project-admin"] as const);
type Role = "member" | "project-admin";

class AuthenticatedPrincipal {
  readonly #authenticationBrand = true;
  readonly userId: string;
  readonly tenantId: string;
  readonly roles: readonly Role[];

  private constructor(
    userId: string,
    tenantId: string,
    roles: readonly Role[]
  ) {
    this.userId = userId;
    this.tenantId = tenantId;
    this.roles = roles;
    Object.freeze(this);
  }

  static fromVerifiedClaims(
    claims: unknown,
    token: typeof AUTHENTICATION_TOKEN
  ): AuthenticatedPrincipal {
    if (token !== AUTHENTICATION_TOKEN ||
        typeof claims !== "object" ||
        claims === null ||
        Array.isArray(claims)) {
      throw new Error("authenticated claims rejected");
    }
    const value = claims as Record<string, unknown>;
    if (typeof value.userId !== "string" ||
        typeof value.tenantId !== "string" ||
        !IDENTIFIER.test(value.userId) ||
        !IDENTIFIER.test(value.tenantId) ||
        !Array.isArray(value.roles) ||
        value.roles.length > 8 ||
        value.roles.some(role =>
          typeof role !== "string" ||
          !ALLOWED_ROLES.has(role as Role)
        ) ||
        new Set(value.roles).size !== value.roles.length) {
      throw new Error("authenticated claims rejected");
    }

    const principal = new AuthenticatedPrincipal(
      value.userId,
      value.tenantId,
      Object.freeze([...value.roles] as Role[])
    );
    VERIFIED_PRINCIPALS.add(principal);
    return principal;
  }

}

// Import this function as an ESM binding; unlike a class property, callers
// cannot replace that binding with a permissive assertion at runtime.
function assertAuthenticatedPrincipal(
  value: unknown
): asserts value is AuthenticatedPrincipal {
  if (!(value instanceof AuthenticatedPrincipal) ||
      !VERIFIED_PRINCIPALS.has(value) ||
      !Object.isFrozen(value) ||
      !Object.isFrozen(value.roles)) {
    throw new Error("authenticated principal rejected");
  }
}

// Only authentication middleware in this module receives verifier output.
function principalFromVerifiedSession(
  claims: unknown
): AuthenticatedPrincipal {
  return AuthenticatedPrincipal.fromVerifiedClaims(
    claims,
    AUTHENTICATION_TOKEN
  );
}

interface AuthenticationVerifier {
  verify(authorizationHeader: string | undefined): Promise<unknown>;
}

interface AuthenticationRequest {
  get(name: "authorization"): string | undefined;
}

interface AuthenticationResponse {
  locals: { authenticatedPrincipal?: AuthenticatedPrincipal };
}

type Next = (error?: Error) => void;
class AuthenticationError extends Error {}

function buildAuthenticationMiddleware(verifier: AuthenticationVerifier) {
  return async function authenticate(
    request: AuthenticationRequest,
    response: AuthenticationResponse,
    next: Next
  ): Promise<void> {
    delete response.locals.authenticatedPrincipal;
    let principal: AuthenticatedPrincipal;
    try {
      const header = request.get("authorization");
      if (header !== undefined &&
          (typeof header !== "string" || header.length > 8192)) {
        throw new Error("authorization header rejected");
      }
      const claims = await verifier.verify(header);
      principal = principalFromVerifiedSession(claims);
    } catch {
      next(new AuthenticationError("authentication failed"));
      return;
    }
    response.locals.authenticatedPrincipal = principal;
    next();
  };
}`
    },
    {
      "title": "Validate the command and return the authorized result",
      "language": "typescript",
      "blurb": "The service verifies principal provenance, validates the complete runtime command, projects only the editable field, and delegates one atomic authorization-and-update operation. Every declared return path produces a Project.",
      "code": `// src/projects/update-project.ts
const IDENTIFIER = /^[A-Za-z0-9_-]{1,64}$/;
const UNSAFE_PROJECT_NAME =
  /[\\p{Cc}\\p{Cs}\\p{Zl}\\p{Zp}\\p{Default_Ignorable_Code_Point}]/u;

declare class AuthenticatedPrincipal {
  readonly userId: string;
  readonly tenantId: string;
  private readonly authenticationBrand: void;
}
declare function assertAuthenticatedPrincipal(
  value: unknown
): asserts value is AuthenticatedPrincipal;

type Project = Readonly<{
  id: string;
  tenantId: string;
  name: string;
  state: "active" | "archived";
  version: number;
}>;

type AuthorizedNameUpdate = Readonly<{
  projectId: string;
  tenantId: string;
  userId: string;
  expectedVersion: number;
  name: string;
}>;

interface ProjectWriter {
  updateNameIfEditable(command: AuthorizedNameUpdate): Promise<Project | null>;
}

class NotFoundError extends Error {}
class RepositoryContractError extends Error {}

function parseUpdateCommand(input: unknown): Readonly<{
  expectedVersion: number;
  name: string;
}> {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new TypeError("update command rejected");
  }
  const value = input as Record<string, unknown>;
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    throw new TypeError("update command rejected");
  }
  const allowedKeys = new Set(["expectedVersion", "name"]);
  let keyCount = 0;
  for (const key in value) {
    if (!Object.hasOwn(value, key) ||
        !allowedKeys.has(key) ||
        ++keyCount > allowedKeys.size) {
      throw new TypeError("update command rejected");
    }
  }
  const expectedVersion = value.expectedVersion;
  const rawName = value.name;
  if (keyCount !== allowedKeys.size ||
      typeof expectedVersion !== "number" ||
      !Number.isSafeInteger(expectedVersion) ||
      expectedVersion < 0 ||
      expectedVersion >= Number.MAX_SAFE_INTEGER ||
      typeof rawName !== "string" ||
      rawName.length > 200) {
    throw new TypeError("update command rejected");
  }
  const name = rawName.normalize("NFC").trim();
  if (name.length < 1 ||
      name.length > 100 ||
      UNSAFE_PROJECT_NAME.test(name)) {
    throw new TypeError("update command rejected");
  }
  return Object.freeze({
    expectedVersion,
    name
  });
}

function buildUpdateProject(writer: ProjectWriter) {
  return async function updateProject(
    principal: unknown,
    projectId: unknown,
    input: unknown
  ): Promise<Project> {
    assertAuthenticatedPrincipal(principal);
    if (typeof projectId !== "string" || !IDENTIFIER.test(projectId)) {
      throw new TypeError("project ID rejected");
    }
    const command = parseUpdateCommand(input);
    const updated = await writer.updateNameIfEditable({
      projectId,
      tenantId: principal.tenantId,
      userId: principal.userId,
      expectedVersion: command.expectedVersion,
      name: command.name
    });
    if (updated === null) throw new NotFoundError();
    if (typeof updated !== "object" ||
        Array.isArray(updated) ||
        typeof updated.id !== "string" ||
        updated.id !== projectId ||
        typeof updated.tenantId !== "string" ||
        updated.tenantId !== principal.tenantId ||
        typeof updated.name !== "string" ||
        updated.name !== command.name ||
        updated.state !== "active" ||
        typeof updated.version !== "number" ||
        !Number.isSafeInteger(updated.version) ||
        updated.version !== command.expectedVersion + 1) {
      throw new RepositoryContractError("unexpected project update result");
    }
    // Copy an exact response projection; structural typing does not remove
    // extra runtime fields from an adapter result.
    return Object.freeze({
      id: updated.id,
      tenantId: updated.tenantId,
      name: updated.name,
      state: updated.state,
      version: updated.version
    });
  };
}`
    }
  ]
};
