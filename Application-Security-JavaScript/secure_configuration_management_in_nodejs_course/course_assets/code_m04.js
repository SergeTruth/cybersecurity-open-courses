window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Configuration Validation and Fail-Safe Startup through distinct, reviewable JavaScript security boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Validate cross-field startup invariants",
      "language": "javascript",
      "blurb": "Configuration is rejected when cookie security, proxy trust, public origin, and deployment mode disagree even if each individual value is well formed.",
      "code": "export function validateStartupInvariants(config) {\n  const failures = [];\n  if (config.environment === \"production\" && config.cookieSecure !== true) failures.push(\"secure cookies required\");\n  if (config.trustProxy && !config.proxyCidrs?.length) failures.push(\"trusted proxy ranges missing\");\n  const origin = typeof config.publicOrigin === \"string\" ? new URL(config.publicOrigin) : null;\n  if (config.environment === \"production\" && (!origin || origin.protocol !== \"https:\" || origin.username || origin.password)) failures.push(\"HTTPS public origin required\");\n  if (failures.length) throw new Error(\"configuration invariants failed: \" + failures.join(\"; \"));\n  return true;\n}\n"
    },
    {
      "title": "Fail startup before opening network listeners",
      "language": "javascript",
      "blurb": "The orchestration snapshots bounded plain-JSON configuration before opening resources. Service adapters own bounded startup/rollback; production composition must close already-opened resources if a later startup stage fails.",
      "code": "export async function bootstrapApplication(services) {\n  const raw = await services.configuration.load();\n  const validated = services.configuration.validate(raw);\n  let nodes = 0;\n  const seen = new Set();\n  const snapshot = (value, depth = 0) => {\n    if (++nodes > 10_000 || depth > 32) throw new RangeError(\"configuration budget exceeded\");\n    if (value === null || typeof value === \"string\" || typeof value === \"boolean\" ||\n        typeof value === \"number\" && Number.isFinite(value)) return value;\n    if (!value || typeof value !== \"object\" || seen.has(value)) throw new TypeError(\"acyclic JSON configuration required\");\n    seen.add(value);\n    if (Array.isArray(value)) return Object.freeze(value.map(item => snapshot(item, depth + 1)));\n    if (![Object.prototype, null].includes(Object.getPrototypeOf(value))) throw new TypeError(\"plain configuration required\");\n    return Object.freeze(Object.fromEntries(Object.entries(value).map(([key, nested]) => [key, snapshot(nested, depth + 1)])));\n  };\n  const config = snapshot(validated);\n  const database = await services.database.connect(config.database);\n  const workers = await services.workers.start(config.workers);\n  const server = await services.http.listen(config.http);\n  return { config, database, workers, server };\n}\n"
    }
  ]
};
