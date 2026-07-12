window.COURSE_CODE_MODULE = {
  "title": "Code Example: Client Hints and Server Enforcement",
  "codeExamples": [
    {
      "title": "Code Example: Client Hints and Server Enforcement",
      "language": "javascript",
      "code": `class ValidationError extends Error {}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function canonicalTimeZone(value) {
  try {
    return new Intl.DateTimeFormat("en-US", { timeZone: value })
      .resolvedOptions().timeZone;
  } catch {
    return null;
  }
}

function clientProfileHints(input) {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return { ok: false, message: "Profile input is invalid." };
  }
  if (typeof input.displayName !== "string" || typeof input.timezone !== "string") {
    return { ok: false, message: "Profile fields must be text." };
  }
  const displayName = input.displayName.trim();
  const timezone = canonicalTimeZone(input.timezone.trim());
  if (displayName.length < 1 || displayName.length > 60) {
    return { ok: false, message: "Display name must be 1 to 60 characters." };
  }
  if (timezone === null) {
    return { ok: false, message: "Choose a recognized IANA timezone." };
  }
  return { ok: true, value: { displayName, timezone } };
}

/*
 * Contract: raw comes from a trusted JSON body parser. This validator does
 * not sandbox arbitrary in-process objects, accessors, or Proxies.
 */
function validateProfileOnServer(raw) {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw) ||
      Object.getPrototypeOf(raw) !== Object.prototype) {
    throw new ValidationError("profile must be a plain JSON object");
  }
  const allowedFields = new Set(["displayName", "timezone"]);
  const keys = Object.keys(raw);
  if (keys.length !== 2 || keys.some((key) => !allowedFields.has(key)) ||
      !Object.hasOwn(raw, "displayName") || !Object.hasOwn(raw, "timezone")) {
    throw new ValidationError("profile fields are invalid");
  }
  if (typeof raw.displayName !== "string" || typeof raw.timezone !== "string") {
    throw new ValidationError("profile fields must be strings");
  }

  const displayName = raw.displayName.trim();
  const timezone = canonicalTimeZone(raw.timezone.trim());
  if (displayName.length < 1 || displayName.length > 60 || timezone === null) {
    throw new ValidationError("profile values are invalid");
  }
  return Object.freeze({ displayName, timezone });
}

function patchProfileEndpoint(requestBody) {
  try {
    return { status: 200, body: validateProfileOnServer(requestBody) };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { status: 400, body: { error: "invalid profile update" } };
    }
    throw error;
  }
}

const clientResult = clientProfileHints({
  displayName: "Ada",
  timezone: "America/Argentina/Buenos_Aires",
});
assert(clientResult.ok, "valid client input should pass usability hints");
assert(!clientProfileHints(null).ok, "invalid client shape should be rejected");
assert(patchProfileEndpoint(clientResult.value).status === 200,
  "valid profile should pass server validation");

/* A modified client bypasses hints, but not authoritative server validation. */
assert(patchProfileEndpoint({
  displayName: "Mallory", timezone: "Fake/Zone",
}).status === 400, "server must reject a fake timezone");
`
    }
  ]
};
