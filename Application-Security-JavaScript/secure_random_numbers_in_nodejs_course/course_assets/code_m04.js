window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Why Math.random Is Not for Security with concrete, reviewable Node.js boundaries.",
  "codeExamples": [
    {
      "title": "Keep Math.random out of secret generation",
      "language": "javascript",
      "blurb": "The helper uses Math.random only for a visual animation delay and labels the non-security purpose in its API.",
      "code": "export function visualJitterMilliseconds() {\n  return 100 + Math.floor(Math.random() * 301);\n}\n\n// Never use this function for tokens, passwords, nonces, samples, or authorization decisions.\n"
    },
    {
      "title": "Audit source text for insecure random call sites",
      "language": "javascript",
      "blurb": "The review check flags Math.random near security-sensitive vocabulary but does not pretend a regular expression proves safety.",
      "code": "const MAXIMUM_REVIEW_SOURCE_BYTES = 1024 * 1024;\n\nexport function suspiciousRandomnessLines(sourceText) {\n  if (typeof sourceText !== \"string\" ||\n      Buffer.byteLength(sourceText, \"utf8\") > MAXIMUM_REVIEW_SOURCE_BYTES) {\n    throw new TypeError(\"bounded source text required\");\n  }\n  return Object.freeze(sourceText.split(/\\r?\\n/).flatMap((line, index) => {\n    const insecure = line.includes(\"Math.random(\");\n    const sensitive = /(token|secret|nonce|salt|session|password|sample)/i.test(line);\n    return insecure && sensitive\n      ? [Object.freeze({ line: index + 1, text: Array.from(line.trim()).slice(0, 160).join(\"\") })]\n      : [];\n  }));\n}\n\n// Use an AST-based lint rule for enforcement across real projects.\n"
    }
  ]
};
