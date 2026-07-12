window.COURSE_CODE_MODULE = {
  "title": "Code Example: A Complete Validation Pattern",
  "codeExamples": [
    {
      "title": "Code Example: A Complete Validation Pattern",
      "language": "javascript",
      "code": `class ValidationError extends Error {}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const ALLOWED_TRANSITIONS = new Map([
  ["draft", new Set(["submitted"])],
  ["submitted", new Set(["approved", "rejected"])],
  ["approved", new Set()],
  ["rejected", new Set()],
]);
const TICKET_FIELDS = new Set(["title", "status"]);

/*
 * Contract: payload comes from a trusted JSON parser. This validator does not
 * sandbox arbitrary in-process objects, accessors, or Proxies.
 */
function validateTicketUpdate(currentStatus, payload) {
  if (typeof currentStatus !== "string" || !ALLOWED_TRANSITIONS.has(currentStatus)) {
    throw new ValidationError("currentStatus is invalid");
  }
  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    throw new ValidationError("payload must be a non-null object");
  }
  const prototype = Object.getPrototypeOf(payload);
  if (prototype !== Object.prototype && prototype !== null) {
    throw new ValidationError("payload must be a plain object");
  }

  const keys = Object.keys(payload);
  const unexpected = keys.find((field) => !TICKET_FIELDS.has(field));
  if (unexpected !== undefined) {
    throw new ValidationError("unexpected field: " + unexpected);
  }
  if (!Object.hasOwn(payload, "title") || !Object.hasOwn(payload, "status")) {
    throw new ValidationError("title and status are required");
  }
  if (typeof payload.title !== "string" || typeof payload.status !== "string") {
    throw new ValidationError("title and status must be strings");
  }

  const title = payload.title.trim();
  const status = payload.status;
  if (title.length < 1 || title.length > 120) {
    throw new ValidationError("title must be 1 to 120 characters");
  }
  if (!ALLOWED_TRANSITIONS.get(currentStatus).has(status)) {
    throw new ValidationError("status transition is not allowed");
  }
  return Object.freeze({ title, status });
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

const update = validateTicketUpdate("draft", {
  title: "Example", status: "submitted",
});
assert(update.status === "submitted", "valid transition should pass");

expectValidationError(() => validateTicketUpdate("draft", null));
expectValidationError(() => validateTicketUpdate("__proto__", {
  title: "Example", status: "submitted",
}));
expectValidationError(() => validateTicketUpdate("draft", Object.create({
  title: "Inherited", status: "submitted",
})));
expectValidationError(() => validateTicketUpdate("draft", {
  title: { toString() { throw new Error("must not run"); } },
  status: "submitted",
}));
`
    }
  ]
};
