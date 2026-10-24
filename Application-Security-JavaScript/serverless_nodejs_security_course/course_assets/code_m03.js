window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Function Packaging, Dependencies, and Runtime Hygiene with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Validate a minimal serverless deployment package",
      "language": "javascript",
      "blurb": "This supplemental build check compares locked-install evidence and handler/runtime fields to independently supplied deployment policy. It does not authenticate build provenance or replace the signed release pipeline.",
      "code": "// policy is deployment-owned and loaded independently of candidate build evidence.\nexport function validateFunctionPackage(evidence, policy) {\n  if (!Array.isArray(policy?.approvedRuntimes) || !policy.approvedRuntimes.length ||\n      policy.approvedRuntimes.some(value => typeof value !== \"string\") ||\n      typeof policy.handler !== \"string\") throw new TypeError(\"trusted deployment policy required\");\n  const failures = [];\n  if (typeof evidence?.lockfileSha256 !== \"string\" || !/^[a-f0-9]{64}$/i.test(evidence.lockfileSha256)) failures.push(\"lockfile digest missing\");\n  if (evidence?.install !== \"npm ci --omit=dev --ignore-scripts\") failures.push(\"production install not reproducible\");\n  if (!policy.approvedRuntimes.includes(evidence?.runtime)) failures.push(\"runtime not approved\");\n  if (typeof evidence?.handler !== \"string\" || !/^[a-z0-9_/-]+\\.[a-z0-9_]+$/i.test(evidence.handler) ||\n      evidence.handler.startsWith(\"/\") || evidence.handler.includes(\"//\") || evidence.handler !== policy.handler) failures.push(\"handler invalid\");\n  if (!Number.isSafeInteger(evidence?.unpackedBytes) || evidence.unpackedBytes < 0 || evidence.unpackedBytes > 50_000_000) failures.push(\"package size invalid\");\n  if (failures.length) throw new Error(\"function package rejected: \" + failures.join(\"; \"));\n  return true;\n}\n"
    },
    {
      "title": "Fail startup on an unsupported function runtime",
      "language": "javascript",
      "blurb": "The cold-start guard checks the exact major version and required platform features before accepting invocations.",
      "code": "export function assertFunctionRuntime(expectedMajor = 22) {\n  const actualMajor = Number(process.versions.node.split(\".\")[0]);\n  if (actualMajor !== expectedMajor) throw new Error(`unsupported Node.js runtime: ${actualMajor}`);\n  if (typeof fetch !== \"function\" || typeof AbortSignal.timeout !== \"function\") throw new Error(\"required runtime APIs unavailable\");\n  return { nodeMajor: actualMajor, architecture: process.arch };\n}\n"
    }
  ]
};
