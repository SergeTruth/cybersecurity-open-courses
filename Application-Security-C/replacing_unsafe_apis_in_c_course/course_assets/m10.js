window.COURSE_MODULE = {
  "title": "Course Summary: Safer API Migration Habits",
  "graphicAlt": "Bullet summary graphic for Course Summary: Safer API Migration Habits.",
  "narration": "Replacing unsafe APIs in C begins with understanding the data contract at each call site. What are the source and destination? How large can the input be? What is the destination capacity? Is the data a C string, raw bytes, a path, a number, or a process argument? What owns the memory, and what happens on failure?\n\nPrefer APIs and helper patterns that require explicit sizes, clear ownership, and checked results. A safer function is only useful when the caller supplies the correct capacity and responds to the status it returns. Treat truncation, conversion failure, partial I/O, and allocation failure as normal engineering cases, not surprises.\n\nKeep string, memory, file, path, environment, and process behavior within documented boundaries. Do not rely on comments or current test data to enforce limits. Make boundaries visible in code, tests, wrappers, and review notes.\n\nUse warnings, static analysis, sanitizers, code search, banned API lists, tests, and peer review as layered support. None of those tools replaces design judgment, but together they help teams find risky patterns, prevent regressions, and measure migration progress.\n\nThe final habit is steady governance. Make unsafe API usage visible, prioritize the riskiest contexts, document exceptions, and reduce the count over time. A successful migration leaves the code easier to reason about, not merely quieter to compile.",
  "narrationPoints": [
    "Is the data a C string, raw bytes, a path, a number, or a process argument.",
    "Treat truncation, conversion failure, partial I/O, and allocation failure as normal engineering cases, not surprises.",
    "Do not rely on comments or current test data to enforce limits.",
    "None of those tools replaces design judgment, but together they help teams find risky patterns, prevent regressions.",
    "Make unsafe API usage visible, prioritize the riskiest contexts, document exceptions."
  ]
};
