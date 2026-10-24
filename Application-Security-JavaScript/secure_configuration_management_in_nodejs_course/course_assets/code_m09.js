window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Drift Detection, Logging, Monitoring, and Review through distinct, reviewable JavaScript security boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Compare deployed configuration to an approved baseline",
      "language": "javascript",
      "blurb": "Drift detection canonicalizes declared fields, separates expected runtime values, and reports additions, removals, and changes without exposing secret values.",
      "code": "export function configurationDrift(baseline, deployed, schema) {\n  const comparable = (value, rule) => {\n    if (rule.type === \"string\" || rule.type === \"boolean\" || rule.type === \"number\") {\n      if (typeof value !== rule.type || (rule.type === \"number\" && !Number.isFinite(value))) throw new TypeError(\"configuration scalar invalid\");\n      return JSON.stringify(value);\n    }\n    if (rule.type === \"string-set\" && Array.isArray(value) && value.every((item) => typeof item === \"string\")) {\n      return JSON.stringify([...new Set(value)].sort());\n    }\n    throw new TypeError(\"unsupported configuration value\");\n  };\n  const findings = [];\n  for (const name of new Set([...Object.keys(baseline), ...Object.keys(deployed)])) {\n    if (!Object.hasOwn(schema, name)) { findings.push({ name, kind: \"unknown\" }); continue; }\n    if (!Object.hasOwn(baseline, name)) findings.push({ name, kind: \"added\" });\n    else if (!Object.hasOwn(deployed, name)) findings.push({ name, kind: \"removed\" });\n    else if (comparable(baseline[name], schema[name]) !== comparable(deployed[name], schema[name])) findings.push({ name, kind: \"changed\", sensitive: schema[name].classification === \"secret\" });\n  }\n  return findings;\n}\n"
    },
    {
      "title": "Create a bounded runtime-configuration audit event",
      "language": "javascript",
      "blurb": "The event records version, actor, approval, changed field names, and outcome while excluding old and new configuration values.",
      "code": "export function configurationChangeEvent(change) {\n  const id = value => typeof value === \"string\" && /^[A-Za-z0-9._:-]{1,128}$/.test(value);\n  if (!Number.isSafeInteger(change?.version) || change.version < 1 || !id(change.actor) || !id(change.approvalId) ||\n      typeof change.applied !== \"boolean\" || !Array.isArray(change.changedFields) || change.changedFields.length > 100 ||\n      change.changedFields.some(name => typeof name !== \"string\" || !/^[A-Za-z][A-Za-z0-9_.-]{0,63}$/.test(name))) throw new TypeError(\"bounded configuration evidence required\");\n  return Object.freeze({ event: \"configuration_change\", version: change.version, actor: change.actor,\n    approvalId: change.approvalId, changedFields: Object.freeze([...new Set(change.changedFields)].sort()),\n    outcome: change.applied ? \"applied\" : \"rejected\" });\n}\n"
    }
  ]
};
