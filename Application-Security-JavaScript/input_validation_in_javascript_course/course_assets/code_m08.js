window.COURSE_CODE_MODULE = {
  "title": "Code Example: Testing Boundaries",
  "codeExamples": [
    {
      "title": "Code Example: Testing Boundaries",
      "language": "javascript",
      "code": "import { describe, expect, test } from \"vitest\";\n\nfunction validateQuantity(value) {\n  if (!Number.isInteger(value)) {\n    throw new Error(\"quantity must be an integer\");\n  }\n  if (value < 1 || value > 100) {\n    throw new Error(\"quantity must be between 1 and 100\");\n  }\n  return value;\n}\n\ndescribe(\"validateQuantity\", () => {\n  test.each([1, 50, 100])(\"accepts %i\", (value) => {\n    expect(validateQuantity(value)).toBe(value);\n  });\n\n  test.each([0, 101, \"5\", null, NaN])(\"rejects %p\", (value) => {\n    expect(() => validateQuantity(value)).toThrow();\n  });\n});"
    }
  ]
};
