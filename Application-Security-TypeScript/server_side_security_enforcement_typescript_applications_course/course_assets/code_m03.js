window.COURSE_CODE_MODULE = {
  "title": "Runtime Boundary Validation",
  "codeIntro": "Compile-time types document the result; runtime parsing must prove that an unknown request actually has the accepted shape. The HTTP adapter first enforces application/json, UTF-8, a byte limit, and duplicate-key rejection; this post-parse boundary then bounds object cardinality and requires canonical identifiers.",
  "codeExamples": [
    {
      "title": "Parse a bounded command instead of asserting a type",
      "language": "typescript",
      "blurb": "After the stated raw-body controls, this dependency-free example rejects prototypes, extra fields, oversized identifiers, noncanonical operation keys, and implicit coercion. A schema library can express the same boundary when configured equivalently.",
      "code": `// Called only after bounded strict UTF-8 JSON decoding.
const PRODUCT_IDENTIFIER = /^[A-Za-z0-9_-]{1,64}$/;
const OPERATION_IDENTIFIER = /^[A-Za-z0-9_-]{16,64}$/;

type OrderInput = Readonly<{
  productId: string;
  quantity: number;
  operationId: string;
}>;

function parseOrderInput(input: unknown): OrderInput {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new TypeError("invalid request body");
  }
  const value = input as Record<string, unknown>;
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    throw new TypeError("invalid request body");
  }
  const allowedKeys = new Set([
    "productId", "quantity", "operationId"
  ]);
  let keyCount = 0;
  for (const key in value) {
    if (!Object.hasOwn(value, key) ||
        !allowedKeys.has(key) ||
        ++keyCount > allowedKeys.size) {
      throw new TypeError("invalid order input");
    }
  }
  const productId = value.productId;
  const quantity = value.quantity;
  const operationId = value.operationId;
  if (keyCount !== allowedKeys.size ||
      typeof productId !== "string" ||
      !PRODUCT_IDENTIFIER.test(productId) ||
      typeof quantity !== "number" ||
      !Number.isSafeInteger(quantity) ||
      quantity < 1 ||
      quantity > 100 ||
      typeof operationId !== "string" ||
      !OPERATION_IDENTIFIER.test(operationId)) {
    throw new TypeError("invalid order input");
  }
  return Object.freeze({
    productId,
    quantity,
    operationId
  });
}`
    }
  ]
};
