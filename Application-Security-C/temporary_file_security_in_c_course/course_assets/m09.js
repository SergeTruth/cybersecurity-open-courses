window.COURSE_MODULE = {
  "title": "Review, Testing, and Tool Support",
  "graphicAlt": "Lifecycle review and failure tests cover creation, access, partial writes, finalization and leftover-file handling.",
  "narration": "Temporary-file handling should be reviewed as a resource lifecycle. Reviewers should look at creation, directory selection, permissions, data sensitivity, read and write handling, finalization, and cleanup together. A safe creation call does not compensate for unclear cleanup or a poorly chosen directory.\n\nTests should cover boundary, failure, and cleanup paths. Include file open failures, oversized content, partial write handling where practical, validation failure after creation, retry behavior, normal cleanup, and leftover-file checks. These cases reveal assumptions that happy-path tests miss.\n\nPermission tests can reveal deployment assumptions. A tool may behave differently under a service account, build agent, container, scheduled task, or developer shell. Tests and operational checks should confirm that directories and file modes match the intended environment.\n\nStatic analysis, compiler warnings, and sanitizers can help find risky patterns around unchecked return values, memory handling, and resource cleanup. They can also call attention to ignored errors or paths that skip cleanup. These tools are useful, but they do not replace explicit resource contracts.\n\nOperational checks can also help. Monitoring for leftover temporary files, unexpected growth, permission drift, or sensitive names in logs can reveal gaps. Findings should feed back into creation rules, cleanup design, and review checklists.",
  "narrationPoints": [
    "Reviewers should look at creation, directory selection, permissions, data sensitivity, read and write handling, finalization, and cleanup together.",
    "Include file open failures, oversized content, partial write handling where practical, validation failure after creation, retry behavior, normal cleanup, and leftover-file checks.",
    "Tests and operational checks should confirm that directories and file modes match the intended environment.",
    "Static analysis, compiler warnings, and sanitizers can help find risky patterns around unchecked return values, memory handling, and resource cleanup.",
    "Findings should feed back into creation rules, cleanup design, and review checklists."
  ]
};
