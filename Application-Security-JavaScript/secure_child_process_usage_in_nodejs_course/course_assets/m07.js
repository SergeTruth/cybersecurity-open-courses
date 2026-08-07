window.COURSE_MODULE = {
  "title": "Output, Errors, Streams, and Lifecycle Control",
  "graphicAlt": "Lifecycle sequence for Output, Errors, Streams, and Lifecycle Control in Secure Child Process Usage in Node.js, tracing creation, validation, use, failure handling, cleanup, and verification while highlighting the component responsible at every transition.",
  "narration": "Starting the child process is only the beginning. stdout and stderr may contain sensitive data, internal paths, tool diagnostics, stack traces, command details, file contents, or user-controlled data copied from input. Do not return raw child process output directly to users without review and safe encoding. Do not log secrets, tokens, credentials, private paths, full sensitive command lines, file contents, or unnecessary personal data.\n\nOutput should be bounded. Some APIs buffer output in memory, while streaming approaches can handle large output more safely when paired with backpressure and error handling. Set output limits, input limits, and timeouts. Handle spawn errors, nonzero exit codes, signals, partial output, aborted requests, failed streams, and cleanup paths. A small bounded command and a long-running conversion tool need different lifecycle controls.\n\nCleanup must cover success, failure, timeout, and cancellation. Remove temporary files, generated output, process handles, and streams when they are no longer needed. Avoid detached or orphaned processes unless there is a documented operational reason. The implementation should make it clear how long the process may run, where output is stored, what evidence is recorded, and how the system recovers when the child process does not behave as expected.",
  "narrationPoints": [
      "Do not log secrets, tokens, credentials, private paths, full sensitive command lines, file contents, or unnecessary personal data.",
      "Handle spawn errors, nonzero exit codes, signals, partial output, aborted requests, failed streams, and cleanup paths.",
      "Remove temporary files, generated output, process handles, and streams when they are no longer needed.",
      "The implementation should make it clear how long the process may run, where output is stored, what evidence is recorded, and how the system recovers when the child process does not behave as expected.",
      "Some APIs buffer output in memory, while streaming approaches can handle large output more safely when paired with backpressure and error handling.",
      "Do not return raw child process output directly to users without review and safe encoding."
  ]
};
