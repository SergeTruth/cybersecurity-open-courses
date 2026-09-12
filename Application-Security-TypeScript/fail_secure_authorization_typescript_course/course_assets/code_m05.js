window.COURSE_CODE_MODULE = {
  "title": "Treat Cached Allows as Expiring Evidence",
  "codeIntro": "The cache key binds current identity, resource, action, tenant, and policy versions. Only authenticated, strictly parsed, unexpired evidence can avoid fresh evaluation.",
  "codeExamples": [
    {
      "title": "Validate binding and cache freshness explicitly",
      "language": "typescript",
      "blurb": "The operation service supplies freshly loaded version fields. Mutations always use fresh policy evaluation; this deployment permits cached allows only for project reads. The consumer uses the returned immutable binding, rechecks validUntilMs immediately before the read, and conditions access on the bound resource version.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
type ProjectAction = "project:read" | "project:edit" | "project:delete";
type DecisionBinding = Readonly<{
  subjectId: string;
  tenantId: string;
  resourceId: string;
  action: ProjectAction;
  identityVersion: string;
  resourceVersion: number;
  policyVersion: string;
}>;

type AuthorizationDecision =
  | Readonly<{
      kind: "allow";
      evaluationId: string;
      validUntilMs: number;
      source: "fresh" | "cache";
    }>
  | Readonly<{
      kind: "deny";
      evaluationId: string;
      validUntilMs: number;
      source: "fresh" | "cache";
    }>
  | Readonly<{
      kind: "indeterminate";
      category: "deadline" | "dependency_failure" | "invalid_response";
      source: "fresh";
    }>;

type BoundAuthorization = Readonly<{
  binding: DecisionBinding;
  decision: AuthorizationDecision;
}>;

interface AuthenticatedDecisionCache {
  // Verifies record integrity, caps bytes, and honors cancellation.
  readAuthenticated(key: string, signal: AbortSignal): Promise<unknown | null>;
}

interface EpochClock {
  nowMs(): number;
}

type FreshAuthorizer = (binding: DecisionBinding) => Promise<unknown>;
const MAX_CACHE_TTL_MS = 2_000;
const CACHE_DEADLINE_MS = 25;

function snapshotBinding(value: DecisionBinding): DecisionBinding {
  try {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      throw new TypeError("invalid authorization binding");
    }
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      throw new TypeError("invalid authorization binding");
    }
    const expected = [
      "action", "identityVersion", "policyVersion", "resourceId",
      "resourceVersion", "subjectId", "tenantId"
    ];
    const keys = Reflect.ownKeys(value);
    if (keys.length !== expected.length || keys.some(key =>
      typeof key !== "string" || !expected.includes(key))) {
      throw new TypeError("invalid authorization binding");
    }
    const subjectId = ownValue(value, "subjectId");
    const tenantId = ownValue(value, "tenantId");
    const resourceId = ownValue(value, "resourceId");
    const action = ownValue(value, "action");
    const identityVersion = ownValue(value, "identityVersion");
    const resourceVersion = ownValue(value, "resourceVersion");
    const policyVersion = ownValue(value, "policyVersion");
    if (typeof subjectId !== "string" ||
        !/^user_[a-f0-9]{32}$/u.test(subjectId) ||
        typeof tenantId !== "string" ||
        !/^tenant_[a-f0-9]{32}$/u.test(tenantId) ||
        typeof resourceId !== "string" ||
        !/^project_[a-f0-9]{32}$/u.test(resourceId) ||
        (action !== "project:read" && action !== "project:edit" &&
          action !== "project:delete") ||
        typeof identityVersion !== "string" ||
        !/^idv_[a-f0-9]{32}$/u.test(identityVersion) ||
        typeof resourceVersion !== "number" ||
        !Number.isSafeInteger(resourceVersion) || resourceVersion < 0 ||
        typeof policyVersion !== "string" ||
        !/^sha256:[a-f0-9]{64}$/u.test(policyVersion)) {
      throw new TypeError("invalid authorization binding");
    }
    return Object.freeze({
      subjectId, tenantId, resourceId, action, identityVersion,
      resourceVersion, policyVersion
    });
  } catch {
    throw new TypeError("invalid authorization binding");
  }
}

function decisionKey(binding: DecisionBinding): string {
  // JSON stringification of a fixed array is unambiguous for validated strings.
  return JSON.stringify([
    binding.subjectId,
    binding.tenantId,
    binding.resourceId,
    binding.action,
    binding.identityVersion,
    binding.resourceVersion,
    binding.policyVersion
  ]);
}

function ownValue(record: object, name: string): unknown {
  const descriptor = Object.getOwnPropertyDescriptor(record, name);
  if (descriptor === undefined || !("value" in descriptor) ||
      !descriptor.enumerable) {
    throw new TypeError("invalid cache entry");
  }
  return descriptor.value;
}

function parseCacheEntry(
  value: unknown,
  expectedKey: string,
  nowMs: number
): AuthorizationDecision | null {
  try {
    if (typeof value !== "object" || value === null || Array.isArray(value) ||
        (Object.getPrototypeOf(value) !== Object.prototype &&
          Object.getPrototypeOf(value) !== null)) return null;
    const expected = [
      "decision", "evaluationId", "expiresAtMs", "issuedAtMs", "key"
    ];
    const keys = Reflect.ownKeys(value);
    if (keys.length !== expected.length || keys.some(key =>
      typeof key !== "string" || !expected.includes(key))) return null;

    const decision = ownValue(value, "decision");
    const evaluationId = ownValue(value, "evaluationId");
    const issuedAtMs = ownValue(value, "issuedAtMs");
    const expiresAtMs = ownValue(value, "expiresAtMs");
    if ((decision !== "allow" && decision !== "deny") ||
        ownValue(value, "key") !== expectedKey ||
        typeof evaluationId !== "string" ||
        !/^eval_[a-f0-9]{32}$/u.test(evaluationId) ||
        typeof issuedAtMs !== "number" || !Number.isSafeInteger(issuedAtMs) ||
        typeof expiresAtMs !== "number" || !Number.isSafeInteger(expiresAtMs) ||
        issuedAtMs > nowMs || expiresAtMs <= nowMs ||
        expiresAtMs <= issuedAtMs ||
        expiresAtMs - issuedAtMs > MAX_CACHE_TTL_MS) return null;

    return decision === "allow"
      ? Object.freeze({
          kind: "allow", evaluationId, validUntilMs: expiresAtMs,
          source: "cache"
        })
      : Object.freeze({
          kind: "deny", evaluationId, validUntilMs: expiresAtMs,
          source: "cache"
        });
  } catch {
    return null;
  }
}

function parseFreshDecision(
  value: unknown,
  expectedKey: string,
  nowMs: number
): AuthorizationDecision {
  try {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      throw new TypeError("invalid fresh decision");
    }
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      throw new TypeError("invalid fresh decision");
    }
    const kind = ownValue(value, "kind");
    const bindingKey = ownValue(value, "bindingKey");
    const keys = Reflect.ownKeys(value);
    if (bindingKey !== expectedKey) throw new TypeError("mismatched decision");
    if (kind === "indeterminate") {
      const category = ownValue(value, "category");
      if (keys.length !== 3 || !keys.includes("kind") ||
          !keys.includes("bindingKey") || !keys.includes("category") ||
          (category !== "deadline" && category !== "dependency_failure" &&
            category !== "invalid_response")) {
        throw new TypeError("invalid fresh decision");
      }
      return Object.freeze({ kind, category, source: "fresh" });
    }
    const evaluationId = ownValue(value, "evaluationId");
    const validUntilMs = ownValue(value, "validUntilMs");
    if ((kind !== "allow" && kind !== "deny") || keys.length !== 4 ||
        !keys.includes("kind") || !keys.includes("bindingKey") ||
        !keys.includes("evaluationId") || !keys.includes("validUntilMs") ||
        typeof evaluationId !== "string" ||
        !/^eval_[a-f0-9]{32}$/u.test(evaluationId) ||
        typeof validUntilMs !== "number" ||
        !Number.isSafeInteger(validUntilMs) || validUntilMs <= nowMs ||
        validUntilMs - nowMs > 1_000) {
      throw new TypeError("invalid fresh decision");
    }
    return Object.freeze({ kind, evaluationId, validUntilMs, source: "fresh" });
  } catch {
    return Object.freeze({
      kind: "indeterminate", category: "invalid_response", source: "fresh"
    });
  }
}

