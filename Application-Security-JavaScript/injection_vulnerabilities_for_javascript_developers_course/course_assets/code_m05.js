window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Run Processes Without Shell or Argument Injection",
  "codeExamples": [
    {
      "title": "Constrain the Entire Image-Resize Invocation",
      "language": "javascript",
      "code": `import { execFile as execFileCallback } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { buildResizeInvocation } from "./injection_controls.mjs";

const execFile = promisify(execFileCallback);
const PRIVATE_WORK_ROOT = "/srv/app/private-resize";

async function resizeImage({ inputName, size }) {
  /* mkdtemp creates a server-chosen directory atomically under a private root. */
  const workDirectory = await mkdtemp(path.join(PRIVATE_WORK_ROOT, "resize-"));

  /*
   * The private root must be owner-only, and ImageMagick should have a strict
   * resource/security policy. Input symlinks still require an upload policy or
   * platform-specific handle checks. Publish the result later with an atomic,
  * no-clobber operation; never let a request choose its final storage name.
   */
  try {
    const invocation = buildResizeInvocation({
      inputName,
      size,
      workDirectory,
      privateWorkRoot: PRIVATE_WORK_ROOT,
    });
    await execFile(invocation.file, invocation.args, invocation.options);
    return {
      temporaryOutput: invocation.args.at(-1),
      cleanup: () => rm(workDirectory, { recursive: true, force: true }),
    };
  } catch (error) {
    await rm(workDirectory, { recursive: true, force: true });
    throw error;
  }
}
`
    },
    {
      "title": "Log Approved Operations, Not Raw Command Text",
      "language": "javascript",
      "code": `function logProcessResult(logger, { operation, userId, success, elapsedMs }) {
  logger.info({ event: "process_operation", operation, userId, success, elapsedMs });
}

logProcessResult(console, {
  operation: "resize-image", userId: "user_123", success: true, elapsedMs: 421,
});
`
    }
  ]
};
