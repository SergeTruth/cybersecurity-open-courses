window.COURSE_MODULE = {
  "title": "Validation Strategy: Accept Known Good",
  "graphicAlt": "Inputs must match type, format, length, range and state rules before entering a known-good representation; ambiguous forms are rejected.",
  "narration": "A strong validation strategy starts by defining what valid input looks like. Instead of trying to list every possible invalid case, describe the source, type, required fields, allowed characters, length limits, range limits, encoding, and state relationships that the program actually expects.\n\nAccept-known-good validation is usually easier to reason about than broad acceptance. An allowlist says which forms are permitted and rejects everything else. That is clearer than relying on a long denylist of unusual values, especially when the input space includes many encodings, separators, control characters, or partially formed records.\n\nAmbiguous data should be rejected or normalized only under clear rules. For example, the program should know whether extra whitespace is allowed, whether repeated delimiters are meaningful, whether case changes are acceptable, and whether more than one representation of the same value can appear. Canonical forms help only when the canonicalization rule itself is precise.\n\nValidation should be close to the boundary where input enters the program. If raw input travels through many layers before it is checked, more code has to defend itself against every possible shape. A validated internal representation lets later code work with clearer types and smaller assumptions.\n\nThe strategy should match the use case. A parser for a configuration file, a command-line option, a field in a record, and a device message may all need different rules. The shared discipline is to define expected good input and reject values that do not fit the contract.",
  "narrationPoints": [
    "Instead of trying to list every possible invalid case, describe the source, type, required fields, allowed characters.",
    "An allowlist says which forms are permitted and rejects everything else.",
    "Ambiguous data should be rejected or normalized only under clear rules.",
    "Validation should be close to the boundary where input enters the program.",
    "A parser for a configuration file, a command-line option, a field in a record, and a device message may all need different rules."
  ]
};
