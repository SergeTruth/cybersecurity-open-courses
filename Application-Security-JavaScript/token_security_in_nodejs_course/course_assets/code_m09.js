window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Logging, Monitoring, Leak Response, and Code Review through distinct, reviewable JavaScript security boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Log a non-reversible token event fingerprint",
      "language": "javascript",
      "blurb": "Telemetry hashes a server-generated token record identifier, not the bearer token, and records only a fixed action and outcome vocabulary.",
      "code": "import { createHash } from \"node:crypto\";\nconst actions = new Set([\"issued\", \"used\", \"rotated\", \"revoked\", \"replay-detected\"]);\nexport function tokenSecurityEvent(recordId, action, outcome) {\n  if (!actions.has(action)) throw new TypeError(\"unknown token action\");\n  return { event: \"token_security\", recordHash: createHash(\"sha256\").update(recordId).digest(\"hex\").slice(0, 16),\n    action, outcome: outcome === \"success\" ? \"success\" : \"failure\" };\n}\n"
    },
    {
      "title": "Create a token-leak response plan",
      "language": "javascript",
      "blurb": "The plan scopes revocation by token, family, client, and subject while preserving evidence and avoiding raw token values in incident records.",
      "code": "export function tokenLeakPlan(finding) {\n  if (!finding?.recordId || !finding?.subjectId || !finding?.detectedAt) throw new TypeError(\"token leak evidence incomplete\");\n  return { actions: [\n    { type: \"revoke-token\", recordId: finding.recordId },\n    ...(finding.familyId ? [{ type: \"revoke-family\", familyId: finding.familyId }] : []),\n    { type: \"revoke-sessions\", subjectId: finding.subjectId },\n    { type: \"rotate-client\", clientId: finding.clientId ?? null }\n  ], evidence: { detectedAt: finding.detectedAt, channel: finding.channel } };\n}\n"
    }
  ]
};
