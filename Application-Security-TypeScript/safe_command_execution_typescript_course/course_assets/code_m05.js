window.COURSE_CODE_MODULE = {
  "title": "Constrain Process Context",
  "codeIntro": "The public façade accepts only request data and authenticated request context. Trusted bootstrap captures authorization, private staging, executable policy, process execution, cwd, and a minimal environment.",
  "codeExamples": [
    {
      "title": "Authorize, stage, and launch inside one façade",
      "language": "typescript",
      "blurb": "The trusted stager authorizes ownership and tenant scope, streams no more than the byte limit into a server-private per-job location, rejects links and non-regular inputs, and owns cleanup through the callback. No PATH or secret is inherited. The runner consumes an approved executable handle and settles only after the child and its contained process tree are closed and reaped.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
type RequestContext = unknown;
type Format = "pdf" | "png";

const authorizationKey = Symbol("conversion authorization");
const stagingKey = Symbol("staged asset");

class AuthorizedConversion {
  readonly #tenantId: string;
  readonly #subjectId: string;

  constructor(
    key: typeof authorizationKey,
    tenantId: string,
    subjectId: string
  ) {
    if (key !== authorizationKey ||
        !/^tenant_[a-f0-9]{32}$/.test(tenantId) ||
        !/^subject_[a-f0-9]{32}$/.test(subjectId)) {
      throw new TypeError("invalid authorization");
    }
    this.#tenantId = tenantId;
    this.#subjectId = subjectId;
    Object.freeze(this);
  }

  storageScope(key: typeof authorizationKey): Readonly<{
    tenantId: string;
    subjectId: string;
  }> {
    if (key !== authorizationKey) {
      throw new TypeError("invalid authorization access");
    }
    return Object.freeze({
      tenantId: this.#tenantId,
      subjectId: this.#subjectId
    });
  }
}

class StagedAsset {
  readonly #operandPath: string;
  readonly byteLength: number;

  constructor(
    key: typeof stagingKey,
    operandPath: string,
    byteLength: number
  ) {
    const parts = operandPath.split("/");
    if (key !== stagingKey ||
        parts.length !== 7 ||
        parts[0] !== "" ||
        parts[1] !== "var" ||
        parts[2] !== "lib" ||
        parts[3] !== "course-worker" ||
        parts[4] !== "jobs" ||
        !/^job_[a-f0-9]{32}$/.test(parts[5] ?? "") ||
        parts[6] !== "input" ||
        !Number.isSafeInteger(byteLength) ||
        byteLength < 1 ||
        byteLength > 25 * 1024 * 1024) {
      throw new TypeError("invalid staged asset");
    }
    this.#operandPath = operandPath;
    this.byteLength = byteLength;
    Object.freeze(this);
  }

  argument(key: typeof stagingKey): string {
    if (key !== stagingKey) {
      throw new TypeError("invalid staged asset access");
    }
    return this.#operandPath;
  }
}

const executableKey = Symbol("approved executable");
const approvedExecutables = new WeakSet<object>();

class ApprovedExecutable {
  constructor(key: typeof executableKey) {
    if (key !== executableKey) throw new TypeError("unapproved executable");
    approvedExecutables.add(this);
    Object.freeze(this);
  }
}

// Module 3's registry is the only production caller of this issuer.
function issueApprovedExecutable(): ApprovedExecutable {
  return new ApprovedExecutable(executableKey);
}

type WorkerPolicy = Readonly<{
  converter: ApprovedExecutable;
}>;

type WorkerEnvironment = Readonly<{
  LANG: "C.UTF-8";
  LC_ALL: "C.UTF-8";
}>;

type ConversionLaunch = Readonly<{
  executable: ApprovedExecutable;
  args: readonly ["--format", Format, "--", string];
  shell: false;
  cwd: "/var/lib/course-worker";
  env: WorkerEnvironment;
  isolationProfile: "converter-unprivileged-v1";
  inputBytes: number;
}>;

const processFailureKey = Symbol("contained process failure");

class ContainedProcessFailure extends Error {
  constructor(key: typeof processFailureKey) {
    if (key !== processFailureKey) throw new TypeError("invalid failure");
    super("contained process failed");
    this.name = "ContainedProcessFailure";
  }
}

class ConversionFailed extends Error {
  constructor() {
    super("conversion failed");
    this.name = "ConversionFailed";
  }
}

// This issuer stays inside the contained process-adapter module.
function issueContainedProcessFailure(): ContainedProcessFailure {
  return new ContainedProcessFailure(processFailureKey);
}

interface AuthorizationBoundary {
  requireAssetConversion(context: RequestContext): AuthorizedConversion;
}

interface TrustedAssetStager {
  // Authorization, bounded copying, callback completion, and cleanup are one
  // operation. The source pathname is never returned to request code.
  withOwnedAsset<T>(
    scope: Readonly<{ tenantId: string; subjectId: string }>,
    assetId: string,
    maxBytes: number,
    use: (asset: StagedAsset) => Promise<T>
  ): Promise<T>;
}

interface ContainedProcessRunner {
  // Expected launch, deadline, output, exit, and signal failures use the
  // module-owned ContainedProcessFailure. Unexpected defects are not hidden.
  run(launch: ConversionLaunch): Promise<void>;
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function parseRequest(value: unknown): Readonly<{
  assetId: string;
  format: Format;
}> {
  if (!isPlainRecord(value) || Object.keys(value).length !== 2) {
    throw new TypeError("invalid conversion request");
  }
  const assetDescriptor = Object.getOwnPropertyDescriptor(value, "assetId");
  const formatDescriptor = Object.getOwnPropertyDescriptor(value, "format");
  const assetId = assetDescriptor?.value as unknown;
  const format = formatDescriptor?.value as unknown;
  if (assetDescriptor === undefined || formatDescriptor === undefined ||
      !Object.hasOwn(assetDescriptor, "value") ||
      !Object.hasOwn(formatDescriptor, "value") ||
      typeof assetId !== "string" ||
      !/^asset_[a-f0-9]{32}$/.test(assetId) ||
      (format !== "pdf" && format !== "png")) {
    throw new TypeError("invalid conversion request");
  }
  return Object.freeze({ assetId, format });
}

// Call once at trusted bootstrap; do not accept these collaborators per request.
function buildConversionFacade(
  authorization: AuthorizationBoundary,
  stager: TrustedAssetStager,
  policy: WorkerPolicy,
  runner: ContainedProcessRunner
): (context: RequestContext, request: unknown) => Promise<void> {
  if (!(policy.converter instanceof ApprovedExecutable) ||
      !approvedExecutables.has(policy.converter)) {
    throw new TypeError("unapproved executable policy");
  }
  const converter = policy.converter;
  const env: WorkerEnvironment = Object.freeze({
    LANG: "C.UTF-8",
    LC_ALL: "C.UTF-8"
  });

  return async (context: RequestContext, request: unknown): Promise<void> => {
    const parsed = parseRequest(request);
    const grant = authorization.requireAssetConversion(context);
    const scope = grant.storageScope(authorizationKey);

    await stager.withOwnedAsset(
      scope,
      parsed.assetId,
      25 * 1024 * 1024,
      async (asset: StagedAsset): Promise<void> => {
        if (!(asset instanceof StagedAsset)) {
          throw new TypeError("unapproved staged asset");
        }
        const launch: ConversionLaunch = Object.freeze({
          executable: converter,
          args: Object.freeze([
            "--format", parsed.format, "--", asset.argument(stagingKey)
          ] as const),
          shell: false,
          cwd: "/var/lib/course-worker",
          env,
          isolationProfile: "converter-unprivileged-v1",
          inputBytes: asset.byteLength
        });
        try {
          await runner.run(launch);
        } catch (error: unknown) {
          if (error instanceof ContainedProcessFailure) {
            throw new ConversionFailed();
          }
          throw error;
        }
      }
    );
  };
}`
    }
  ]
};
