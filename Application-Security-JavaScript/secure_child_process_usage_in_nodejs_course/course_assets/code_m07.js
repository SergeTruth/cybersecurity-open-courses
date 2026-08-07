window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Output, Errors, Streams, and Lifecycle Control through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Interpret child exit code and signal separately",
      "language": "javascript",
      "blurb": "The result distinguishes normal success, tool rejection, forced termination, and infrastructure failure rather than treating every close event as equivalent.",
      "code": "const CHILD_SIGNAL = /^SIG[A-Z0-9]{2,12}$/;\n\nexport function classifyChildExit(code, signal) {\n  if (signal !== null && signal !== undefined) {\n    if (code !== null || typeof signal !== \"string\" || !CHILD_SIGNAL.test(signal)) {\n      throw new TypeError(\"child close result invalid\");\n    }\n    return Object.freeze({ outcome: \"terminated\", signal });\n  }\n  if (code === null || code === undefined) {\n    return Object.freeze({ outcome: \"launch-failed\" });\n  }\n  if (!Number.isSafeInteger(code) || code < 0 || code > 255) {\n    throw new TypeError(\"child close result invalid\");\n  }\n  if (code === 0) return Object.freeze({ outcome: \"success\" });\n  if (code === 2) return Object.freeze({ outcome: \"input-rejected\" });\n  return Object.freeze({ outcome: \"tool-failed\", code });\n}\n"
    },
    {
      "title": "Drain stderr without returning it to the client",
      "language": "javascript",
      "blurb": "The bounded sink prevents pipe blockage while retaining only a small internal diagnostic preview that must pass a separate redaction boundary.",
      "code": "const MAXIMUM_DIAGNOSTIC_BYTES = 64 * 1024;\nconst MAXIMUM_OBSERVED_BYTES = 1024 * 1024 * 1024;\n\nexport async function drainDiagnosticStream(stream, maximumBytes = 8192) {\n  const rawIterator = stream?.[Symbol.asyncIterator];\n  if (!Number.isSafeInteger(maximumBytes) || maximumBytes < 1 ||\n      maximumBytes > MAXIMUM_DIAGNOSTIC_BYTES ||\n      typeof rawIterator !== \"function\") {\n    throw new RangeError(\"bounded diagnostic stream and preview limit required\");\n  }\n  const iterator = rawIterator.call(stream);\n  if (!iterator || typeof iterator.next !== \"function\") {\n    throw new TypeError(\"diagnostic async iterator required\");\n  }\n  const capturedStream = Object.freeze({\n    [Symbol.asyncIterator]: () => iterator\n  });\n  const chunks = [];\n  let retained = 0;\n  let observed = 0;\n  for await (const chunk of capturedStream) {\n    if (!Buffer.isBuffer(chunk)) {\n      throw new TypeError(\"diagnostic stream must emit Buffer chunks\");\n    }\n    if (chunk.length > MAXIMUM_OBSERVED_BYTES - observed) {\n      throw new RangeError(\"diagnostic stream exceeds observed byte limit\");\n    }\n    observed += chunk.length;\n    if (retained < maximumBytes) {\n      const count = Math.min(chunk.length, maximumBytes - retained);\n      chunks.push(Buffer.from(chunk.subarray(0, count)));\n      retained += count;\n    }\n  }\n  return Object.freeze({\n    observedBytes: observed,\n    preview: Buffer.concat(chunks, retained).toString(\"utf8\")\n  });\n}\n"
    }
  ]
};
