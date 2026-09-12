window.COURSE_CODE_MODULE = {
  "title": "Return Indeterminate on Policy Failure",
  "codeIntro": "The remote boundary snapshots the exact operation, applies a deadline and cancellation signal, validates a bounded response, and rejects every mismatch as indeterminate.",
  "codeExamples": [
    {
      "title": "Bound and bind remote policy evaluation",
      "language": "typescript",
      "blurb": "The application-owned client authenticates the policy endpoint and caps response bytes. A late promise can return data only; it never owns the protected side effect. Downstream code must use the immutable binding, enforce validUntilMs immediately before the effect, and condition the write on the evaluated resource version.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
type ProjectAction = "project:read" | "project:edit" | "project:delete";
type PolicyRequest = Readonly<{
  requestId: string;
  subjectId: string;
  tenantId: string;
  resourceId: string;
  action: ProjectAction;
  resourceVersion: number;
  identityVersion: string;
  policyVersion: string;
}>;

type AuthorizationDecision =
  | Readonly<{
      kind: "allow";
      evaluationId: string;
      validUntilMs: number;
    }>
  | Readonly<{
      kind: "deny";
      evaluationId: string;
      validUntilMs: number;
    }>
  | Readonly<{
      kind: "indeterminate";
      category: "deadline" | "dependency_failure" | "invalid_response";
    }>;

type BoundAuthorization = Readonly<{
  binding: PolicyRequest;
  decision: AuthorizationDecision;
}>;

interface PolicyClient {
  // Uses an authenticated endpoint, caps response bytes, and honors abort.
  check(request: PolicyRequest, signal: AbortSignal): Promise<unknown>;
}

interface EpochClock {
  nowMs(): number;
}

class PolicyDeadlineError extends Error {}
class InvalidPolicyResponse extends Error {}

function requireOwnData(record: object, name: string): unknown {
  const descriptor = Object.getOwnPropertyDescriptor(record, name);
  if (descriptor === undefined || !("value" in descriptor) ||
      !descriptor.enumerable) {
    throw new InvalidPolicyResponse();
  }
  return descriptor.value;
}

function snapshotPolicyRequest(value: PolicyRequest): PolicyRequest {
  try {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      throw new TypeError("invalid policy request");
    }
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      throw new TypeError("invalid policy request");
    }
    const expected = [
      "action", "identityVersion", "policyVersion", "requestId",
      "resourceId", "resourceVersion", "subjectId", "tenantId"
    ];
    const keys = Reflect.ownKeys(value);
    if (keys.length !== expected.length || keys.some(key =>
      typeof key !== "string" || !expected.includes(key))) {
      throw new TypeError("invalid policy request");
    }
    const requestId = requireOwnData(value, "requestId");
    const subjectId = requireOwnData(value, "subjectId");
    const tenantId = requireOwnData(value, "tenantId");
    const resourceId = requireOwnData(value, "resourceId");
    const action = requireOwnData(value, "action");
    const resourceVersion = requireOwnData(value, "resourceVersion");
    const identityVersion = requireOwnData(value, "identityVersion");
    const policyVersion = requireOwnData(value, "policyVersion");
    if (typeof requestId !== "string" ||
        !/^req_[a-f0-9]{32}$/u.test(requestId) ||
        typeof subjectId !== "string" ||
        !/^user_[a-f0-9]{32}$/u.test(subjectId) ||
        typeof tenantId !== "string" ||
        !/^tenant_[a-f0-9]{32}$/u.test(tenantId) ||
        typeof resourceId !== "string" ||
        !/^project_[a-f0-9]{32}$/u.test(resourceId) ||
        (action !== "project:read" && action !== "project:edit" &&
          action !== "project:delete") ||
        typeof resourceVersion !== "number" ||
        !Number.isSafeInteger(resourceVersion) || resourceVersion < 0 ||
        typeof identityVersion !== "string" ||
        !/^idv_[a-f0-9]{32}$/u.test(identityVersion) ||
        typeof policyVersion !== "string" ||
        !/^sha256:[a-f0-9]{64}$/u.test(policyVersion)) {
      throw new TypeError("invalid policy request");
    }
    return Object.freeze({
      requestId, subjectId, tenantId, resourceId, action, resourceVersion,
      identityVersion, policyVersion
    });
  } catch {
    throw new TypeError("invalid policy request");
  }
}

function parsePolicyResponse(
  value: unknown,
  request: PolicyRequest,
  nowMs: number
): AuthorizationDecision {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new InvalidPolicyResponse();
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    throw new InvalidPolicyResponse();
  }
  const expected = [
    "action", "decision", "evaluationId", "expiresAtMs", "identityVersion",
    "issuedAtMs", "policyVersion", "requestId", "resourceId",
    "resourceVersion", "subjectId", "tenantId"
  ];
  const keys = Reflect.ownKeys(value);
  if (keys.length !== expected.length || keys.some(key =>
    typeof key !== "string" || !expected.includes(key))) {
    throw new InvalidPolicyResponse();
  }

  const decision = requireOwnData(value, "decision");
  const evaluationId = requireOwnData(value, "evaluationId");
  const issuedAtMs = requireOwnData(value, "issuedAtMs");
  const expiresAtMs = requireOwnData(value, "expiresAtMs");
  if ((decision !== "allow" && decision !== "deny") ||
      typeof evaluationId !== "string" ||
      !/^eval_[a-f0-9]{32}$/u.test(evaluationId) ||
      requireOwnData(value, "requestId") !== request.requestId ||
      requireOwnData(value, "subjectId") !== request.subjectId ||
      requireOwnData(value, "tenantId") !== request.tenantId ||
      requireOwnData(value, "resourceId") !== request.resourceId ||
      requireOwnData(value, "action") !== request.action ||
      requireOwnData(value, "resourceVersion") !== request.resourceVersion ||
      requireOwnData(value, "identityVersion") !== request.identityVersion ||
      requireOwnData(value, "policyVersion") !== request.policyVersion ||
      typeof issuedAtMs !== "number" || !Number.isSafeInteger(issuedAtMs) ||
      typeof expiresAtMs !== "number" || !Number.isSafeInteger(expiresAtMs) ||
      issuedAtMs > nowMs || expiresAtMs <= nowMs ||
      expiresAtMs <= issuedAtMs || expiresAtMs - issuedAtMs > 1_000) {
    throw new InvalidPolicyResponse();
  }
  return decision === "allow"
    ? Object.freeze({ kind: "allow", evaluationId, validUntilMs: expiresAtMs })
    : Object.freeze({ kind: "deny", evaluationId, validUntilMs: expiresAtMs });
}

