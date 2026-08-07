window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Environment Variables and Runtime Delivery through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Map runtime environment to secret references only",
      "language": "javascript",
      "blurb": "The mapper accepts exactly three own data fields, rejects embedded secret values and inherited or accessor-backed entries, and returns only explicit versioned secret references plus a closed environment value.",
      "code": "const runtimeNames = new Set([\"DATABASE_SECRET_REF\", \"PAYMENT_SECRET_REF\", \"NODE_ENV\"]);\nconst runtimeEnvironments = new Set([\"development\", \"test\", \"production\"]);\n\nfunction exactDataRecord(value, fields) {\n  if (!value || typeof value !== \"object\" || Array.isArray(value) ||\n      ![Object.prototype, null].includes(Object.getPrototypeOf(value))) return null;\n  const descriptors = Object.getOwnPropertyDescriptors(value);\n  const keys = Reflect.ownKeys(descriptors);\n  if (keys.length !== fields.size || keys.some((key) =>\n      typeof key !== \"string\" || !fields.has(key) ||\n      !descriptors[key].enumerable || !(\"value\" in descriptors[key]))) return null;\n  return Object.freeze(Object.fromEntries(\n    keys.map((key) => [key, descriptors[key].value])\n  ));\n}\n\nexport function secretRuntimeConfig(environment) {\n  const selected = exactDataRecord(environment, runtimeNames);\n  if (!selected) throw new TypeError(\"exact narrowed runtime environment required\");\n  const database = selected.DATABASE_SECRET_REF;\n  const payment = selected.PAYMENT_SECRET_REF;\n  const nodeEnvironment = selected.NODE_ENV;\n  for (const reference of [database, payment]) {\n    if (typeof reference !== \"string\" ||\n        !/^secrets\\/[a-z0-9_-]{1,128}\\/versions\\/\\d{1,20}$/i.test(reference)) {\n      throw new Error(\"versioned secret reference required\");\n    }\n  }\n  if (!runtimeEnvironments.has(nodeEnvironment)) throw new Error(\"runtime environment invalid\");\n  return Object.freeze({ database, payment, environment: nodeEnvironment });\n}\n"
    },
    {
      "title": "Clear an owned secret buffer after callback use",
      "language": "javascript",
      "blurb": "The callback receives a nonempty bounded copy controlled by the helper, which is always zeroed afterward under an explicit contract forbidding retention or derived copies.",
      "code": "const MAXIMUM_OWNED_SECRET_BYTES = 64 * 1024;\nconst clearBuffer = Function.prototype.call.bind(Buffer.prototype.fill);\n\nexport async function withOwnedSecret(manager, reference, operation) {\n  const rawAccessCapability = manager?.access;\n  const access = typeof rawAccessCapability === \"function\"\n    ? rawAccessCapability.bind(manager)\n    : null;\n  if (!access || typeof operation !== \"function\") {\n    throw new TypeError(\"secret manager and operation required\");\n  }\n  const borrowed = await access(reference);\n  if (!Buffer.isBuffer(borrowed) || borrowed.length < 1 ||\n      borrowed.length > MAXIMUM_OWNED_SECRET_BYTES) {\n    throw new TypeError(\"nonempty bounded secret buffer required\");\n  }\n  const owned = Buffer.from(borrowed);\n  try { return await operation(owned); }\n  finally { clearBuffer(owned, 0); }\n}\n"
    }
  ]
};
