window.COURSE_MODULE = {
  "title": "Course Summary: Building Safer Automation Habits",
  "graphicAlt": "Draft visual summarizing safer shell automation habits.",
  "narration": "Secure shell scripting is a set of repeatable engineering habits. Quote values that should stay together. Validate input before it changes behavior. Check important command results. Fail early when continuing would be unsafe. Protect secrets, sensitive files, and privileged operations. Control paths, temporary files, and external command execution. Log enough to support operations without leaking sensitive values.\n\nThese habits make automation easier to trust. They do not require every script to become a large framework. A short script can still be clear about its inputs, permissions, dependencies, and failure behavior. A longer script can still stay readable through functions, comments, and tests. The point is to make the script predictable for both the machine that runs it and the person who must maintain it later.\n\nExisting scripts can improve incrementally. Start by quoting variables, adding input validation, checking important results, removing hard-coded secrets, controlling PATH, switching to safe temporary-file patterns, and adding clear logs. Then add tests for missing files, unusual filenames, permission failures, and dry-run behavior. Small improvements to widely used automation can reduce real operational risk.\n\nThe final mindset is professional and defensive. Automation is powerful, and that is why it deserves review. Safer shell scripts help teams deploy, maintain, investigate, and recover with fewer surprises. The final quiz checks the main habits from this course: quote, validate, check, protect, control, log, test, and review.",
  "narrationPoints": [
    "Secure shell scripting is a set of repeatable engineering habits.",
    "Quote values that should stay together.",
    "Validate input before it changes behavior.",
    "Check important command results.",
    "Fail early when continuing would be unsafe.",
    "Protect secrets, sensitive files, and privileged operations."
  ]
};
