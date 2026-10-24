window.COURSE_MODULE = {
  "title": "Defaults, Overrides, and Precedence",
  "graphicAlt": "An explicit precedence policy resolves configuration layers into safely observable effective settings.",
  "narration": "Real configuration often comes from layers. A program may have built-in defaults, a default configuration file, a user configuration file, environment variables, command-line overrides, runtime settings, and deployment-provided values. Safe parsing includes deciding which source wins.\n\nDefaults should be safe and visible. A safe default avoids unnecessary exposure, surprising resource access, excessive permissions, or risky behavior when no explicit configuration is provided. Defaults should be documented so administrators and reviewers know which behavior occurs in the absence of a setting.\n\nPrecedence order must be explicit. If an environment variable overrides a file, or a command-line option overrides deployment configuration, the parser should apply that order consistently. Hidden precedence can make the running configuration different from what operators believe they supplied.\n\nConflicting settings should be handled predictably. Some conflicts should be rejected. Some can be resolved by precedence. Some may require a warning or migration path. The parser should not silently combine incompatible values if the result is unclear.\n\nLayering should not hide behavior changes. A later override may change a security-sensitive setting, a resource location, a timeout, or a feature flag. The program should make final effective configuration observable in a safe way, especially during startup diagnostics or troubleshooting.",
  "narrationPoints": [
    "A program may have built-in defaults, a default configuration file, a user configuration file, environment variables.",
    "A safe default avoids unnecessary exposure, surprising resource access, excessive permissions.",
    "If an environment variable overrides a file, or a command-line option overrides deployment configuration.",
    "The parser should not silently combine incompatible values if the result is unclear.",
    "The program should make final effective configuration observable in a safe way, especially during startup diagnostics or troubleshooting."
  ]
};
