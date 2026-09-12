window.COURSE_CODE_MODULE = {
  "title": "Make the expected revision part of the write",
  "codeIntro": "Conceptual SQL and TypeScript. All writers that change the document must advance its version atomically.",
  "codeExamples": [
    {
      "title": "Compare, replace, and advance atomically",
      "language": "sql",
      "blurb": "Do not split version comparison and advancement into independent calls. IDs and content are bound values. The version must not be reused for a different logical revision.",
      "code": "UPDATE documents\nSET content = :content,\n    version = version + 1\nWHERE tenant_id = :tenantId\n  AND id = :documentId\n  AND version = :expectedVersion;"
    },
    {
      "title": "Report a conflict instead of overwriting blindly",
      "language": "typescript",
      "blurb": "The repository implements the conditional write above. A conflict requires refresh, safe recomputation, or an intentional merge; do not simply substitute the newest version.",
      "code": "const result = await repository.updateDocument({\n  tenantId: auth.tenantId,\n  id: documentId,\n  expectedVersion: input.version,\n  content: input.content\n});\nif (!result.updated) {\n  throw new ConflictError();\n}"
    }
  ]
};
