window.COURSE_MODULE = {
  "title": "Logging, Monitoring, and Review",
  "graphicAlt": "Safe SSH records identify the actor, target, action and result, supporting monitoring and access review without storing secrets.",
  "narration": "Secure SSH automation should leave enough evidence to understand what happened. Useful logs identify the automation identity, target, high-level action, timestamp, and result. They help operators confirm expected activity and investigate failures without guessing which script touched which host.\n\nLogs should not expose private keys, tokens, passwords, sensitive file contents, or excessive raw command output. A remote command may produce useful diagnostic text, but that does not mean it is safe to store everything in routine logs. Logging design should balance evidence with confidentiality.\n\nMonitoring should include failed connections, unusual source locations, unexpected targets, repeated authentication problems, and host key changes. These signals can indicate misconfiguration, stale credentials, environment drift, or attempts to use automation paths outside their intended scope.\n\nTeams should review authorized keys, SSH options, forced-command settings, sudo rules, remote command scope, CI/CD secret scope, and bastion access. Review should be recurring because SSH automation tends to grow as workflows change.\n\nShellCheck and peer review help catch fragile Bash patterns. A realistic test environment helps catch trust, quoting, path, and failure-handling mistakes before production. Staged rollout is useful for SSH automation because remote changes often have broader operational impact than local script output.\n\nGood review culture treats SSH automation as infrastructure. Keys, accounts, host trust, scripts, and logs all need owners and lifecycle. That is how teams keep remote automation reliable as systems and people change.",
  "narrationPoints": [
    "Secure SSH automation should leave enough evidence to understand what happened.",
    "Logs should not expose private keys, tokens, passwords, sensitive file contents, or excessive raw command output.",
    "Monitoring should include failed connections, unusual source locations, unexpected targets, repeated authentication problems, and host key changes.",
    "Teams should review authorized keys, SSH options, forced-command settings, sudo rules, remote command scope, CI/CD secret scope, and bastion access.",
    "ShellCheck and peer review help catch fragile Bash patterns.",
    "Good review culture treats SSH automation as infrastructure."
  ]
};
