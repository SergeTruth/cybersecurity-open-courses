window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Models, Schemas, Relationships, and Sensitive Fields with concrete, reviewable Node.js boundaries.",
  "codeExamples": [
    {
      "title": "Define sensitive ORM model metadata",
      "language": "javascript",
      "blurb": "Deeply immutable model metadata marks tenant identity, private fields, validated enums, and tenant-scoped uniqueness without exposing mutable policy objects.",
      "code": "function deepFreeze(value) {\n  if (!value || typeof value !== \"object\" || Object.isFrozen(value)) return value;\n  for (const nested of Object.values(value)) deepFreeze(nested);\n  return Object.freeze(value);\n}\n\nexport const AccountModel = deepFreeze({\n  table: \"accounts\",\n  primaryKey: \"id\",\n  fields: {\n    id: { type: \"uuid\", generated: true },\n    tenantId: { type: \"uuid\", immutable: true },\n    email: { type: \"string\", maxLength: 254 },\n    passwordHash: { type: \"string\", private: true },\n    role: { type: \"enum\", values: [\"member\", \"manager\"] }\n  },\n  unique: [[\"tenantId\", \"email\"]]\n});\n"
    },
    {
      "title": "Serialize an ORM entity through a view model",
      "language": "javascript",
      "blurb": "The response type is built from explicit public fields and does not depend on hidden-column defaults remaining configured.",
      "code": "const ACCOUNT_ROLES = new Set([\"member\", \"manager\"]);\n\nfunction boundedText(value, name, maximumBytes) {\n  if (typeof value !== \"string\" || value.length === 0 || value.trim() !== value ||\n      Buffer.byteLength(value, \"utf8\") > maximumBytes || /[\\u0000-\\u001f\\u007f]/.test(value)) {\n    throw new TypeError(name + \" is invalid\");\n  }\n  return value;\n}\n\nexport function accountView(entity) {\n  if (!entity || typeof entity !== \"object\" || Array.isArray(entity)) {\n    throw new TypeError(\"account entity required\");\n  }\n  const suppliedId = entity.id;\n  const suppliedEmail = entity.email;\n  const suppliedDisplayName = entity.displayName;\n  const role = entity.role;\n  const id = boundedText(suppliedId, \"account id\", 128);\n  const email = boundedText(suppliedEmail, \"email\", 254);\n  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) throw new TypeError(\"email is invalid\");\n  const displayName = boundedText(suppliedDisplayName, \"display name\", 100);\n  if (typeof role !== \"string\" || !ACCOUNT_ROLES.has(role)) throw new TypeError(\"role is invalid\");\n  return Object.freeze({ id, email, displayName, role });\n}\n"
    }
  ]
};
