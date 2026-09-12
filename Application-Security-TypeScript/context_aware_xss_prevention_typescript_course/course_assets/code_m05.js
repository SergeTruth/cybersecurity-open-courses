window.COURSE_CODE_MODULE = {
  "title": "Make Rich HTML an Explicit Boundary",
  "codeIntro": "A maintained parser-based sanitizer and the final DOM operation are captured in one boundary. No branded string or mutable sanitized value is returned to application code.",
  "codeExamples": [
    {
      "title": "Sanitize to a fragment and render immediately",
      "language": "typescript",
      "blurb": "This is an architectural adapter around a pinned, actively maintained sanitizer—not a sanitizer implementation. Its fixed policy excludes scriptable namespaces, style, embeds, event attributes, and arbitrary URL protocols. A bounded structural assertion detects policy drift before the fragment reaches the application-owned div.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
type RichTextPolicy = Readonly<{
  allowedElements: readonly string[];
  anchorAttributes: readonly string[];
  allowedUrlProtocols: readonly string[];
  allowCss: false;
  allowSvg: false;
  allowMathMl: false;
  allowCustomElements: false;
}>;

const RICH_TEXT_POLICY: RichTextPolicy = Object.freeze({
  allowedElements: Object.freeze([
    "p", "br", "strong", "em", "ul", "ol", "li", "a"
  ]),
  anchorAttributes: Object.freeze(["href", "title"]),
  allowedUrlProtocols: Object.freeze(["https:"]),
  allowCss: false,
  allowSvg: false,
  allowMathMl: false,
  allowCustomElements: false
});

const ALLOWED_RICH_ELEMENTS = new Set(RICH_TEXT_POLICY.allowedElements);
const ALLOWED_ANCHOR_ATTRIBUTES =
  new Set(RICH_TEXT_POLICY.anchorAttributes);
const RICH_LINK_BASE = "https://app.example.com/";
const MAX_RICH_INPUT_CODE_UNITS = 100_000;
const MAX_SANITIZED_NODES = 5_000;
const MAX_SANITIZED_DEPTH = 32;

interface MaintainedRichTextSanitizer {
  // The production adapter pins a reviewed sanitizer version and constructs
  // nodes in the supplied document under exactly the supplied fixed policy.
  sanitizeToFragment(
    markup: string,
    policy: RichTextPolicy,
    document: Document
  ): unknown;
}

class RichTextRejected extends Error {
  constructor() {
    super("rich text rejected");
    this.name = "RichTextRejected";
  }
}

function validateSanitizedFragment(
  document: Document,
  value: unknown
): DocumentFragment {
  const Fragment = document.defaultView?.DocumentFragment;
  if (Fragment === undefined || !(value instanceof Fragment) ||
      value.ownerDocument !== document) {
    throw new RichTextRejected();
  }
  // Clone before validation and insertion. DOM event listeners are not copied,
  // and the sanitizer cannot retain a reference to the inserted nodes.
  const detached = value.cloneNode(true);
  if (!(detached instanceof Fragment)) throw new RichTextRejected();

  let nodeCount = 0;
  let textCodeUnits = 0;
  const inspect = (node: Node, depth: number): void => {
    nodeCount += 1;
    if (nodeCount > MAX_SANITIZED_NODES || depth > MAX_SANITIZED_DEPTH) {
      throw new RichTextRejected();
    }
    if (node.nodeType === 3) {
      textCodeUnits += node.nodeValue?.length ?? 0;
      if (textCodeUnits > MAX_RICH_INPUT_CODE_UNITS) {
        throw new RichTextRejected();
      }
      return;
    }
    if (node.nodeType !== 1) throw new RichTextRejected();

    const element = node as Element;
    if (element.namespaceURI !== "http://www.w3.org/1999/xhtml" ||
        !ALLOWED_RICH_ELEMENTS.has(element.localName) ||
        element.localName.includes("-")) {
      throw new RichTextRejected();
    }

    for (const attribute of Array.from(element.attributes)) {
      if (attribute.namespaceURI !== null ||
          element.localName !== "a" ||
          !ALLOWED_ANCHOR_ATTRIBUTES.has(attribute.localName)) {
        throw new RichTextRejected();
      }
      if (attribute.localName === "title") {
        if (attribute.value.length > 512 ||
            /[\\u0000-\\u001F\\u007F]/u.test(attribute.value)) {
          throw new RichTextRejected();
        }
        continue;
      }

      const rawHref = attribute.value;
      if (rawHref.length < 1 || rawHref.length > 2048 ||
          /[\\u0000-\\u001F\\u007F]/u.test(rawHref)) {
        throw new RichTextRejected();
      }
      let link: URL;
      try {
        link = new URL(rawHref, RICH_LINK_BASE);
      } catch {
        throw new RichTextRejected();
      }
      if (link.protocol !== "https:" ||
          link.username !== "" || link.password !== "" ||
          (link.port !== "" && link.port !== "443")) {
        throw new RichTextRejected();
      }
      element.setAttribute("href", link.href);
      element.setAttribute("rel", "noopener noreferrer");
      element.setAttribute("referrerpolicy", "no-referrer");
    }

    for (const child of Array.from(element.childNodes)) {
      inspect(child, depth + 1);
    }
  };

  for (const child of Array.from(detached.childNodes)) inspect(child, 1);
  return detached;
}

function buildRichTextRenderer(
  sanitizer: MaintainedRichTextSanitizer
): (target: HTMLDivElement, markup: unknown) => void {
  // Only the trusted composition root supplies the pinned sanitizer adapter;
  // request and content data can never select or replace this collaborator.
  if (typeof sanitizer !== "object" || sanitizer === null ||
      typeof sanitizer.sanitizeToFragment !== "function") {
    throw new TypeError("invalid rich-text sanitizer");
  }
  const sanitizeToFragment =
    sanitizer.sanitizeToFragment.bind(sanitizer);

  return (target, markup) => {
    if (target.localName !== "div" ||
        target.namespaceURI !== "http://www.w3.org/1999/xhtml" ||
        typeof markup !== "string" ||
        markup.length > MAX_RICH_INPUT_CODE_UNITS) {
      throw new RichTextRejected();
    }
    let rawFragment: unknown;
    try {
      rawFragment = sanitizeToFragment(
        markup,
        RICH_TEXT_POLICY,
        target.ownerDocument
      );
    } catch {
      throw new RichTextRejected();
    }
    const fragment = validateSanitizedFragment(
      target.ownerDocument,
      rawFragment
    );
    target.replaceChildren(fragment);
  };
}`
    }
  ]
};
