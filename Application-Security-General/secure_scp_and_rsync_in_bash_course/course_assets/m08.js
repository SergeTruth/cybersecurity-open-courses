window.COURSE_MODULE = {
  "title": "Secrets, Logs, Monitoring, and Failure Handling",
  "graphicAlt": "A result gate distinguishes completed and partial transfers while time limits, retry bounds and safe summaries support operation.",
  "narration": "Secure transfer automation should be observable. Operators need to know what ran, which identity was used, what source and destination were involved at a safe level, how many files were transferred where appropriate, and whether the operation succeeded or failed.\n\nAt the same time, logs should avoid private keys, tokens, passwords, sensitive file contents, and excessive raw output. Transfer commands often handle data that is not meant for broad visibility. Useful evidence should not become a second exposure path.\n\nScripts should check transfer exit status and important failure conditions. A connection failure, host verification failure, authentication failure, missing source, rejected destination, partial transfer, or unexpected empty result should not be reported as a successful job.\n\nTimeouts and retry limits matter for unattended transfers. A hung transfer can block a pipeline or backup window. Unlimited retries can amplify a network or destination problem. Clear limits help the system fail in a way operators can investigate.\n\nMonitoring should watch for missing transfers, repeated failures, unusual sizes, unexpected file counts, and destinations that stop receiving expected updates. These signals are often more useful than raw command output because they describe operational impact.\n\nGood failure handling creates confidence. The script should stop safely, report the stage that failed, avoid leaking sensitive data, and leave enough evidence for review. That is how transfer automation becomes dependable rather than mysterious.",
  "narrationPoints": [
    "At the same time, logs should avoid private keys, tokens, passwords, sensitive file contents, and excessive raw output.",
    "Scripts should check transfer exit status and important failure conditions.",
    "Timeouts and retry limits matter for unattended transfers.",
    "Monitoring should watch for missing transfers, repeated failures, unusual sizes, unexpected file counts, and destinations that stop receiving expected updates.",
    "The script should stop safely, report the stage that failed, avoid leaking sensitive data, and leave enough evidence for review.",
    "Transfer commands often handle data that is not meant for broad visibility."
  ]
};
