window.COURSE_MODULE = {
  "title": "Course Summary: Secure TypeScript Habits",
  "graphicAlt": "Draft visual summary for Course Summary: Secure TypeScript Habits",
  "narration": "TypeScript improves clarity and maintainability, but security still depends on runtime controls and disciplined engineering. Treat external data as untrusted until it has been parsed and validated. Use unknown, schema validation, parsing functions, and narrow application types at boundaries where data enters the system.\n\nAvoid unsafe type escapes unless they are justified and reviewed. any, unchecked assertions, and non-null assertions can hide uncertainty. Model data carefully, validate shape and meaning, normalize values before sensitive use, and remember that a value with the right type may still be unauthorized or inappropriate for the current action.\n\nKeep secrets and authorization decisions in trusted server-side code. Client-side checks can improve usability, but the server must enforce permissions. API handlers should validate requests, preserve invariants on failure, return safe errors, and avoid logging sensitive values. Dependencies and build settings should be managed deliberately.\n\nFinally, reinforce good habits with tests, review, linting, CI gates, release notes, and patch processes. A secure TypeScript application is not just well typed. It is designed so trust boundaries are explicit, risky assumptions are visible, and safe behavior is the normal path. Type clarity is a strong starting point, but runtime trust has to be earned every time data crosses a boundary.",
  "narrationPoints": [
    "TypeScript improves clarity and maintainability, but security still depends on runtime controls and disciplined engineering.",
    "Avoid unsafe type escapes unless they are justified and reviewed.",
    "Keep secrets and authorization decisions in trusted server-side code.",
    "Finally, reinforce good habits with tests, review, linting, CI gates, release notes, and patch processes."
  ]
};
