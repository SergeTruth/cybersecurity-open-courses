window.COURSE_CODE_MODULE = {
  "title": "Code Example: Enforcing a Data Contract",
  "codeExamples": [
    {
      "title": "Code Example: Enforcing a Data Contract",
      "language": "javascript",
      "code": "const ALLOWED_STATUSES = new Set([\"draft\", \"submitted\", \"approved\"]);\n\nfunction parseOrder(raw) {\n  if (typeof raw !== \"object\" || raw === null || Array.isArray(raw)) {\n    throw new Error(\"order must be an object\");\n  }\n\n  const sku = raw.sku;\n  const quantity = raw.quantity;\n  const status = raw.status;\n\n  if (typeof sku !== \"string\" || !/^[A-Z0-9-]{3,20}$/.test(sku)) {\n    throw new Error(\"sku must be 3 to 20 uppercase letters, numbers, or dashes\");\n  }\n\n  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {\n    throw new Error(\"quantity must be between 1 and 100\");\n  }\n\n  if (!ALLOWED_STATUSES.has(status)) {\n    throw new Error(\"status is not allowed\");\n  }\n\n  return { sku, quantity, status };\n}\n\nconsole.log(parseOrder({ sku: \"ABC-123\", quantity: 2, status: \"draft\" }));"
    }
  ]
};
