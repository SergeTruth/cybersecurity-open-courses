window.COURSE_CODE_MODULE = {
  "title": "Map Approved Fields Explicitly",
  "codeIntro": "The mapper creates an opaque immutable persistence command containing only operation-approved fields. The target identity comes from an authenticated principal, never from request data.",
  "codeExamples": [
    {
      "title": "Explicit authenticated profile update",
      "language": "typescript",
      "blurb": "The trusted input boundary authenticates its parsed result, the mapper copies fields one by one, and the repository derives tenant and user scope from the principal while authenticating the command. No request object, broad DTO, spread, or mutable update dictionary reaches persistence.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
type RequestContext = unknown;
type SupportedTimezone =
  | "UTC"
  | "America/New_York"
  | "Europe/London";

declare const validatedProfileBrand: unique symbol;
type ValidatedProfileInput = Readonly<{
  [validatedProfileBrand]: true;
}>;

interface ProfileInputBoundary {
  parse(rawBody: unknown): ValidatedProfileInput;
  read(input: ValidatedProfileInput): unknown;
}

const principalKey = Symbol("authenticated principal");
const commandKey = Symbol("profile update command");
const principals = new WeakSet<object>();
const commands = new WeakSet<object>();

class AuthenticatedPrincipal {
  readonly #tenantId: string;
  readonly #userId: string;

  constructor(key: typeof principalKey, tenantId: string, userId: string) {
    if (key !== principalKey ||
        !/^tenant_[a-f0-9]{32}$/u.test(tenantId) ||
        !/^user_[a-f0-9]{32}$/u.test(userId)) {
      throw new TypeError("invalid authenticated principal");
    }
    this.#tenantId = tenantId;
    this.#userId = userId;
    principals.add(this);
    Object.freeze(this);
  }

  scope(key: typeof principalKey): Readonly<{
    tenantId: string;
    userId: string;
  }> {
    if (key !== principalKey || !principals.has(this)) {
      throw new TypeError("invalid authenticated principal");
    }
    return Object.freeze({ tenantId: this.#tenantId, userId: this.#userId });
  }
}

class ProfileUpdateCommand {
  readonly #displayName: string | undefined;
  readonly #timezone: SupportedTimezone | undefined;
  readonly hasDisplayName: boolean;
  readonly hasTimezone: boolean;

  constructor(
    key: typeof commandKey,
    fields: Readonly<{
      hasDisplayName: boolean;
      displayName: string | undefined;
      hasTimezone: boolean;
      timezone: SupportedTimezone | undefined;
    }>
  ) {
    if (key !== commandKey) throw new TypeError("invalid profile command");
    this.hasDisplayName = fields.hasDisplayName;
    this.hasTimezone = fields.hasTimezone;
    this.#displayName = fields.displayName;
    this.#timezone = fields.timezone;
    commands.add(this);
    Object.freeze(this);
  }

  fields(key: typeof commandKey): Readonly<{
    hasDisplayName: boolean;
    displayName: string | undefined;
    hasTimezone: boolean;
    timezone: SupportedTimezone | undefined;
  }> {
    if (key !== commandKey || !commands.has(this)) {
      throw new TypeError("invalid profile command");
    }
    return Object.freeze({
      hasDisplayName: this.hasDisplayName,
      displayName: this.#displayName,
      hasTimezone: this.hasTimezone,
      timezone: this.#timezone
    });
  }
}

interface AuthenticationBoundary {
  requirePrincipal(context: RequestContext): AuthenticatedPrincipal;
}

interface ProfileRepository {
  // Authenticates both opaque values, derives tenant and user predicates from
  // the principal, maps only display_name/timezone columns, and verifies that
  // exactly one scoped row changed inside its transaction.
  updateOwnProfile(
    principal: AuthenticatedPrincipal,
    command: ProfileUpdateCommand
  ): Promise<unknown>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function buildOwnProfileUpdater(
  authentication: AuthenticationBoundary,
  inputBoundary: ProfileInputBoundary,
  repository: ProfileRepository
): (context: RequestContext, rawBody: unknown) => Promise<void> {
  const requirePrincipal =
    authentication.requirePrincipal.bind(authentication);
  const parse = inputBoundary.parse.bind(inputBoundary);
  const read = inputBoundary.read.bind(inputBoundary);
  const updateOwnProfile = repository.updateOwnProfile.bind(repository);

  return async (context, rawBody) => {
    const principal = requirePrincipal(context);
    if (!(principal instanceof AuthenticatedPrincipal) ||
        !principals.has(principal)) {
      throw new TypeError("invalid authenticated principal");
    }

    const parsed = parse(rawBody);
    let rawFields: unknown;
    try {
      rawFields = read(parsed);
    } catch {
      throw new TypeError("invalid validated profile input");
    }
    if (!isRecord(rawFields) ||
        typeof rawFields["hasDisplayName"] !== "boolean" ||
        typeof rawFields["hasTimezone"] !== "boolean") {
      throw new TypeError("invalid validated profile input");
    }

    const hasDisplayName = rawFields["hasDisplayName"];
    const hasTimezone = rawFields["hasTimezone"];
    const displayName = rawFields["displayName"];
    const timezone = rawFields["timezone"];
    if ((!hasDisplayName && displayName !== undefined) ||
        (hasDisplayName && (typeof displayName !== "string" ||
          displayName.length < 1 || displayName.length > 80)) ||
        (!hasTimezone && timezone !== undefined) ||
        (hasTimezone && timezone !== "UTC" &&
          timezone !== "America/New_York" &&
          timezone !== "Europe/London") ||
        (!hasDisplayName && !hasTimezone)) {
      throw new TypeError("invalid validated profile input");
    }

    const command = new ProfileUpdateCommand(commandKey, Object.freeze({
      hasDisplayName,
      displayName: hasDisplayName ? displayName as string : undefined,
      hasTimezone,
      timezone: hasTimezone ? timezone as SupportedTimezone : undefined
    }));
    const result = await updateOwnProfile(principal, command);
    if (!isRecord(result) || result["updated"] !== true) {
      throw new Error("profile update failed");
    }
  };
}`
    }
  ]
};
