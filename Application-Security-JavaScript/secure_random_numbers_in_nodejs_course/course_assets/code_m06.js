window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Random Integers, Ranges, and Bias with concrete, reviewable Node.js boundaries.",
  "codeExamples": [
    {
      "title": "Choose an unbiased random integer",
      "language": "javascript",
      "blurb": "crypto.randomInt uses rejection sampling internally, so every integer in the half-open range has equal probability.",
      "code": "import { randomInt } from \"node:crypto\";\n\nexport function chooseShard(shardCount) {\n  if (!Number.isSafeInteger(shardCount) || shardCount < 1 || shardCount > 1024) throw new RangeError(\"invalid shard count\");\n  return randomInt(0, shardCount);\n}\n"
    },
    {
      "title": "Implement rejection sampling without modulo bias",
      "language": "javascript",
      "blurb": "Out-of-range byte values are discarded before modulo reduction so uneven remainders do not favor some outcomes.",
      "code": "import { randomBytes } from \"node:crypto\";\n\nexport function unbiasedByteRange(maxExclusive) {\n  if (!Number.isInteger(maxExclusive) || maxExclusive < 1 || maxExclusive > 256) throw new RangeError(\"invalid range\");\n  const ceiling = 256 - (256 % maxExclusive);\n  for (;;) {\n    const value = randomBytes(1)[0];\n    if (value < ceiling) return value % maxExclusive;\n  }\n}\n"
    }
  ]
};
