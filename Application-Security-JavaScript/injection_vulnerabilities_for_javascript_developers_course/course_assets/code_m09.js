window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Combine Context-Specific Controls",
  "codeExamples": [
    {
      "title": "Vulnerable: User Input Builds a Shell Command",
      "language": "javascript",
      "code": "import { exec } from \"node:child_process\";\n\napp.get(\"/support/ticket/:id/log\", (req, res, next) => {\n  const ticketId = req.params.id;\n\n  exec(`grep ${ticketId} /var/log/support/tickets.log`, (error, stdout) => {\n    if (error) return next(error);\n\n    res.type(\"text/plain\").send(stdout);\n  });\n});"
    },
    {
      "title": "Fixed: Validate Input and Pass Arguments Without a Shell",
      "language": "javascript",
      "code": "import { execFile } from \"node:child_process\";\nimport { promisify } from \"node:util\";\n\nconst runFile = promisify(execFile);\nconst TICKET_ID_PATTERN = /^[A-Z]{2,6}-\\d{1,10}$/;\nconst LOG_FILE = \"/var/log/support/tickets.log\";\n\nfunction parseTicketId(value) {\n  if (typeof value !== \"string\" || !TICKET_ID_PATTERN.test(value)) {\n    const error = new Error(\"invalid ticket id\");\n    error.status = 400;\n    throw error;\n  }\n\n  return value;\n}\n\napp.get(\"/support/ticket/:id/log\", async (req, res, next) => {\n  try {\n    const ticketId = parseTicketId(req.params.id);\n    const { stdout } = await runFile(\"grep\", [ticketId, LOG_FILE], {\n      shell: false,\n      timeout: 3000,\n      maxBuffer: 64 * 1024,\n      windowsHide: true,\n    });\n\n    res.type(\"text/plain\").send(stdout);\n  } catch (error) {\n    next(error);\n  }\n});"
    }
  ]
};