async function readCacheWithDeadline(
  read: AuthenticatedDecisionCache["readAuthenticated"],
  key: string
): Promise<unknown | null> {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_resolve, reject) => {
    timer = setTimeout(
      () => {
        controller.abort();
        reject(new Error("cache deadline exceeded"));
      },
      CACHE_DEADLINE_MS
    );
  });
  try {
    return await Promise.race([read(key, controller.signal), deadline]);
  } finally {
    if (timer !== undefined) clearTimeout(timer);
    controller.abort();
  }
}

function buildCachedAuthorizer(
  cache: AuthenticatedDecisionCache,
  clock: EpochClock,
  authorizeFreshly: FreshAuthorizer
) {
  const read = cache.readAuthenticated.bind(cache);
  const now = clock.nowMs.bind(clock);

  return async function authorize(
    currentBinding: DecisionBinding
  ): Promise<BoundAuthorization> {
    const binding = snapshotBinding(currentBinding);
    // High-impact actions are never authorized by cached evidence here.
    if (binding.action === "project:read") {
      try {
        const startedAt = now();
        if (Number.isSafeInteger(startedAt) && startedAt >= 0) {
          const key = decisionKey(binding);
          const cached = await readCacheWithDeadline(read, key);
          if (cached !== null) {
            const decisionTime = now();
            if (!Number.isSafeInteger(decisionTime) || decisionTime < 0) {
              throw new TypeError("invalid clock");
            }
            const parsed = parseCacheEntry(cached, key, decisionTime);
            if (parsed !== null) return Object.freeze({ binding, decision: parsed });
          }
        }
      } catch {
        // Cache and clock failures fall through to fresh evaluation.
      }
    }

    try {
      const key = decisionKey(binding);
      const fresh = await authorizeFreshly(binding);
      const decisionTime = now();
      if (!Number.isSafeInteger(decisionTime) || decisionTime < 0) {
        throw new TypeError("invalid clock");
      }
      return Object.freeze({
        binding,
        decision: parseFreshDecision(fresh, key, decisionTime)
      });
    } catch {
      const decision: AuthorizationDecision = Object.freeze({
        kind: "indeterminate", category: "dependency_failure", source: "fresh"
      });
      return Object.freeze({ binding, decision });
    }
  };
}

