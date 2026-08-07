window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Output Safety, Errors, and Data Exposure with concrete, reviewable Node.js boundaries.",
  "codeExamples": [
    {
      "title": "Map an internal model to a public response",
      "language": "javascript",
      "blurb": "The response DTO includes only fields defined by the endpoint contract and never spreads an ORM or database object.",
      "code": "const USER_ID = /^[A-Za-z0-9](?:[A-Za-z0-9_-]{0,126}[A-Za-z0-9])?$/;\nconst USER_STATUSES = new Set([\"active\", \"suspended\", \"disabled\"]);\n\nexport function publicUserResponse(user) {\n  const id = user?.id;\n  const displayName = user?.displayName;\n  const status = user?.status;\n  const createdAt = user?.createdAt;\n  const createdAtMs = createdAt instanceof Date ? createdAt.getTime() : Number.NaN;\n  if (!user || typeof user !== \"object\" || Array.isArray(user) ||\n      typeof id !== \"string\" || !USER_ID.test(id) ||\n      typeof displayName !== \"string\" || displayName.length < 1 ||\n      displayName.trim() !== displayName || Buffer.byteLength(displayName, \"utf8\") > 100 ||\n      /[\\u0000-\\u001f\\u007f]/.test(displayName) ||\n      typeof status !== \"string\" || !USER_STATUSES.has(status) ||\n      !Number.isFinite(createdAtMs)) {\n    throw new TypeError(\"validated user model required\");\n  }\n  return Object.freeze({\n    id, displayName, status, createdAt: new Date(createdAtMs).toISOString()\n  });\n}\n"
    },
    {
      "title": "Map errors through a fixed client catalog",
      "language": "javascript",
      "blurb": "Arbitrary error.message text is never returned for 4xx responses; known codes select fixed public status and wording.",
      "code": "const publicErrors = new Map([\n  [\"VALIDATION_FAILED\", { status: 400, message: \"The request is invalid\" }],\n  [\"UNAUTHENTICATED\", { status: 401, message: \"Authentication is required\" }],\n  [\"NOT_FOUND\", { status: 404, message: \"Resource not found\" }]\n]);\nconst requestIdentity = /^[A-Za-z0-9][A-Za-z0-9._:-]{6,126}[A-Za-z0-9]$/;\n\nfunction safeErrorCode(error) {\n  try { return typeof error?.code === \"string\" ? error.code : undefined; }\n  catch { return undefined; }\n}\n\nexport function safeErrorResponse(error, requestId) {\n  if (typeof requestId !== \"string\" || !requestIdentity.test(requestId)) {\n    throw new TypeError(\"canonical request identifier required\");\n  }\n  const errorCode = safeErrorCode(error);\n  const known = typeof errorCode === \"string\" ? publicErrors.get(errorCode) : null;\n  const selected = known ??\n    { status: 500, message: \"The request could not be completed\" };\n  return Object.freeze({\n    status: selected.status,\n    body: Object.freeze({\n      error: Object.freeze({\n        code: known ? errorCode : \"INTERNAL_ERROR\",\n        message: selected.message,\n        requestId\n      })\n    })\n  });\n}\n"
    }
  ]
};
