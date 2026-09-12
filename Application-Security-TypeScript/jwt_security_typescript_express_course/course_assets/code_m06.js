window.COURSE_CODE_MODULE = {
  "title": "Authorize the action and constrain the resource",
  "codeIntro": "Conceptual Express route code. Authentication runs first; helper names represent application-specific authorization policy.",
  "codeExamples": [
    {
      "title": "Scope the lookup and enforce object permission",
      "language": "typescript",
      "blurb": "This example uses a validated tenant claim from an issuer authorized to assert tenant membership. The project lookup alone does not replace scope, ownership, or workflow checks.",
      "code": "requireScope(req.auth, \"projects:read\");\nconst projectId = validateProjectId(req.params.projectId);\nconst project = await repository.findProject({\n  projectId,\n  tenantId: req.auth.tenantId\n});\n\nif (!project) throw new NotFoundError();\nawait authorizeProjectRead(req.auth, project);\nres.json(toProjectResponse(project));"
    }
  ]
};
