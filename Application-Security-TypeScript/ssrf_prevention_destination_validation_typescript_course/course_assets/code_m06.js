window.COURSE_CODE_MODULE = {
  "title": "Separate Destination Policy from Request Budgets",
  "codeIntro": "A closed operation catalog fixes both destination authority and resource authority. Request code selects a named façade method; it cannot supply methods, headers, credentials, proxy behavior, limits, or a generic transport.",
  "codeExamples": [
    {
      "title": "Closed, immutable outbound operation catalog",
      "language": "typescript",
      "blurb": "This catalog is constructed only at trusted bootstrap around one process-owned engine. The engine contract requires a shared eight-operation admission limit with a bounded queue, authenticated stored-integration capabilities, internal credential resolution, disabled ambient proxies, streaming byte limits, cancellation cleanup, and sanitized non-blocking telemetry.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
declare const principalBrand: unique symbol;
declare const webhookGrantBrand: unique symbol;

type AuthenticatedPrincipal = Readonly<{ [principalBrand]: true }>;
type AuthorizedWebhookTest = Readonly<{ [webhookGrantBrand]: true }>;

type OperationSpec = Readonly<{
  name: "public-document" | "configured-webhook-test";
  destinationPolicy: "public-document" | "approved-webhook";
  method: "GET" | "POST";
  credential: "none" | "authorized-integration-secret";
  automaticRedirects: false;
  proxy: "disabled";
  connectTimeoutMs: 2_000;
  responseTimeoutMs: 5_000;
  totalTimeoutMs: 10_000;
  maxRequestBytes: number;
  maxResponseHeaders: 64;
  maxResponseHeaderBytes: 16_384;
  maxEncodedResponseBytes: number;
  maxDecodedResponseBytes: number;
  maxRedirects: number;
  allowedResponseTypes: readonly string[];
}>;

const PUBLIC_DOCUMENT = Object.freeze<OperationSpec>({
  name: "public-document",
  destinationPolicy: "public-document",
  method: "GET",
  credential: "none",
  automaticRedirects: false,
  proxy: "disabled",
  connectTimeoutMs: 2_000,
  responseTimeoutMs: 5_000,
  totalTimeoutMs: 10_000,
  maxRequestBytes: 0,
  maxResponseHeaders: 64,
  maxResponseHeaderBytes: 16_384,
  maxEncodedResponseBytes: 262_144,
  maxDecodedResponseBytes: 524_288,
  maxRedirects: 3,
  allowedResponseTypes: Object.freeze(["application/json", "text/plain"])
});

const WEBHOOK_TEST = Object.freeze<OperationSpec>({
  name: "configured-webhook-test",
  destinationPolicy: "approved-webhook",
  method: "POST",
  credential: "authorized-integration-secret",
  automaticRedirects: false,
  proxy: "disabled",
  connectTimeoutMs: 2_000,
  responseTimeoutMs: 5_000,
  totalTimeoutMs: 10_000,
  maxRequestBytes: 256,
  maxResponseHeaders: 64,
  maxResponseHeaderBytes: 16_384,
  maxEncodedResponseBytes: 16_384,
  maxDecodedResponseBytes: 16_384,
  maxRedirects: 0,
  allowedResponseTypes: Object.freeze(["application/json", "text/plain"])
});

interface IntegrationAuthorizer {
  // Derives tenant and subject from the authenticated principal and returns an
  // opaque, single-operation grant bound to the current integration version.
  requireWebhookTest(
    principal: AuthenticatedPrincipal,
    integrationId: string
  ): Promise<AuthorizedWebhookTest>;
}

interface ApplicationOutboundEngine {
  // This single application-owned engine enforces the spec, destination and
  // transport rules. It owns an eight-slot admission semaphore and a bounded
  // queue; cancellation closes and drains the active response.
  readonly globalMaxConcurrent: 8;
  readonly maxQueued: 32;
  executePublicDocument(spec: OperationSpec, rawUrl: unknown): Promise<unknown>;
  executeWebhookTest(
    spec: OperationSpec,
    grant: AuthorizedWebhookTest,
    fixedBody: Readonly<{ event: "connectivity-test" }>
  ): Promise<unknown>;
}

type OutboundOperations = Readonly<{
  fetchPublicDocument(rawUrl: unknown): Promise<Readonly<{
    status: number;
    mediaType: "application/json" | "text/plain";
    body: string;
  }>>;
  sendConfiguredWebhookTest(
    principal: AuthenticatedPrincipal,
    integrationId: unknown
  ): Promise<Readonly<{ delivered: true }>>;
}>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireIntegrationId(value: unknown): string {
  if (typeof value !== "string" || !/^int_[a-f0-9]{32}$/u.test(value)) {
    throw new TypeError("invalid integration identifier");
  }
  return value;
}

function buildOutboundOperations(
  engine: ApplicationOutboundEngine,
  integrations: IntegrationAuthorizer
): OutboundOperations {
  // Only trusted bootstrap receives these collaborators. Capturing bound
  // methods prevents request code from swapping implementations afterward.
  const executePublic = engine.executePublicDocument.bind(engine);
  const executeWebhook = engine.executeWebhookTest.bind(engine);
  const authorizeWebhook = integrations.requireWebhookTest.bind(integrations);
  const fixedWebhookBody = Object.freeze({ event: "connectivity-test" as const });
  if (engine.globalMaxConcurrent !== 8 || engine.maxQueued !== 32) {
    throw new TypeError("invalid shared outbound admission policy");
  }

  return Object.freeze({
    async fetchPublicDocument(rawUrl: unknown) {
      const result = await executePublic(PUBLIC_DOCUMENT, rawUrl);
      if (!isRecord(result) ||
          !Number.isInteger(result.status) ||
          (result.status as number) < 200 || (result.status as number) > 299 ||
          (result.mediaType !== "application/json" &&
            result.mediaType !== "text/plain") ||
          typeof result.body !== "string" ||
          result.body.length > PUBLIC_DOCUMENT.maxDecodedResponseBytes) {
        throw new TypeError("invalid outbound engine result");
      }
      return Object.freeze({
        status: result.status as number,
        mediaType: result.mediaType,
        body: result.body
      });
    },

    async sendConfiguredWebhookTest(
      principal: AuthenticatedPrincipal,
      integrationId: unknown
    ) {
      const id = requireIntegrationId(integrationId);
      const grant = await authorizeWebhook(principal, id);
      const result = await executeWebhook(WEBHOOK_TEST, grant, fixedWebhookBody);
      if (!isRecord(result) || result.delivered !== true) {
        throw new TypeError("invalid outbound engine result");
      }
      return Object.freeze({ delivered: true as const });
    }
  });
}`
    }
  ]
};
