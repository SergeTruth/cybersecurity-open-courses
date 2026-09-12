window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Use server-created identity for storage. Original names remain untrusted display metadata even when recorded beside a server-created key.",
  "codeExamples": [
    {
      "title": "Separate storage identity from display metadata",
      "language": "typescript",
      "blurb": "target is an authorized resource record. boundedOriginalName is a conceptual metadata-validation helper; later rendering still requires context-appropriate escaping. The key never includes client filename or tenant input.",
      "code": "import { randomUUID } from \"node:crypto\";\n\nconst record = {\n  id: randomUUID(),\n  storageKey: randomUUID(),\n  originalName: boundedOriginalName(file.originalname),\n  ownerId: auth.userId,\n  tenantId: target.tenantId,\n  resourceId: target.id,\n  state: \"quarantined\" as const\n};\n// The random key is an address, not an authorization token."
    },
    {
      "title": "Exclusive local creation under a trusted root",
      "language": "typescript",
      "blurb": "Storage-only excerpt for a small, already bounded and validated buffer. privateRoot must be preprovisioned, outside executable/public paths, and protected from untrusted directory or link changes. Use restrictive platform ACLs/permissions. This excerpt does not implement publication, persistence, or failed-operation cleanup.",
      "code": "import { randomUUID } from \"node:crypto\";\nimport { join } from \"node:path\";\nimport { writeFile } from \"node:fs/promises\";\n\nconst storageKey = randomUUID();\nconst destination = join(privateRoot, storageKey);\nawait writeFile(destination, validatedBoundedBytes, { flag: \"wx\" });\n// wx fails if the target already exists; handle that failure.\n// Safety depends on the trusted root and server-controlled child.\n// path.join alone would not confine an untrusted filename."
    }
  ]
};
