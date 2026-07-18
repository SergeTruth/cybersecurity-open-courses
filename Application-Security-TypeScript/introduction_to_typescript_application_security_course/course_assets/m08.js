window.COURSE_MODULE = {
  "title": "Testing, Review, and Secure Delivery",
  "graphicAlt": "Draft visual summary for Testing, Review, and Secure Delivery",
  "narration": "Assurance for TypeScript application security comes from repeatable habits. Unit tests can check parsing functions, validation logic, authorization helpers, and error handling. Integration tests can check API behavior, session-aware routes, database interactions, and framework configuration. Contract tests can confirm that clients and services agree about validated data shapes.\n\nSecurity-focused tests should include normal use and likely misuse. Malformed input, missing fields, overly long values, unsupported enum values, unauthorized access, cross-tenant attempts, partial failures, dependency changes, and important configuration differences all deserve attention. A test suite that only covers successful UI flows can miss boundary behavior where many security mistakes occur.\n\nCode review should look for trust transitions. Reviewers can ask where external data becomes trusted, whether unknown is parsed before use, whether any or type assertions are justified, whether non-null assertions hide real uncertainty, whether validation happens before sensitive work, and whether errors or logs expose more detail than needed.\n\nSecure delivery is ongoing. CI gates, linting, type checks, dependency checks, static analysis, release notes, environment separation, rollback readiness, and patch processes all help reinforce safe patterns. The goal is not a one-time security check. The goal is a development system that keeps validation, authorization, dependency hygiene, and release readiness visible over time.\n\nReview culture is part of that system. A good review does not only ask whether the TypeScript compiles. It asks what happens with malformed input, missing session data, unexpected API responses, disabled framework protections, and future dependency updates. These questions help teams find design issues while they are still small and cheaper to fix.",
  "narrationPoints": [
    "Assurance for TypeScript application security comes from repeatable habits.",
    "Security-focused tests should include normal use and likely misuse.",
    "Code review should look for trust transitions.",
    "Secure delivery is ongoing.",
    "Review culture is part of that system."
  ]
};
