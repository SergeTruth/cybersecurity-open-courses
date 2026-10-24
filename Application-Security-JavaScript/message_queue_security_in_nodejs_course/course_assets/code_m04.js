window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Message Schemas and Payload Validation with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Decode a bounded queue message",
      "language": "javascript",
      "blurb": "A validated positive byte limit is enforced before JSON parsing, and the resulting object may contain only declared envelope fields.",
      "code": "const envelopeFields = new Set([\"messageId\", \"type\", \"version\", \"payload\"]);\n\nexport function decodeQueueMessage(body, maxBytes = 64 * 1024) {\n  if (!Number.isSafeInteger(maxBytes) || maxBytes < 1 || maxBytes > 1024 * 1024) {\n    throw new RangeError(\"message byte limit invalid\");\n  }\n  if (!Buffer.isBuffer(body) || body.length === 0 || body.length > maxBytes) throw new RangeError(\"message size rejected\");\n  const value = JSON.parse(new TextDecoder(\"utf-8\", { fatal: true }).decode(body));\n  if (!value || typeof value !== \"object\" || Array.isArray(value)) throw new TypeError(\"message object required\");\n  for (const key of Object.keys(value)) if (!envelopeFields.has(key)) throw new TypeError(\"unexpected field: \" + key);\n  if (typeof value.messageId !== \"string\" || !/^[a-f0-9-]{16,64}$/i.test(value.messageId)) throw new TypeError(\"invalid message id\");\n  return value;\n}\n"
    },
    {
      "title": "Validate a typed inventory command",
      "language": "javascript",
      "blurb": "The validator rejects extra payload fields and bounds identifiers and quantities before the worker reaches business logic.",
      "code": "export function parseReserveInventory(message) {\n  if (message.type !== \"inventory.reserve\" || message.version !== 1) throw new TypeError(\"unsupported command\");\n  const payload = message.payload;\n  if (!payload || typeof payload !== \"object\" || Array.isArray(payload) || Object.keys(payload).some((key) => ![\"orderId\", \"sku\", \"quantity\"].includes(key))) throw new TypeError(\"invalid payload fields\");\n  if (typeof payload.orderId !== \"string\" || !/^[a-z0-9-]{8,64}$/i.test(payload.orderId)) throw new TypeError(\"invalid order id\");\n  if (typeof payload.sku !== \"string\" || !/^[A-Z0-9-]{3,32}$/.test(payload.sku)) throw new TypeError(\"invalid sku\");\n  if (!Number.isSafeInteger(payload.quantity) || payload.quantity < 1 || payload.quantity > 100) throw new RangeError(\"invalid quantity\");\n  return { orderId: payload.orderId, sku: payload.sku, quantity: payload.quantity };\n}\n"
    }
  ]
};
