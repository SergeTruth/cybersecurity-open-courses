window.COURSE_CODE_MODULE = {
  "title": "Code Example: A Complete Validation Pattern",
  "codeExamples": [
    {
      "title": "Code Example: A Complete Validation Pattern",
      "language": "javascript",
      "code": "const ALLOWED_TRANSITIONS = {\n  draft: new Set([\"submitted\"]),\n  submitted: new Set([\"approved\", \"rejected\"]),\n  approved: new Set(),\n  rejected: new Set(),\n};\n\nfunction validateTicketUpdate(currentStatus, payload) {\n  const allowedFields = new Set([\"title\", \"status\"]);\n\n  for (const field of Object.keys(payload)) {\n    if (!allowedFields.has(field)) {\n      throw new Error(`unexpected field: ${field}`);\n    }\n  }\n\n  const title = String(payload.title ?? \"\").trim();\n  const status = payload.status;\n\n  if (title.length < 1 || title.length > 120) {\n    throw new Error(\"title must be 1 to 120 characters\");\n  }\n\n  if (!ALLOWED_TRANSITIONS[currentStatus]?.has(status)) {\n    throw new Error(\"status transition is not allowed\");\n  }\n\n  return { title, status };\n}"
    }
  ]
};
