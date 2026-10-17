window.COURSE_MODULE = {
  "title": "Testing, Leak Detection, and Review Practices",
  "graphicAlt": "Show create/use/destroy loop plus failure/shutdown checks and tool findings tracked.",
  "narration": "Teams make leak prevention measurable through tests, diagnostics, and review. LeakSanitizer, AddressSanitizer, static analysis, compiler warnings, debug allocation tools, and platform diagnostics can expose retained resources earlier than production monitoring alone.\n\nRepeated create-destroy tests are especially useful. A component that appears fine after one run may retain state across many cycles. Tests that create, use, destroy, and repeat can reveal retained ownership in services, libraries, caches, and factories.\n\nShutdown tests catch missed cleanup. They should exercise callback deregistration, cache eviction, queue draining, session expiration, failed initialization, and cleanup after error paths. A clean shutdown path is often where unclear ownership becomes visible.\n\nStatic analysis and code review can flag ownership mistakes before runtime. Reviewers should ask who owns this resource, how it is released, whether it can be retained by a cycle, what happens on failure, and whether a cache or queue has a boundary.\n\nFindings should become tracked engineering defects with owners, fixes, and regression tests. Suppressions should be documented and revisited. Leak prevention improves when tool feedback changes the codebase instead of becoming background noise.\n\nTooling works best when the team agrees on expectations. Decide which leak checks run locally, which run in CI, what failures block release, and how exceptions are reviewed so the signal remains useful.",
  "narrationPoints": [
    "Teams make leak prevention measurable through tests, diagnostics, and review.",
    "Tests that create, use, destroy, and repeat can reveal retained ownership in services, libraries, caches, and factories.",
    "A clean shutdown path is often where unclear ownership becomes visible.",
    "Static analysis and code review can flag ownership mistakes before runtime.",
    "Leak prevention improves when tool feedback changes the codebase instead of becoming background noise.",
    "Decide which leak checks run locally, which run in CI, what failures block release, and how exceptions are reviewed so the signal remains useful."
  ]
};
