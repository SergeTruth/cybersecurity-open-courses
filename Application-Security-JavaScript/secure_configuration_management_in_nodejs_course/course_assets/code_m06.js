window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Secrets, Sensitive Configuration, and Redaction through distinct, reviewable JavaScript security boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Separate secret references from ordinary configuration",
      "language": "javascript",
      "blurb": "An explicit, flat schema accepts only three non-secret settings and one versioned secret reference. Unknown fields and nested credential objects are rejected instead of relying on secret-name guesses.",
      "code": "export function splitConfiguration(input) {\n  const fields = new Set([\"apiOrigin\", \"timeoutMs\", \"telemetry\", \"databaseSecretRef\"]);\n  if (!input || typeof input !== \"object\" || Array.isArray(input) || Object.keys(input).length !== fields.size ||\n      Object.keys(input).some(name => !fields.has(name))) throw new TypeError(\"declared configuration fields required\");\n  if (typeof input.apiOrigin !== \"string\" || input.apiOrigin.length > 2048 || /[\\u0000-\\u0020\\u007f]/.test(input.apiOrigin)) throw new TypeError(\"origin invalid\");\n  const api = new URL(input.apiOrigin);\n  if (api.protocol !== \"https:\" || api.username || api.password || api.pathname !== \"/\" || api.search || api.hash ||\n      !Number.isSafeInteger(input.timeoutMs) || input.timeoutMs < 100 || input.timeoutMs > 10_000 ||\n      typeof input.telemetry !== \"boolean\" || typeof input.databaseSecretRef !== \"string\" ||\n      !/^secrets\\/[a-z0-9_-]{1,64}\\/versions\\/[1-9]\\d{0,9}$/i.test(input.databaseSecretRef)) throw new TypeError(\"configuration value invalid\");\n  return Object.freeze({ settings: Object.freeze({ apiOrigin: api.origin, timeoutMs: input.timeoutMs, telemetry: input.telemetry }),\n    secretReferences: Object.freeze({ databaseSecretRef: input.databaseSecretRef }) });\n}\n"
    },
    {
      "title": "Redact configuration by schema metadata",
      "language": "javascript",
      "blurb": "Only explicitly public bounded scalars reach logs. Internal and secret fields are redacted; unknown classifications and nested values fail closed.",
      "code": "export function configurationForLog(config, schema) {\n  if (!config || typeof config !== \"object\" || Object.keys(config).length > 100) throw new TypeError(\"configuration too large\");\n  return Object.fromEntries(Object.entries(config).map(([name, value]) => {\n    const classification = Object.hasOwn(schema, name) ? schema[name]?.classification : undefined;\n    if (![\"public\", \"internal\", \"secret\"].includes(classification)) throw new Error(\"configuration classification invalid\");\n    if (classification !== \"public\") return [name, \"[REDACTED]\"];\n    if (value instanceof URL) return [name, value.origin];\n    if (typeof value === \"string\" && value.length <= 256 && !/[\\u0000-\\u001f\\u007f]/.test(value) ||\n        typeof value === \"boolean\" || typeof value === \"number\" && Number.isFinite(value)) return [name, value];\n    throw new TypeError(\"public log value must be a bounded scalar\");\n  }));\n}\n"
    }
  ]
};
