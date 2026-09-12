window.COURSE_CODE_MODULE = {
  "title": "Own the Argument Grammar",
  "codeIntro": "The request selects one supported format. Application code creates every option, and only an opaque storage-issued operand can cross the argument boundary.",
  "codeExamples": [
    {
      "title": "Allowlist format and mark the operand boundary",
      "language": "typescript",
      "blurb": "The selected converter explicitly documents -- as its end-of-options marker. Syntax checks are defense in depth: the storage adapter issues the capability only after authorization, atomic staging, link protection, and actual-byte limits.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
const FORMATS = Object.freeze({
  document: "pdf",
  image: "png"
} as const);

type FormatName = keyof typeof FORMATS;
type ConverterFormat = (typeof FORMATS)[FormatName];
type ConverterArguments = readonly [
  "--format", ConverterFormat, "--", string
];

const storageAuthority = Symbol("storage authority");

class ApprovedAssetOperand {
  readonly #path: string;

  constructor(key: typeof storageAuthority, canonicalPath: string) {
    const parts = canonicalPath.split("/");
    if (key !== storageAuthority ||
        parts.length !== 7 ||
        parts[0] !== "" ||
        parts[1] !== "var" ||
        parts[2] !== "lib" ||
        parts[3] !== "course-worker" ||
        parts[4] !== "jobs" ||
        !/^job_[a-f0-9]{32}$/.test(parts[5] ?? "") ||
        parts[6] !== "input") {
      throw new TypeError("invalid approved operand");
    }
    this.#path = canonicalPath;
    Object.freeze(this);
  }

  argument(key: typeof storageAuthority): string {
    if (key !== storageAuthority) {
      throw new TypeError("unapproved operand access");
    }
    return this.#path;
  }
}

// This function stays inside the trusted storage adapter module.
function issueStoredOperand(canonicalPath: string): ApprovedAssetOperand {
  return new ApprovedAssetOperand(storageAuthority, canonicalPath);
}

function buildArguments(
  requestedFormat: unknown,
  asset: ApprovedAssetOperand
): ConverterArguments {
  if (requestedFormat !== "document" && requestedFormat !== "image") {
    throw new TypeError("unsupported format");
  }
  if (!(asset instanceof ApprovedAssetOperand)) {
    throw new TypeError("unapproved asset operand");
  }

  const format = FORMATS[requestedFormat];
  return Object.freeze([
    "--format", format, "--", asset.argument(storageAuthority)
  ]);
}`
    }
  ]
};
