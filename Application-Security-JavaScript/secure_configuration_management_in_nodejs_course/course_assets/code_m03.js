window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Environment Variables, .env Files, and Runtime Loading through distinct, reviewable JavaScript security boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Parse typed application configuration",
      "language": "javascript",
      "blurb": "The parser converts deployment strings to bounded scalar values and an immutable HTTPS origin string, excluding credentials, paths, and URL objects whose setters could mutate validated policy.",
      "code": "export function parseApplicationConfig(environment) {\n  const text = environment.API_ORIGIN;\n  if (typeof text !== \"string\" || text.length > 2048 || /[\\u0000-\\u0020\\u007f]/.test(text)) throw new Error(\"origin invalid\");\n  const api = new URL(text);\n  const timeoutMs = Number(environment.REQUEST_TIMEOUT_MS);\n  const telemetry = new Map([[\"true\", true], [\"false\", false]]).get(environment.TELEMETRY_ENABLED);\n  if (api.protocol !== \"https:\" || api.username || api.password || api.pathname !== \"/\" || api.search || api.hash ||\n      typeof environment.REQUEST_TIMEOUT_MS !== \"string\" || !/^[1-9]\\d{2,4}$/.test(environment.REQUEST_TIMEOUT_MS) ||\n      !Number.isInteger(timeoutMs) || timeoutMs < 100 || timeoutMs > 10_000 || telemetry === undefined) throw new Error(\"typed configuration invalid\");\n  if (![\"development\", \"test\", \"production\"].includes(environment.NODE_ENV)) throw new Error(\"environment invalid\");\n  return Object.freeze({ apiOrigin: api.origin, timeoutMs, telemetry, environment: environment.NODE_ENV });\n}\n"
    },
    {
      "title": "Reject unknown security-sensitive environment names",
      "language": "javascript",
      "blurb": "Startup compares environment input to a declared schema and fails on unexpected application-prefixed variables instead of silently accepting misspelled controls.",
      "code": "export function rejectUnknownApplicationVariables(environment, declared) {\n  const unknown = Object.keys(environment).filter((name) => name.startsWith(\"APP_\") && !declared.has(name));\n  if (unknown.length) throw new Error(\"unknown application configuration: \" + unknown.sort().join(\", \"));\n  return true;\n}\n"
    }
  ]
};
