window.COURSE_CODE_MODULE = {
  "title": "Code Example: Client Hints and Server Enforcement",
  "codeExamples": [
    {
      "title": "Code Example: Client Hints and Server Enforcement",
      "language": "javascript",
      "code": "function validateProfileInput(input) {\n  const displayName = String(input.displayName ?? \"\").trim();\n  const timezone = String(input.timezone ?? \"\").trim();\n\n  if (displayName.length < 1 || displayName.length > 60) {\n    return { ok: false, message: \"Display name must be 1 to 60 characters.\" };\n  }\n\n  if (!/^[A-Za-z_]+\\/[A-Za-z_]+$/.test(timezone)) {\n    return { ok: false, message: \"Timezone must use Area/Location format.\" };\n  }\n\n  return { ok: true, value: { displayName, timezone } };\n}\n\nasync function handleProfileSubmit(form) {\n  const validation = validateProfileInput(Object.fromEntries(new FormData(form)));\n  if (!validation.ok) {\n    throw new Error(validation.message);\n  }\n\n  const response = await fetch(\"/api/profile\", {\n    method: \"PATCH\",\n    headers: { \"content-type\": \"application/json\" },\n    body: JSON.stringify(validation.value),\n  });\n\n  if (!response.ok) {\n    throw new Error(\"The server rejected the update.\");\n  }\n}"
    }
  ]
};
