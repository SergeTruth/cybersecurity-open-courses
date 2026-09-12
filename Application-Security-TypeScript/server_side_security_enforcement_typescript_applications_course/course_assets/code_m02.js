window.COURSE_CODE_MODULE = {
  "title": "Trusted Authentication Context",
  "codeIntro": "These focused source-file fragments are checked as ES modules with TypeScript 7.0.2, target ES2022, strict, noImplicitReturns, noUncheckedIndexedAccess, and exactOptionalPropertyTypes. Authentication infrastructure verifies credentials, then constructs the only principal accepted by services; request-body identity claims never enter that contract.",
  "codeExamples": [
    {
      "title": "Mint a runtime-verifiable principal from authoritative membership",
      "language": "typescript",
      "blurb": "A trusted composition-root builder captures the session verifier and membership store. A module-private token and WeakSet establish provenance, while bounded claims and copied frozen roles prevent callers from forging or mutating identity context.",
      "code": `// src/auth/authenticated-principal.ts
const AUTHENTICATION_TOKEN = Symbol("authentication boundary");
const VERIFIED_PRINCIPALS = new WeakSet<AuthenticatedPrincipal>();
const IDENTIFIER = /^[A-Za-z0-9_-]{1,64}$/;
const ALLOWED_ROLES = new Set([
  "customer", "approver", "document-admin"
] as const);

type Role = "customer" | "approver" | "document-admin";

interface RequestHeaders {
  get(name: "authorization"): string | null;
}

interface AuthenticationRequest {
  readonly headers: RequestHeaders;
}

interface SessionVerifier {
  // Returns null for rejected credentials after verifying signature/session,
  // issuer, audience, expiry, and application revocation policy.
  verify(authorizationHeader: string): Promise<unknown | null>;
}

interface MembershipStore {
  // Looks up the active membership by the verified stable subject.
  requireActive(subject: string): Promise<unknown | null>;
}

class AuthenticationError extends Error {}

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

  static fromVerifiedMembership(
    input: unknown,
    expectedSubject: string,
    token: typeof AUTHENTICATION_TOKEN
  ): AuthenticatedPrincipal {
    if (token !== AUTHENTICATION_TOKEN ||
        typeof input !== "object" ||
        input === null ||
        Array.isArray(input)) {
      throw new AuthenticationError("authentication failed");
    }
    const membership = input as Record<string, unknown>;
    const subject = membership.subject;
    const userId = membership.userId;
    const tenantId = membership.tenantId;
    const state = membership.state;
    const rawRoles = membership.roles;
    if (typeof subject !== "string" ||
        subject !== expectedSubject ||
        typeof userId !== "string" ||
        typeof tenantId !== "string" ||
        !IDENTIFIER.test(userId) ||
        !IDENTIFIER.test(tenantId) ||
        state !== "active" ||
        !Array.isArray(rawRoles) ||
        rawRoles.length > 8) {
      throw new AuthenticationError("authentication failed");
    }
    const roles = [...rawRoles];
    if (roles.some(role =>
          typeof role !== "string" ||
          !ALLOWED_ROLES.has(role as Role)
        ) ||
        new Set(roles).size !== roles.length) {
      throw new AuthenticationError("authentication failed");
    }

    const principal = new AuthenticatedPrincipal(
      userId,
      tenantId,
      Object.freeze(roles as Role[])
    );
    VERIFIED_PRINCIPALS.add(principal);
    return principal;
  }
}

function assertAuthenticatedPrincipal(
  value: unknown
): asserts value is AuthenticatedPrincipal {
  if (!(value instanceof AuthenticatedPrincipal) ||
      !VERIFIED_PRINCIPALS.has(value) ||
      !Object.isFrozen(value) ||
      !Object.isFrozen(value.roles)) {
    throw new AuthenticationError("authentication failed");
  }
}

function buildAuthenticator(
  verifier: SessionVerifier,
  memberships: MembershipStore
) {
  return async function authenticate(
    request: AuthenticationRequest
  ): Promise<AuthenticatedPrincipal> {
    const header = request.headers.get("authorization");
    if (typeof header !== "string" ||
        header.length < 1 ||
        header.length > 8192) {
      throw new AuthenticationError("authentication failed");
    }
    const claims = await verifier.verify(header);
    if (typeof claims !== "object" ||
        claims === null ||
        Array.isArray(claims)) {
      throw new AuthenticationError("authentication failed");
    }
    const subject = (claims as Record<string, unknown>).subject;
    if (typeof subject !== "string" || !IDENTIFIER.test(subject)) {
      throw new AuthenticationError("authentication failed");
    }
    const membership = await memberships.requireActive(subject);
    if (membership === null) {
      throw new AuthenticationError("authentication failed");
    }
    return AuthenticatedPrincipal.fromVerifiedMembership(
      membership,
      subject,
      AUTHENTICATION_TOKEN
    );
  };
}`
    }
  ]
};
