window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Run Processes Without Shell Injection",
  "codeExamples": [
    {
      "title": "Use a Fixed Executable and Argument Array",
      "language": "javascript",
      "code": "import { execFile as execFileCallback } from \"node:child_process\";\nimport { promisify } from \"node:util\";\n\nconst execFile = promisify(execFileCallback);\nconst IMAGE_SIZES = new Set([\"small\", \"medium\", \"large\"]);\n\nasync function resizeImage(inputPath, outputPath, size) {\n  if (!IMAGE_SIZES.has(size)) {\n    throw new Error(\"unsupported image size\");\n  }\n\n  const geometry = { small: \"320x320\", medium: \"800x800\", large: \"1600x1600\" }[size];\n  await execFile(\"magick\", [inputPath, \"-resize\", geometry, outputPath], {\n    shell: false,\n    timeout: 10_000,\n  });\n}"
    },
    {
      "title": "Resolve File Paths Inside an Approved Directory",
      "language": "javascript",
      "code": "import path from \"node:path\";\n\nconst UPLOAD_ROOT = path.resolve(\"/srv/app/uploads\");\n\nfunction resolveUploadPath(fileName) {\n  if (typeof fileName !== \"string\" || !/^[a-zA-Z0-9_.-]{1,120}$/.test(fileName)) {\n    throw new Error(\"file name is invalid\");\n  }\n\n  const resolved = path.resolve(UPLOAD_ROOT, fileName);\n  const relative = path.relative(UPLOAD_ROOT, resolved);\n\n  if (relative.startsWith(\"..\") || path.isAbsolute(relative)) {\n    throw new Error(\"file path escapes upload directory\");\n  }\n\n  return resolved;\n}"
    },
    {
      "title": "Log Approved Operations, Not Raw Command Text",
      "language": "javascript",
      "code": "function logProcessResult(logger, { operation, userId, success, elapsedMs }) {\n  logger.info({\n    event: \"process_operation\",\n    operation,\n    userId,\n    success,\n    elapsedMs,\n  });\n}\n\nlogProcessResult(console, {\n  operation: \"resize-image\",\n  userId: \"user_123\",\n  success: true,\n  elapsedMs: 421,\n});"
    }
  ]
};
