window.COURSE_MODULE = {
  "title": "SSH Trust, Identity, and Transfer Context",
  "graphicAlt": "Verified host identity and a dedicated transfer identity jointly precede access to the expected server.",
  "narration": "SCP and many rsync workflows rely on SSH for transport and authentication. That means secure transfer automation starts with the same foundation as secure SSH automation: host trust, identity design, key protection, and scoped remote access.\n\nHost key verification helps the client confirm that it is connecting to the expected server. In interactive use, a person may see a host key prompt or warning. In unattended automation, the trust decision must be managed ahead of time. Known hosts should be deliberate, not whatever happened during a first manual run.\n\nTransfer identities should be dedicated to the workflow. A deployment identity, backup identity, diagnostic identity, and administrative identity should not automatically be the same account or key. Clear purpose and ownership make it easier to scope access, monitor activity, and revoke credentials when work changes.\n\nPrivate keys should be protected, distributed carefully, rotated, and revoked when no longer needed. Key material in CI/CD, runners, workstations, and secret stores needs lifecycle management. Stale keys and unclear authorized-key entries are signs that transfer automation is becoming hard to govern.\n\nLeast privilege is essential for remote accounts. A file transfer account should have only the access required for its job, and production access should be separated from development and staging access where practical. Bypassing host verification or sharing broad keys may reduce setup friction, but it weakens the trust boundary the automation depends on.",
  "narrationPoints": [
    "SCP and many rsync workflows rely on SSH for transport and authentication.",
    "Host key verification helps the client confirm that it is connecting to the expected server.",
    "Transfer identities should be dedicated to the workflow.",
    "Private keys should be protected, distributed carefully, rotated, and revoked when no longer needed.",
    "A file transfer account should have only the access required for its job, and production access should be separated from development and staging access where practical.",
    "In interactive use, a person may see a host key prompt or warning."
  ]
};
