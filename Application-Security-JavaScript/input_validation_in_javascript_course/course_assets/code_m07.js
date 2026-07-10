window.COURSE_CODE_MODULE = {
  "title": "Code Example: Rejecting Dangerous Object Input",
  "codeExamples": [
    {
      "title": "Code Example: Rejecting Dangerous Object Input",
      "language": "javascript",
      "code": "const ALLOWED_PROFILE_FIELDS = new Set([\"displayName\", \"timezone\"]);\nconst BLOCKED_KEYS = new Set([\"__proto__\", \"prototype\", \"constructor\"]);\n\nfunction safeProfileUpdate(raw) {\n  if (typeof raw !== \"object\" || raw === null || Array.isArray(raw)) {\n    throw new Error(\"payload must be an object\");\n  }\n\n  for (const key of Object.keys(raw)) {\n    if (BLOCKED_KEYS.has(key) || !ALLOWED_PROFILE_FIELDS.has(key)) {\n      throw new Error(`field is not allowed: ${key}`);\n    }\n  }\n\n  const displayName = String(raw.displayName ?? \"\").trim();\n  const timezone = String(raw.timezone ?? \"\").trim();\n\n  if (displayName.length < 1 || displayName.length > 60) {\n    throw new Error(\"displayName is invalid\");\n  }\n  if (!/^[A-Za-z_]+\\/[A-Za-z_]+$/.test(timezone)) {\n    throw new Error(\"timezone is invalid\");\n  }\n\n  return Object.freeze({ displayName, timezone });\n}\n\nconsole.log(safeProfileUpdate({ displayName: \"Grace\", timezone: \"America/New_York\" }));"
    }
  ]
};
