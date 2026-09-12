window.COURSE_CODE_MODULE = {
  "title": "Require Security Context",
  "codeIntro": "A trusted identity boundary creates a runtime-authenticated, immutable context. Protected services reject optional request properties and caller-constructed lookalikes.",
  "codeExamples": [
    {
      "title": "Issue required context from verified identity",
      "language": "typescript",
      "blurb": "The verifier owns credential and membership validation. Its output is still parsed at runtime before the module issues an opaque context containing canonical subject, tenant, roles, and identity-version evidence.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
type RequestEvidence = unknown;
type TrustedRole = "member" | "project-editor" | "administrator";

const contextKey: unique symbol = Symbol("authorization context");
const issuedContexts = new WeakSet<object>();

class AuthContext {
  readonly #userId: string;
  readonly #tenantId: string;
  readonly #roles: readonly TrustedRole[];
  readonly #identityVersion: string;

  constructor(
    key: typeof contextKey,
    userId: string,
    tenantId: string,
    roles: readonly TrustedRole[],
    identityVersion: string
  ) {
    if (key !== contextKey) throw new TypeError("invalid context issuer");
    this.#userId = userId;
    this.#tenantId = tenantId;
    this.#roles = Object.freeze([...roles]);
    this.#identityVersion = identityVersion;
    issuedContexts.add(this);
    Object.freeze(this);
  }

  scope(key: typeof contextKey): Readonly<{
    userId: string;
    tenantId: string;
    roles: readonly TrustedRole[];
    identityVersion: string;
  }> {
    if (key !== contextKey || !issuedContexts.has(this)) {
      throw new TypeError("invalid authorization context");
    }
    return Object.freeze({
      userId: this.#userId,
      tenantId: this.#tenantId,
      roles: this.#roles,
      identityVersion: this.#identityVersion
    });
  }
}

class IdentityRejected extends Error {}
class AuthenticationRequiredError extends Error {
  constructor() {
    super("authentication required");
    this.name = "AuthenticationRequiredError";
  }
}
class IdentityUnavailableError extends Error {
  constructor() {
    super("identity verification unavailable");
    this.name = "IdentityUnavailableError";
  }
}

interface VerifiedIdentitySource {
  // Validates credential signature, issuer, audience, expiry, revocation,
  // session state, and current tenant membership.
  verify(evidence: RequestEvidence): Promise<unknown>;
}

function ownData(record: object, name: string): unknown {
  const descriptor = Object.getOwnPropertyDescriptor(record, name);
  if (descriptor === undefined || !("value" in descriptor) ||
      !descriptor.enumerable) {
    throw new IdentityUnavailableError();
  }
  return descriptor.value;
}

function parseVerifiedIdentity(value: unknown): AuthContext {
  try {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      throw new IdentityUnavailableError();
    }
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      throw new IdentityUnavailableError();
    }
    const expected = ["identityVersion", "roles", "tenantId", "userId"];
    const keys = Reflect.ownKeys(value);
    if (keys.length !== expected.length || keys.some(key =>
      typeof key !== "string" || !expected.includes(key))) {
      throw new IdentityUnavailableError();
    }

    const userId = ownData(value, "userId");
    const tenantId = ownData(value, "tenantId");
    const identityVersion = ownData(value, "identityVersion");
    const rawRoles = ownData(value, "roles");
    if (typeof userId !== "string" ||
        !/^user_[a-f0-9]{32}$/u.test(userId) ||
        typeof tenantId !== "string" ||
        !/^tenant_[a-f0-9]{32}$/u.test(tenantId) ||
        typeof identityVersion !== "string" ||
        !/^idv_[a-f0-9]{32}$/u.test(identityVersion) ||
        !Array.isArray(rawRoles) || rawRoles.length < 1 ||
        rawRoles.length > 8) {
      throw new IdentityUnavailableError();
    }

    const roles: TrustedRole[] = [];
    for (const role of rawRoles as unknown[]) {
      if (role !== "member" && role !== "project-editor" &&
          role !== "administrator") {
        throw new IdentityUnavailableError();
      }
      if (roles.includes(role)) throw new IdentityUnavailableError();
      roles.push(role);
    }
    roles.sort();
    return new AuthContext(
      contextKey, userId, tenantId, roles, identityVersion
    );
  } catch (error: unknown) {
    if (error instanceof IdentityUnavailableError) throw error;
    throw new IdentityUnavailableError();
  }
}

function buildAuthContextProvider(identity: VerifiedIdentitySource) {
  const verify = identity.verify.bind(identity);
  return async function requireAuthContext(
    evidence: RequestEvidence
  ): Promise<AuthContext> {
    let verified: unknown;
    try {
      verified = await verify(evidence);
    } catch (error: unknown) {
      if (error instanceof IdentityRejected) {
        throw new AuthenticationRequiredError();
      }
      throw new IdentityUnavailableError();
    }
    return parseVerifiedIdentity(verified);
  };
}

interface AuthorizedProjectService {
  // Authenticates AuthContext with scope(contextKey), loads the exact resource
  // in its tenant, verifies the current identityVersion, evaluates the exact
  // action/current resource version, and conditionally updates only after
  // allow. The command is already validated by a separate runtime boundary.
  updateAuthorized(
    context: AuthContext,
    validatedCommand: unknown
  ): Promise<void>;
}`
    }
  ]
};
