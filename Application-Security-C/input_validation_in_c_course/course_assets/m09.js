window.COURSE_MODULE = {
  "title": "Review, Testing, and Tool Support",
  "graphicAlt": "Boundary, malformed-input and regression tests exercise a validation contract, supported by review and diagnostics.",
  "narration": "Teams validate validation logic through review, meaningful tests, and tool-supported diagnostics. The first step is to turn assumptions into test cases. Boundary tests should cover empty input, minimum values, maximum values, one-beyond limits, missing terminators, short records, long records, and values near numeric limits.\n\nMalformed input tests exercise rejection paths. They should include missing fields, duplicate fields, unexpected delimiters, invalid characters, embedded null bytes where relevant, wrong encodings, leftover numeric text, incomplete records, and inconsistent cross-field relationships. Rejection behavior is part of the product, not an afterthought.\n\nRegression tests should be added when validation defects are fixed. A corrected validation rule is easier to preserve when a test describes the old assumption and the intended behavior. This is especially useful for parsers and configuration formats that evolve over time.\n\nCompiler warnings, static analysis, and sanitizers can help reveal missed assumptions. Warnings may point to suspicious conversions, ignored results, or bounds concerns. Static analysis can show paths where validation is skipped. Runtime diagnostics can expose memory mistakes when tests exercise relevant cases.\n\nCode review ties the pieces together. Reviewers should ask where input comes from, what trust boundary it crossed, what contract defines valid data, whether validation happens before use, what happens on failure, and whether tests cover both boundary and malformed cases. Tools help, but the quality of validation comes from clear contracts.",
  "narrationPoints": [
    "Teams validate validation logic through review, meaningful tests, and tool-supported diagnostics.",
    "Rejection behavior is part of the product, not an afterthought.",
    "Regression tests should be added when validation defects are fixed.",
    "Warnings may point to suspicious conversions, ignored results, or bounds concerns.",
    "Reviewers should ask where input comes from, what trust boundary it crossed, what contract defines valid data."
  ]
};
