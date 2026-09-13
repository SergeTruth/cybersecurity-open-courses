window.COURSE_MODULE = {
  "title": "Testing, Tooling, Review, and Maintenance",
  "graphicAlt": "Boundary tests, contract review, applicable Miri or sanitizer checks, and maintained assumptions provide complementary evidence for unsafe code.",
  "narration": "Unsafe code needs more than a one-time glance. The important question is not just whether the code looked reasonable during the first review. The question is whether the team has ongoing evidence that the safety assumptions still hold as the code changes, platforms change, dependencies update, and surrounding APIs evolve.\n\nTests should cover expected behavior, boundary values, invalid inputs, empty inputs, unusual sizes, concurrency expectations, and error paths. Boundary tests are especially important because unsafe code often exists where the program crosses from one representation or system into another. Regression tests help preserve assumptions after a bug or review finding.\n\nReview should focus on safety contracts, invariants, pointer assumptions, FFI assumptions, layout assumptions, thread behavior, public API guarantees, and maintenance risk. A reviewer should be able to connect each unsafe operation to a documented reason and to evidence that the reason still applies.\n\nTooling can support review through formatting, linting, CI checks, dependency review, and specialized runtime-checking concepts such as Miri or sanitizers. Not every tool is available or appropriate in every environment, but teams should understand the tool categories and use the ones that match their risk profile.\n\nMaintenance matters because a safe abstraction can become unsafe if future changes violate an assumption nobody documented or tested. Updating safety documentation is part of changing unsafe code. If a refactor changes ownership, layout, lifetime, or thread behavior, the safety contract and tests should change with it.",
  "narrationPoints": [
    "Unsafe code needs more than a one-time glance.",
    "Tests should cover expected behavior.",
    "Review should focus on safety contracts.",
    "Tooling can support review through formatting.",
    "Maintenance matters because a safe abstraction can become.",
    "The important question is not just whether the code looked."
  ]
};
