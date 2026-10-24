window.COURSE_MODULE = {
  "title": "Testing and Tool-Assisted Review",
  "graphicAlt": "Parser-contract document surrounded by test families: valid/malformed, boundary lengths/numbers, duplicates/missing values, and reviewed failure paths.",
  "narration": "Command-line parsers are excellent candidates for focused tests because the input space is compact and the expected behavior should be explicit. Tests should cover valid invocations, missing required options, unknown options, missing values, duplicate options, invalid positionals, and each documented failure path.\n\nBoundary tests are important for numeric values, lengths, paths, and counts. Include minimums, maximums, just-outside values, empty strings, too-long values, and values that are valid syntax but invalid for the option's context. These tests catch assumptions that simple happy-path cases miss.\n\nMalformed input tests exercise rejection behavior. A parser should be tested for ambiguous combinations, conflicting modes, unexpected ordering, unsupported characters, and end-of-options behavior if supported. Regression tests should be added when parser bugs are fixed so decisions remain stable.\n\nCompiler warnings, static analysis, and sanitizers help find implementation mistakes around conversions, ignored results, bounds, and memory handling. High-level input-generation workflows can also explore combinations of flags and values. These tools are useful because parsers often have many small branches.\n\nCode review ties test evidence to the parser contract. Reviewers should verify that the documented interface matches the implementation, that parsing happens before side effects, that invalid input fails predictably, and that each option's type, range, length, and resource rules are covered by tests.",
  "narrationPoints": [
    "Command-line parsers are excellent candidates for focused tests because the input space is compact and the expected behavior should be explicit.",
    "Boundary tests are important for numeric values, lengths, paths, and counts.",
    "Regression tests should be added when parser bugs are fixed so decisions remain stable.",
    "Compiler warnings, static analysis, and sanitizers help find implementation mistakes around conversions, ignored results, bounds.",
    "Code review ties test evidence to the parser contract."
  ]
};
