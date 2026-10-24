window.COURSE_MODULE = {
  "title": "Why Secure File Transfer Automation Matters",
  "graphicAlt": "A file crosses a system boundary under explicit scope, identity, metadata and result checks.",
  "narration": "SCP and rsync are common in Bash automation because they make file movement feel simple. A script can publish build artifacts, copy reports, fetch logs, synchronize configuration, stage release files, move backups, or update remote directories. That convenience is valuable, but it also means a small script can move important data across trust boundaries.\n\nFile transfer automation is security-relevant because it affects production systems, backup integrity, release evidence, audit records, and operational troubleshooting. A transfer may look like a routine copy, but the source, destination, identity, permissions, metadata, and result can all shape downstream behavior.\n\nThe most common failures are not dramatic. A script may transfer the wrong directory, overwrite the wrong destination, expose sensitive files through broad permissions, synchronize stale data, or delete more than intended. In unattended workflows, those mistakes may not be noticed until another job depends on the result.\n\nSecure transfer automation treats scope as a first-class design decision. The script should define which files are allowed to move, which hosts are trusted, which identity performs the transfer, which destination is approved, and how success or failure is checked. Those choices should be visible to reviewers.\n\nThe defensive goal is not to avoid SCP or rsync. The goal is intentional, scoped, observable, and reviewable transfer automation. When file movement is explicit and monitored, Bash can remain a practical operations tool without hiding unnecessary risk.",
  "narrationPoints": [
    "SCP and rsync are common in Bash automation because they make file movement feel simple.",
    "File transfer automation is security-relevant because it affects production systems, backup integrity, release evidence, audit records, and operational troubleshooting.",
    "A script may transfer the wrong directory, overwrite the wrong destination, expose sensitive files through broad permissions, synchronize stale data, or delete more than intended.",
    "Secure transfer automation treats scope as a first-class design decision.",
    "The defensive goal is not to avoid SCP or rsync.",
    "A script can publish build artifacts, copy reports, fetch logs, synchronize configuration, stage release files, move backups, or update remote directories."
  ]
};
