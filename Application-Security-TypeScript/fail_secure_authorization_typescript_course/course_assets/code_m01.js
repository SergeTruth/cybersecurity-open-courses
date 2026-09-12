window.COURSE_CODE_MODULE = {
  "title": "Start Without Permission",
  "codeIntro": "The deliberately unsafe function preserves a permissive default. The production boundary accepts only the primitive value true and binds the side effect to the evaluated operation.",
  "codeExamples": [
    {
      "title": "Permissive default versus exact positive evidence",
      "language": "typescript",
      "blurb": "False is a completed denial. Exceptions and every non-Boolean result are indeterminate. The writer receives the same immutable subject, tenant, resource, action, and resource version that the policy evaluated.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
type ProjectEditRequest = Readonly<{
  subjectId: string;
  tenantId: string;
  projectId: string;
  resourceVersion: number;
  action: "project:edit";
}>;

interface BooleanProjectPolicy {
  canEdit(request: ProjectEditRequest): Promise<unknown>;
}

interface DangerouslyUnprotectedWriter {
  applyEdit(request: ProjectEditRequest): Promise<void>;
}

const editCapabilityKey: unique symbol = Symbol("authorized project edit");
const issuedEdits = new WeakMap<object, boolean>();

class AuthorizedProjectEdit {
  readonly #request: ProjectEditRequest;

  constructor(key: typeof editCapabilityKey, request: ProjectEditRequest) {
    if (key !== editCapabilityKey) throw new TypeError("invalid edit issuer");
    this.#request = request;
    issuedEdits.set(this, false);
    Object.freeze(this);
  }

  consume(key: typeof editCapabilityKey): ProjectEditRequest {
    if (key !== editCapabilityKey || issuedEdits.get(this) !== false) {
      throw new TypeError("invalid or consumed edit capability");
    }
    issuedEdits.set(this, true);
    return this.#request;
  }
}

interface BoundProjectWriter {
  // Authenticates and consumes the one-shot capability, then applies only when
  // projectId, tenantId, and resourceVersion still match.
  applyAuthorizedEdit(capability: AuthorizedProjectEdit): Promise<void>;
}

class ForbiddenError extends Error {
  constructor() {
    super("operation forbidden");
    this.name = "ForbiddenError";
  }
}

class AuthorizationUnavailableError extends Error {
  constructor() {
    super("authorization unavailable");
    this.name = "AuthorizationUnavailableError";
  }
}

function readOwnField(record: object, name: string): unknown {
  const descriptor = Object.getOwnPropertyDescriptor(record, name);
  if (descriptor === undefined || !("value" in descriptor) ||
      !descriptor.enumerable) throw new TypeError("invalid edit request");
  return descriptor.value;
}

function snapshotEditRequest(value: ProjectEditRequest): ProjectEditRequest {
  try {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      throw new TypeError("invalid edit request");
    }
    const prototype = Object.getPrototypeOf(value);
    const expected = [
      "action", "projectId", "resourceVersion", "subjectId", "tenantId"
    ];
    const keys = Reflect.ownKeys(value);
    if ((prototype !== Object.prototype && prototype !== null) ||
        keys.length !== expected.length || keys.some(key =>
          typeof key !== "string" || !expected.includes(key))) {
      throw new TypeError("invalid edit request");
    }
    const subjectId = readOwnField(value, "subjectId");
    const tenantId = readOwnField(value, "tenantId");
    const projectId = readOwnField(value, "projectId");
    const resourceVersion = readOwnField(value, "resourceVersion");
    const action = readOwnField(value, "action");
    if (typeof subjectId !== "string" ||
        !/^user_[a-f0-9]{32}$/u.test(subjectId) ||
        typeof tenantId !== "string" ||
        !/^tenant_[a-f0-9]{32}$/u.test(tenantId) ||
        typeof projectId !== "string" ||
        !/^project_[a-f0-9]{32}$/u.test(projectId) ||
        typeof resourceVersion !== "number" ||
        !Number.isSafeInteger(resourceVersion) || resourceVersion < 0 ||
        action !== "project:edit") {
      throw new TypeError("invalid edit request");
    }
    return Object.freeze({
      subjectId, tenantId, projectId, resourceVersion, action
    });
  } catch {
    throw new TypeError("invalid edit request");
  }
}

async function deliberatelyFailOpenDemo(
  policy: Readonly<{ canEdit(request: ProjectEditRequest): Promise<boolean> }>,
  writer: DangerouslyUnprotectedWriter,
  request: ProjectEditRequest
): Promise<void> {
  let allowed = true;
  try {
    allowed = await policy.canEdit(request);
  } catch {
    // INSECURE ANTI-PATTERN: true survives an evaluation failure.
  }
  if (allowed) await writer.applyEdit(request);
}

async function updateAfterExplicitAllow(
  policy: BooleanProjectPolicy,
  writer: BoundProjectWriter,
  request: ProjectEditRequest
): Promise<void> {
  const requestSnapshot = snapshotEditRequest(request);
  const canEdit = policy.canEdit.bind(policy);
  const apply = writer.applyAuthorizedEdit.bind(writer);
  let result: unknown;
  try {
    result = await canEdit(requestSnapshot);
  } catch {
    throw new AuthorizationUnavailableError();
  }

  if (result === false) throw new ForbiddenError();
  if (result !== true) throw new AuthorizationUnavailableError();
  await apply(new AuthorizedProjectEdit(editCapabilityKey, requestSnapshot));
}`
    }
  ]
};
