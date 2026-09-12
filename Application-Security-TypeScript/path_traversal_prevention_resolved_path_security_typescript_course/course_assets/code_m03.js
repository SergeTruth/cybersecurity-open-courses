window.COURSE_CODE_MODULE = {
  "title": "Verify Lexical Containment",
  "codeIntro": "A trusted bootstrap captures the deployment platform's path semantics and one absolute operation root. The resolver validates the decoded request once and compares path components rather than character prefixes.",
  "codeExamples": [
    {
      "title": "Reusable lexical containment helper",
      "language": "typescript",
      "blurb": "Use node:path's posix or win32 implementation selected by trusted deployment code. This helper proves only lexical containment. It deliberately returns no permission to open the name; authorization and the filesystem-safe operation boundary remain separate.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
interface PathSemantics {
  readonly kind: "posix" | "win32";
  readonly sep: "/" | "\\\\";
  isAbsolute(value: string): boolean;
  resolve(...values: readonly string[]): string;
  relative(from: string, to: string): string;
}

class LexicalRoot {
  readonly #paths: PathSemantics;
  readonly #root: string;

  constructor(paths: PathSemantics, trustedRoot: string) {
    if (typeof paths !== "object" || paths === null ||
        (paths.kind !== "posix" && paths.kind !== "win32") ||
        paths.sep !== (paths.kind === "posix" ? "/" : "\\\\") ||
        typeof paths.isAbsolute !== "function" ||
        typeof paths.resolve !== "function" ||
        typeof paths.relative !== "function" ||
        typeof trustedRoot !== "string" ||
        trustedRoot.length < 1 || trustedRoot.length > 1024 ||
        /[\\u0000-\\u001F\\u007F]/u.test(trustedRoot) ||
        !paths.isAbsolute(trustedRoot)) {
      throw new TypeError("invalid trusted root");
    }
    const isAbsolute = paths.isAbsolute.bind(paths);
    const resolve = paths.resolve.bind(paths);
    const relative = paths.relative.bind(paths);
    this.#paths = Object.freeze({
      kind: paths.kind,
      sep: paths.sep,
      isAbsolute,
      resolve,
      relative
    });
    this.#root = resolve(trustedRoot);
    if (!isAbsolute(this.#root) ||
        resolve(this.#root, "..") === this.#root) {
      throw new TypeError("invalid resolved root");
    }
    Object.freeze(this);
  }

  resolveChild(requestedRelativePath: unknown, allowRoot: boolean): string {
    if (typeof allowRoot !== "boolean" ||
        typeof requestedRelativePath !== "string" ||
        requestedRelativePath.length < 1 ||
        requestedRelativePath.length > 1024 ||
        /[\\u0000-\\u001F\\u007F]/u.test(requestedRelativePath) ||
        this.#paths.isAbsolute(requestedRelativePath)) {
      throw new TypeError("invalid relative path");
    }

    const target = this.#paths.resolve(this.#root, requestedRelativePath);
    const relative = this.#paths.relative(this.#root, target);
    const outside = relative === ".." ||
      relative.startsWith(".." + this.#paths.sep) ||
      this.#paths.isAbsolute(relative);

    if (outside || (!allowRoot && relative === "")) {
      throw new Error("path is outside the permitted target set");
    }
    return target;
  }
}

// Call only at trusted bootstrap with node:path.posix or node:path.win32.
function buildLexicalRoot(
  paths: PathSemantics,
  trustedRoot: string
): LexicalRoot {
  return new LexicalRoot(paths, trustedRoot);
}`
    }
  ]
};
