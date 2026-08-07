window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Logging, Error Handling, and Secret Redaction through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Redact values using explicit data classification",
      "language": "javascript",
      "blurb": "The logger accepts only bounded enumerable own data fields under an application-owned classification map, copies primitive public or internal values, redacts secret classes, and freezes the record.",
      "code": "const LOG_FIELD_POLICY = new Map([\n  [\"requestId\", \"public\"],\n  [\"operation\", \"public\"],\n  [\"component\", \"internal\"],\n  [\"secretName\", \"secret\"],\n  [\"secretVersion\", \"secret\"]\n]);\nconst MAXIMUM_LOG_FIELDS = 16;\nconst MAXIMUM_LOG_TEXT_BYTES = 256;\n\nfunction safeLogValue(value) {\n  if (typeof value === \"string\") {\n    if (Buffer.byteLength(value, \"utf8\") > MAXIMUM_LOG_TEXT_BYTES ||\n        /[\\u0000-\\u001f\\u007f]/.test(value)) {\n      throw new TypeError(\"bounded log text required\");\n    }\n    return value;\n  }\n  if (typeof value === \"boolean\") return value;\n  if (typeof value === \"number\" && Number.isFinite(value)) return value;\n  throw new TypeError(\"primitive log value required\");\n}\n\nexport function classifiedLogRecord(fields) {\n  if (!fields || typeof fields !== \"object\" || Array.isArray(fields) ||\n      ![Object.prototype, null].includes(Object.getPrototypeOf(fields))) {\n    throw new TypeError(\"bounded log fields required\");\n  }\n  const descriptors = Object.getOwnPropertyDescriptors(fields);\n  const keys = Reflect.ownKeys(descriptors);\n  if (keys.length > MAXIMUM_LOG_FIELDS || keys.some((name) =>\n      typeof name !== \"string\" || !descriptors[name].enumerable ||\n      !(\"value\" in descriptors[name]))) {\n    throw new TypeError(\"bounded log fields required\");\n  }\n  const record = {};\n  for (const name of keys) {\n    const value = descriptors[name].value;\n    const classification = LOG_FIELD_POLICY.get(name);\n    if (!classification) throw new TypeError(\"unknown log field\");\n    record[name] = classification === \"secret\" ? \"[REDACTED]\" : safeLogValue(value);\n  }\n  return Object.freeze(record);\n}\n"
    },
    {
      "title": "Map secret-manager failures to fixed diagnostics",
      "language": "javascript",
      "blurb": "The error boundary exposes only an approved code and retry classification, excluding secret names, versions, provider messages, and returned values.",
      "code": "function safeErrorName(error) {\n  try { return typeof error?.name === \"string\" ? error.name : undefined; }\n  catch { return undefined; }\n}\n\nexport function secretAccessDiagnostic(error) {\n  const codes = new Map([[\"PermissionDenied\", [\"SECRET_ACCESS_DENIED\", false]], [\"Unavailable\", [\"SECRET_MANAGER_UNAVAILABLE\", true]],\n    [\"NotFound\", [\"SECRET_REFERENCE_INVALID\", false]]]);\n  const [code, retryable] = codes.get(safeErrorName(error)) ??\n    [\"SECRET_ACCESS_FAILED\", false];\n  return Object.freeze({ event: \"secret_access_failed\", code, retryable });\n}\n"
    }
  ]
};
