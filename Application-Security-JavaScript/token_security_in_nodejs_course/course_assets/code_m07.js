window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Token Storage, Transport, Cookies, and Browser Risk through distinct, reviewable JavaScript security boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Issue a refresh token in a hardened cookie",
      "language": "javascript",
      "blurb": "The __Host- bearer cookie uses Secure, HttpOnly, SameSite, Path=/, no Domain attribute, and a validated positive bounded lifetime.",
      "code": "export function setRefreshCookie(response, token, maximumAgeMs) {\n  if (typeof token !== \"string\" || !/^[A-Za-z0-9_-]{40,200}$/.test(token)) throw new TypeError(\"refresh token invalid\");\n  if (!Number.isSafeInteger(maximumAgeMs) || maximumAgeMs <= 0 || maximumAgeMs > 30 * 24 * 60 * 60 * 1000) throw new RangeError(\"refresh-cookie lifetime invalid\");\n  response.cookie(\"__Host-refresh\", token, { secure: true, httpOnly: true, sameSite: \"strict\", path: \"/\", maxAge: maximumAgeMs });\n}\n"
    },
    {
      "title": "Reject bearer tokens in URLs and browser storage plans",
      "language": "javascript",
      "blurb": "The review rule permits authorization headers and hardened cookies while rejecting query strings, fragments, localStorage, and sessionStorage as token transport or storage.",
      "code": "export function validateBrowserTokenPlan(plan) {\n  const forbidden = [\"query\", \"fragment\", \"localStorage\", \"sessionStorage\"];\n  if (forbidden.includes(plan.transport) || forbidden.includes(plan.storage)) throw new Error(\"browser token exposure channel rejected\");\n  if (![[\"authorization-header\", \"memory\"], [\"secure-cookie\", \"httpOnly-cookie\"]].some(([transport, storage]) => plan.transport === transport && plan.storage === storage)) {\n    throw new Error(\"unsupported browser token plan\");\n  }\n  return true;\n}\n"
    }
  ]
};
