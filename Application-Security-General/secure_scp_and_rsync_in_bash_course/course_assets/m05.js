window.COURSE_MODULE = {
  "title": "Source and Destination Validation",
  "graphicAlt": "An expected source and approved destination must both pass checks before data moves; empty values stop early.",
  "narration": "Secure transfer scripts should validate both sides of the transfer before any data moves. The source should exist, match the expected type, and live within an approved scope. The destination should be approved for the workflow and unambiguous enough that reviewers understand where the data will land.\n\nEmpty variables deserve special attention. An empty source, destination, host, or base path should not silently become meaningful. Bash scripts should reject missing values before invoking a transfer tool. A clear validation failure is far safer than a transfer that falls back to an unintended path.\n\nLocal and remote path assumptions should be explicit. A local path may be relative to the runner workspace. A remote path may be relative to the remote account's home directory or another configured base. If the script assumes a directory exists or should be created, that behavior should be intentional and checked.\n\nApproved base directories help keep scope controlled. A backup workflow, release workflow, or diagnostic workflow should define where source data comes from and where destination data may go. Unsupported targets should be rejected rather than normalized into a best guess.\n\nValidation should happen before transfer begins. If the source is missing, the expected type is wrong, the destination is outside the approved area, or the target is not recognized, the script should stop clearly. This protects systems and also gives operators a useful explanation before anything changes.",
  "narrationPoints": [
    "Secure transfer scripts should validate both sides of the transfer before any data moves.",
    "An empty source, destination, host, or base path should not silently become meaningful.",
    "Local and remote path assumptions should be explicit.",
    "A backup workflow, release workflow, or diagnostic workflow should define where source data comes from and where destination data may go.",
    "The source should exist, match the expected type, and live within an approved scope.",
    "The destination should be approved for the workflow and unambiguous enough that reviewers understand where the data will land."
  ]
};
