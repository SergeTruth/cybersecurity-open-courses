window.COURSE_MODULE = {
  "title": "Course Summary: Permission-Safe C Habits",
  "graphicAlt": "Least privilege, safe file creation, protection of all outputs and stable-reference checks rest on testing, documentation and deployment verification.",
  "narration": "Permission-safe C starts with least privilege and safe creation defaults. Request only the file access the operation needs. Create files with permissions appropriate to the data. Avoid broad access followed by attempted repair. Treat permission-sensitive failures as meaningful failures, not background noise.\n\nProtect both primary and secondary outputs. Logs, reports, exports, caches, temporary files, and diagnostics can all contain sensitive information. Their permissions should follow their content and purpose, not the fact that they are operational side effects.\n\nOwnership, groups, directories, platform behavior, inherited defaults, and process identity are part of the design. The source code should not assume those details away. It should document what matters, check what is important for sensitive workflows, and fail safely when required properties are not present.\n\nAvoid race-prone assumptions about paths, metadata, and later file use. A check performed earlier may not describe the object used later if the file system can change. Sensitive workflows should reduce that gap and rely on platform-supported stable references where appropriate.\n\nFinally, use layers. Tests, warnings, static analysis, code review, deployment documentation, and operational validation all support the permission model from different angles. Secure file permissions are not only the job of the system administrator or only the job of the developer. They are a shared part of responsible engineering.",
  "narrationPoints": [
    "Permission-safe C starts with least privilege and safe creation defaults.",
    "Their permissions should follow their content and purpose, not the fact that they are operational side effects.",
    "The source code should not assume those details away.",
    "Sensitive workflows should reduce that gap and rely on platform-supported stable references.",
    "Secure file permissions are not only the job of the system administrator or only the job of the developer."
  ]
};
