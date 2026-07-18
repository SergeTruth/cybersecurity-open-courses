window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Avoid Common Validation Traps",
  "codeExamples": [
    {
      "title": "Prevent Mass Assignment with an Allowlist",
      "language": "typescript",
      "code": "type UserProfilePatch = {\n  displayName?: string;\n  timezone?: string;\n};\n\nconst allowedProfileFields = new Set([\"displayName\", \"timezone\"]);\n\nexport function parseProfilePatch(raw: unknown): UserProfilePatch {\n  if (typeof raw !== \"object\" || raw === null || Array.isArray(raw)) {\n    throw new Error(\"patch must be an object\");\n  }\n\n  const record = raw as Record<string, unknown>;\n  for (const key of Object.keys(record)) {\n    if (!allowedProfileFields.has(key)) {\n      throw new Error(`field is not allowed: ${key}`);\n    }\n  }\n\n  return {\n    displayName: typeof record.displayName === \"string\" ? record.displayName.trim() : undefined,\n    timezone: typeof record.timezone === \"string\" ? record.timezone : undefined,\n  };\n}"
    },
    {
      "title": "Reject Prototype Pollution Keys",
      "language": "typescript",
      "code": "const blockedKeys = new Set([\"__proto__\", \"prototype\", \"constructor\"]);\n\nexport function copySafePlainObject(raw: unknown): Record<string, unknown> {\n  if (typeof raw !== \"object\" || raw === null || Array.isArray(raw)) {\n    throw new Error(\"value must be a plain object\");\n  }\n\n  const output: Record<string, unknown> = Object.create(null);\n\n  for (const [key, value] of Object.entries(raw)) {\n    if (blockedKeys.has(key)) {\n      throw new Error(`blocked object key: ${key}`);\n    }\n    output[key] = value;\n  }\n\n  return output;\n}"
    },
    {
      "title": "Resolve User Paths Under an Allowed Directory",
      "language": "typescript",
      "code": "import path from \"node:path\";\n\nconst baseDirectory = \"/srv/app/uploads\";\n\nexport function resolveUploadPath(fileName: string): string {\n  if (!/^[A-Za-z0-9._-]{1,120}$/.test(fileName)) {\n    throw new Error(\"filename is invalid\");\n  }\n\n  const candidate = path.resolve(baseDirectory, fileName);\n  const relative = path.relative(baseDirectory, candidate);\n\n  if (relative.startsWith(\"..\") || path.isAbsolute(relative)) {\n    throw new Error(\"path escapes upload directory\");\n  }\n\n  return candidate;\n}"
    }
  ]
};
