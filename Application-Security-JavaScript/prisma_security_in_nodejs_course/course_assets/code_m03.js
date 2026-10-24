window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Schema Design, Models, and Sensitive Fields with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Model tenant identity and sensitive fields in Prisma",
      "language": "javascript",
      "blurb": "The schema makes tenant relationships explicit, keeps password hashes server-side, and creates a tenant-scoped uniqueness constraint.",
      "code": "export const securePrismaModels = [\n  \"model Account {\",\n  \"  id           String   @id @default(cuid())\",\n  \"  tenantId     String\",\n  \"  email        String\",\n  \"  displayName  String\",\n  \"  status       String   @default(\\\"active\\\")\",\n  \"  createdAt    DateTime @default(now())\",\n  \"  passwordHash String\",\n  \"  tenant       Tenant   @relation(fields: [tenantId], references: [id], onDelete: Restrict)\",\n  \"  @@unique([tenantId, email])\",\n  \"  @@index([tenantId, id])\",\n  \"}\",\n  \"\",\n  \"model Tenant {\",\n  \"  id       String    @id @default(cuid())\",\n  \"  accounts Account[]\",\n  \"}\"\n].join(\"\\n\");\n"
    },
    {
      "title": "Use an explicit Prisma select",
      "language": "javascript",
      "blurb": "The query returns only public account fields; sensitive columns are omitted at the database boundary.",
      "code": "function scalarId(value, label = \"identifier\") {\n  if (typeof value !== \"string\" || !/^[A-Za-z0-9_-]{1,128}$/.test(value)) throw new TypeError(label + \" invalid\");\n  return value;\n}\nexport async function findPublicAccount(prisma, accountId, tenantId) {\n  // tenantId must come from authenticated server context, never the request body.\n  scalarId(accountId, \"account id\"); scalarId(tenantId, \"tenant context\");\n  return prisma.account.findFirst({\n    where: { id: accountId, tenantId },\n    select: { id: true, email: true, displayName: true, status: true, createdAt: true }\n  });\n}\n"
    }
  ]
};
