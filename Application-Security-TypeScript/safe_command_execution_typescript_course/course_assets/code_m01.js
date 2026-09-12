window.COURSE_CODE_MODULE = {
  "title": "Recognize Unsafe Command Construction",
  "codeIntro": "The request value is inserted into command text before a shell receives it. This isolated anti-pattern is intentionally unsafe and must never be deployed.",
  "codeExamples": [
    {
      "title": "Insecure: construct a shell command from request data",
      "language": "typescript",
      "blurb": "This example is deliberately insecure. Even restricting the value to a string does not make shell interpolation safe. Do not repair it with ad hoc quoting; redesign the launch around a fixed executable and a structured argument array.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
type UnsafeRequest = Readonly<{
  body: Readonly<{ file?: unknown }>;
}>;

type UnsafeCallback = (
  error: Error | null,
  stdout: string,
  stderr: string
) => void;

declare function insecureShellExec(
  command: string,
  callback: UnsafeCallback
): void;

function insecureConvert(
  request: UnsafeRequest,
  callback: UnsafeCallback
): void {
  const rawFile = request.body.file;
  const file = typeof rawFile === "string" ? rawFile : "";

  // INSECURE: external data becomes shell command text.
  const command = 'approved-converter --input "' + file + '"';
  insecureShellExec(command, callback);
}`
    }
  ]
};
