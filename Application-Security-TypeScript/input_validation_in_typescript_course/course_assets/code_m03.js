window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Narrow Unknown Values Safely",
  "codeExamples": [
    {
      "title": "Use unknown Until Runtime Checks Succeed",
      "language": "typescript",
      "code": "type ProfileUpdate = {\n  displayName: string;\n  timezone: string;\n};\n\nfunction isRecord(value: unknown): value is Record<string, unknown> {\n  return typeof value === \"object\" && value !== null && !Array.isArray(value);\n}\n\nexport function isProfileUpdate(value: unknown): value is ProfileUpdate {\n  if (!isRecord(value)) {\n    return false;\n  }\n\n  return (\n    typeof value.displayName === \"string\" &&\n    value.displayName.trim().length >= 1 &&\n    value.displayName.length <= 80 &&\n    typeof value.timezone === \"string\" &&\n    /^[A-Za-z_]+\\/[A-Za-z_]+$/.test(value.timezone)\n  );\n}"
    },
    {
      "title": "Avoid Assertions at the Input Boundary",
      "language": "typescript",
      "code": "// Risky: this silences uncertainty without checking the runtime value.\nfunction unsafeHandler(body: unknown) {\n  const update = body as ProfileUpdate;\n  return update.displayName.toUpperCase();\n}\n\n// Safer: the function narrows the value before typed logic uses it.\nfunction safeHandler(body: unknown) {\n  if (!isProfileUpdate(body)) {\n    return { status: 400, body: { error: \"invalid profile update\" } };\n  }\n\n  return {\n    status: 200,\n    body: {\n      displayName: body.displayName.trim(),\n      timezone: body.timezone,\n    },\n  };\n}"
    }
  ]
};
