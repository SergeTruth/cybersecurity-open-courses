window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Separate Transport Shape from Domain Meaning",
  "codeExamples": [
    {
      "title": "Parse Transport Input Before Domain Construction",
      "language": "typescript",
      "code": "const CreateCouponTransportSchema = z.object({\n  code: z.string().trim().min(3).max(30),\n  percentOff: z.number().int().min(1).max(90),\n  startsAt: z.string().datetime(),\n  endsAt: z.string().datetime(),\n}).strict();\n\ntype CreateCouponTransport = z.infer<typeof CreateCouponTransportSchema>;\n\nexport function parseCreateCouponTransport(raw: unknown): CreateCouponTransport {\n  return CreateCouponTransportSchema.parse(raw);\n}"
    },
    {
      "title": "Enforce Cross-Field Domain Invariants",
      "language": "typescript",
      "code": "type Coupon = {\n  code: string;\n  percentOff: number;\n  startsAt: Date;\n  endsAt: Date;\n};\n\nexport function createCoupon(input: CreateCouponTransport): Coupon {\n  const startsAt = new Date(input.startsAt);\n  const endsAt = new Date(input.endsAt);\n\n  if (startsAt >= endsAt) {\n    throw new Error(\"coupon start must be before coupon end\");\n  }\n  if (endsAt.getTime() - startsAt.getTime() > 90 * 24 * 60 * 60 * 1000) {\n    throw new Error(\"coupon duration may not exceed 90 days\");\n  }\n\n  return {\n    code: input.code.toUpperCase(),\n    percentOff: input.percentOff,\n    startsAt,\n    endsAt,\n  };\n}"
    },
    {
      "title": "Validate Ownership Separately from Shape",
      "language": "typescript",
      "code": "export async function updateProjectName(caller: Caller, raw: unknown) {\n  const input = z.object({\n    projectId: z.string().uuid(),\n    name: z.string().trim().min(1).max(80),\n  }).strict().parse(raw);\n\n  const project = await projects.findById(input.projectId);\n  if (!project || project.tenantId !== caller.tenantId) {\n    throw new Error(\"project not found\");\n  }\n  if (project.ownerId !== caller.id && !caller.roles.includes(\"tenant-admin\")) {\n    throw new Error(\"forbidden\");\n  }\n\n  return projects.rename(project.id, input.name);\n}"
    }
  ]
};
