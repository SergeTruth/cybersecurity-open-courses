window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Shell Use, Command Injection, and Safer Alternatives through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Invoke a fixed archive tool without a shell",
      "language": "javascript",
      "blurb": "The caller supplies an opaque archive identifier, and an application-owned catalog provides the exact quarantine path passed after the option terminator.",
      "code": "import { spawn } from \"node:child_process\";\n\nconst QUARANTINE_ARCHIVE = /^\\/srv\\/quarantine\\/[a-f0-9]{64}\\.zip$/;\n\nexport function listArchiveEntries(archiveId, archiveCatalog, signal) {\n  const rawGetArchiveCapability = archiveCatalog?.get;\n  const getArchive = typeof rawGetArchiveCapability === \"function\"\n    ? rawGetArchiveCapability.bind(archiveCatalog)\n    : null;\n  if (typeof archiveId !== \"string\" || !/^[a-f0-9]{32}$/.test(archiveId) ||\n      !getArchive) {\n    throw new TypeError(\"archive identifier and trusted catalog required\");\n  }\n  const archivePath = getArchive(archiveId);\n  if (typeof archivePath !== \"string\" ||\n      !QUARANTINE_ARCHIVE.test(archivePath)) {\n    throw new Error(\"approved quarantine archive unavailable\");\n  }\n  return spawn(\"/usr/bin/unzip\", [\"-Z1\", \"--\", archivePath], {\n    shell: false,\n    signal,\n    stdio: [\"ignore\", \"pipe\", \"pipe\"],\n    env: { PATH: \"/usr/bin:/bin\", LANG: \"C\" },\n    cwd: \"/srv/quarantine\"\n  });\n}\n"
    },
    {
      "title": "Reject unsupported tool options before child creation",
      "language": "javascript",
      "blurb": "A narrow option vocabulary prevents arguments that change output paths, load configuration, execute helpers, or reinterpret later operands.",
      "code": "import path from \"node:path\";\n\nconst levels = new Map([\n  [\"fast\", \"-1\"], [\"balanced\", \"-6\"], [\"small\", \"-9\"]\n]);\nconst EXPORT_ROOT = \"/srv/exports\";\nconst EXPORT_NAME = /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/;\n\nexport function gzipArguments(level, exportId, exportCatalog) {\n  const flag = levels.get(level);\n  const rawGetExportCapability = exportCatalog?.get;\n  const getExport = typeof rawGetExportCapability === \"function\"\n    ? rawGetExportCapability.bind(exportCatalog)\n    : null;\n  if (!flag || typeof exportId !== \"string\" ||\n      !/^[a-f0-9]{32}$/.test(exportId) || !getExport) {\n    throw new TypeError(\"invalid compression request\");\n  }\n  const inputPath = getExport(exportId);\n  const relative = typeof inputPath === \"string\"\n    ? path.posix.relative(EXPORT_ROOT, inputPath)\n    : \"\";\n  if (!EXPORT_NAME.test(relative) || relative.includes(\"/\")) {\n    throw new Error(\"approved export unavailable\");\n  }\n  return Object.freeze([flag, \"--stdout\", \"--\", inputPath]);\n}\n"
    }
  ]
};
