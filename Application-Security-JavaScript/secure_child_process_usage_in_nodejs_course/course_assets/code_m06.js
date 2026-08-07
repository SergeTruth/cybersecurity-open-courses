window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Environment, cwd, PATH, and Secret Exposure through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Remove inherited secrets from a child environment",
      "language": "javascript",
      "blurb": "The environment is built from an empty object, and a logical font profile resolves through a fixed application-owned directory catalog.",
      "code": "const fontDirectories = new Map([\n  [\"default\", \"/srv/fonts/default\"],\n  [\"international\", \"/srv/fonts/international\"]\n]);\nexport function rendererEnvironment(config) {\n  const fontDirectory = fontDirectories.get(config?.fontProfile);\n  if (!fontDirectory) throw new Error(\"approved font profile required\");\n  return Object.freeze({ PATH: \"/usr/bin:/bin\", LANG: \"C.UTF-8\", HOME: \"/nonexistent\",\n    FONTCONFIG_PATH: fontDirectory, NODE_ENV: \"production\" });\n}\n"
    },
    {
      "title": "Allocate a generated working directory per child",
      "language": "javascript",
      "blurb": "A private mkdtemp directory is created beneath a fixed application-owned root, and operation and recursive-cleanup failures are preserved together without trusting ambient temporary-directory variables.",
      "code": "import { mkdtemp, rm } from \"node:fs/promises\";\nimport path from \"node:path\";\n\nconst CHILD_WORKSPACE_ROOT = \"/srv/app/child-workspaces\";\n\nexport async function withChildWorkspace(operation, createWorkspace = mkdtemp) {\n  if (typeof operation !== \"function\" || typeof createWorkspace !== \"function\") {\n    throw new TypeError(\"workspace operation and trusted creator required\");\n  }\n  const workspace = await createWorkspace(path.join(CHILD_WORKSPACE_ROOT, \"child-job-\"));\n  if (typeof workspace !== \"string\") throw new Error(\"workspace creator returned invalid path\");\n  const approvedRoot = path.resolve(CHILD_WORKSPACE_ROOT);\n  const candidate = path.resolve(workspace);\n  const relation = path.relative(approvedRoot, candidate);\n  if (!/^child-job-[^\\\\/]+$/.test(relation)) {\n    throw new Error(\"workspace creator left application-owned root\");\n  }\n  let result; let failure;\n  try { result = await operation(candidate); }\n  catch (error) { failure = error; }\n  let cleanupError;\n  try { await rm(candidate, { recursive: true, force: true }); }\n  catch (error) { cleanupError = error; }\n  if (failure && cleanupError) {\n    throw new AggregateError([failure, cleanupError], \"child operation and workspace cleanup failed\");\n  }\n  if (failure) throw failure;\n  if (cleanupError) {\n    const error = new AggregateError(\n      [cleanupError], \"child operation completed but workspace cleanup failed\"\n    );\n    Object.defineProperties(error, {\n      operationCompleted: { value: true, enumerable: true },\n      result: { value: result, enumerable: true }\n    });\n    throw error;\n  }\n  return result;\n}\n"
    }
  ]
};
