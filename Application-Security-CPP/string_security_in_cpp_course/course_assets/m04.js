window.COURSE_MODULE = {
  "title": "Input Validation and Parsing Boundaries",
  "graphicAlt": "Parsing and domain-specific validation separate external strings from trusted business operations.",
  "narration": "String input should be treated as untrusted until the application validates it. Inputs can come from files, protocols, users, command lines, configuration, environment variables, IPC, databases, or other processes. A value that looks internal may still have crossed a trust boundary before it reached the current function.\n\nValidation should define expected length, allowed format, allowed character set, required encoding, and domain rules. A username, a file name, a protocol field, and a configuration key should not share one vague validation rule. Each has a purpose, and the accepted values should match that purpose.\n\nParsing should be separated from validation and business logic. Raw strings should not flow through the application as if they were trusted decisions. A parser can translate input into a structured type, validation can decide whether the structured value is allowed, and business logic can operate on the validated result.\n\nInvalid, ambiguous, oversized, or malformed strings should fail safely. A failure path should not fall back to a more permissive mode, skip important checks, or keep using a partially parsed value. Error messages should help operators diagnose the issue without exposing sensitive values or internal parsing assumptions.\n\nGood validation is explicit enough to test. Boundary tests should show what the application accepts, what it rejects, and how it reports rejection.",
  "narrationPoints": [
    "String input should be treated as untrusted until the application validates it.",
    "A username, a file name, a protocol field, and a configuration key should not share one vague validation rule.",
    "Validation should define expected length, allowed format, allowed character set, required encoding, and domain rules.",
    "A parser can translate input into a structured type, validation can decide whether the structured value is allowed, and business logic can operate on the validated result.",
    "A failure path should not fall back to a more permissive mode, skip important checks, or keep using a partially parsed value.",
    "Boundary tests should show what the application accepts, what it rejects, and how it reports rejection."
  ]
};
