window.COURSE_MODULE = {
  "title": "Logging, Auditing, and Observability",
  "graphicAlt": "Draft visual summarizing logging, auditing, and observability.",
  "narration": "A script that changes systems should leave enough evidence to understand what happened. Good logging supports troubleshooting, incident review, and operational accountability. The script should make it clear what it attempted, what succeeded, what failed, and what requires follow-up. Without that evidence, operators have to infer behavior from partial outputs, timestamps, and side effects.\n\nUseful logs are specific without being reckless. A message such as starting backup for service inventory is more useful than running command, and safer than dumping every variable in the environment. Errors should support action: what precondition failed, what resource was unavailable, or what dependency returned an unexpected result. Normal output and error output should be separated so humans and automation can consume them reliably.\n\nLogging can also create risk. Scripts that print tokens, passwords, customer data, private paths, or full command lines with secrets may turn operational evidence into a data exposure. Debug modes should be treated carefully and should not be left enabled in production automation by default. Redaction should happen before sensitive values reach logs, tickets, chat systems, build output, or monitoring tools.\n\nConsistent message formats help audit and automation. Dry-run modes can be useful when they clearly report intended actions without making changes. For high-impact scripts, logs should show the decision points and outcomes at a safe level of detail. The goal is observability that helps defenders and operators without revealing the very data the script is supposed to protect.",
  "narrationPoints": [
    "A script that changes systems should leave enough evidence to understand what happened.",
    "Good logging supports troubleshooting, incident review, and operational accountability.",
    "The script should make it clear what it attempted, what succeeded, what failed, and what requires follow-up.",
    "Without that evidence, operators have to infer behavior from partial outputs, timestamps, and side effects.",
    "Useful logs are specific without being reckless.",
    "A message such as starting backup for service inventory is more useful than running command, and safer than dumping every variable in the environment."
  ]
};
