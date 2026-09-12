window.COURSE_CODE_MODULE = {
  "title": "Recognize an Unproven Boundary",
  "codeIntro": "Joining a trusted directory with request data creates a path, but it does not prove that the resulting target is authorized or contained. This isolated example is intentionally unsafe.",
  "codeExamples": [
    {
      "title": "Insecure: use request path data directly",
      "language": "typescript",
      "blurb": "This example is deliberately insecure. Restricting the value to a string does not establish containment or authorization, and path joining does not address filesystem links or races.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
type UnsafeRequest = Readonly<{
  query: Readonly<{ file?: unknown }>;
}>;

interface UnsafePathApi {
  join(root: string, child: string): string;
}

interface UnsafeFileApi {
  readFile(pathname: string): Promise<Uint8Array>;
}

async function insecureReadDownload(
  request: UnsafeRequest,
  paths: UnsafePathApi,
  files: UnsafeFileApi
): Promise<Uint8Array> {
  const rawFile = request.query.file;
  const file = typeof rawFile === "string" ? rawFile : "";

  // INSECURE: joining request text is not a security boundary.
  const pathname = paths.join("/srv/app/downloads", file);
  return files.readFile(pathname);
}`
    }
  ]
};
