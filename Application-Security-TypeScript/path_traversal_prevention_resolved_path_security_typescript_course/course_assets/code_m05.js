window.COURSE_CODE_MODULE = {
  "title": "Compare Existing Real Paths",
  "codeIntro": "For an existing object, canonicalize both root and target and compare them with the deployment platform's path semantics. Treat the result as a snapshot for a trusted filesystem adapter, not as a reusable authorization token.",
  "codeExamples": [
    {
      "title": "Inspect canonical containment without claiming atomicity",
      "language": "typescript",
      "blurb": "realpath follows links and requires the target to exist. The returned immutable record describes that moment only. The operation that opens or mutates the object must use a protected non-hostile tree or an OS-specific directory-handle/sandbox boundary that binds validation to use.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
interface PathSemantics {
  readonly sep: "/" | "\\\\";
  isAbsolute(value: string): boolean;
  resolve(...values: readonly string[]): string;
  relative(from: string, to: string): string;
}

interface RealpathReader {
  realpath(pathname: string): Promise<unknown>;
}

type RealPathInspection = Readonly<{
  containedAtInspection: true;
}>;

function requirePath(
  value: unknown,
  isAbsolute: (value: string) => boolean
): string {
  if (typeof value !== "string" ||
      value.length < 1 || value.length > 4096 ||
      /[\\u0000-\\u001F\\u007F]/u.test(value) ||
      !isAbsolute(value)) {
    throw new Error("canonical path inspection failed");
  }
  return value;
}

function buildExistingTargetInspector(
  paths: PathSemantics,
  files: RealpathReader,
  trustedRoot: string
): (requestedRelativePath: unknown) => Promise<RealPathInspection> {
  if (typeof paths !== "object" || paths === null ||
      (paths.sep !== "/" && paths.sep !== "\\\\") ||
      typeof paths.isAbsolute !== "function" ||
      typeof paths.resolve !== "function" ||
      typeof paths.relative !== "function" ||
      typeof files !== "object" || files === null ||
      typeof files.realpath !== "function" ||
      typeof trustedRoot !== "string" ||
      trustedRoot.length < 1 || trustedRoot.length > 1024 ||
      !paths.isAbsolute(trustedRoot) ||
      /[\\u0000-\\u001F\\u007F]/u.test(trustedRoot)) {
    throw new TypeError("invalid trusted root");
  }
  const isAbsolute = paths.isAbsolute.bind(paths);
  const resolve = paths.resolve.bind(paths);
  const relativePath = paths.relative.bind(paths);
  const realpath = files.realpath.bind(files);
  const lexicalRoot = resolve(trustedRoot);
  if (!isAbsolute(lexicalRoot) || resolve(lexicalRoot, "..") === lexicalRoot) {
    throw new TypeError("filesystem root is not an application storage root");
  }

  return async (
    requestedRelativePath: unknown
  ): Promise<RealPathInspection> => {
    if (typeof requestedRelativePath !== "string" ||
        requestedRelativePath.length < 1 ||
        requestedRelativePath.length > 1024 ||
        /[\\u0000-\\u001F\\u007F]/u.test(requestedRelativePath) ||
        isAbsolute(requestedRelativePath)) {
      throw new TypeError("invalid relative path");
    }

    const lexicalTarget = resolve(
      lexicalRoot,
      requestedRelativePath
    );
    const lexicalRelative = relativePath(lexicalRoot, lexicalTarget);
    if (lexicalRelative === "" || lexicalRelative === ".." ||
        lexicalRelative.startsWith(".." + paths.sep) ||
        isAbsolute(lexicalRelative)) {
      throw new Error("target is outside the lexical root");
    }

    const realRoot = requirePath(await realpath(lexicalRoot), isAbsolute);
    const realTarget = requirePath(await realpath(lexicalTarget), isAbsolute);
    if (resolve(realRoot, "..") === realRoot) {
      throw new Error("canonical storage root is too broad");
    }
    const relative = relativePath(realRoot, realTarget);
    if (relative === "" || relative === ".." ||
        relative.startsWith(".." + paths.sep) ||
        isAbsolute(relative)) {
      throw new Error("real target is not an allowed child");
    }

    return Object.freeze({
      containedAtInspection: true as const
    });
  };
}`
    }
  ]
};
