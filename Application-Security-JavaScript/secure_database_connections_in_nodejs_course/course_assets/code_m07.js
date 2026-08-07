window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Network Exposure, Deployment Context, and Environment Separation through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Reject database endpoints outside the deployment environment",
      "language": "javascript",
      "blurb": "Environment policy binds approved host labels and network zones, requires Boolean exposure evidence, and requires production endpoints to be non-public.",
      "code": "export function validateDatabaseEnvironment(endpoint, environment, policy) {\n  const host = endpoint?.host;\n  const networkZone = endpoint?.networkZone;\n  const publiclyRoutable = endpoint?.publiclyRoutable;\n  if (!endpoint || typeof endpoint !== \"object\" || Array.isArray(endpoint) ||\n      typeof host !== \"string\" || typeof networkZone !== \"string\" ||\n      typeof publiclyRoutable !== \"boolean\") {\n    throw new TypeError(\"database endpoint evidence invalid\");\n  }\n  const allowed = policy?.[environment];\n  const allowedHosts = allowed?.hosts;\n  const allowedZone = allowed?.networkZone;\n  if (!allowed || !(allowedHosts instanceof Set) ||\n      !Set.prototype.has.call(allowedHosts, host) || networkZone !== allowedZone) {\n    throw new Error(\"database endpoint outside environment policy\");\n  }\n  if (environment === \"production\" && publiclyRoutable !== false) {\n    throw new Error(\"public production database rejected\");\n  }\n  return true;\n}\n"
    },
    {
      "title": "Describe an application-to-database firewall rule",
      "language": "javascript",
      "blurb": "The rule allows one application workload identity to reach one database service and port, without broad CIDR or internet exposure.",
      "code": "export function databaseNetworkRule(applicationIdentity, databaseIdentity, port = 5432) {\n  if (typeof applicationIdentity !== \"string\" || !/^service:[a-z0-9_-]+$/i.test(applicationIdentity) ||\n      typeof databaseIdentity !== \"string\" || !/^database:[a-z0-9_-]+$/i.test(databaseIdentity)) {\n    throw new TypeError(\"workload identities required\");\n  }\n  if (port !== 5432) throw new Error(\"unexpected PostgreSQL port\");\n  return Object.freeze({ from: applicationIdentity, to: databaseIdentity, protocol: \"tcp\", port, internet: false });\n}\n"
    }
  ]
};
