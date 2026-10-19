window.COURSE_MODULE = {
  "title": "Course Summary: Make Lifetimes Explicit",
  "graphicAlt": "Explicit storage, state, ownership, borrowing and cleanup rules are supported by tests, analysis and review.",
  "narration": "The practical rule for this course is to make lifetimes explicit. Every object should have a known storage duration, a known initialization state, a known owner, a known borrowing rule, a known cleanup path, and a known API contract. When those facts are visible, C code becomes easier to review and maintain.\n\nUse direct review questions. What storage duration does this object have? Is it initialized before use? Who owns it? Is this pointer borrowed or owned? How long is the reference valid? Can the pointer be retained after the function returns? What happens during failure or cleanup?\n\nTreat cleanup as part of the design, not an afterthought. Free only owned resources, handle partial construction, define transfer behavior, and keep error paths predictable. Long-lived objects still need access rules, and short-lived objects must not leak their addresses into longer-lived contexts.\n\nFinally, support the design with tests, warnings, static analysis, sanitizers, and code review. Tools can reveal risky patterns, but they do not replace explicit ownership, validity, and cleanup contracts. Safer C comes from making object lifetime a repeatable engineering habit.",
  "narrationPoints": [
    "When those facts are visible, C code becomes easier to review and maintain.",
    "Every object should have a known storage duration, a known initialization state, a known owner, a known borrowing rule, a known cleanup path.",
    "Can the pointer be retained after the function returns.",
    "Free only owned resources, handle partial construction, define transfer behavior, and keep error paths predictable.",
    "Tools can reveal risky patterns, but they do not replace explicit ownership, validity, and cleanup contracts."
  ]
};
