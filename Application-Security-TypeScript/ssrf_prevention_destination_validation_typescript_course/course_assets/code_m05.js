window.COURSE_CODE_MODULE = {
  "title": "Authorize Each Hop and Bind the Connection",
  "codeIntro": "This architectural boundary does not use ordinary fetch. Its application-owned transport consumes an opaque authorization decision, connects only to one address recorded in that decision, and retains the authorized hostname for TLS SNI, certificate verification, and HTTP Host semantics.",
  "codeExamples": [
    {
      "title": "Bounded manual redirects through a pinned transport",
      "language": "typescript",
      "blurb": "The trusted composition root supplies and captures both collaborators. The transport disables automatic redirects and ambient proxies, performs no second resolution, bounds connect, response, total, encoded, and decoded work, and closes each response before resolving. Every Location value is parsed and authorized as a new destination before another socket is opened.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
declare const authorizedDestination: unique symbol;

type AuthorizedDestination = Readonly<{
  [authorizedDestination]: true;
}>;

interface DestinationPolicy {
  // Performs URL, host, port, DNS, and every-address checks for this hop. DNS
  // resolution is cancelled and settled within the supplied absolute deadline.
  authorize(
    rawUrl: unknown,
    absoluteDeadlineMs: number
  ): Promise<AuthorizedDestination>;
  canonicalUrl(decision: AuthorizedDestination): string;
}

type TransportRequest = Readonly<{
  destination: AuthorizedDestination;
  method: "GET";
  automaticRedirects: false;
  proxy: "disabled";
  credential: "none";
  headers: Readonly<{ accept: "application/json, text/plain" }>;
  connectTimeoutMs: 2_000;
  responseTimeoutMs: 5_000;
  deadlineMs: number;
  maxResponseHeaders: 64;
  maxResponseHeaderBytes: 16_384;
  maxEncodedBytes: 262_144;
  maxDecodedBytes: 524_288;
}>;

interface VettedTransport {
  // The decision is authenticated by this implementation. It opens a socket
  // only to a carried address, does not resolve again, preserves the carried
  // TLS/Host name, and returns only after its bounded body is closed.
  request(request: TransportRequest): Promise<unknown>;
}

interface MonotonicClock {
  nowMs(): number;
}

type PublicDocument = Readonly<{
  status: number;
  mediaType: "application/json" | "text/plain";
  body: string;
}>;

type OutboundFailureCode =
  | "destination_denied"
  | "redirect_denied"
  | "redirect_limit"
  | "redirect_loop"
  | "connection_failure"
  | "resource_limit"
  | "upstream_error"
  | "transport_contract";

class OutboundRequestFailed extends Error {
  readonly code: OutboundFailureCode;

  constructor(code: OutboundFailureCode) {
    super("outbound request failed");
    this.name = "OutboundRequestFailed";
    this.code = code;
  }
}

const REDIRECT_STATUSES = new Set<number>([301, 302, 303, 307, 308]);
const ALLOWED_MEDIA_TYPES = new Set<string>([
  "application/json",
  "text/plain"
]);
const MAX_REDIRECTS = 3;
const TOTAL_TIMEOUT_MS = 10_000;
const MAX_ENCODED_BYTES = 262_144;
const MAX_DECODED_BYTES = 524_288;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function checkedNow(nowMs: () => number): number {
  const value = nowMs();
  if (!Number.isFinite(value) || value < 0) {
    throw new OutboundRequestFailed("transport_contract");
  }
  return value;
}

function validateTransportResponse(value: unknown): Readonly<{
  status: number;
  location?: string;
  mediaType: string;
  body: string;
  encodedBytes: number;
  decodedBytes: number;
}> {
  if (!isRecord(value) ||
      !Number.isInteger(value.status) ||
      (value.status as number) < 100 || (value.status as number) > 599 ||
      typeof value.mediaType !== "string" || value.mediaType.length > 128 ||
      typeof value.body !== "string" ||
      !Number.isSafeInteger(value.encodedBytes) ||
      (value.encodedBytes as number) < 0 ||
      !Number.isSafeInteger(value.decodedBytes) ||
      (value.decodedBytes as number) < 0 ||
      (value.location !== undefined && typeof value.location !== "string")) {
    throw new OutboundRequestFailed("transport_contract");
  }
  if ((value.encodedBytes as number) > MAX_ENCODED_BYTES ||
      (value.decodedBytes as number) > MAX_DECODED_BYTES ||
      value.body.length > (value.decodedBytes as number)) {
    throw new OutboundRequestFailed("resource_limit");
  }
  return value as {
    status: number;
    location?: string;
    mediaType: string;
    body: string;
    encodedBytes: number;
    decodedBytes: number;
  };
}

function buildPublicDocumentFetcher(
  policy: DestinationPolicy,
  transport: VettedTransport,
  clock: MonotonicClock
): (rawUrl: unknown) => Promise<PublicDocument> {
  // Dependency injection occurs only at trusted bootstrap. These bound method
  // references cannot later be replaced by request code.
  const authorize = policy.authorize.bind(policy);
  const canonicalUrl = policy.canonicalUrl.bind(policy);
  const request = transport.request.bind(transport);
  const nowMs = clock.nowMs.bind(clock);

  return async (rawUrl) => {
    const startedAtMs = checkedNow(nowMs);
    const deadlineMs = startedAtMs + TOTAL_TIMEOUT_MS;
    if (!Number.isFinite(deadlineMs)) {
      throw new OutboundRequestFailed("transport_contract");
    }
    let current: unknown = rawUrl;
    const visited = new Set<string>();

    for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
      if (checkedNow(nowMs) >= deadlineMs) {
        throw new OutboundRequestFailed("resource_limit");
      }

      let decision: AuthorizedDestination;
      let currentCanonical: string;
      try {
        decision = await authorize(current, deadlineMs);
        currentCanonical = canonicalUrl(decision);
      } catch {
        throw new OutboundRequestFailed(
          hop === 0 ? "destination_denied" : "redirect_denied"
        );
      }
      if (typeof currentCanonical !== "string" ||
          currentCanonical.length < 1 || currentCanonical.length > 2048) {
        throw new OutboundRequestFailed("transport_contract");
      }
      if (checkedNow(nowMs) >= deadlineMs) {
        throw new OutboundRequestFailed("resource_limit");
      }
      if (visited.has(currentCanonical)) {
        throw new OutboundRequestFailed("redirect_loop");
      }
      visited.add(currentCanonical);

      let rawResponse: unknown;
      try {
        rawResponse = await request(Object.freeze({
          destination: decision,
          method: "GET",
          automaticRedirects: false,
          proxy: "disabled",
          credential: "none",
          headers: Object.freeze({ accept: "application/json, text/plain" }),
          connectTimeoutMs: 2_000,
          responseTimeoutMs: 5_000,
          deadlineMs,
          maxResponseHeaders: 64,
          maxResponseHeaderBytes: 16_384,
          maxEncodedBytes: MAX_ENCODED_BYTES,
          maxDecodedBytes: MAX_DECODED_BYTES
        }));
      } catch (error: unknown) {
        if (error instanceof OutboundRequestFailed &&
            error.code === "resource_limit") {
          throw error;
        }
        throw new OutboundRequestFailed("connection_failure");
      }
      if (checkedNow(nowMs) >= deadlineMs) {
        throw new OutboundRequestFailed("resource_limit");
      }
      const response = validateTransportResponse(rawResponse);

      if (REDIRECT_STATUSES.has(response.status)) {
        if (hop === MAX_REDIRECTS) {
          throw new OutboundRequestFailed("redirect_limit");
        }
        const location = response.location;
        if (typeof location !== "string" || location.length < 1 ||
            location.length > 2048 ||
            /[\\u0000-\\u001F\\u007F]/u.test(location)) {
          throw new OutboundRequestFailed("redirect_denied");
        }
        try {
          current = new URL(location, currentCanonical).href;
        } catch {
          throw new OutboundRequestFailed("redirect_denied");
        }
        continue;
      }

      if (response.status < 200 || response.status > 299) {
        throw new OutboundRequestFailed("upstream_error");
      }
      if (!ALLOWED_MEDIA_TYPES.has(response.mediaType)) {
        throw new OutboundRequestFailed("resource_limit");
      }
      return Object.freeze({
        status: response.status,
        mediaType: response.mediaType as PublicDocument["mediaType"],
        body: response.body
      });
    }

    throw new OutboundRequestFailed("redirect_limit");
  };
}`
    }
  ]
};
