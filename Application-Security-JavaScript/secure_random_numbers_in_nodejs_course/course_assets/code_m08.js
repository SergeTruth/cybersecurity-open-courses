window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply UUIDs, Public IDs, and Secret Identifiers with concrete, reviewable Node.js boundaries.",
  "codeExamples": [
    {
      "title": "Separate public IDs from secret capabilities",
      "language": "javascript",
      "blurb": "A UUID supports public correlation, while an independent 256-bit token carries the bearer capability.",
      "code": "import { randomBytes, randomUUID } from \"node:crypto\";\n\nexport function issueDownloadCapability() {\n  return { publicId: randomUUID(), secret: randomBytes(32).toString(\"base64url\") };\n}\n"
    },
    {
      "title": "Estimate collision probability before selecting a size",
      "language": "javascript",
      "blurb": "The birthday approximation uses expm1 to retain tiny nonzero probabilities within JavaScript Number precision; it does not make public IDs secret.",
      "code": "export function approximateCollisionProbability(bits, issued) {\n  if (!Number.isInteger(bits) || bits < 32 || bits > 256) throw new RangeError(\"invalid bit count\");\n  if (!Number.isSafeInteger(issued) || issued < 0) throw new RangeError(\"invalid issuance count\");\n  const space = 2 ** bits;\n  const exponent = -(issued * Math.max(0, issued - 1)) / (2 * space);\n  return -Math.expm1(exponent);\n}\n"
    }
  ]
};
