window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Exposure Paths and Leakage Risks with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Expose names, not environment values, in diagnostics",
      "language": "python",
      "blurb": "The support snapshot reports whether approved settings exist without copying their potentially sensitive values.",
      "code": "SAFE_DIAGNOSTIC_NAMES = {\"APP_ENV\", \"REGION\", \"FEATURE_SET\"}\n\ndef environment_diagnostics(environment: dict[str, str]) -> dict[str, object]:\n    return {\n        name: {\"present\": name in environment, \"length\": len(environment.get(name, \"\"))}\n        for name in sorted(SAFE_DIAGNOSTIC_NAMES)\n    }\n"
    },
    {
      "title": "Remove secrets from crash-report context",
      "language": "python",
      "blurb": "An allowlist constructs the crash metadata rather than attempting to guess every possible sensitive variable name.",
      "code": "CRASH_CONTEXT_ALLOWLIST = (\"APP_ENV\", \"RELEASE_ID\", \"REGION\")\n\ndef crash_context(environment: dict[str, str]) -> dict[str, str]:\n    context = {}\n    for name in CRASH_CONTEXT_ALLOWLIST:\n        value = environment.get(name)\n        if value is not None:\n            context[name] = value[:80]\n    return context\n"
    }
  ]
};
