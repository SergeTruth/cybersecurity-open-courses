window.COURSE_CODE_MODULE = {
  "title": "Code Example: Enforcing a Strict Data Contract",
  "codeExamples": [
    {
      "title": "Code Example: Enforcing a Strict Data Contract",
      "language": "javascript",
      "code": `class ValidationError extends Error {}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const ORDER_FIELDS = new Set(["sku", "quantity", "status"]);
const ALLOWED_STATUSES = new Set(["draft", "submitted", "approved"]);

/*
 * Contract: raw comes from a trusted JSON parser. This validator does not
 * sandbox arbitrary in-process objects, accessors, or Proxies.
 */
function parseOrder(raw) {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    throw new ValidationError("order must be an object");
  }
  const prototype = Object.getPrototypeOf(raw);
  if (prototype !== Object.prototype && prototype !== null) {
    throw new ValidationError("order must be a plain object");
  }

  const keys = Object.keys(raw);
  if (keys.some((key) => !ORDER_FIELDS.has(key))) {
    throw new ValidationError("order contains an unexpected field");
  }
  for (const field of ORDER_FIELDS) {
    if (!Object.hasOwn(raw, field)) {
      throw new ValidationError("order is missing required field: " + field);
    }
  }

  const { sku, quantity, status } = raw;
  if (typeof sku !== "string" || !/^[A-Z0-9-]{3,20}$/.test(sku)) {
    throw new ValidationError("sku must be 3 to 20 uppercase letters, numbers, or dashes");
  }
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
    throw new ValidationError("quantity must be between 1 and 100");
  }
  if (!ALLOWED_STATUSES.has(status)) {
    throw new ValidationError("status is not allowed");
  }
  return { sku, quantity, status };
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

const order = parseOrder({ sku: "ABC-123", quantity: 2, status: "draft" });
assert(order.quantity === 2, "valid order should pass");
expectValidationError(() => parseOrder({
  sku: "ABC-123", quantity: 2, status: "draft", admin: true,
}));
expectValidationError(() => parseOrder(Object.create({
  sku: "ABC-123", quantity: 2, status: "draft",
})));
`
    }
  ]
};
