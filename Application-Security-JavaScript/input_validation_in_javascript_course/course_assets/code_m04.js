window.COURSE_CODE_MODULE = {
  "title": "Code Example: Runtime Schema Validation",
  "codeExamples": [
    {
      "title": "Code Example: Runtime Schema Validation",
      "language": "javascript",
      "code": "import { z } from \"zod\";\n\nconst RegistrationSchema = z.object({\n  email: z.string().email().max(254),\n  age: z.number().int().min(13).max(120),\n  marketingOptIn: z.boolean().default(false),\n}).strict();\n\nconst result = RegistrationSchema.safeParse({\n  email: \"student@example.com\",\n  age: 22,\n  marketingOptIn: true,\n});\n\nif (!result.success) {\n  console.log(result.error.flatten());\n} else {\n  console.log(result.data);\n}"
    }
  ]
};
