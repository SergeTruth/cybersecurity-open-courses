window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Function Identity, IAM, and Least Privilege with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Validate a least-privilege function role",
      "language": "javascript",
      "blurb": "The policy check rejects wildcards and requires exact actions and resources for the function's declared purpose.",
      "code": "export function validateFunctionRole(policy, requirements) {\n  if (!Array.isArray(policy?.Statement) || !Array.isArray(requirements)) throw new TypeError(\"role policy and requirements required\");\n  const required = new Set(requirements.map(({ action, resource }) => {\n    if (typeof action !== \"string\" || typeof resource !== \"string\" || action.match(/[?*]/) || resource.match(/[?*]/)) {\n      throw new TypeError(\"exact required grant expected\");\n    }\n    return `${action}\\u0000${resource}`;\n  }));\n  const actual = new Set();\n  for (const statement of policy.Statement) {\n    const actions = Array.isArray(statement.Action) ? statement.Action : [statement.Action];\n    const resources = Array.isArray(statement.Resource) ? statement.Resource : [statement.Resource];\n    if (statement.Effect !== \"Allow\" || actions.some((value) => typeof value !== \"string\" || value.match(/[?*]/)) ||\n        resources.some((value) => typeof value !== \"string\" || value.match(/[?*]/))) throw new Error(\"non-exact function grant rejected\");\n    for (const action of actions) for (const resource of resources) actual.add(`${action}\\u0000${resource}`);\n  }\n  if (actual.size !== required.size || [...actual].some((grant) => !required.has(grant))) throw new Error(\"function grants differ from requirements\");\n  return true;\n}\n"
    },
    {
      "title": "Use provider-authenticated invocation identity",
      "language": "javascript",
      "blurb": "Authorization reads the principal and claims established by the platform authorizer, never identity fields copied from the request body.",
      "code": "export function invocationIdentity(event) {\n  const claims = event?.requestContext?.authorizer?.jwt?.claims;\n  const id = value => typeof value === \"string\" && /^[A-Za-z0-9_-]{1,128}$/.test(value);\n  if (!id(claims?.sub) || !id(claims?.tenant_id) ||\n      (claims.scope !== undefined && (typeof claims.scope !== \"string\" || claims.scope.length > 2048 ||\n        !/^[A-Za-z0-9:._/-]+(?: [A-Za-z0-9:._/-]+)*$/.test(claims.scope)))) throw new Error(\"authenticated invocation required\");\n  return Object.freeze({ subjectId: claims.sub, tenantId: claims.tenant_id,\n    scopes: Object.freeze((claims.scope ?? \"\").split(\" \").filter(Boolean)) });\n}\n"
    }
  ]
};