const readCapabilityKey: unique symbol = Symbol("authorized project read");
const issuedReadCapabilities = new WeakMap<object, boolean>();

class AuthorizedProjectRead {
  readonly #binding: DecisionBinding;
  readonly #evaluationId: string;
  readonly #validUntilMs: number;

  constructor(
    key: typeof readCapabilityKey,
    binding: DecisionBinding,
    evaluationId: string,
    validUntilMs: number
  ) {
    if (key !== readCapabilityKey) throw new TypeError("invalid read issuer");
    this.#binding = binding;
    this.#evaluationId = evaluationId;
    this.#validUntilMs = validUntilMs;
    issuedReadCapabilities.set(this, false);
    Object.freeze(this);
  }

  consume(key: typeof readCapabilityKey): Readonly<{
    binding: DecisionBinding;
    evaluationId: string;
    validUntilMs: number;
  }> {
    if (key !== readCapabilityKey ||
        issuedReadCapabilities.get(this) !== false) {
      throw new TypeError("invalid or consumed read capability");
    }
    issuedReadCapabilities.set(this, true);
    return Object.freeze({
      binding: this.#binding,
      evaluationId: this.#evaluationId,
      validUntilMs: this.#validUntilMs
    });
  }
}

interface VersionedProjectReader {
  // Authenticates capability.consume(readCapabilityKey), rechecks expiry,
  // queries its tenant/resource/resourceVersion, and returns a detached
  // projection or null when that exact state no longer exists.
  readIfCurrent(capability: AuthorizedProjectRead): Promise<unknown>;
}

class CachedAuthorizationDenied extends Error {
  constructor() {
    super("operation forbidden");
    this.name = "CachedAuthorizationDenied";
  }
}

class CachedAuthorizationUnavailable extends Error {
  constructor() {
    super("authorization unavailable");
    this.name = "CachedAuthorizationUnavailable";
  }
}

function buildAuthorizedProjectReader(
  cache: AuthenticatedDecisionCache,
  clock: EpochClock,
  authorizeFreshly: FreshAuthorizer,
  projects: VersionedProjectReader
) {
  const authorize = buildCachedAuthorizer(cache, clock, authorizeFreshly);
  const now = clock.nowMs.bind(clock);
  const readIfCurrent = projects.readIfCurrent.bind(projects);

  return async function readProject(
    currentBinding: DecisionBinding
  ): Promise<unknown> {
    const result = await authorize(currentBinding);
    if (result.binding.action !== "project:read") {
      throw new CachedAuthorizationUnavailable();
    }
    if (result.decision.kind === "deny") {
      throw new CachedAuthorizationDenied();
    }
    if (result.decision.kind === "indeterminate") {
      throw new CachedAuthorizationUnavailable();
    }
    const decisionTime = now();
    if (!Number.isSafeInteger(decisionTime) || decisionTime < 0 ||
        decisionTime >= result.decision.validUntilMs) {
      throw new CachedAuthorizationUnavailable();
    }

    let row: unknown;
    try {
      const capability = new AuthorizedProjectRead(
        readCapabilityKey,
        result.binding,
        result.decision.evaluationId,
        result.decision.validUntilMs
      );
      row = await readIfCurrent(capability);
    } catch {
      throw new CachedAuthorizationUnavailable();
    }
    try {
      if (typeof row !== "object" || row === null || Array.isArray(row)) {
        throw new TypeError("invalid project row");
      }
      const prototype = Object.getPrototypeOf(row);
      const keys = Reflect.ownKeys(row);
      if ((prototype !== Object.prototype && prototype !== null) ||
          keys.length !== 3 || !keys.includes("resourceId") ||
          !keys.includes("resourceVersion") || !keys.includes("value")) {
        throw new TypeError("invalid project row");
      }
      const resourceId = ownValue(row, "resourceId");
      const resourceVersion = ownValue(row, "resourceVersion");
      const value = ownValue(row, "value");
      if (resourceId !== result.binding.resourceId ||
          resourceVersion !== result.binding.resourceVersion) {
        throw new TypeError("mismatched project row");
      }
      return value;
    } catch {
      throw new CachedAuthorizationUnavailable();
    }
  };
}`
    }
  ]
};