async function checkWithDeadline(
  client: PolicyClient,
  request: PolicyRequest
): Promise<unknown> {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_resolve, reject) => {
    timer = setTimeout(() => {
      controller.abort();
      reject(new PolicyDeadlineError());
    }, 250);
  });
  try {
    return await Promise.race([client.check(request, controller.signal), deadline]);
  } finally {
    if (timer !== undefined) clearTimeout(timer);
    controller.abort();
  }
}

function buildRemoteAuthorizer(client: PolicyClient, clock: EpochClock) {
  const check = client.check.bind(client);
  const isolatedClient: PolicyClient = Object.freeze({ check });
  const nowMs = clock.nowMs.bind(clock);

  return async function authorizeRemotely(
    rawRequest: PolicyRequest
  ): Promise<BoundAuthorization> {
    const binding = snapshotPolicyRequest(rawRequest);
    let decision: AuthorizationDecision;
    try {
      const raw = await checkWithDeadline(isolatedClient, binding);
      const responseTime = nowMs();
      if (!Number.isSafeInteger(responseTime) || responseTime < 0) {
        throw new InvalidPolicyResponse();
      }
      decision = parsePolicyResponse(raw, binding, responseTime);
    } catch (error: unknown) {
      const category = error instanceof PolicyDeadlineError
        ? "deadline"
        : error instanceof InvalidPolicyResponse
          ? "invalid_response"
          : "dependency_failure";
      decision = Object.freeze({ kind: "indeterminate", category });
    }
    return Object.freeze({ binding, decision });
  };
}

const capabilityKey: unique symbol = Symbol("authorized project operation");
const issuedCapabilities = new WeakMap<object, boolean>();

class AuthorizedProjectCapability {
  readonly #binding: PolicyRequest;
  readonly #evaluationId: string;
  readonly #validUntilMs: number;

  constructor(
    key: typeof capabilityKey,
    binding: PolicyRequest,
    evaluationId: string,
    validUntilMs: number
  ) {
    if (key !== capabilityKey) throw new TypeError("invalid capability issuer");
    this.#binding = binding;
    this.#evaluationId = evaluationId;
    this.#validUntilMs = validUntilMs;
    issuedCapabilities.set(this, false);
    Object.freeze(this);
  }

  consume(key: typeof capabilityKey): Readonly<{
    binding: PolicyRequest;
    evaluationId: string;
    validUntilMs: number;
  }> {
    if (key !== capabilityKey || issuedCapabilities.get(this) !== false) {
      throw new TypeError("invalid or consumed authorization capability");
    }
    issuedCapabilities.set(this, true);
    return Object.freeze({
      binding: this.#binding,
      evaluationId: this.#evaluationId,
      validUntilMs: this.#validUntilMs
    });
  }
}

interface BoundProjectOperation {
  // Authenticates capability.consume(capabilityKey), rechecks expiry with its
  // trusted clock, and performs the exact action only if tenant, resource and
  // resourceVersion still match. Returns primitive true only on success.
  applyIfCurrent(capability: AuthorizedProjectCapability): Promise<unknown>;
}

class RemoteAuthorizationDenied extends Error {
  constructor() {
    super("operation forbidden");
    this.name = "RemoteAuthorizationDenied";
  }
}

class RemoteAuthorizationUnavailable extends Error {
  constructor() {
    super("authorization unavailable");
    this.name = "RemoteAuthorizationUnavailable";
  }
}

class AuthorizedStateChanged extends Error {
  constructor() {
    super("authorized resource state changed");
    this.name = "AuthorizedStateChanged";
  }
}

function buildRemoteAuthorizedOperation(
  client: PolicyClient,
  clock: EpochClock,
  operation: BoundProjectOperation
) {
  const authorize = buildRemoteAuthorizer(client, clock);
  const nowMs = clock.nowMs.bind(clock);
  const applyIfCurrent = operation.applyIfCurrent.bind(operation);

  return async function execute(rawRequest: PolicyRequest): Promise<void> {
    const result = await authorize(rawRequest);
    if (result.decision.kind === "deny") {
      throw new RemoteAuthorizationDenied();
    }
    if (result.decision.kind === "indeterminate") {
      throw new RemoteAuthorizationUnavailable();
    }
    const decisionTime = nowMs();
    if (!Number.isSafeInteger(decisionTime) || decisionTime < 0 ||
        decisionTime >= result.decision.validUntilMs) {
      throw new RemoteAuthorizationUnavailable();
    }
    const capability = new AuthorizedProjectCapability(
      capabilityKey,
      result.binding,
      result.decision.evaluationId,
      result.decision.validUntilMs
    );
    const applied = await applyIfCurrent(capability);
    if (applied !== true) throw new AuthorizedStateChanged();
  };
}`
    }
  ]
};
