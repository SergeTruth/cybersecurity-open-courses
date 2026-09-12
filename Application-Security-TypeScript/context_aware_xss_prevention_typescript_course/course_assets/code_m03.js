window.COURSE_CODE_MODULE = {
  "title": "Keep Context in the API Name",
  "codeIntro": "Concrete, context-specific functions are easier to review than a generic escape helper. They return immutable data or perform the final structured assignment instead of exposing ambiguous safe-string types.",
  "codeExamples": [
    {
      "title": "Separate text, URL-component, and CSS-token operations",
      "language": "typescript",
      "blurb": "Text is rendered as text, search data is serialized by URLSearchParams under a fixed HTTPS origin, and presentation uses a closed token vocabulary. Rich HTML is intentionally absent because it belongs to the dedicated sanitizer-and-sink boundary in module 5.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
const APPLICATION_ORIGIN = "https://app.example.com";
const THEME_COLORS = Object.freeze({
  neutral: "#374151",
  success: "#166534",
  warning: "#92400e"
} as const);

type ThemeToken = keyof typeof THEME_COLORS;

function renderOrdinaryText(
  node: HTMLSpanElement | HTMLParagraphElement,
  value: unknown
): void {
  if ((node.localName !== "span" && node.localName !== "p") ||
      node.namespaceURI !== "http://www.w3.org/1999/xhtml" ||
      typeof value !== "string" || value.length > 10_000) {
    throw new TypeError("invalid text output");
  }
  node.textContent = value;
}

function assignSearchHref(
  link: HTMLAnchorElement,
  term: unknown
): void {
  if (link.localName !== "a" ||
      link.namespaceURI !== "http://www.w3.org/1999/xhtml" ||
      typeof term !== "string" || term.length > 200 ||
      /[\\u0000-\\u001F\\u007F]/u.test(term)) {
    throw new TypeError("invalid search navigation");
  }
  const target = new URL("/search", APPLICATION_ORIGIN);
  target.searchParams.set("q", term);
  link.href = target.href;
}

function applyThemeColor(
  element: HTMLDivElement,
  token: unknown
): void {
  if (element.localName !== "div" ||
      element.namespaceURI !== "http://www.w3.org/1999/xhtml" ||
      typeof token !== "string" ||
      !Object.hasOwn(THEME_COLORS, token)) {
    throw new TypeError("invalid theme token");
  }
  const approvedToken = token as ThemeToken;
  element.style.color = THEME_COLORS[approvedToken];
  element.dataset.theme = approvedToken;
}

// Avoid ambiguous APIs such as escape(value) or sanitizeString(value).`
    }
  ]
};
