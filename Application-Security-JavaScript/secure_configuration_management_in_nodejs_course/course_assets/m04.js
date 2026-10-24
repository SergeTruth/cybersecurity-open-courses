window.COURSE_MODULE = {
  "title": "Configuration Validation and Fail-Safe Startup",
  "graphicAlt": "Configuration passes required-value, parsing and security checks before traffic; invalid values fail safely.",
  "narration": "Configuration bugs are often boring and dangerous at the same time. A missing session secret may trigger fallback behavior. A value that should be false may be interpreted as true because any non-empty string was treated as enabled. A rate limit may be disabled because a number failed to parse. A URL may point at the wrong environment. These failures are preventable when configuration is validated before the application handles traffic or before a sensitive feature is used.\n\nValidate required values, types, formats, allowed values, ranges, URLs, ports, booleans, durations, file paths, environment names, and security modes. Centralized schemas or validation logic can make expected configuration visible and testable. Avoid stringly typed assumptions. For booleans, parse accepted values explicitly. For durations and sizes, define units. For origins, endpoints, and modes, use allowlists that match the business and deployment model.\n\nFail closed when security-critical configuration is missing, malformed, or unsafe. A startup failure should be clear enough for operators to fix quickly, but it should not reveal secrets. Validation reduces drift between environments because it catches mistakes before runtime traffic depends on them. It also creates evidence: the team can see which configuration was expected, whether it was present, and whether it passed the checks required for that environment.",
  "narrationPoints": [
    "These failures are preventable when configuration is validated before the application handles traffic or before a sensitive feature is used.",
    "Validate required values, types, formats, allowed values, ranges, URLs, ports, booleans, durations, file paths, environment names, and security modes.",
    "Fail closed when security-critical configuration is missing, malformed, or unsafe.",
    "Centralized schemas or validation logic can make expected configuration visible and testable.",
    "A startup failure should be clear enough for operators to fix quickly, but it should not reveal secrets.",
    "Validation reduces drift between environments because it catches mistakes before runtime traffic depends on them."
  ]
};
