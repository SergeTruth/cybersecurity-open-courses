window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Logging, Monitoring, CI/CD, and Incident Response with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Emit bounded serverless invocation telemetry",
      "language": "javascript",
      "blurb": "The record uses request context and coarse outcomes without logging bodies, tokens, secrets, provider events, or exception messages.",
      "code": "export function invocationTelemetry(context, outcome, elapsedMs) {\n  return { event: \"function_invocation\", functionName: String(context.functionName).slice(0, 64),\n    requestId: String(context.awsRequestId ?? context.requestId).slice(0, 80), coldStart: Boolean(context.coldStart),\n    outcome: outcome === \"success\" ? \"success\" : \"failure\",\n    durationBucket: elapsedMs < 100 ? \"lt100ms\" : elapsedMs < 1000 ? \"lt1s\" : \"gte1s\",\n    remainingBucket: context.getRemainingTimeInMillis() < 1000 ? \"lt1s\" : \"gte1s\" };\n}\n"
    },
    {
      "title": "Roll back an alias and disable compromised event sources",
      "language": "javascript",
      "blurb": "The trusted control-plane adapter authenticates and binds approval to the exact function and versions at each mutation. Operations must be idempotent and resumable: the sequence is not atomic across cloud APIs, and partial failures require reconciliation.",
      "code": "// Application-owned control plane authenticates the operator and approval.\n// Each mutation atomically rechecks/consumes its step authorization against this exact request.\nexport async function containFunctionIncident(controlPlane, functionName, compromisedVersion, safeVersion, approvalId) {\n  const version = value => typeof value === \"string\" && /^[1-9]\\d{0,9}$/.test(value);\n  if (typeof functionName !== \"string\" || !/^[A-Za-z0-9_-]{1,64}$/.test(functionName) ||\n      !version(compromisedVersion) || !version(safeVersion) || compromisedVersion === safeVersion ||\n      typeof approvalId !== \"string\" || !/^[A-Za-z0-9_-]{8,128}$/.test(approvalId)) throw new TypeError(\"containment request invalid\");\n  const request = Object.freeze({ functionName, compromisedVersion, safeVersion, approvalId });\n  // Early feedback, not a reusable authorization capability.\n  if (await controlPlane.requireIncidentApproval(request) !== true) throw new Error(\"containment approval rejected\");\n  await controlPlane.updateAlias({ ...request, alias: \"production\", version: safeVersion, routing: {} });\n  await controlPlane.disableEventSources({ ...request, qualifier: compromisedVersion });\n  await controlPlane.denyVersionInvocation({ ...request, qualifier: compromisedVersion });\n  await controlPlane.recordIncidentAction(request);\n  return { contained: true, activeVersion: safeVersion };\n}\n"
    }
  ]
};
