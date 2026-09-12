window.COURSE_CODE_MODULE = {
  "title": "Validate Unknown Runtime Data",
  "codeIntro": "This library-neutral parser demonstrates the runtime properties a schema must provide: a plain bounded object, exact own keys, data properties only, explicit normalization, no coercion, and an immutable authenticated result.",
  "codeExamples": [
    {
      "title": "Strict operation-specific parsing",
      "language": "typescript",
      "blurb": "Unknown, symbol, inherited, accessor, and explicitly undefined properties fail closed. Downstream code receives only the opaque parser result and never returns to the request body.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
type SupportedTimezone =
  | "UTC"
  | "America/New_York"
  | "Europe/London";

const validatedInputKey = Symbol("validated profile input");
const issuedProfileInputs = new WeakSet<object>();

class ValidatedProfileInput {
  readonly #displayName: string | undefined;
  readonly #timezone: SupportedTimezone | undefined;
  readonly hasDisplayName: boolean;
  readonly hasTimezone: boolean;

  constructor(
    key: typeof validatedInputKey,
    hasDisplayName: boolean,
    displayName: string | undefined,
    hasTimezone: boolean,
    timezone: SupportedTimezone | undefined
  ) {
    if (key !== validatedInputKey) throw new TypeError("unvalidated input");
    this.hasDisplayName = hasDisplayName;
    this.hasTimezone = hasTimezone;
    this.#displayName = displayName;
    this.#timezone = timezone;
    issuedProfileInputs.add(this);
    Object.freeze(this);
  }

  fields(key: typeof validatedInputKey): Readonly<{
    hasDisplayName: boolean;
    displayName: string | undefined;
    hasTimezone: boolean;
    timezone: SupportedTimezone | undefined;
  }> {
    if (key !== validatedInputKey || !issuedProfileInputs.has(this)) {
      throw new TypeError("invalid profile input capability");
    }
    return Object.freeze({
      hasDisplayName: this.hasDisplayName,
      displayName: this.#displayName,
      hasTimezone: this.hasTimezone,
      timezone: this.#timezone
    });
  }
}

class ProfileInputRejected extends Error {
  constructor() {
    super("profile update rejected");
    this.name = "ProfileInputRejected";
  }
}

function isSupportedTimezone(value: string): value is SupportedTimezone {
  return value === "UTC" ||
    value === "America/New_York" ||
    value === "Europe/London";
}

function hasUnsafeDisplayCharacters(value: string): boolean {
  // This product's display-name policy rejects control/format characters,
  // lone surrogates, and line separators. Products that need joining controls
  // should replace this with a documented script-aware policy.
  return /[\\p{Cc}\\p{Cf}\\p{Cs}\\p{Zl}\\p{Zp}]/u.test(value);
}

function parseProfileUpdate(value: unknown): ValidatedProfileInput {
  try {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      throw new ProfileInputRejected();
    }
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      throw new ProfileInputRejected();
    }

    const keys = Reflect.ownKeys(value);
    if (keys.length < 1 || keys.length > 2 ||
        keys.some((key) => typeof key !== "string" ||
          (key !== "displayName" && key !== "timezone"))) {
      throw new ProfileInputRejected();
    }

    const read = (name: "displayName" | "timezone"): Readonly<{
      present: boolean;
      value: unknown;
    }> => {
      const descriptor = Object.getOwnPropertyDescriptor(value, name);
      if (descriptor === undefined) {
        return Object.freeze({ present: false, value: undefined });
      }
      if (!("value" in descriptor) || !descriptor.enumerable) {
        throw new ProfileInputRejected();
      }
      return Object.freeze({ present: true, value: descriptor.value });
    };

    const rawDisplayName = read("displayName");
    const rawTimezone = read("timezone");
    let displayName: string | undefined;
    let timezone: SupportedTimezone | undefined;

    if (rawDisplayName.present) {
      if (typeof rawDisplayName.value !== "string" ||
          rawDisplayName.value.length > 256) {
        throw new ProfileInputRejected();
      }
      displayName = rawDisplayName.value.trim().normalize("NFC");
      if (displayName.length < 1 || displayName.length > 80 ||
          hasUnsafeDisplayCharacters(displayName)) {
        throw new ProfileInputRejected();
      }
    }
    if (rawTimezone.present) {
      if (typeof rawTimezone.value !== "string" ||
          !isSupportedTimezone(rawTimezone.value)) {
        throw new ProfileInputRejected();
      }
      timezone = rawTimezone.value;
    }

    return new ValidatedProfileInput(
      validatedInputKey,
      rawDisplayName.present,
      displayName,
      rawTimezone.present,
      timezone
    );
  } catch (error: unknown) {
    if (error instanceof ProfileInputRejected) throw error;
    throw new ProfileInputRejected();
  }
}`
    }
  ]
};
