window.COURSE_MODULE = {
  "title": "Why Rust Anti-Patterns Matter",
  "graphicAlt": "Compiler success is a foundation; ownership clarity, error handling, validation, and resource limits still need review.",
  "narration": "Rust gives teams strong tools for memory safety, ownership, and explicit failure handling, but compiling successfully is not the same as being robust, secure, maintainable, or operationally ready. A program can satisfy the compiler while still hiding unclear ownership, fragile error paths, weak validation, excessive resource use, or difficult-to-review lifecycle assumptions.\n\nA Rust anti-pattern is a repeated habit that works in the moment but creates future cost. It may start as a quick clone, a broad lifetime annotation, an `unwrap` in code that later becomes production logic, a raw primitive passed through too many layers, or an unsafe boundary that depends on undocumented assumptions. None of these choices automatically means the code is broken, but each can become a design smell.\n\nThe useful posture is not blame. Anti-patterns are signals. They show places where the code is asking for clearer ownership, more deliberate error handling, stronger types, safer boundaries, better tests, or more explicit operational behavior. Treating these signals early is cheaper than discovering them after an incident, outage, or painful refactor.\n\nRust's strengths are real, but they do not remove the need for engineering judgment. The compiler can enforce many borrowing rules, but it cannot decide whether an API exposes the right domain model, whether a dependency feature is appropriate, whether a log line leaks sensitive data, or whether an async service has sane backpressure.\n\nThe defensive goal of this course is to make weak patterns easier to recognize and safer alternatives easier to choose. Good Rust code makes ownership, errors, data meaning, boundary validation, resource limits, and operational assumptions visible enough for another engineer to review, test, and maintain.",
  "narrationPoints": [
    "Rust gives teams strong tools for memory safety.",
    "A Rust anti-pattern is a repeated habit that works.",
    "The useful posture is not blame.",
    "Rust's strengths are real.",
    "The defensive goal of this course is to make weak patterns.",
    "A program can satisfy the compiler."
  ]
};
