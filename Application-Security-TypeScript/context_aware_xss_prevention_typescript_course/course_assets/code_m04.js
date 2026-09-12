window.COURSE_CODE_MODULE = {
  "title": "Apply URL Policy Before Assignment",
  "codeIntro": "The application-owned HTTPS base controls relative resolution. The policy rejects controls before parsing, credentials, fragments, nondefault ports, and every other origin, then assigns through an authenticated immutable capability.",
  "codeExamples": [
    {
      "title": "Structured same-origin navigation boundary",
      "language": "typescript",
      "blurb": "The caller cannot mutate a returned URL or replace the approved href. A fixed event listener receives ordinary data; no inline JavaScript attribute or string-to-code operation is created.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
const NAVIGATION_ORIGIN = "https://app.example.com";
const NAVIGATION_BASE = "https://app.example.com/account/";
const navigationKey = Symbol("approved navigation");
const approvedNavigations = new WeakSet<object>();

class ApprovedNavigation {
  readonly #href: string;

  constructor(key: typeof navigationKey, href: string) {
    if (key !== navigationKey) throw new TypeError("unapproved navigation");
    this.#href = href;
    approvedNavigations.add(this);
    Object.freeze(this);
  }

  href(key: typeof navigationKey): string {
    if (key !== navigationKey || !approvedNavigations.has(this)) {
      throw new TypeError("invalid navigation capability");
    }
    return this.#href;
  }
}

class NavigationDenied extends Error {
  constructor() {
    super("navigation denied");
    this.name = "NavigationDenied";
  }
}

function approveNavigationUrl(input: unknown): ApprovedNavigation {
  if (typeof input !== "string" || input.length < 1 || input.length > 2048 ||
      /[\\u0000-\\u001F\\u007F]/u.test(input)) {
    throw new NavigationDenied();
  }

  let target: URL;
  try {
    target = new URL(input, NAVIGATION_BASE);
  } catch {
    throw new NavigationDenied();
  }
  if (target.protocol !== "https:" ||
      target.origin !== NAVIGATION_ORIGIN ||
      target.username !== "" || target.password !== "" ||
      target.hash !== "" ||
      (target.port !== "" && target.port !== "443")) {
    throw new NavigationDenied();
  }

  return new ApprovedNavigation(navigationKey, target.href);
}

function assignApprovedHref(
  link: HTMLAnchorElement,
  approved: ApprovedNavigation
): void {
  if (link.localName !== "a" ||
      link.namespaceURI !== "http://www.w3.org/1999/xhtml" ||
      !(approved instanceof ApprovedNavigation) ||
      !approvedNavigations.has(approved)) {
    throw new TypeError("invalid navigation element");
  }
  link.href = approved.href(navigationKey);
}

function buildNavigationBoundary(): Readonly<{
  assignApprovedHref(link: HTMLAnchorElement, candidate: unknown): void;
}> {
  return Object.freeze({
    assignApprovedHref(link: HTMLAnchorElement, candidate: unknown): void {
      assignApprovedHref(link, approveNavigationUrl(candidate));
    }
  });
}

function installProfileNavigation(
  button: HTMLButtonElement,
  navigate: () => void
): void {
  if (button.localName !== "button" || typeof navigate !== "function") {
    throw new TypeError("invalid navigation handler");
  }
  button.addEventListener("click", navigate);
}`
    }
  ]
};
