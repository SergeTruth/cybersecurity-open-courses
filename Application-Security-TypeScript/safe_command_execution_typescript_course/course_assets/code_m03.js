window.COURSE_CODE_MODULE = {
  "title": "Map Operations to Executables",
  "codeIntro": "Clients choose an application operation. A trusted bootstrap verifies each protected executable against authenticated deployment policy and captures opaque handles in a closed registry.",
  "codeExamples": [
    {
      "title": "Closed executable map",
      "language": "typescript",
      "blurb": "The verifier must canonicalize without following attacker-controlled links, require a protected regular executable, and compare its digest and file identity with authenticated policy. The registry returns handles rather than caller-editable path strings.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
type ToolOperation = "convert" | "inspect";

type VerifiedExecutableRecord = Readonly<{
  canonicalPath: string;
  sha256: string;
  fileIdentity: string;
}>;

type DeploymentTool = Readonly<{
  canonicalPath: string;
  sha256: string;
}>;

type AuthenticatedToolPolicy = Readonly<{
  generation: string;
  convert: DeploymentTool;
  inspect: DeploymentTool;
}>;

interface DeploymentPolicyAuthority {
  // Authenticates a signed/versioned application deployment policy.
  currentToolPolicy(): unknown;
}

interface ExecutableVerifier {
  verify(candidate: DeploymentTool): unknown;
}

const executableKey = Symbol("verified executable");

class ApprovedExecutable {
  readonly #record: VerifiedExecutableRecord;

  constructor(
    key: typeof executableKey,
    record: VerifiedExecutableRecord
  ) {
    if (key !== executableKey) {
      throw new TypeError("unapproved executable");
    }
    this.#record = Object.freeze({ ...record });
    Object.freeze(this);
  }

  // The direct-process adapter consumes this opaque handle in the same module.
  record(key: typeof executableKey): VerifiedExecutableRecord {
    if (key !== executableKey) {
      throw new TypeError("unapproved executable access");
    }
    return this.#record;
  }
}

class ToolRegistry {
  readonly #tools: Readonly<Record<ToolOperation, ApprovedExecutable>>;

  constructor(
    untrustedPolicy: unknown,
    verifier: ExecutableVerifier
  ) {
    const policy = requireToolPolicy(untrustedPolicy);
    this.#tools = Object.freeze({
      convert: new ApprovedExecutable(
        executableKey,
        requireVerifiedRecord(
          verifier.verify(policy.convert),
          policy.convert
        )
      ),
      inspect: new ApprovedExecutable(
        executableKey,
        requireVerifiedRecord(
          verifier.verify(policy.inspect),
          policy.inspect
        )
      )
    });
    Object.freeze(this);
  }

  require(operation: unknown): ApprovedExecutable {
    if (operation !== "convert" && operation !== "inspect") {
      throw new TypeError("unsupported operation");
    }
    return this.#tools[operation];
  }
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function requireDeploymentTool(
  value: unknown,
  exactPath: string
): DeploymentTool {
  if (!isPlainRecord(value) ||
      value.canonicalPath !== exactPath ||
      typeof value.sha256 !== "string" ||
      !/^[a-f0-9]{64}$/.test(value.sha256)) {
    throw new TypeError("invalid executable policy");
  }
  return Object.freeze({
    canonicalPath: exactPath,
    sha256: value.sha256
  });
}

function requireToolPolicy(value: unknown): AuthenticatedToolPolicy {
  if (!isPlainRecord(value) ||
      typeof value.generation !== "string" ||
      !/^[A-Za-z0-9._-]{1,64}$/.test(value.generation)) {
    throw new TypeError("invalid deployment policy");
  }
  return Object.freeze({
    generation: value.generation,
    convert: requireDeploymentTool(
      value.convert,
      "/opt/course-tools/converter"
    ),
    inspect: requireDeploymentTool(
      value.inspect,
      "/opt/course-tools/inspector"
    )
  });
}

function requireVerifiedRecord(
  value: unknown,
  candidate: DeploymentTool
): VerifiedExecutableRecord {
  if (!isPlainRecord(value) ||
      value.canonicalPath !== candidate.canonicalPath ||
      value.sha256 !== candidate.sha256 ||
      typeof value.fileIdentity !== "string" ||
      !/^[A-Za-z0-9:._-]{1,256}$/.test(value.fileIdentity)) {
    throw new TypeError("executable verification failed");
  }
  return Object.freeze({
    canonicalPath: value.canonicalPath,
    sha256: value.sha256,
    fileIdentity: value.fileIdentity
  });
}

// Call only at the trusted composition root. Neither argument is request data.
function buildToolRegistry(
  policyAuthority: DeploymentPolicyAuthority,
  verifier: ExecutableVerifier
): ToolRegistry {
  return new ToolRegistry(policyAuthority.currentToolPolicy(), verifier);
}`
    }
  ]
};
