window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply npm Dependencies, Lockfiles, and Reproducible Builds through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Describe a reproducible production dependency layer",
      "language": "javascript",
      "blurb": "The deeply immutable build policy copies lockfile inputs first and preserves the reviewed npm ci commands against caller mutation.",
      "code": "function deepFreeze(value) {\n  if (!value || typeof value !== \"object\" || Object.isFrozen(value)) return value;\n  for (const nested of Object.values(value)) deepFreeze(nested);\n  return Object.freeze(value);\n}\n\nexport const productionDependencyStage = deepFreeze([\n  { instruction: \"COPY\", sources: [\"package.json\", \"package-lock.json\"], destination: \"/app/\" },\n  { instruction: \"RUN\", command: \"npm ci --omit=dev --ignore-scripts\", network: \"registry-only\" },\n  { instruction: \"RUN\", command: \"npm cache clean --force\", network: \"none\" }\n]);\n"
    },
    {
      "title": "Validate build context exclusions",
      "language": "javascript",
      "blurb": "The check requires protected exclusions and fails closed on every negation rule so a later pattern cannot silently re-include secrets or local build state.",
      "code": "const maximumDockerIgnoreBytes = 1024 * 1024;\n\nexport function assertDockerIgnore(source) {\n  if (typeof source !== \"string\") throw new TypeError(\".dockerignore text required\");\n  if (Buffer.byteLength(source, \"utf8\") > maximumDockerIgnoreBytes) {\n    throw new RangeError(\".dockerignore exceeds byte limit\");\n  }\n  const required = [\".git\", \"node_modules\", \".env\", \".env.*\", \"coverage\", \"npm-debug.log*\"];\n  const rules = source.split(/\\r?\\n/).map((line) => line.trim())\n    .filter((line) => line && !line.startsWith(\"#\"));\n  if (rules.some((rule) => rule.startsWith(\"!\"))) {\n    throw new Error(\".dockerignore negation requires build-context inspection\");\n  }\n  const present = new Set(rules);\n  const missing = required.filter((pattern) => !present.has(pattern));\n  if (missing.length) throw new Error(\".dockerignore missing: \" + missing.join(\", \"));\n  return true;\n}\n"
    }
  ]
};
