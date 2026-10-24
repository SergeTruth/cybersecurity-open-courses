window.COURSE_MODULE = {
  "title": "Safe Error Handling and Usage Messages",
  "graphicAlt": "Invalid argument enters rejection gate, leading to nonzero-status/concise-usage report and unchanged-state object.",
  "narration": "When parsing fails, the safest behavior is predictable rejection. A tool should fail closed on invalid, missing, contradictory, unknown, or ambiguous arguments. It should not continue with guessed defaults or partial interpretation unless that behavior is part of a documented contract.\n\nConsistent error returns matter because command-line tools are often used by scripts and automation. A clear nonzero exit status, stable error category, and useful usage message help callers respond correctly. The parser should avoid mixing validation failure with partially completed work.\n\nAvoid partial state changes after parse failure. If a tool creates files, removes resources, updates configuration, or writes output before parsing is complete, a later validation error can leave the system in a confusing state. Parse and validate first, then act.\n\nUsage messages should be helpful without disclosing sensitive values. They can name the invalid option, expected type, required range, or missing value. Logs should avoid copying secrets, large raw arguments, or internal details that are unnecessary for diagnosis.\n\nGood failure behavior is part of the user experience and the safety model. A reliable tool tells the user what went wrong, exits consistently, and leaves program state unchanged when validation did not succeed.",
  "narrationPoints": [
    "A tool should fail closed on invalid, missing, contradictory, unknown, or ambiguous arguments.",
    "The parser should avoid mixing validation failure with partially completed work.",
    "If a tool creates files, removes resources, updates configuration, or writes output before parsing is complete.",
    "Logs should avoid copying secrets, large raw arguments, or internal details that are unnecessary for diagnosis.",
    "Good failure behavior is part of the user experience and the safety model."
  ]
};
