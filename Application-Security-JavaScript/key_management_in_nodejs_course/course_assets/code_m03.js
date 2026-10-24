window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Key Inventory, Ownership, and Lifecycle with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Validate a key inventory record",
      "language": "javascript",
      "blurb": "The inventory records purpose, owner, algorithm, lifecycle state, version, and review date without storing key material.",
      "code": "const states = new Set([\"preactive\", \"active\", \"decrypt-only\", \"revoked\", \"destroyed\"]);\nexport function validateKeyRecord(record) {\n  const fields = [\"keyId\", \"state\", \"owner\", \"purpose\", \"algorithm\", \"version\", \"reviewDate\"];\n  const text = value => typeof value === \"string\" && value.trim().length > 0 && value.length <= 128 && !/[\\u0000-\\u001f\\u007f]/.test(value);\n  if (!record || typeof record !== \"object\" || Array.isArray(record) || Object.keys(record).length > fields.length ||\n      Object.keys(record).some(key => !fields.includes(key)) || typeof record.keyId !== \"string\" ||\n      !/^[a-z0-9][a-z0-9._-]{2,63}$/i.test(record.keyId) || !states.has(record.state) ||\n      !text(record.owner) || !text(record.purpose) || !text(record.algorithm) ||\n      !Number.isSafeInteger(record.version) || record.version < 1) throw new TypeError(\"key inventory invalid\");\n  const date = record.reviewDate;\n  if (typeof date !== \"string\" || !/^\\d{4}-\\d{2}-\\d{2}$/.test(date)) throw new TypeError(\"review date required\");\n  const parsed = new Date(date + \"T00:00:00.000Z\");\n  if (!Number.isFinite(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== date) throw new TypeError(\"review date invalid\");\n  return Object.freeze(Object.fromEntries(fields.map(key => [key, record[key]])));\n}\n"
    },
    {
      "title": "Enforce key lifecycle transitions",
      "language": "javascript",
      "blurb": "A small state machine prevents revoked or destroyed versions from silently returning to active use.",
      "code": "const transitions = new Map([\n  [\"preactive\", new Set([\"active\", \"revoked\"])],\n  [\"active\", new Set([\"decrypt-only\", \"revoked\"])],\n  [\"decrypt-only\", new Set([\"revoked\", \"destroyed\"])],\n  [\"revoked\", new Set([\"destroyed\"])],\n  [\"destroyed\", new Set()]\n]);\n\nexport function transitionKey(record, nextState, actor) {\n  if (!transitions.get(record.state)?.has(nextState)) throw new Error(\"key transition denied\");\n  return { ...record, state: nextState, changedBy: actor, changedAt: new Date().toISOString() };\n}\n"
    }
  ]
};
