window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Runtime Hardening, Resource Limits, and Observability through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Build a hardened container runtime policy",
      "language": "javascript",
      "blurb": "A deeply immutable policy drops capabilities, blocks new privileges, and fixes memory, CPU, process, filesystem, and temporary-storage limits.",
      "code": "function deepFreeze(value) {\n  if (!value || typeof value !== \"object\" || Object.isFrozen(value)) return value;\n  for (const nested of Object.values(value)) deepFreeze(nested);\n  return Object.freeze(value);\n}\n\nexport function hardenedRuntimePolicy() {\n  return deepFreeze({\n    readOnlyRootFilesystem: true,\n    allowPrivilegeEscalation: false,\n    capabilities: { drop: [\"ALL\"], add: [] },\n    seccompProfile: \"RuntimeDefault\",\n    resources: { memoryBytes: 256 * 1024 * 1024, cpuMillis: 500, pids: 64 },\n    tmpfs: [{ path: \"/tmp\", maximumBytes: 32 * 1024 * 1024, mode: 0o700 }]\n  });\n}\n"
    },
    {
      "title": "Define a dependency-aware container health check",
      "language": "javascript",
      "blurb": "The check invokes a local, coarse readiness endpoint with fixed timing and does not expose configuration, credentials, or internal dependency details.",
      "code": "export function nodeHealthcheck(port = 3000) {\n  if (!Number.isInteger(port) || port < 1024 || port > 65535) {\n    throw new RangeError(\"invalid application port\");\n  }\n  const test = Object.freeze([\n    \"CMD\", \"node\", \"-e\",\n    \"fetch('http://127.0.0.1:\" + port + \"/ready').then(r=>{if(!r.ok)process.exit(1)})\"\n  ]);\n  return Object.freeze({\n    test, intervalSeconds: 30, timeoutSeconds: 3, retries: 3, startPeriodSeconds: 10\n  });\n}\n"
    }
  ]
};
