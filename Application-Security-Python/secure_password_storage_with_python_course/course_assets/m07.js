window.COURSE_MODULE = {
  "title": "Migration and Legacy Password Storage",
  "graphicAlt": "Successful legacy verification enables a current verifier; other accounts follow a reviewed reset plan.",
  "narration": "Many real Python systems inherit legacy password storage. Older hashes may use outdated algorithms, weak cost settings, missing salts, inconsistent encodings, or homegrown formats. The first step is identification. Teams need to know which accounts use which scheme, how verifiers are encoded, whether salts and parameters are available, and whether any plaintext or reversible password data exists in databases, logs, backups, exports, or test fixtures.\n\nMigration should reduce stored password risk while preserving availability. Rehash-on-login is a common concept: when a user successfully authenticates with an older verifier, the application immediately stores a new verifier using the current algorithm and parameters. This avoids forcing every user to reset at once, but it only updates accounts that log in. Dormant or high-risk accounts may still need separate handling.\n\nAlgorithm versioning and parameter versioning make migration safer. The stored verifier should identify which algorithm and settings were used so the application can verify old records and know when an upgrade is needed. Forced reset scenarios may be appropriate when the legacy scheme is too weak, when plaintext exposure is suspected, or when the application cannot safely verify old hashes. User communication should be clear without oversharing security-sensitive details.\n\nMigration should leave audit evidence. Teams should be able to show what legacy schemes existed, what policy replaced them, how users were migrated, which accounts remain, and how exceptions are tracked. Password migration is not just a code change. It is an operational process involving risk review, user impact, support readiness, incident response planning, and continued monitoring until legacy storage is eliminated.",
  "narrationPoints": [
    "Many real Python systems inherit legacy password storage.",
    "Migration should reduce stored password risk.",
    "Algorithm versioning and parameter versioning make.",
    "Migration should leave audit evidence.",
    "Older hashes may use outdated algorithms.",
    "This avoids forcing every user to reset at once."
  ]
};
