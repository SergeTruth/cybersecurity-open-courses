window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Environment, PATH, Working Directory, and Executable Selection through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Resolve an executable from an application-owned catalog",
      "language": "javascript",
      "blurb": "Logical operation names map to immutable absolute paths and deeply frozen fixed arguments, preventing PATH lookup, caller mutation, and user-selected executable substitution.",
      "code": "const tools = new Map([\n  [\"pdf-info\", { file: \"/usr/bin/pdfinfo\", prefix: [\"-meta\"] }],\n  [\"image-info\", { file: \"/usr/bin/identify\", prefix: [\"-quiet\"] }]\n]);\nexport function approvedTool(operation) {\n  const tool = tools.get(operation);\n  if (!tool) throw new TypeError(\"unsupported process operation\");\n  return Object.freeze({ file: tool.file, arguments: Object.freeze([...tool.prefix]) });\n}\n"
    },
    {
      "title": "Construct a minimal child environment and trusted cwd",
      "language": "javascript",
      "blurb": "Only declared non-secret variables cross the process boundary; both the environment and its enclosing context are frozen after a logical workspace profile resolves through the application-owned catalog.",
      "code": "const workspaceCatalog = new Map([\n  [\"document-jobs\", \"/srv/jobs/documents\"],\n  [\"image-jobs\", \"/srv/jobs/images\"]\n]);\nexport function childExecutionContext(config) {\n  const cwd = workspaceCatalog.get(config?.workspaceProfile);\n  if (!cwd) throw new Error(\"trusted workspace profile required\");\n  const env = Object.freeze({\n    PATH: \"/usr/bin:/bin\", LANG: \"C.UTF-8\", NODE_ENV: \"production\", TZ: \"UTC\"\n  });\n  return Object.freeze({ cwd, env });\n}\n"
    }
  ]
};
