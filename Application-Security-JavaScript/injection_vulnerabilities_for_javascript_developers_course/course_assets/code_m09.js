window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Combine Context-Specific Controls",
  "codeExamples": [
    {
      "title": "Vulnerable: User Input Builds a Shell Command",
      "language": "javascript",
      "code": `import { exec } from "node:child_process";

app.get("/support/ticket/:id/log", (req, res, next) => {
  const ticketId = req.params.id;
  exec("grep " + ticketId + " /var/log/support/tickets.log", (error, stdout) => {
    if (error) return next(error);
    res.type("text/plain").send(stdout);
  });
});
`
    },
    {
      "title": "Fixed: Validate Input and Pass Literal Arguments Without a Shell",
      "language": "javascript",
      "code": `import { execFile } from "node:child_process";
import { promisify } from "node:util";

const runFile = promisify(execFile);
const TICKET_ID_PATTERN = /^[A-Z]{2,6}-\\d{1,10}$/;
const GREP_EXECUTABLE = "/usr/bin/grep";
const LOG_FILE = "/var/log/support/tickets.log";

function parseTicketId(value) {
  if (typeof value !== "string" || !TICKET_ID_PATTERN.test(value)) {
    const error = new Error("invalid ticket id");
    error.status = 400;
    throw error;
  }
  return value;
}

async function findTicketLines(ticketId) {
  try {
    const { stdout } = await runFile(
      GREP_EXECUTABLE,
      ["-F", "--", ticketId, LOG_FILE],
      {
        shell: false,
        timeout: 3000,
        maxBuffer: 64 * 1024,
        windowsHide: true,
      },
    );
    return stdout;
  } catch (error) {
    /* grep uses status 1 for a valid search with no matching lines. */
    if (error?.code === 1) return "";
    throw error;
  }
}

app.get("/support/ticket/:id/log", async (req, res, next) => {
  try {
    const ticketId = parseTicketId(req.params.id);
    const stdout = await findTicketLines(ticketId);
    res.type("text/plain").send(stdout);
  } catch (error) {
    next(error);
  }
});
`
    }
  ]
};
