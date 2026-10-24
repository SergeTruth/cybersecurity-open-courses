window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Worker Runtime Security and Resource Controls with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Bound active work and the in-memory waiting queue",
      "language": "javascript",
      "blurb": "The gate caps both active tasks and queued waiters, rejecting excess deliveries so the caller can pause broker consumption instead of retaining them.",
      "code": "export function createConcurrencyGate(limit, maxWaiting = limit * 2) {\n  if (!Number.isInteger(limit) || limit < 1 || limit > 64) throw new RangeError(\"invalid concurrency\");\n  if (!Number.isInteger(maxWaiting) || maxWaiting < 0 || maxWaiting > 1024) throw new RangeError(\"invalid waiting limit\");\n  let active = 0;\n  const waiting = [];\n  return async function run(task) {\n    if (typeof task !== \"function\") throw new TypeError(\"task required\");\n    if (active < limit) active += 1;\n    else {\n      if (waiting.length >= maxWaiting) throw new Error(\"worker queue full; pause broker consumption\");\n      await new Promise(resolve => waiting.push(resolve));\n      // The releasing task transferred its already-counted permit to us.\n    }\n    try { return await task(); }\n    finally {\n      const next = waiting.shift();\n      if (next) next();\n      else active -= 1;\n    }\n  };\n}\n"
    },
    {
      "title": "Stop a worker with an explicit drain deadline",
      "language": "javascript",
      "blurb": "The example bounds only the in-flight drain period and always attempts channel close. The adapter must independently bound pauseConsumption and close; this is not a hard total-shutdown deadline.",
      "code": "// Adapter contract: pauseConsumption() and close() have their own transport deadlines.\n// timeoutMs below bounds only waiting for in-flight handlers, not total shutdown.\nexport async function drainWorker(channel, inFlight, timeoutMs = 10_000) {\n  if (!Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 300_000) throw new RangeError(\"invalid drain deadline\");\n  let timer;\n  try {\n    await channel.pauseConsumption();\n    const drained = Promise.allSettled([...inFlight]);\n    const timeout = new Promise((_, reject) => {\n      timer = setTimeout(() => reject(new Error(\"worker drain timed out\")), timeoutMs);\n    });\n    await Promise.race([drained, timeout]);\n  } finally {\n    clearTimeout(timer);\n    await channel.close();\n  }\n}\n"
    }
  ]
};
