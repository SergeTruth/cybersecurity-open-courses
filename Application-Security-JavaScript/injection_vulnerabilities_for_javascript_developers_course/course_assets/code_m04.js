window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Build Document Queries Explicitly",
  "codeExamples": [
    {
      "title": "Reject Unexpected Object Shape",
      "language": "javascript",
      "code": "function parseTicketFilter(raw) {\n  if (typeof raw !== \"object\" || raw === null || Array.isArray(raw)) {\n    throw new Error(\"filter must be an object\");\n  }\n\n  const allowedKeys = new Set([\"status\", \"ownerId\"]);\n  for (const key of Object.keys(raw)) {\n    if (!allowedKeys.has(key)) {\n      throw new Error(`unsupported filter field: ${key}`);\n    }\n  }\n\n  return {\n    status: parseStatus(raw.status),\n    ownerId: parseOwnerId(raw.ownerId),\n  };\n}"
    },
    {
      "title": "Translate Client Filters into Application-Owned Queries",
      "language": "javascript",
      "code": "function buildTicketQuery(input) {\n  const query = {};\n\n  if (input.status) {\n    query.status = input.status;\n  }\n  if (input.ownerId) {\n    query.owner_id = input.ownerId;\n  }\n\n  return query;\n}\n\nasync function listTickets(collection, rawFilter) {\n  const input = parseTicketFilter(rawFilter);\n  return collection.find(buildTicketQuery(input)).limit(50).toArray();\n}"
    },
    {
      "title": "Use Explicit Update Fields",
      "language": "javascript",
      "code": "function parseProfileUpdate(body) {\n  const displayName = typeof body.displayName === \"string\" ? body.displayName.trim() : \"\";\n  const timeZone = typeof body.timeZone === \"string\" ? body.timeZone.trim() : \"\";\n\n  if (displayName.length < 1 || displayName.length > 80) {\n    throw new Error(\"displayName is invalid\");\n  }\n  if (!/^[A-Za-z_\\/-]{3,60}$/.test(timeZone)) {\n    throw new Error(\"timeZone is invalid\");\n  }\n\n  return { display_name: displayName, time_zone: timeZone };\n}\n\nasync function updateProfile(collection, userId, body) {\n  const fields = parseProfileUpdate(body);\n  return collection.updateOne({ user_id: userId }, { $set: fields });\n}"
    }
  ]
};
