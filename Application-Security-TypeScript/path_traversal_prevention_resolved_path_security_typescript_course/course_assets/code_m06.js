window.COURSE_CODE_MODULE = {
  "title": "Create Under a Controlled Parent",
  "codeIntro": "New targets cannot be canonicalized before creation. A trusted OS adapter owns an already-verified directory handle, generates the child name, streams bounded bytes, and creates without replacement.",
  "codeExamples": [
    {
      "title": "Create through an approved directory-handle boundary",
      "language": "typescript",
      "blurb": "The adapter is platform-specific: for example, a reviewed directory-relative primitive or a sandboxed private directory. It rejects links, junctions, reparse points, mounts, non-regular objects, and replacement; keeps the parent unavailable to untrusted writers; enforces actual streamed bytes; closes every handle; and removes incomplete files through the same directory handle.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
type RequestContext = unknown;
type UploadBytes = AsyncIterable<Uint8Array>;

const uploadScopeKey = Symbol("authorized upload");
const directoryKey = Symbol("approved directory");
const approvedUploadScopes = new WeakSet<object>();
const approvedDirectories = new WeakSet<object>();

class ApprovedUploadScope {
  readonly tenantId: string;
  readonly subjectId: string;

  constructor(
    key: typeof uploadScopeKey,
    tenantId: string,
    subjectId: string
  ) {
    if (key !== uploadScopeKey ||
        !/^tenant_[a-f0-9]{32}$/.test(tenantId) ||
        !/^subject_[a-f0-9]{32}$/.test(subjectId)) {
      throw new TypeError("invalid upload authorization");
    }
    this.tenantId = tenantId;
    this.subjectId = subjectId;
    approvedUploadScopes.add(this);
    Object.freeze(this);
  }
}

class ApprovedDirectoryHandle {
  constructor(key: typeof directoryKey) {
    if (key !== directoryKey) throw new TypeError("invalid directory");
    approvedDirectories.add(this);
    Object.freeze(this);
  }
}

// Trusted bootstrap calls this only after verifying the live directory handle,
// protected ancestry, filesystem identity, ownership, and writer policy.
function issueApprovedDirectory(): ApprovedDirectoryHandle {
  return new ApprovedDirectoryHandle(directoryKey);
}

interface UploadAuthorizationBoundary {
  requireUpload(context: RequestContext): ApprovedUploadScope;
}

interface SecureCreationAdapter {
  // The shared adapter validates every yielded value as Uint8Array, applies
  // all limits to bytes actually written, and never trusts Content-Length.
  createExclusive(
    scope: ApprovedUploadScope,
    directory: ApprovedDirectoryHandle,
    serverName: string,
    source: UploadBytes,
    cancellation: CancellationSignal,
    policy: Readonly<{
      mode: 0o600;
      maxBytes: 26_214_400;
      maxChunks: 10_000;
      writeDeadlineMs: 25_000;
      cleanupReserveMs: 5_000;
      admissionDeadlineMs: 2_000;
      maxConcurrentCreates: 4;
      requireRegularFile: true;
      replaceExisting: false;
      removeIncomplete: true;
      poisonOnCleanupFailure: true;
    }>
  ): Promise<unknown>;
}

interface RandomNameSource {
  randomUUID(): unknown;
}

interface CancellationSignal {
  readonly aborted: boolean;
  onAbort(listener: () => void): () => void;
}

type CreatedUpload = Readonly<{
  storedName: string;
  bytesWritten: number;
}>;

function buildUploadCreator(
  authorization: UploadAuthorizationBoundary,
  directory: ApprovedDirectoryHandle,
  storage: SecureCreationAdapter,
  random: RandomNameSource
): (
  context: RequestContext,
  source: UploadBytes,
  cancellation: CancellationSignal
) => Promise<CreatedUpload> {
  if (!(directory instanceof ApprovedDirectoryHandle) ||
      !approvedDirectories.has(directory)) {
    throw new TypeError("unapproved upload directory");
  }
  if (typeof authorization !== "object" || authorization === null ||
      typeof authorization.requireUpload !== "function" ||
      typeof storage !== "object" || storage === null ||
      typeof storage.createExclusive !== "function" ||
      typeof random !== "object" || random === null ||
      typeof random.randomUUID !== "function") {
    throw new TypeError("invalid upload composition");
  }
  const requireUpload = authorization.requireUpload.bind(authorization);
  const createExclusive = storage.createExclusive.bind(storage);
  const randomUUID = random.randomUUID.bind(random);

  return async (
    context: RequestContext,
    source: UploadBytes,
    cancellation: CancellationSignal
  ): Promise<CreatedUpload> => {
    if (typeof source !== "object" || source === null ||
        typeof source[Symbol.asyncIterator] !== "function" ||
        typeof cancellation !== "object" || cancellation === null ||
        typeof cancellation.aborted !== "boolean" ||
        typeof cancellation.onAbort !== "function") {
      throw new TypeError("invalid upload source");
    }
    if (cancellation.aborted) throw new Error("upload cancelled");

    const scope = requireUpload(context);
    if (!(scope instanceof ApprovedUploadScope) ||
        !approvedUploadScopes.has(scope)) {
      throw new TypeError("invalid upload authorization");
    }
    const uuid = randomUUID();
    if (typeof uuid !== "string" ||
        !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(uuid)) {
      throw new Error("secure name generation failed");
    }
    const serverName = uuid + ".upload";
    const result = await createExclusive(
      scope,
      directory,
      serverName,
      source,
      cancellation,
      Object.freeze({
        mode: 0o600 as const,
        maxBytes: 26_214_400 as const,
        maxChunks: 10_000 as const,
        writeDeadlineMs: 25_000 as const,
        cleanupReserveMs: 5_000 as const,
        admissionDeadlineMs: 2_000 as const,
        maxConcurrentCreates: 4 as const,
        requireRegularFile: true as const,
        replaceExisting: false as const,
        removeIncomplete: true as const,
        poisonOnCleanupFailure: true as const
      })
    );

    if (typeof result !== "object" || result === null) {
      throw new Error("upload creation failed");
    }
    const nameDescriptor = Object.getOwnPropertyDescriptor(result, "storedName");
    const bytesDescriptor = Object.getOwnPropertyDescriptor(result, "bytesWritten");
    const closedDescriptor = Object.getOwnPropertyDescriptor(result, "closed");
    const storedName = nameDescriptor?.value as unknown;
    const bytesWritten = bytesDescriptor?.value as unknown;
    if (!Object.hasOwn(nameDescriptor ?? {}, "value") ||
        !Object.hasOwn(bytesDescriptor ?? {}, "value") ||
        !Object.hasOwn(closedDescriptor ?? {}, "value") ||
        storedName !== serverName ||
        typeof bytesWritten !== "number" ||
        !Number.isSafeInteger(bytesWritten) ||
        bytesWritten < 0 || bytesWritten > 26_214_400 ||
        closedDescriptor?.value !== true) {
      throw new Error("upload creation failed");
    }
    return Object.freeze({ storedName, bytesWritten });
  };
}`
    }
  ]
};
