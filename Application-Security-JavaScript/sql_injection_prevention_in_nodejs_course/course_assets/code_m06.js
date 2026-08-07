window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Input Validation and Business Rules through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Reject unexpected fields in a SQL mutation DTO",
      "language": "javascript",
      "blurb": "The SQL mutation boundary accepts exactly two own data fields, validates bounded canonical display text and a closed locale set, and returns a frozen DTO for parameterized persistence.",
      "code": "function validatedDisplayName(value) {\n  if (typeof value !== \"string\" || value.length < 1 || value.trim() !== value ||\n      value !== value.normalize(\"NFC\") || Buffer.byteLength(value, \"utf8\") > 100 ||\n      /[\\u0000-\\u001f\\u007f]/.test(value)) {\n    throw new TypeError(\"display name invalid\");\n  }\n  return value;\n}\n\nconst PROFILE_FIELDS = new Set([\"displayName\", \"locale\"]);\n\nfunction exactDataRecord(value, fields) {\n  if (!value || typeof value !== \"object\" || Array.isArray(value) ||\n      ![Object.prototype, null].includes(Object.getPrototypeOf(value))) return null;\n  const descriptors = Object.getOwnPropertyDescriptors(value);\n  const keys = Reflect.ownKeys(descriptors);\n  if (keys.length !== fields.size || keys.some((key) =>\n      typeof key !== \"string\" || !fields.has(key) ||\n      !descriptors[key].enumerable || !(\"value\" in descriptors[key]))) return null;\n  return Object.freeze(Object.fromEntries(\n    keys.map((key) => [key, descriptors[key].value])\n  ));\n}\n\nexport function parseProfileMutation(input) {\n  const selected = exactDataRecord(input, PROFILE_FIELDS);\n  if (!selected) throw new TypeError(\"exact profile object required\");\n  const suppliedDisplayName = selected.displayName;\n  const locale = selected.locale;\n  const displayName = validatedDisplayName(suppliedDisplayName);\n  if (![\"en\", \"es\", \"fr\"].includes(locale)) throw new TypeError(\"locale invalid\");\n  return Object.freeze({ displayName, locale });\n}\n"
    },
    {
      "title": "Validate monetary rules before a parameterized update",
      "language": "javascript",
      "blurb": "The command checks currency, safe-integer cents, and an application maximum independently of the driver's SQL parameterization.",
      "code": "const tenantIdentity = /^[A-Za-z0-9](?:[A-Za-z0-9_-]{0,126}[A-Za-z0-9])?$/;\n\nexport function invoiceAdjustment(input, invoiceId, tenantId) {\n  const currency = input?.currency;\n  const cents = input?.cents;\n  if (typeof currency !== \"string\" || !/^[A-Z]{3}$/.test(currency) ||\n      !Number.isSafeInteger(cents) || Math.abs(cents) > 1_000_000) {\n    throw new TypeError(\"adjustment invalid\");\n  }\n  if (typeof invoiceId !== \"string\" || !/^inv_[a-z0-9]{16,40}$/.test(invoiceId) ||\n      typeof tenantId !== \"string\" || !tenantIdentity.test(tenantId)) {\n    throw new TypeError(\"invoice context invalid\");\n  }\n  return Object.freeze({\n    text: \"UPDATE invoices SET adjustment_cents = $1, currency = $2 WHERE id = $3 AND tenant_id = $4\",\n    values: Object.freeze([cents, currency, invoiceId, tenantId])\n  });\n}\n"
    }
  ]
};
