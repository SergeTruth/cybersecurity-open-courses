window.COURSE_MODULE = {
  "title": "Logging, Secrets, Monitoring, and Review",
  "graphicAlt": "Safe action evidence records identity, targets and results while review covers access controls and excludes secrets from logs.",
  "narration": "Secure remote administration should leave useful evidence. Logs should identify which automation identity ran, which target was contacted, what high-level action was attempted, when it ran, and whether it succeeded, failed, or partially completed.\n\nLogs should not expose private keys, tokens, passwords, sensitive file contents, or excessive raw command output. Remote administration often touches privileged systems and sensitive diagnostics, so logging needs enough detail for operations without becoming a disclosure channel.\n\nMonitoring should flag failed runs, unexpected targets, repeated authentication problems, unusual source locations, surprising result counts, and host trust changes. These signals can reveal configuration drift, stale access, or automation running outside its intended scope.\n\nReview should include more than the script text. Teams should review access, keys, sudo rules, inventories, target groups, bastion behavior, CI/CD secret scope, and remote command scope. Remote administration is a system of controls, not just a Bash file.\n\nShellCheck and peer review help catch fragile Bash patterns before production. Realistic test environments help validate target selection, permissions, output handling, partial failures, and rollback assumptions. Staged rollout gives teams a way to learn safely before broad execution.\n\nGood review culture treats remote administration scripts as operational infrastructure. They need owners, lifecycle, monitoring, and periodic cleanup just like the systems they administer.",
  "narrationPoints": [
    "Logs should not expose private keys, tokens, passwords, sensitive file contents, or excessive raw command output.",
    "Monitoring should flag failed runs, unexpected targets, repeated authentication problems, unusual source locations, surprising result counts, and host trust changes.",
    "Review should include more than the script text.",
    "ShellCheck and peer review help catch fragile Bash patterns before production.",
    "Good review culture treats remote administration scripts as operational infrastructure.",
    "Remote administration often touches privileged systems and sensitive diagnostics, so logging needs enough detail for operations without becoming a disclosure channel."
  ]
};
