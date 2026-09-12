window.COURSE_CODE_MODULE = {
  "title": "Validate a Narrow Logical Filename",
  "codeIntro": "A simple export operation can avoid general path syntax entirely. It validates the framework-decoded value once and passes an immutable logical name to the captured lexical root.",
  "codeExamples": [
    {
      "title": "Parse one documented filename grammar",
      "language": "typescript",
      "blurb": "The ASCII grammar excludes separators, drive syntax, NTFS alternate-stream syntax, controls, normalization ambiguity, and unknown extensions. It remains an operation-specific name rule, not a general traversal filter or permission to open a file.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
const EXPORT_NAME =
  /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}\\.csv$/u;

const exportNameKey = Symbol("approved export name");

class ApprovedExportName {
  readonly #value: string;

  constructor(key: typeof exportNameKey, value: string) {
    if (key !== exportNameKey || !EXPORT_NAME.test(value)) {
      throw new TypeError("invalid export name");
    }
    this.#value = value;
    Object.freeze(this);
  }

  value(key: typeof exportNameKey): string {
    if (key !== exportNameKey) throw new TypeError("invalid name access");
    return this.#value;
  }
}

function parseExportName(input: unknown): ApprovedExportName {
  if (typeof input !== "string" ||
      !EXPORT_NAME.test(input)) {
    throw new TypeError("invalid export name");
  }
  const stem = input.slice(0, -4).toUpperCase();
  const reserved = stem === "CON" || stem === "PRN" ||
    stem === "AUX" || stem === "NUL" ||
    /^COM[1-9]$/.test(stem) || /^LPT[1-9]$/.test(stem);
  if (reserved) throw new TypeError("reserved export name");
  return new ApprovedExportName(exportNameKey, input);
}

interface ExportLexicalRoot {
  // This is the trusted LexicalRoot from module 3, captured at bootstrap.
  resolveChild(relativeName: string, allowRoot: false): string;
}

function buildExportCandidateResolver(
  root: ExportLexicalRoot
): (frameworkDecodedName: unknown) => string {
  if (typeof root !== "object" || root === null ||
      typeof root.resolveChild !== "function") {
    throw new TypeError("invalid export root");
  }
  const resolveChild = root.resolveChild.bind(root);
  return (frameworkDecodedName: unknown): string => {
    const name = parseExportName(frameworkDecodedName);
    return resolveChild(name.value(exportNameKey), false);
  };
}`
    }
  ]
};
