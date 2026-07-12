window.COURSE_CODE_MODULE = {
  "title": "Code Example: Rejecting Dangerous Object Input",
  "codeExamples": [
    {
      "title": "Code Example: Rejecting Dangerous Object Input",
      "language": "javascript",
      "code": `class ValidationError extends Error {}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const ALLOWED_PROFILE_FIELDS = new Set(["displayName", "timezone"]);

function canonicalTimeZone(value) {
  try {
    return new Intl.DateTimeFormat("en-US", { timeZone: value })
      .resolvedOptions().timeZone;
  } catch {
    return null;
  }
}

/*
 * Contract: raw comes from a trusted JSON parser. This validator does not
 * sandbox arbitrary in-process objects, accessors, or Proxies.
 */
function safeProfileUpdate(raw) {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    throw new ValidationError("payload must be an object");
  }
  const prototype = Object.getPrototypeOf(raw);
  if (prototype !== Object.prototype && prototype !== null) {
    throw new ValidationError("payload must be a plain object");
  }

  const keys = Object.keys(raw);
  if (keys.length !== 2 || keys.some((key) => !ALLOWED_PROFILE_FIELDS.has(key)) ||
      !Object.hasOwn(raw, "displayName") || !Object.hasOwn(raw, "timezone")) {
    throw new ValidationError("profile fields are invalid");
  }
  if (typeof raw.displayName !== "string" || typeof raw.timezone !== "string") {
    throw new ValidationError("profile fields must be strings");
  }

  const displayName = raw.displayName.trim();
  const timezone = canonicalTimeZone(raw.timezone.trim());
  if (displayName.length < 1 || displayName.length > 60) {
    throw new ValidationError("displayName is invalid");
  }
  if (timezone === null) {
    throw new ValidationError("timezone is invalid");
  }
  return Object.freeze({ displayName, timezone });
}

function expectValidationError(action) {
  try {
    action();
  } catch (error) {
    if (error instanceof ValidationError) {
      return;
    }
    throw error;
  }
  throw new Error("expected ValidationError");
}

const safe = safeProfileUpdate({
  displayName: "Grace", timezone: "America/New_York",
});
assert(safe.displayName === "Grace", "valid profile should pass");

expectValidationError(() => safeProfileUpdate(Object.create({
  displayName: "Mallory", timezone: "America/New_York",
})));

let coercionCalled = false;
expectValidationError(() => safeProfileUpdate({
  displayName: { toString() { coercionCalled = true; return "Mallory"; } },
  timezone: "America/New_York",
}));
assert(!coercionCalled, "validation must not invoke attacker-controlled coercion");
`
    }
  ]
};
