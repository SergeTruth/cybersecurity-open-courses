window.COURSE_CODE_MODULE = {
  "title": "Make PATCH Presence Semantics Explicit",
  "codeIntro": "Treat omission, clearing, and replacement as separate capabilities. Parse the raw value before creating an immutable command that cannot acquire additional fields later.",
  "codeExamples": [
    {
      "title": "Issue an opaque, field-specific PATCH command",
      "language": "typescript",
      "blurb": "Only an own data property named bio is accepted. An omitted field means no change, null means clear, and a string—including an empty string—is a deliberate replacement. Undefined, accessors, inherited properties, symbols, arrays, relation objects, and unknown fields are rejected.",
      "code": `type BioPatchValue =
  | Readonly<{ kind: "no-change" }>
  | Readonly<{ kind: "clear" }>
  | Readonly<{ kind: "replace"; value: string }>;

const bioPatchKey: unique symbol = Symbol("bioPatchKey");
const issuedBioPatches = new WeakSet<object>();

class ProfileBioPatch {
  readonly #value: BioPatchValue;

  private constructor(key: typeof bioPatchKey, value: BioPatchValue) {
    if (key !== bioPatchKey) throw new TypeError("invalid patch issuer");
    this.#value = Object.freeze(value);
    issuedBioPatches.add(this);
    Object.freeze(this);
  }

  static issue(key: typeof bioPatchKey, value: BioPatchValue): ProfileBioPatch {
    return new ProfileBioPatch(key, value);
  }

  value(key: typeof bioPatchKey): BioPatchValue {
    if (key !== bioPatchKey || !issuedBioPatches.has(this)) {
      throw new TypeError("invalid patch command");
    }
    return this.#value;
  }
}

class ProfilePatchRejected extends Error {
  constructor() {
    super("profile patch rejected");
    this.name = "ProfilePatchRejected";
  }
}

function parseProfileBioPatch(raw: unknown): ProfileBioPatch {
  try {
    if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
      throw new ProfilePatchRejected();
    }

    const prototype: object | null = Object.getPrototypeOf(raw);
    if (prototype !== Object.prototype && prototype !== null) {
      throw new ProfilePatchRejected();
    }

    const keys = Reflect.ownKeys(raw);
    if (keys.length === 0) {
      return ProfileBioPatch.issue(bioPatchKey, { kind: "no-change" });
    }
    if (keys.length !== 1 || keys[0] !== "bio") {
      throw new ProfilePatchRejected();
    }

    const descriptor = Object.getOwnPropertyDescriptor(raw, "bio");
    if (descriptor === undefined || !("value" in descriptor) || !descriptor.enumerable) {
      throw new ProfilePatchRejected();
    }
    if (descriptor.value === null) {
      return ProfileBioPatch.issue(bioPatchKey, { kind: "clear" });
    }
    if (typeof descriptor.value !== "string" || descriptor.value.length > 2_000) {
      throw new ProfilePatchRejected();
    }

    return ProfileBioPatch.issue(bioPatchKey, {
      kind: "replace",
      value: descriptor.value
    });
  } catch (error: unknown) {
    if (error instanceof ProfilePatchRejected) throw error;
    throw new ProfilePatchRejected();
  }
}

type RequestContext = unknown;

interface OwnProfileBioService {
  // This boundary authenticates the request context and ProfileBioPatch,
  // derives the account and tenant from that authenticated principal, and maps
  // only kind/value to the single bio column in a scoped transaction.
  applyAuthenticatedOwnBioPatch(
    context: RequestContext,
    command: ProfileBioPatch
  ): Promise<Readonly<{ applied: boolean }>>;
}

function buildOwnBioPatcher(service: OwnProfileBioService) {
  const apply = service.applyAuthenticatedOwnBioPatch.bind(service);
  return async function patchOwnBio(
    context: RequestContext,
    rawBody: unknown
  ): Promise<boolean> {
    const command = parseProfileBioPatch(rawBody);
    const value = command.value(bioPatchKey);
    const result = await apply(context, command);
    if (value.kind === "no-change") {
      if (result.applied !== false) throw new Error("profile update failed");
      return false;
    }
    if (result.applied !== true) throw new Error("profile update failed");
    return true;
  };
}`
    }
  ]
};
