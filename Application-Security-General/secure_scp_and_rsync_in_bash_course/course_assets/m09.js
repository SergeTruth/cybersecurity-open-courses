window.COURSE_MODULE = {
  "title": "Course Summary: Secure Transfer Checklist",
  "graphicAlt": "Trusted destinations, validated transfer scope, verified file state and monitored outcomes form a maintained transfer system.",
  "narration": "Secure SCP and rsync use in Bash is a repeatable engineering habit. Start with SSH trust. Verify hosts, manage known-hosts data deliberately, and avoid casual trust bypasses in unattended jobs. Then use dedicated transfer identities with clear purpose, scope, ownership, and lifecycle.\n\nChoose the transfer tool based on the workflow. Simple copy, controlled file-transfer interface, and incremental synchronization are different jobs. Understand metadata, comparison behavior, delete behavior, and recovery needs before treating a command as production automation.\n\nKeep Bash invocation fixed and reviewable. Use arrays for option and operand lists, quote values that should remain literal, and validate hosts, users, ports, source paths, destination paths, and relevant option values before execution. Avoid command strings and unnecessary re-parsing.\n\nValidate transfer scope before data moves. Reject empty paths, unsupported targets, unexpected source types, and destinations outside approved locations. Review permissions, ownership, metadata preservation, symlink behavior, and directory boundaries. Verify important post-transfer expectations.\n\nUse dry runs and guardrails for high-impact rsync workflows. Preview risky synchronization, protect last-known-good data where practical, and treat delete or overwrite behavior as a deliberate production decision rather than an option copied from another script.\n\nFinally, check results, log safely, monitor unusual outcomes, and review over time. Secure transfer automation is not a one-time script. It is an operational control that depends on keys, accounts, paths, options, destinations, logs, monitoring, and periodic review.",
  "narrationPoints": [
    "Secure SCP and rsync use in Bash is a repeatable engineering habit.",
    "Choose the transfer tool based on the workflow.",
    "Reject empty paths, unsupported targets, unexpected source types, and destinations outside approved locations.",
    "Use dry runs and guardrails for high-impact rsync workflows.",
    "Finally, check results, log safely, monitor unusual outcomes, and review over time.",
    "Verify hosts, manage known-hosts data deliberately, and avoid casual trust bypasses in unattended jobs."
  ]
};
