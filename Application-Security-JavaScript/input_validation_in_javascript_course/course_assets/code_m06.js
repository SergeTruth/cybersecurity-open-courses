window.COURSE_CODE_MODULE = {
  "title": "Code Example: Validating an API Route",
  "codeExamples": [
    {
      "title": "Code Example: Validating an API Route",
      "language": "javascript",
      "code": "import express from \"express\";\nimport { z } from \"zod\";\n\nconst app = express();\napp.use(express.json({ limit: \"50kb\" }));\n\nconst MessageSchema = z.object({\n  type: z.literal(\"chat.message\"),\n  roomId: z.string().uuid(),\n  body: z.string().trim().min(1).max(500),\n}).strict();\n\napp.post(\"/rooms/:roomId/messages\", (req, res) => {\n  const params = z.object({ roomId: z.string().uuid() }).safeParse(req.params);\n  const body = MessageSchema.safeParse(req.body);\n\n  if (!params.success || !body.success || params.data.roomId !== body.data.roomId) {\n    return res.status(400).json({ error: \"invalid message request\" });\n  }\n\n  return res.status(202).json({\n    accepted: true,\n    roomId: body.data.roomId,\n    length: body.data.body.length,\n  });\n});"
    }
  ]
};
