window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Validate API Inputs at the Edge",
  "codeExamples": [
    {
      "title": "Validate Body, Params, Query, and Headers",
      "language": "typescript",
      "code": "import { z } from \"zod\";\n\nconst ParamsSchema = z.object({ tenantId: z.string().uuid() });\nconst QuerySchema = z.object({ includeInactive: z.enum([\"true\", \"false\"]).default(\"false\") });\nconst HeaderSchema = z.object({ \"x-request-id\": z.string().max(80).optional() }).passthrough();\nconst BodySchema = z.object({\n  displayName: z.string().trim().min(1).max(80),\n  role: z.enum([\"viewer\", \"editor\"]),\n}).strict();\n\nexport function parseUpdateUserRequest(req: {\n  params: unknown;\n  query: unknown;\n  headers: unknown;\n  body: unknown;\n}) {\n  return {\n    params: ParamsSchema.parse(req.params),\n    query: QuerySchema.parse(req.query),\n    headers: HeaderSchema.parse(req.headers),\n    body: BodySchema.parse(req.body),\n  };\n}"
    },
    {
      "title": "Validate File Metadata Before Storage",
      "language": "typescript",
      "code": "type UploadMetadata = {\n  originalName: string;\n  mimeType: \"image/png\" | \"image/jpeg\" | \"application/pdf\";\n  sizeBytes: number;\n};\n\nexport function parseUploadMetadata(raw: unknown): UploadMetadata {\n  if (typeof raw !== \"object\" || raw === null || Array.isArray(raw)) {\n    throw new Error(\"upload metadata must be an object\");\n  }\n\n  const item = raw as Record<string, unknown>;\n  const originalName = String(item.originalName ?? \"\");\n  const mimeType = item.mimeType;\n  const sizeBytes = Number(item.sizeBytes);\n\n  if (!/^[A-Za-z0-9._ -]{1,120}$/.test(originalName) || originalName.includes(\"..\")) {\n    throw new Error(\"filename is invalid\");\n  }\n  if (mimeType !== \"image/png\" && mimeType !== \"image/jpeg\" && mimeType !== \"application/pdf\") {\n    throw new Error(\"file type is not allowed\");\n  }\n  if (!Number.isInteger(sizeBytes) || sizeBytes < 1 || sizeBytes > 10 * 1024 * 1024) {\n    throw new Error(\"file size is invalid\");\n  }\n\n  return { originalName, mimeType, sizeBytes };\n}"
    },
    {
      "title": "Use a Safe Validation Error Response",
      "language": "typescript",
      "code": "export function validationFailureResponse(requestId: string, errors: string[]) {\n  return {\n    status: 400,\n    body: {\n      requestId,\n      error: \"invalid_request\",\n      details: errors.slice(0, 10),\n    },\n  };\n}\n\nexport function logValidationFailure(logger: Logger, context: {\n  requestId: string;\n  route: string;\n  fields: string[];\n  userId?: string;\n}) {\n  logger.warn({\n    eventType: \"validation_failure\",\n    requestId: context.requestId,\n    route: context.route,\n    userId: context.userId,\n    fields: context.fields,\n  });\n}"
    }
  ]
};
