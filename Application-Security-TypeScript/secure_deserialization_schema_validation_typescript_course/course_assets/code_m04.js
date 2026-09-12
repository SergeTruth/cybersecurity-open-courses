window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Conceptual application integration. Named helpers are contracts to implement and test in the service; they are not APIs supplied by TypeScript.",
  "codeExamples": [
    {
      "title": "Keep structure, permission, and domain state visible",
      "language": "typescript",
      "blurb": "The runtime schema checks identifier/date representations. Permission is checked for the actor and resource. Date ordering is a domain rule. The service must enforce state-dependent rules atomically and scope the write to the authorized resource.",
      "code": "const input = ScheduleSchema.parse(req.body);\nawait requirePermission(auth, input.projectId, \"schedule:update\");\n\n// Schema output contains validated numeric instants.\nif (input.startMs >= input.endMs) {\n  throw new InvalidRequest(\"Start must precede end\");\n}\n\nawait service.updateScheduleAtomically(auth, {\n  projectId: input.projectId,\n  startMs: input.startMs,\n  endMs: input.endMs\n});\n// A schema-valid projectId does not establish project ownership."
    }
  ]
};
