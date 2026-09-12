window.COURSE_CODE_MODULE = {
  "title": "Parse and Apply Component Policy",
  "codeIntro": "This helper performs only the URL-component stage. It returns an immutable opaque value rather than a mutable URL object; DNS, IP, redirect, and connection enforcement still follow.",
  "codeExamples": [
    {
      "title": "Explicit protocol, credential, hostname, and port rules",
      "language": "typescript",
      "blurb": "The fixed policy deliberately permits only two exact normalized hostnames over HTTPS port 443. Raw controls are rejected before WHATWG parsing so parser cleanup cannot change the checked representation. Fragments, credentials, and all other authorities fail closed.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
const approvedUrlKey = Symbol("approved URL components");
const approvedUrls = new WeakSet<object>();

type ApprovedHostname = "api.example.com" | "media.example.com";

class ApprovedUrlComponents {
  readonly #canonicalUrl: string;
  readonly hostname: ApprovedHostname;
  readonly port: 443;

  constructor(
    key: typeof approvedUrlKey,
    canonicalUrl: string,
    hostname: ApprovedHostname
  ) {
    if (key !== approvedUrlKey) throw new TypeError("unapproved URL");
    this.#canonicalUrl = canonicalUrl;
    this.hostname = hostname;
    this.port = 443;
    approvedUrls.add(this);
    Object.freeze(this);
  }

  canonicalUrl(key: typeof approvedUrlKey): string {
    if (key !== approvedUrlKey || !approvedUrls.has(this)) {
      throw new TypeError("invalid URL capability");
    }
    return this.#canonicalUrl;
  }
}

class DestinationDenied extends Error {
  constructor() {
    super("destination denied");
    this.name = "DestinationDenied";
  }
}

function parseApprovedUrl(input: unknown): ApprovedUrlComponents {
  if (typeof input !== "string" ||
      input.length < 1 || input.length > 2048 ||
      /[\\u0000-\\u001F\\u007F]/u.test(input)) {
    throw new DestinationDenied();
  }

  let target: URL;
  try {
    target = new URL(input);
  } catch {
    throw new DestinationDenied();
  }

  if (target.protocol !== "https:" ||
      target.username !== "" || target.password !== "" ||
      target.hash !== "" ||
      (target.hostname !== "api.example.com" &&
        target.hostname !== "media.example.com") ||
      (target.port !== "" && target.port !== "443")) {
    throw new DestinationDenied();
  }

  return new ApprovedUrlComponents(
    approvedUrlKey,
    target.href,
    target.hostname
  );
}`
    }
  ]
};
