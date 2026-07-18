window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Use Runtime Schemas with Inferred Types",
  "codeExamples": [
    {
      "title": "Define a Strict Zod Schema and Infer the Type",
      "language": "typescript",
      "code": "import { z } from \"zod\";\n\nexport const CreateProjectSchema = z.object({\n  name: z.string().trim().min(1).max(80),\n  visibility: z.enum([\"private\", \"team\"]),\n  tags: z.array(z.string().trim().min(1).max(30)).max(10).default([]),\n}).strict();\n\nexport type CreateProjectInput = z.infer<typeof CreateProjectSchema>;\n\nexport function parseCreateProject(raw: unknown): CreateProjectInput {\n  return CreateProjectSchema.parse(raw);\n}"
    },
    {
      "title": "Return Safe Validation Errors",
      "language": "typescript",
      "code": "import type { ZodError } from \"zod\";\n\ntype ClientValidationError = {\n  field: string;\n  message: string;\n};\n\nexport function toClientErrors(error: ZodError): ClientValidationError[] {\n  return error.issues.map((issue) => ({\n    field: issue.path.join(\".\") || \"body\",\n    message: issue.message,\n  }));\n}\n\nexport function safeParseCreateProject(raw: unknown) {\n  const result = CreateProjectSchema.safeParse(raw);\n  return result.success\n    ? { ok: true as const, value: result.data }\n    : { ok: false as const, errors: toClientErrors(result.error) };\n}"
    },
    {
      "title": "Share One Schema Across Client and Server",
      "language": "typescript",
      "code": "// shared/schemas.ts\nexport const UpdateSettingsSchema = z.object({\n  emailNotifications: z.boolean(),\n  defaultLocale: z.enum([\"en-US\", \"es-US\", \"fr-FR\"]).default(\"en-US\"),\n}).strict();\n\nexport type UpdateSettingsInput = z.infer<typeof UpdateSettingsSchema>;\n\n// server.ts\nexport async function updateSettingsHandler(body: unknown) {\n  const parsed = UpdateSettingsSchema.safeParse(body);\n  if (!parsed.success) {\n    return { status: 400, body: { error: \"invalid settings\" } };\n  }\n  await settingsService.update(parsed.data);\n  return { status: 204 };\n}"
    }
  ]
};
