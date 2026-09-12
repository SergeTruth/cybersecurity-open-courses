window.COURSE_CODE_MODULE = {
  "title": "A Type Assertion Is Not a Runtime Control",
  "codeIntro": "The first function is an isolated anti-pattern: a cast performs no runtime work. The safe text path uses a text API; intentional rich HTML must go through the sanitizer-and-sink boundary from module 5.",
  "codeExamples": [
    {
      "title": "Contrast an unsafe assertion with a real text boundary",
      "language": "typescript",
      "blurb": "The asserted brand can be forged wherever a type assertion is available, so it must never authorize an HTML sink. Runtime structure—not a type name—keeps ordinary API data inert.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
declare const claimedSafeHtmlBrand: unique symbol;
type ClaimedSafeHtml = string & {
  readonly [claimedSafeHtmlBrand]: true;
};

function deliberatelyUnsafeAssertionDemo(
  contentElement: HTMLDivElement,
  apiValue: unknown
): void {
  // INSECURE ANTI-PATTERN: the cast validates and transforms nothing.
  const html = apiValue as ClaimedSafeHtml;
  contentElement.innerHTML = html;
}

function renderApiValueAsText(
  contentElement: HTMLDivElement,
  apiValue: unknown
): void {
  if (contentElement.localName !== "div" ||
      contentElement.namespaceURI !== "http://www.w3.org/1999/xhtml" ||
      typeof apiValue !== "string" || apiValue.length > 10_000) {
    throw new TypeError("invalid API text value");
  }
  contentElement.textContent = apiValue;
}`
    }
  ]
};
