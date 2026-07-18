window.COURSE_MODULE = {
  "title": "Defensive Error Handling and Execution Controls",
  "graphicAlt": "Draft visual summarizing defensive error handling and execution controls.",
  "narration": "Many scripts are written as if every command succeeds. Real systems are less polite. Files are missing, permissions change, disks fill, services restart, networks fail, and dependencies behave differently after an upgrade. A defensive script identifies which outcomes matter, checks them, and stops when continuing would be unsafe. Silent failure is often worse than loud failure because it leaves operators with false confidence.\n\nStrict mode options such as set -e, set -u, and pipefail can help catch common failures, but they are not magic. They have tradeoffs, exceptions, and interactions that need review. A script should not simply turn on strict options and stop thinking. Important operations still need deliberate checks, meaningful messages, and cleanup logic. The question is not only whether a command failed, but what the script should do next.\n\nTemporary state deserves special attention. A script that creates temporary files, lock files, partial outputs, or working directories should clean them up after success, failure, timeout, or interruption. Traps can help run cleanup steps when a script exits, but the cleanup should be narrow and intentional. Removing the wrong file during error handling is its own risk.\n\nRerunnable scripts are often safer when practical. If a deployment, backup, or processing script can be restarted without corrupting state, operators have more room to recover. Clear precondition checks, staged changes, backups, and actionable failure messages reduce the chance of partial changes becoming a larger incident. Defensive error handling makes failure visible and manageable.",
  "narrationPoints": [
    "Many scripts are written as if every command succeeds.",
    "Real systems are less polite.",
    "Files are missing, permissions change, disks fill, services restart, networks fail, and dependencies behave differently after an upgrade.",
    "A defensive script identifies which outcomes matter, checks them, and stops when continuing would be unsafe.",
    "Silent failure is often worse than loud failure because it leaves operators with false confidence.",
    "Strict mode options such as set -e, set -u, and pipefail can help catch common failures, but they are not magic."
  ]
};
