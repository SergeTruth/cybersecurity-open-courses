window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Node.js Path APIs and Their Limits with concrete, reviewable Node.js boundaries.",
  "codeExamples": [
    {
      "title": "Use lexical checks only for path syntax",
      "language": "javascript",
      "blurb": "path.resolve and path.relative can reject dot-segment syntax, but the function is explicitly not a filesystem-containment decision.",
      "code": "import path from \"node:path\";\n\nexport function lexicallyInside(baseDirectory, userPath) {\n  if (typeof userPath !== \"string\" || userPath.includes(\"\\0\")) return false;\n  const base = path.resolve(baseDirectory);\n  const candidate = path.resolve(base, userPath);\n  const relative = path.relative(base, candidate);\n  return relative !== \"\" && !relative.startsWith(`..${path.sep}`) && relative !== \"..\" && !path.isAbsolute(relative);\n}\n\n// This does not detect symlinks, junctions, mount changes, or replacement races.\n"
    },
    {
      "title": "Resolve a canonical path before a read",
      "language": "javascript",
      "blurb": "realpath reveals link resolution, and containment is checked against the canonical base before the file is opened.",
      "code": "import path from \"node:path\";\nimport { realpath } from \"node:fs/promises\";\n\nexport async function canonicalContainedPath(baseDirectory, candidatePath) {\n  const base = await realpath(baseDirectory);\n  const target = await realpath(path.resolve(base, candidatePath));\n  const relative = path.relative(base, target);\n  if (relative === \"\" || relative === \"..\" || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {\n    throw new Error(\"resolved path leaves approved base\");\n  }\n  return target;\n}\n\n// Protect writable ancestor directories or use a descriptor-relative native API when races are in scope.\n"
    }
  ]
};
