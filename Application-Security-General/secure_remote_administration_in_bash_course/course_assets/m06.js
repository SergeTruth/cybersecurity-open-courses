window.COURSE_MODULE = {
  "title": "File Transfer, Configuration, and Remote State",
  "graphicAlt": "Approved paths lead to staged content, metadata verification and confirmed active configuration, with cleanup limited to staging.",
  "narration": "Remote administration often changes state. A script may upload a configuration file, fetch logs, stage a package, update a service file, collect diagnostics, or synchronize a directory. These actions should be treated as controlled changes, not incidental file movement.\n\nSource and destination paths should be validated before transfer or update. The script should know what it is allowed to read, where it is allowed to write, and what should happen if a target already exists. Empty path values and unsupported destinations should fail before remote state changes.\n\nSensitive files need careful permissions and ownership. A file that arrives readable by the wrong group or owned by the wrong account can create access or runtime problems. The script should define important metadata expectations and check them where they matter.\n\nStaging is useful for important updates. A script can place content in a temporary or versioned location, verify it, and then move it into final placement. This reduces the chance that partial transfers or failed updates become active configuration.\n\nAvoid broad cleanup behavior. Cleanup should target known temporary files or directories, not ambiguous paths. Accidental overwrites and broad cleanup steps are common ways for routine maintenance automation to damage useful state.\n\nAfter state-changing work, verify the expected result. Confirm the service, file, configuration, or diagnostic output is in the state the workflow requires, and leave enough evidence for operators to understand what changed and what needs follow-up.",
  "narrationPoints": [
    "A script may upload a configuration file, fetch logs, stage a package, update a service file, collect diagnostics, or synchronize a directory.",
    "Source and destination paths should be validated before transfer or update.",
    "A file that arrives readable by the wrong group or owned by the wrong account can create access or runtime problems.",
    "A script can place content in a temporary or versioned location, verify it, and then move it into final placement.",
    "Cleanup should target known temporary files or directories, not ambiguous paths.",
    "The script should know what it is allowed to read, where it is allowed to write, and what should happen if a target already exists."
  ]
};
