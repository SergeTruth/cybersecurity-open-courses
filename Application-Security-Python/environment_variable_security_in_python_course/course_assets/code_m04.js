window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Exposure Paths and Leakage Risks with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Expose names, not environment values, in diagnostics",
      "language": "python",
      "blurb": "The support snapshot reports whether approved settings exist without copying their potentially sensitive values.",
      "code": "from collections.abc import Mapping\n\nSAFE_DIAGNOSTIC_NAMES = {\"APP_ENV\", \"REGION\", \"FEATURE_SET\"}\nMAX_DIAGNOSTIC_VALUE_BYTES = 256\n\ndef environment_diagnostics(environment: Mapping[str, str]) -> dict[str, object]:\n    if not isinstance(environment, Mapping):\n        raise TypeError(\"environment mapping required\")\n    diagnostics: dict[str, object] = {}\n    for name in sorted(SAFE_DIAGNOSTIC_NAMES):\n        value = environment.get(name)\n        if value is None:\n            diagnostics[name] = {\"present\": False, \"bytes\": 0}\n            continue\n        if not isinstance(value, str):\n            raise ValueError(\"diagnostic environment value rejected\")\n        size = len(value.encode(\"utf-8\"))\n        if size > MAX_DIAGNOSTIC_VALUE_BYTES:\n            raise ValueError(\"diagnostic environment value exceeds its limit\")\n        diagnostics[name] = {\"present\": True, \"bytes\": size}\n    return diagnostics\n"
    },
    {
      "title": "Remove secrets from crash-report context",
      "language": "python",
      "blurb": "An allowlist constructs the crash metadata rather than attempting to guess every possible sensitive variable name.",
      "code": "from collections.abc import Mapping\nimport unicodedata\n\nCRASH_CONTEXT_ALLOWLIST = (\"APP_ENV\", \"RELEASE_ID\", \"REGION\")\nMAX_CRASH_VALUE_BYTES = 160\n\ndef crash_context(environment: Mapping[str, str]) -> dict[str, str]:\n    if not isinstance(environment, Mapping):\n        raise TypeError(\"environment mapping required\")\n    context: dict[str, str] = {}\n    for name in CRASH_CONTEXT_ALLOWLIST:\n        value = environment.get(name)\n        if value is None:\n            continue\n        if (\n            not isinstance(value, str)\n            or not value\n            or len(value.encode(\"utf-8\")) > MAX_CRASH_VALUE_BYTES\n            or any(unicodedata.category(character) == \"Cc\" for character in value)\n        ):\n            raise ValueError(\"crash-context value rejected\")\n        context[name] = value\n    return context\n"
    }
  ]
};
