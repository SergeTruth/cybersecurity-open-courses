window.COURSE_CODE_MODULE = {
  "title": "Recognize Excessive Destination Control",
  "codeIntro": "The unsafe operation delegates a trusted server-side connection directly to untrusted request data. This isolated anti-pattern is intentionally unsafe.",
  "codeExamples": [
    {
      "title": "Deliberately unsafe outbound request",
      "language": "typescript",
      "blurb": "This example is intentionally unsafe. Restricting the value to a string still gives the caller control of the server's network destination, redirects, and response work.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
type UnsafeRequest = Readonly<{
  body: Readonly<{ url?: unknown }>;
}>;

interface UnsafeFetcher {
  fetchText(url: string): Promise<string>;
}

async function insecurePreview(
  request: UnsafeRequest,
  fetcher: UnsafeFetcher
): Promise<string> {
  const rawUrl = request.body.url;
  const target = typeof rawUrl === "string" ? rawUrl : "";

  // INSECURE: the client controls a trusted outbound destination.
  return fetcher.fetchText(target);
}`
    }
  ]
};
