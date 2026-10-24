window.COURSE_MODULE = {
  "title": "Dry Runs, Incremental Sync, Deletes, and Overwrite Safety",
  "graphicAlt": "A sync preview and scope review precede selected changes while known-good destination state is protected.",
  "narration": "rsync is powerful because it can compare, update, and synchronize directory trees efficiently. That same power requires guardrails. A small source, destination, or option mistake can change many files quickly, especially in unattended automation.\n\nDry runs are valuable for high-impact synchronization. A preview can show what would change before the script applies the change. Dry-run output should be reviewed at the right level: enough to catch unexpected scope, not so much raw data that logs become noisy or sensitive.\n\nDelete behavior should be deliberate, documented, and protected by validation. If deletion is part of the workflow, the script should make that clear, require an approved source and destination, and avoid broad ambiguous patterns. If deletion is not part of the workflow, options and behavior should reflect that.\n\nOverwrite safety matters for releases, backups, reports, and configuration. Protect last-known-good data where practical, use staging or versioned destinations when appropriate, and consider rollback or recovery before replacing production files. A fast sync is not automatically a safe sync.\n\nIncremental transfer should be monitored like any other state-changing operation. Count changes, watch for unusual sizes or file counts, and report high-level outcomes. Unexpectedly large changes, missing expected files, or repeated no-change results can all indicate a workflow problem.\n\nThe defensive goal is controlled synchronization. Validate scope, preview risky changes, guard deletion and overwrite behavior, check results, and make outcomes visible enough that operators can trust what happened.",
  "narrationPoints": [
    "rsync is powerful because it can compare, update, and synchronize directory trees efficiently.",
    "A preview can show what would change before the script applies the change.",
    "Delete behavior should be deliberate, documented, and protected by validation.",
    "Overwrite safety matters for releases, backups, reports, and configuration.",
    "Incremental transfer should be monitored like any other state-changing operation.",
    "Validate scope, preview risky changes, guard deletion and overwrite behavior, check results, and make outcomes visible enough that operators can trust what happened."
  ]
};
