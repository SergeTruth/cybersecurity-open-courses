window.COURSE_CODE_MODULE = {
  "title": "Validate Every Resolution Result",
  "codeIntro": "The resolver and classifier are application-owned dependencies. The classifier must use a maintained IP parser and current IANA plus deployment-specific exclusions; request code cannot replace either dependency.",
  "codeExamples": [
    {
      "title": "Issue an immutable all-address decision",
      "language": "typescript",
      "blurb": "The trusted builder validates every resolver and classifier result, rejects mixed or malformed sets, and issues an opaque decision. The next module shows the required transport contract: only an address carried by this decision may be used for the socket.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
type AddressFamily = 4 | 6;

declare const approvedUrlComponentsBrand: unique symbol;
type ApprovedUrlComponents = Readonly<{
  [approvedUrlComponentsBrand]: true;
}>;

interface ApprovedUrlReader {
  // Authenticates the opaque result from the component-policy stage and
  // returns its inseparable canonical URL, hostname, and port binding.
  read(value: ApprovedUrlComponents): unknown;
}

interface DestinationResolver {
  // This must use the same resolution environment as the transport. IP
  // literals are returned as one answer without consulting DNS. Resolution,
  // CNAME following, answer collection (at most 16), and cancellation all
  // obey the absolute deadline before this promise resolves.
  resolveAllOrLiteral(hostname: string, deadlineMs: number): Promise<unknown>;
}

interface AddressClassifier {
  // A maintained parser handles IPv4, IPv6, mapped forms, IANA special-use
  // ranges, and application-owned network exclusions.
  classify(address: string, family: AddressFamily): unknown;
}

type Classification = Readonly<{
  canonicalAddress: string;
  family: AddressFamily;
  permitted: true;
  scope: "public";
}>;

const destinationKey = Symbol("approved destination");
const issuedDestinations = new WeakSet<object>();

class ApprovedDestination {
  readonly #canonicalUrl: string;
  readonly #addresses: readonly Classification[];
  readonly #deadlineMs: number;
  readonly hostname: string;
  readonly port: 443;

  constructor(
    key: typeof destinationKey,
    canonicalUrl: string,
    hostname: string,
    addresses: readonly Classification[],
    deadlineMs: number
  ) {
    if (key !== destinationKey) throw new TypeError("unapproved destination");
    this.#canonicalUrl = canonicalUrl;
    this.#addresses = addresses;
    this.#deadlineMs = deadlineMs;
    this.hostname = hostname;
    this.port = 443;
    issuedDestinations.add(this);
    Object.freeze(this);
  }

  consume(key: typeof destinationKey): Readonly<{
    canonicalUrl: string;
    hostname: string;
    port: 443;
    addresses: readonly Classification[];
    deadlineMs: number;
  }> {
    if (key !== destinationKey || !issuedDestinations.has(this)) {
      throw new TypeError("invalid destination capability");
    }
    return Object.freeze({
      canonicalUrl: this.#canonicalUrl,
      hostname: this.hostname,
      port: this.port,
      addresses: this.#addresses,
      deadlineMs: this.#deadlineMs
    });
  }
}

class DestinationDenied extends Error {
  constructor() {
    super("destination denied");
    this.name = "DestinationDenied";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function buildDestinationAuthorizer(
  approvedUrlReader: ApprovedUrlReader,
  resolver: DestinationResolver,
  classifier: AddressClassifier
): (
  approvedUrl: ApprovedUrlComponents,
  deadlineMs: number
) => Promise<ApprovedDestination> {
  // Only the trusted composition root calls this builder. Binding prevents
  // later replacement of collaborator methods by request code.
  const readApprovedUrl = approvedUrlReader.read.bind(approvedUrlReader);
  const resolve = resolver.resolveAllOrLiteral.bind(resolver);
  const classify = classifier.classify.bind(classifier);

  return async (approvedUrl, deadlineMs) => {
    if (!Number.isFinite(deadlineMs) || deadlineMs <= 0) {
      throw new DestinationDenied();
    }

    let rawComponents: unknown;
    try {
      rawComponents = readApprovedUrl(approvedUrl);
    } catch {
      throw new DestinationDenied();
    }
    if (!isRecord(rawComponents) ||
        typeof rawComponents.canonicalUrl !== "string" ||
        rawComponents.canonicalUrl.length < 1 ||
        rawComponents.canonicalUrl.length > 2048 ||
        (rawComponents.hostname !== "api.example.com" &&
          rawComponents.hostname !== "media.example.com") ||
        rawComponents.port !== 443) {
      throw new DestinationDenied();
    }
    const canonicalUrl = rawComponents.canonicalUrl;
    const hostname = rawComponents.hostname;

    let rawAnswers: unknown;
    try {
      rawAnswers = await resolve(hostname, deadlineMs);
    } catch {
      throw new DestinationDenied();
    }
    if (!Array.isArray(rawAnswers) ||
        rawAnswers.length < 1 || rawAnswers.length > 16) {
      throw new DestinationDenied();
    }

    const unique = new Set<string>();
    const approved: Classification[] = [];
    for (const rawAnswer of rawAnswers as readonly unknown[]) {
      if (!isRecord(rawAnswer) ||
          typeof rawAnswer.address !== "string" ||
          rawAnswer.address.length < 2 || rawAnswer.address.length > 64 ||
          (rawAnswer.family !== 4 && rawAnswer.family !== 6)) {
        throw new DestinationDenied();
      }

      let rawClassification: unknown;
      try {
        rawClassification = classify(
          rawAnswer.address,
          rawAnswer.family as AddressFamily
        );
      } catch {
        throw new DestinationDenied();
      }
      if (!isRecord(rawClassification) ||
          rawClassification.permitted !== true ||
          rawClassification.scope !== "public" ||
          rawClassification.family !== rawAnswer.family ||
          typeof rawClassification.canonicalAddress !== "string" ||
          rawClassification.canonicalAddress.length < 2 ||
          rawClassification.canonicalAddress.length > 64) {
        throw new DestinationDenied();
      }

      const item = Object.freeze({
        canonicalAddress: rawClassification.canonicalAddress,
        family: rawAnswer.family as AddressFamily,
        permitted: true as const,
        scope: "public" as const
      });
      const identity = item.family + ":" + item.canonicalAddress;
      if (!unique.has(identity)) {
        unique.add(identity);
        approved.push(item);
      }
    }

    if (approved.length < 1) throw new DestinationDenied();
    return new ApprovedDestination(
      destinationKey,
      canonicalUrl,
      hostname,
      Object.freeze(approved.slice()),
      deadlineMs
    );
  };
}`
    }
  ]
};
