window.COURSE_MODULE = {
  "title": "Why Defensive Rust Programming Matters",
  "graphicAlt": "Memory safety supports, but does not replace, valid domain states, safe failure behavior, and bounded operations.",
  "narration": "Rust gives developers strong tools for building reliable and secure software. Ownership, borrowing, lifetimes, and memory safety in safe code remove many hazards that other languages require teams to manage by convention. That advantage is real, but defensive Rust programming starts with a clear distinction: language safety is a foundation, not the entire building.\n\nA Rust application can still have logic flaws, weak authorization, poor input validation, dependency risk, secret exposure, unsafe configuration, resource exhaustion, and operational failures. These are not failures of Rust as a language. They are reminders that secure software is produced by design discipline, review, testing, and operations as much as by compiler checks.\n\nDefensive Rust programming means using Rust's strengths intentionally while making the rest of the application explicit and constrained. The defensive programmer asks what assumptions exist, which states are valid, where input becomes trusted, how failure behaves, which dependencies run, where secrets flow, and what evidence operators will have when something goes wrong.\n\nThe goal is code that prefers safe defaults, explicit failure, narrow trusted boundaries, and reviewable assumptions. Good defensive Rust is not paranoid or cluttered. It is clear. It gives future maintainers fewer mysteries, gives reviewers better questions, and gives production systems behavior that is easier to observe and recover.\n\nA useful mental model is to treat every module as a small contract. What does it accept? What does it guarantee? What can go wrong? What must never leak? When Rust's type system and module boundaries express those answers, the codebase becomes safer without relying on every caller to remember the same unwritten rules.",
  "narrationPoints": [
    "Rust gives developers strong tools for building reliable.",
    "A Rust application can still have logic flaws.",
    "Defensive Rust programming means using Rust's strengths.",
    "The goal is code that prefers safe defaults.",
    "A useful mental model is to treat every module as a small.",
    "They are reminders that secure software is produced."
  ]
};
