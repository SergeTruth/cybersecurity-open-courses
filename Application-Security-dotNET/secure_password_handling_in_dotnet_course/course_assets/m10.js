window.COURSE_MODULE = {
  "title": "Course Summary: A Practical Password Handling Baseline",
  "graphicAlt": "Bullet summary graphic for Course Summary: A Practical Password Handling Baseline.",
  "narration": "A practical .NET password handling baseline starts by treating passwords as high-value authentication secrets. Collect them only through protected, deliberate workflows. Store password hashes, not plaintext or reversible values, and use framework-supported password hashing instead of custom cryptography.\n\nConfigure password policy for length, usability, password manager support, paste support, and compromised-password blocklists. Protect registration, login, reset, change, and recovery flows with predictable messages, safe logging, rate limiting, and clear account lifecycle decisions.\n\nUse MFA or passwordless options where appropriate, especially for administrative access and sensitive actions. Avoid logging or exposing password material in telemetry, screenshots, crash dumps, support artifacts, test data, or production diagnostics. Keep identity secrets out of source control and limit access to identity stores and backups.\n\nFinally, plan for change. Migrate legacy password storage safely, document exceptions, monitor abuse signals, and prepare for compromise response. Secure password handling is a lifecycle discipline across code, configuration, infrastructure, and operations.",
  "narrationPoints": [
    "A practical .NET password handling baseline starts by treating passwords as high-value authentication secrets.",
    "Configure password policy for length, usability, password manager support, paste support, and compromised-password blocklists.",
    "Keep identity secrets out of source control and limit access to identity stores and backups.",
    "Avoid logging or exposing password material in telemetry, screenshots, crash dumps, support artifacts, test data, or production diagnostics.",
    "Migrate legacy password storage safely, document exceptions, monitor abuse signals, and prepare for compromise response."
  ]
};
