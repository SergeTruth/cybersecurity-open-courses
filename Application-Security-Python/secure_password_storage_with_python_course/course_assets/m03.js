window.COURSE_MODULE = {
  "title": "Python Libraries and Safe Implementation Patterns",
  "graphicAlt": "Shared authentication code uses maintained password tools and consistent reviewed parameters.",
  "narration": "Python developers should rely on mature password hashing libraries or framework-supported password storage patterns instead of writing cryptographic code directly. The library should handle salt generation, parameter storage, verification, safe comparisons, and upgrade paths according to established practice. The exact library or framework may change over time, but the principle is stable: use maintained tools built for password storage, not general-purpose hashing glued together by hand.\n\nAuthentication logic should be separated from unrelated business logic. A checkout flow, profile page, admin action, or API handler should not each invent its own password verification path. Centralizing password hashing and verification makes the design easier to review, test, upgrade, and monitor. It also reduces the chance that one code path uses outdated parameters while another path uses the current standard.\n\nAvoid hardcoded password hashing parameters scattered across the codebase. Cost settings, algorithm identifiers, migration behavior, and version checks should be managed in a clear location with ownership and review. When a library upgrade changes recommendations or support, the application should have a planned way to adopt improved settings without breaking existing users or silently weakening verification.\n\nImplementation should be simple, reviewable, and tested. The code should make it clear when a password is accepted, how it is verified, when a stored verifier needs upgrade, and what happens on failure. Error messages should avoid revealing account details. Logs should record useful authentication events without recording passwords or reset secrets. A secure implementation is not clever; it is boring, consistent, and easy to reason about.",
  "narrationPoints": [
    "Python developers should rely on mature password hashing.",
    "Authentication logic should be separated from unrelated.",
    "Avoid hardcoded password hashing parameters scattered.",
    "Implementation should be simple, reviewable, and tested.",
    "The library should handle salt generation.",
    "A checkout flow."
  ]
};
