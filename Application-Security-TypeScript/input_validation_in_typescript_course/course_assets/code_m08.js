window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Test and Review Validation Rules",
  "codeExamples": [
    {
      "title": "Test Boundaries and Malformed Values",
      "language": "typescript",
      "code": "import { describe, expect, test } from \"vitest\";\n\ndescribe(\"parseSignup\", () => {\n  test(\"accepts a valid signup\", () => {\n    expect(parseSignup({ email: \"A@example.com\", age: 25 }).ok).toBe(true);\n  });\n\n  test.each([\n    null,\n    [],\n    { email: \"not-email\", age: 25 },\n    { email: \"a@example.com\", age: 12 },\n    { email: \"a@example.com\", age: 121 },\n    { email: \"a@example.com\", age: \"not-a-number\" },\n  ])(\"rejects malformed signup %#\", (payload) => {\n    const result = parseSignup(payload);\n    expect(result.ok).toBe(false);\n  });\n});"
    },
    {
      "title": "Use Property-Based Tests for Edge Shapes",
      "language": "typescript",
      "code": "import fc from \"fast-check\";\nimport { expect, test } from \"vitest\";\n\ntest(\"parseProfilePatch never accepts blocked keys\", () => {\n  fc.assert(\n    fc.property(fc.string(), fc.anything(), (key, value) => {\n      const payload = { [key]: value, __proto__: { admin: true } };\n      expect(() => parseProfilePatch(payload)).toThrow();\n    }),\n  );\n});\n\ntest(\"allowed profile fields remain bounded\", () => {\n  fc.assert(\n    fc.property(fc.string({ maxLength: 500 }), (displayName) => {\n      const parsed = parseProfilePatch({ displayName });\n      expect(parsed.displayName?.length ?? 0).toBeLessThanOrEqual(500);\n    }),\n  );\n});"
    },
    {
      "title": "Log Validation Failures Without Sensitive Values",
      "language": "typescript",
      "code": "export function validationFailureLog(event: {\n  requestId: string;\n  route: string;\n  fieldNames: string[];\n  userId?: string;\n}) {\n  return {\n    level: \"warn\",\n    eventType: \"validation_failure\",\n    requestId: event.requestId,\n    route: event.route,\n    userId: event.userId ?? \"anonymous\",\n    fieldNames: event.fieldNames,\n  };\n}\n\nlogger.warn(validationFailureLog({\n  requestId: \"req_123\",\n  route: \"PATCH /profile\",\n  fieldNames: [\"displayName\", \"timezone\"],\n}));"
    }
  ]
};
