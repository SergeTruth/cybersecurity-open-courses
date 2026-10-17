window.COURSE_MODULE = {
  "title": "Course Summary: Temporary File Safety Habits",
  "graphicAlt": "Trusted locations, exclusive creation, minimized restricted data and owned recovery form one reviewed temporary-file lifecycle.",
  "narration": "Secure temporary-file handling starts with the mindset that temporary files are real storage. They can contain sensitive data, survive longer than intended, and interact with filesystem permissions, names, links, and operational tools.\n\nUse trusted locations. Prefer per-user or application-private directories with appropriate permissions. Treat environment-provided paths as configuration, and avoid casual dependence on shared writable directories unless the design accounts for that safely.\n\nAvoid predictable names and check-then-create logic. Use atomic exclusive creation through platform-supported APIs or well-reviewed wrappers, and keep the opened handle as the authority whenever possible.\n\nRestrict permissions and minimize contents. Do not write secrets, unnecessary sensitive data, or broad diagnostics to disk simply because the file is temporary. Review inherited permissions and ownership expectations across deployment contexts.\n\nFinally, use RAII cleanup and plan for failure. Temporary-file code should handle partial writes, disk pressure, restarts, orphaned files, and cleanup errors predictably. Review this code as part of secure C++ engineering, not as incidental plumbing.\n\nThe durable habit is to make temporary-file behavior explicit in code. Location, creation, permissions, contents, lifetime, cleanup, and failure response should be visible enough that reviewers can reason about them without guesswork.",
  "narrationPoints": [
    "Secure temporary-file handling starts with the mindset that temporary files are real storage.",
    "Treat environment-provided paths as configuration, and avoid casual dependence on shared writable directories unless the design accounts for that safely.",
    "Use atomic exclusive creation through platform-supported APIs or well-reviewed wrappers, and keep the opened handle as the authority whenever possible.",
    "Do not write secrets, unnecessary sensitive data, or broad diagnostics to disk simply because the file is temporary.",
    "Review this code as part of secure C++ engineering, not as incidental plumbing.",
    "Location, creation, permissions, contents, lifetime, cleanup, and failure response should be visible enough that reviewers can reason about them without guesswork."
  ]
};
