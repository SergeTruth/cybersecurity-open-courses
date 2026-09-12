window.COURSE_CODE_MODULE = {
  "title": "Name Privileged Transitions",
  "codeIntro": "The role transition is a dedicated authenticated command. One trusted transaction rechecks permission, tenant scope, current state, transition rules, and audit persistence rather than authorizing against a stale object.",
  "codeExamples": [
    {
      "title": "Atomic role-change operation",
      "language": "typescript",
      "blurb": "The caller supplies only a canonical target identifier and requested role. Tenant and audit actor identity come from an opaque principal; the application-owned service performs the authorized state transition and audit write atomically.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
type RequestContext = unknown;
type AllowedRole = "member" | "manager" | "administrator";

const principalKey = Symbol("authenticated role administrator");
const principals = new WeakSet<object>();

class AuthenticatedPrincipal {
  readonly #tenantId: string;
  readonly #actorId: string;

  constructor(key: typeof principalKey, tenantId: string, actorId: string) {
    if (key !== principalKey ||
        !/^tenant_[a-f0-9]{32}$/u.test(tenantId) ||
        !/^user_[a-f0-9]{32}$/u.test(actorId)) {
      throw new TypeError("invalid authenticated principal");
    }
    this.#tenantId = tenantId;
    this.#actorId = actorId;
    principals.add(this);
    Object.freeze(this);
  }

  binding(key: typeof principalKey): Readonly<{
    tenantId: string;
    actorId: string;
  }> {
    if (key !== principalKey || !principals.has(this)) {
      throw new TypeError("invalid authenticated principal");
    }
    return Object.freeze({
      tenantId: this.#tenantId,
      actorId: this.#actorId
    });
  }
}

interface AuthenticationBoundary {
  requirePrincipal(context: RequestContext): AuthenticatedPrincipal;
}

interface RoleAdministrationService {
  // In one transaction: authenticate the principal; lock or conditionally
  // update the actor and target; recheck current role-administration authority,
  // tenant scope, target state, separation-of-duties and transition rules;
  // update exactly one target; and write the audit record using the principal's
  // actor identity. Audit failure rolls the role change back.
  changeRoleAtomically(
    principal: AuthenticatedPrincipal,
    targetUserId: string,
    role: AllowedRole
  ): Promise<unknown>;
}

function requireUserId(value: unknown): string {
  if (typeof value !== "string" || !/^user_[a-f0-9]{32}$/u.test(value)) {
    throw new TypeError("invalid user identifier");
  }
  return value;
}

function requireRole(value: unknown): AllowedRole {
  if (value !== "member" && value !== "manager" &&
      value !== "administrator") {
    throw new TypeError("invalid role");
  }
  return value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function buildRoleChanger(
  authentication: AuthenticationBoundary,
  roles: RoleAdministrationService
): (
  context: RequestContext,
  targetUserId: unknown,
  requestedRole: unknown
) => Promise<void> {
  const requirePrincipal =
    authentication.requirePrincipal.bind(authentication);
  const changeRoleAtomically = roles.changeRoleAtomically.bind(roles);

  return async (context, targetUserId, requestedRole) => {
    const principal = requirePrincipal(context);
    if (!(principal instanceof AuthenticatedPrincipal) ||
        !principals.has(principal)) {
      throw new TypeError("invalid authenticated principal");
    }
    const result = await changeRoleAtomically(
      principal,
      requireUserId(targetUserId),
      requireRole(requestedRole)
    );
    if (!isRecord(result) || result["changed"] !== true ||
        typeof result["auditId"] !== "string" ||
        !/^audit_[a-f0-9]{32}$/u.test(result["auditId"])) {
      throw new Error("role change failed");
    }
  };
}`
    }
  ]
};
