window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Performance, Testing, Logging, and Code Review with concrete, reviewable Node.js boundaries.",
  "codeExamples": [
    {
      "title": "Keep production token generation bound to the CSPRNG",
      "language": "javascript",
      "blurb": "Production token issuance calls crypto.randomBytes directly and exposes no injectable randomness seam; deterministic generators belong in test-only modules outside the production dependency graph.",
      "code": "import { randomBytes } from \"node:crypto\";\n\nexport function issueSecureToken(bytes = 32) {\n  if (!Number.isInteger(bytes) || bytes < 16 || bytes > 64) {\n    throw new RangeError(\"invalid token size\");\n  }\n  return randomBytes(bytes).toString(\"base64url\");\n}\n"
    },
    {
      "title": "Log randomness operations without random values",
      "language": "javascript",
      "blurb": "Telemetry records purpose, byte count, API, and outcome while excluding tokens, salts, nonces, keys, and samples.",
      "code": "const PURPOSE_BYTES = new Map([\n  [\"session\", 32],\n  [\"reset-token\", 32],\n  [\"aes-gcm-nonce\", 12],\n  [\"password-salt\", 16]\n]);\n\nexport function randomnessTelemetry(purpose, bytes, outcome) {\n  if (typeof purpose !== \"string\" || PURPOSE_BYTES.get(purpose) !== bytes ||\n      typeof outcome !== \"boolean\") {\n    throw new TypeError(\"randomness telemetry rejected\");\n  }\n  return Object.freeze({\n    event: \"secure_random_generated\", purpose, bytes, api: \"node:crypto\",\n    outcome: outcome ? \"success\" : \"failure\"\n  });\n}\n"
    }
  ]
};
