window.COURSE_CODE_MODULE = {
  "title": "Express Text as Text",
  "codeIntro": "The first function is an isolated anti-pattern because it invokes the HTML parser. The production function validates its input and writes only to an application-owned ordinary text container.",
  "codeExamples": [
    {
      "title": "Unsafe HTML parsing and safe text rendering",
      "language": "typescript",
      "blurb": "textContent expresses the required text semantics directly. The target is a normal div selected by application code—not a script, style, URL, or other interpreting element—and the raw value receives a resource bound before rendering.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
function deliberatelyUnsafeHtmlDemo(
  container: HTMLDivElement,
  userMessage: string
): void {
  // INSECURE ANTI-PATTERN: never use this function in production.
  container.innerHTML = userMessage;
}

function renderMessageAsText(
  container: HTMLDivElement,
  userMessage: unknown
): void {
  if (container.localName !== "div" ||
      container.namespaceURI !== "http://www.w3.org/1999/xhtml") {
    throw new TypeError("invalid text container");
  }
  if (typeof userMessage !== "string" || userMessage.length > 10_000) {
    throw new TypeError("invalid user message");
  }

  // No HTML parser is invoked; markup characters remain visible text.
  container.textContent = userMessage;
}`
    }
  ]
};
