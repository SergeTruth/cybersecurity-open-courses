window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Serving Downloads and Static Files Safely through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Authorize a download before opening storage",
      "language": "javascript",
      "blurb": "An opaque identifier is resolved through a tenant-and-subject-aware catalog, then storage keys, media types, and bounded display metadata are validated before use.",
      "code": "const storageKeyPattern = /^objects\\/[a-f0-9]{32,64}\\.(?:bin|png|jpg|pdf)$/;\nconst identityPattern = /^[A-Za-z0-9](?:[A-Za-z0-9_-]{0,126}[A-Za-z0-9])?$/;\nconst approvedMediaTypes = new Set([\n  \"application/octet-stream\", \"application/pdf\", \"image/jpeg\", \"image/png\"\n]);\n\nfunction validIdentity(value) {\n  return typeof value === \"string\" && identityPattern.test(value);\n}\n\nexport async function authorizedDownload(catalog, fileId, auth) {\n  const subjectId = auth?.subjectId;\n  const tenantId = auth?.tenantId;\n  const findMethod = catalog?.findAuthorized;\n  if (typeof fileId !== \"string\" || !/^[a-f0-9]{32}$/.test(fileId) ||\n      !validIdentity(subjectId) || !validIdentity(tenantId) ||\n      typeof findMethod !== \"function\") return null;\n  const findAuthorized = findMethod.bind(catalog);\n  const record = await findAuthorized(Object.freeze({ fileId, tenantId, subjectId }));\n  if (!record || typeof record !== \"object\" || Array.isArray(record)) return null;\n\n  const storageKey = record.storageKey;\n  const mediaType = record.mediaType;\n  const displayName = record.displayName;\n  if (typeof displayName !== \"string\" ||\n      Buffer.byteLength(displayName, \"utf8\") > 480) {\n    throw new Error(\"authorized file metadata invalid\");\n  }\n  const displayCodePoints = Array.from(displayName);\n  if (typeof storageKey !== \"string\" || !storageKeyPattern.test(storageKey) ||\n      !approvedMediaTypes.has(mediaType) ||\n      displayCodePoints.length < 1 || displayCodePoints.length > 120 ||\n      displayName.toWellFormed() !== displayName ||\n      displayName !== displayName.normalize(\"NFC\") ||\n      /[\\u0000-\\u001f\\u007f\\\\/]/.test(displayName)) {\n    throw new Error(\"authorized file metadata invalid\");\n  }\n\n  return Object.freeze({ storageKey, displayName, mediaType });\n}\n"
    },
    {
      "title": "Build a safe Content-Disposition filename",
      "language": "javascript",
      "blurb": "Control characters and path syntax are removed, while a well-formed, bounded UTF-8 filename parameter preserves the user-facing name without changing storage identity.",
      "code": "const MAXIMUM_ATTACHMENT_NAME_BYTES = 4096;\n\nfunction encodeRfc5987(value) {\n  return encodeURIComponent(value).replace(/[\\'()*]/g, (character) =>\n    \"%\" + character.charCodeAt(0).toString(16).toUpperCase());\n}\n\nexport function attachmentHeader(displayName) {\n  const suppliedName = typeof displayName === \"string\" ? displayName : \"download\";\n  if (Buffer.byteLength(suppliedName, \"utf8\") > MAXIMUM_ATTACHMENT_NAME_BYTES) {\n    throw new RangeError(\"attachment filename exceeds input limit\");\n  }\n  const sanitized = suppliedName.toWellFormed().normalize(\"NFC\")\n    .replace(/[\\u0000-\\u001f\\u007f\"\\\\/]/g, \"_\");\n  const clean = Array.from(sanitized).slice(0, 120).join(\"\") || \"download\";\n  const ascii = clean.replace(/[^\\x20-\\x7e]/g, \"_\");\n  return 'attachment; filename=\"' + ascii + '\"; filename*=UTF-8\\'\\'' + encodeRfc5987(clean);\n}\n"
    }
  ]
};
