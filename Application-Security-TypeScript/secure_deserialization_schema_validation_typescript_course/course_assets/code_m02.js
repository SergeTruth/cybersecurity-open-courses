window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "This small TypeScript validator illustrates executable checks without choosing a schema library. It validates one value, not a complete request boundary.",
  "codeExamples": [
    {
      "title": "unknown requires narrowing; the checks provide evidence",
      "language": "typescript",
      "blurb": "The function returns only a safe integer within the stated range. The surrounding request still needs shape checks, resource limits, semantic rules, and authorization.",
      "code": "function parseQuantity(value: unknown): number {\n  if (typeof value !== \"number\") {\n    throw new Error(\"Invalid quantity\");\n  }\n  if (!Number.isSafeInteger(value) || value < 1 || value > 100) {\n    throw new Error(\"Invalid quantity\");\n  }\n  return value;\n}\n\n// A typed parameter alone would not perform these checks."
    }
  ]
};
