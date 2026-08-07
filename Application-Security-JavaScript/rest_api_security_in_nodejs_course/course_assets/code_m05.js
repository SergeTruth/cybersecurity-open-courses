window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Input Validation, Parsing, and Data Handling with concrete, reviewable Node.js boundaries.",
  "codeExamples": [
    {
      "title": "Reject unknown REST payload fields",
      "language": "javascript",
      "blurb": "The parser accepts exactly two own data fields, rejects prototypes, accessors, unknowns, controls, and noncanonical display text, and returns a frozen profile DTO.",
      "code": "function validatedDisplayName(value) {\n  if (typeof value !== \"string\" || value.length < 1 || value.trim() !== value ||\n      value !== value.normalize(\"NFC\") || Buffer.byteLength(value, \"utf8\") > 100 ||\n      /[\\u0000-\\u001f\\u007f]/.test(value)) {\n    throw new TypeError(\"invalid displayName\");\n  }\n  return value;\n}\n\nconst PROFILE_FIELDS = new Set([\"displayName\", \"locale\"]);\n\nfunction exactDataRecord(value, fields) {\n  if (!value || typeof value !== \"object\" || Array.isArray(value) ||\n      ![Object.prototype, null].includes(Object.getPrototypeOf(value))) return null;\n  const descriptors = Object.getOwnPropertyDescriptors(value);\n  const keys = Reflect.ownKeys(descriptors);\n  if (keys.length !== fields.size || keys.some((key) =>\n      typeof key !== \"string\" || !fields.has(key) ||\n      !descriptors[key].enumerable || !(\"value\" in descriptors[key]))) return null;\n  return Object.freeze(Object.fromEntries(\n    keys.map((key) => [key, descriptors[key].value])\n  ));\n}\n\nexport function parseProfilePayload(input) {\n  const selected = exactDataRecord(input, PROFILE_FIELDS);\n  if (!selected) throw new TypeError(\"exact JSON profile object required\");\n  const suppliedDisplayName = selected.displayName;\n  const locale = selected.locale;\n  const displayName = validatedDisplayName(suppliedDisplayName);\n  if (![\"en\", \"es\", \"fr\"].includes(locale)) throw new TypeError(\"invalid locale\");\n  return Object.freeze({ displayName, locale });\n}\n"
    },
    {
      "title": "Configure a JSON parser with an actual byte limit",
      "language": "javascript",
      "blurb": "The framework parser counts received bytes with inflation disabled, so missing or understated Content-Length headers cannot bypass the body limit.",
      "code": "export function requireJsonBody(express, maxBytes = 32 * 1024) {\n  if (!Number.isInteger(maxBytes) || maxBytes < 1024 || maxBytes > 1024 * 1024) throw new RangeError(\"invalid JSON body limit\");\n  const parse = express.json({ type: \"application/json\", limit: maxBytes, strict: true, inflate: false });\n  return function jsonBoundary(request, response, next) {\n    if (!request.is(\"application/json\")) return response.status(415).json({ error: { code: \"UNSUPPORTED_MEDIA_TYPE\" } });\n    return parse(request, response, next);\n  };\n}\n"
    }
  ]
};
