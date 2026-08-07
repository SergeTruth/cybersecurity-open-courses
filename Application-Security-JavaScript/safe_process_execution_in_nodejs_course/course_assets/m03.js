window.COURSE_MODULE = {
  "title": "Choosing Node.js Process APIs Safely",
  "graphicAlt": "Two-path comparison for Choosing Node.js Process APIs Safely in Safe Process Execution in Node.js: an unsafe flow bypasses the relevant control, while the approved flow passes through enforcement, bounded processing, and an auditable outcome.",
  "narration": "Node.js provides several child_process APIs, and the choice matters. exec runs a command through a shell, which means shell parsing, quoting rules, metacharacters, expansion behavior, and platform differences become part of the security model. That is a high-risk fit for externally influenced values. execFile runs a specified executable directly by default, without first spawning a shell. spawn is commonly useful for longer-running processes and streaming output with explicit arguments. fork starts another Node.js module with an IPC channel.\n\nNo API is automatically secure. A structured call with a fixed executable and argument array is easier to reason about than a shell command string, but it still needs authorization, validation, safe environment handling, timeouts, output limits, and least privilege. Synchronous variants deserve special care because they block the event loop. In a web server request path, a blocking process can create availability problems even when the command and arguments are otherwise safe.\n\nAPI selection should follow the workflow. If a library can perform the needed operation safely, avoid an external command. If a fixed executable is needed, prefer direct execution with structured arguments. If the process emits large output, use streaming with limits. If the work is expensive, move it to a worker or queue. The goal is not to memorize one good API. The goal is to make execution behavior explicit and bounded for the use case.",
  "narrationPoints": [
      "Node.js provides several child_process APIs, and the choice matters.",
      "A structured call with a fixed executable and argument array is easier to reason about than a shell command string, but it still needs authorization, validation, safe environment handling, timeouts, output limits, and least privilege.",
      "If a library can perform the needed operation safely, avoid an external command.",
      "If the process emits large output, use streaming with limits.",
      "In a web server request path, a blocking process can create availability problems even when the command and arguments are otherwise safe.",
      "If a fixed executable is needed, prefer direct execution with structured arguments."
  ]
};
