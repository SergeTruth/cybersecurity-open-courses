window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Argument Handling and Input Validation through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Validate numeric media-tool operands",
      "language": "javascript",
      "blurb": "Frame and duration values become decimal argument elements only after finite integer bounds are enforced, preventing option and resource abuse.",
      "code": "const REPORT_INPUT = /^\\/srv\\/report-inputs\\/[a-f0-9]{64}\\.html$/;\nconst REPORT_OUTPUT = /^\\/srv\\/report-outputs\\/[a-f0-9]{64}\\.pdf$/;\n\nexport function thumbnailArguments(inputPath, outputPath, second, width) {\n  if (typeof inputPath !== \"string\" || !REPORT_INPUT.test(inputPath) ||\n      typeof outputPath !== \"string\" || !REPORT_OUTPUT.test(outputPath)) {\n    throw new TypeError(\"server-owned media paths required\");\n  }\n  if (!Number.isSafeInteger(second) || second < 0 || second > 3600) {\n    throw new RangeError(\"invalid seek time\");\n  }\n  if (!Number.isSafeInteger(width) || width < 32 || width > 1920) {\n    throw new RangeError(\"invalid thumbnail width\");\n  }\n  return Object.freeze([\n    \"-nostdin\", \"-v\", \"error\", \"-ss\", String(second), \"-i\", inputPath,\n    \"-frames:v\", \"1\", \"-vf\", \"scale=\" + width + \":-1\", outputPath\n  ]);\n}\n"
    },
    {
      "title": "Map public report names to server-owned paths",
      "language": "javascript",
      "blurb": "The user supplies an opaque report identifier; the catalog returns the exact generated input and output paths used as child-process operands.",
      "code": "import path from \"node:path\";\n\nconst reportRoots = Object.freeze({\n  source: \"/srv/report-inputs\",\n  output: \"/srv/report-outputs\"\n});\nconst identityPattern = /^[A-Za-z0-9](?:[A-Za-z0-9_-]{0,126}[A-Za-z0-9])?$/;\n\nfunction validIdentity(value) {\n  return typeof value === \"string\" && identityPattern.test(value);\n}\n\nfunction generatedReportPath(root, candidate, suffix) {\n  if (typeof candidate !== \"string\") throw new Error(\"generated report path invalid\");\n  const relative = path.relative(root, candidate);\n  if (!new RegExp(\"^[a-f0-9]{64}\\\\.\" + suffix + \"$\").test(relative) ||\n      path.isAbsolute(relative) || relative.includes(path.sep)) {\n    throw new Error(\"generated report path invalid\");\n  }\n  return candidate;\n}\n\nexport async function reportRenderPaths(catalog, reportId, auth) {\n  const tenantId = auth?.tenantId;\n  const subjectId = auth?.subjectId;\n  const rawFindOwnedCapability = catalog?.findOwned;\n  const findOwned = typeof rawFindOwnedCapability === \"function\"\n    ? rawFindOwnedCapability.bind(catalog)\n    : null;\n  if (typeof reportId !== \"string\" || !/^[a-f0-9]{32}$/.test(reportId) ||\n      !validIdentity(tenantId) || !validIdentity(subjectId) || !findOwned) {\n    throw new TypeError(\"report identity required\");\n  }\n  const record = await findOwned(reportId, tenantId, subjectId);\n  if (!record || typeof record !== \"object\" || Array.isArray(record)) {\n    throw new Error(\"report not found\");\n  }\n  const generatedSourcePath = record.generatedSourcePath;\n  const generatedPdfPath = record.generatedPdfPath;\n  return Object.freeze({\n    source: generatedReportPath(reportRoots.source, generatedSourcePath, \"html\"),\n    output: generatedReportPath(reportRoots.output, generatedPdfPath, \"pdf\")\n  });\n}\n"
    }
  ]
};
