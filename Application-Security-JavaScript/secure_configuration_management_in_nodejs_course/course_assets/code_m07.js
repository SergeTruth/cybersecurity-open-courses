window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Environment Separation, Deployment, and CI/CD Controls through distinct, reviewable JavaScript security boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Promote one signed configuration artifact across environments",
      "language": "javascript",
      "blurb": "Ed25519 verification authenticates the exact artifact bytes. Independent approval lookups bind both environments to their application, version, digest and expiry; actual promotion must consume approval atomically.",
      "code": "import { createHash, verify } from \"node:crypto\";\n// publicKey, application and approvalStore are authenticated bootstrap dependencies.\nexport async function configurationPromotion(artifact, publicKey, application, approvalStore) {\n  if (!Buffer.isBuffer(artifact?.bytes) || artifact.bytes.length > 64 * 1024 ||\n      !Buffer.isBuffer(artifact.signature) || publicKey?.type !== \"public\" || publicKey.asymmetricKeyType !== \"ed25519\" ||\n      typeof application !== \"string\" || !application) throw new TypeError(\"signed artifact required\");\n  const bytes = Buffer.from(artifact.bytes), signature = Buffer.from(artifact.signature);\n  if (!verify(null, bytes, publicKey, signature)) throw new Error(\"configuration signature rejected\");\n  const digest = createHash(\"sha256\").update(bytes).digest(\"hex\");\n  const parsed = JSON.parse(new TextDecoder(\"utf-8\", { fatal: true }).decode(bytes));\n  if (parsed?.application !== application || !Number.isSafeInteger(parsed.version) || parsed.version < 1) throw new Error(\"artifact identity invalid\");\n  for (const environment of [\"test\", \"production\"]) {\n    const approval = await approvalStore.load({ application, environment, digest, version: parsed.version });\n    const expiry = Date.parse(approval?.expiresAt);\n    if (approval?.status !== \"approved\" || approval.application !== application ||\n        approval.environment !== environment || approval.digest !== digest || approval.version !== parsed.version ||\n        !Number.isFinite(expiry) || expiry <= Date.now()) throw new Error(\"authenticated promotion approval missing\");\n  }\n  return Object.freeze({ digest, application, version: parsed.version });\n  // Evidence only; the deployment service atomically consumes approval when promoting.\n}\n"
    },
    {
      "title": "Reject environment identity embedded in reusable artifacts",
      "language": "javascript",
      "blurb": "The supplemental build scan reports only source indices and a fixed rule, never matching values, secret indicators, or raw previews. It is not a complete secret detector.",
      "code": "export function environmentLeakFindings(strings, productionIndicators) {\n  if (!Array.isArray(strings) || strings.length > 10_000 || strings.some(value => typeof value !== \"string\" || value.length > 1_000_000) ||\n      !Array.isArray(productionIndicators) || productionIndicators.length > 1000 ||\n      productionIndicators.some(value => typeof value !== \"string\" || !value || value.length > 4096)) throw new TypeError(\"scan input invalid\");\n  return strings.flatMap((value, index) => productionIndicators.some(indicator => value.includes(indicator))\n    ? [{ index, rule: \"environment-bound-value\", redacted: true }] : []);\n}\n"
    }
  ]
};
