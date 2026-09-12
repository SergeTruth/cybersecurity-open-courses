window.COURSE_CODE_MODULE = {
  "title": "Use a Server-Managed Integration",
  "codeIntro": "The request names an integration and a fixed business operation. Authentication and tenant-scoped authorization mint a per-request capability; request code never receives a URL or credential reference.",
  "codeExamples": [
    {
      "title": "Send through an authorized integration capability",
      "language": "typescript",
      "blurb": "The repository checks the authenticated tenant, subject, test permission, enabled state, and record version in one trusted lookup. Immediately before connecting, the outbound service authenticates the opaque capability, rechecks that complete binding, and selects destination and credentials from application-owned configuration.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
type RequestContext = unknown;

const principalKey = Symbol("authenticated principal");
const integrationKey = Symbol("authorized integration");
const principals = new WeakSet<object>();
const integrations = new WeakSet<object>();

class AuthenticatedPrincipal {
  readonly tenantId: string;
  readonly subjectId: string;

  constructor(
    key: typeof principalKey,
    tenantId: string,
    subjectId: string
  ) {
    if (key !== principalKey ||
        !/^tenant_[a-f0-9]{32}$/.test(tenantId) ||
        !/^subject_[a-f0-9]{32}$/.test(subjectId)) {
      throw new TypeError("invalid authenticated principal");
    }
    this.tenantId = tenantId;
    this.subjectId = subjectId;
    principals.add(this);
    Object.freeze(this);
  }
}

class AuthorizedIntegration {
  readonly #id: string;
  readonly #tenantId: string;
  readonly #subjectId: string;
  readonly #version: number;

  constructor(
    key: typeof integrationKey,
    id: string,
    tenantId: string,
    subjectId: string,
    version: number
  ) {
    if (key !== integrationKey ||
        !/^int_[a-f0-9]{32}$/.test(id) ||
        !/^tenant_[a-f0-9]{32}$/.test(tenantId) ||
        !/^subject_[a-f0-9]{32}$/.test(subjectId) ||
        !Number.isSafeInteger(version) || version < 1) {
      throw new TypeError("invalid integration authorization");
    }
    this.#id = id;
    this.#tenantId = tenantId;
    this.#subjectId = subjectId;
    this.#version = version;
    integrations.add(this);
    Object.freeze(this);
  }

  binding(key: typeof integrationKey): Readonly<{
    id: string;
    tenantId: string;
    subjectId: string;
    version: number;
    action: "test";
  }> {
    if (key !== integrationKey || !integrations.has(this)) {
      throw new TypeError("invalid integration capability");
    }
    return Object.freeze({
      id: this.#id,
      tenantId: this.#tenantId,
      subjectId: this.#subjectId,
      version: this.#version,
      action: "test" as const
    });
  }
}

interface AuthenticationBoundary {
  requirePrincipal(context: RequestContext): AuthenticatedPrincipal;
}

interface IntegrationAuthorizationRepository {
  requireWebhookTest(
    principal: AuthenticatedPrincipal,
    integrationId: string
  ): Promise<AuthorizedIntegration>;
}

interface ConfiguredWebhookService {
  // Authenticates the opaque capability and atomically rechecks its tenant,
  // subject, action, permission, enabled state, and version immediately before
  // using only application-owned destination and credential capabilities.
  sendTest(capability: AuthorizedIntegration): Promise<void>;
}

function parseIntegrationId(value: unknown): string {
  if (typeof value !== "string" || !/^int_[a-f0-9]{32}$/.test(value)) {
    throw new TypeError("invalid integration identifier");
  }
  return value;
}

function buildWebhookTestOperation(
  authentication: AuthenticationBoundary,
  repository: IntegrationAuthorizationRepository,
  outbound: ConfiguredWebhookService
): (context: RequestContext, integrationId: unknown) => Promise<void> {
  if (typeof authentication !== "object" || authentication === null ||
      typeof authentication.requirePrincipal !== "function" ||
      typeof repository !== "object" || repository === null ||
      typeof repository.requireWebhookTest !== "function" ||
      typeof outbound !== "object" || outbound === null ||
      typeof outbound.sendTest !== "function") {
    throw new TypeError("invalid webhook composition");
  }
  const requirePrincipal = authentication.requirePrincipal.bind(authentication);
  const requireWebhookTest = repository.requireWebhookTest.bind(repository);
  const sendTest = outbound.sendTest.bind(outbound);

  return async (
    context: RequestContext,
    integrationId: unknown
  ): Promise<void> => {
    const principal = requirePrincipal(context);
    if (!(principal instanceof AuthenticatedPrincipal) ||
        !principals.has(principal)) {
      throw new TypeError("invalid authenticated principal");
    }
    const integration = await requireWebhookTest(
      principal,
      parseIntegrationId(integrationId)
    );
    if (!(integration instanceof AuthorizedIntegration) ||
        !integrations.has(integration)) {
      throw new TypeError("invalid integration capability");
    }
    await sendTest(integration);
  };
}`
    }
  ]
};
