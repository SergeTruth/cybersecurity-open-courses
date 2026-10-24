window.COURSE_MODULE = {
  "title": "Testing, Review, and Operational Practices",
  "graphicAlt": "A clear test/production boundary: fixed-seed repeatable tests on left and security-grade production source on right.",
  "narration": "Tests sometimes need deterministic seeds. Repeatable sequences make failures easier to reproduce and simulations easier to compare. That is useful, but test randomness should be separated from production randomness. A fixed seed that helps a test should not accidentally become a production default.\n\nProduction code should not inherit deterministic test modes, fixed seeds, or mock random sources unless a deliberate test harness is active. Configuration should make the distinction clear, and review should treat accidental production determinism as a serious bug.\n\nFailure tests should cover random-source errors where the API allows failure. If the platform call can fail, return partial output, or indicate an unavailable source, the application should have a tested safe response. For security-sensitive values, that response is usually to fail the operation clearly.\n\nCode review should identify every randomness-dependent value and classify its requirement. Is the value for a simulation, a test, an identifier, a nonce, a salt, a token, or a key? Does it need repeatability, uniqueness, unpredictability, fairness, or a combination? The source and mapping should match that classification.\n\nStatic analysis, compiler warnings, and runtime checks can help identify unchecked errors, unsafe conversions, range bugs, and use of discouraged APIs. Operational documentation should state which platform randomness sources are required, how failures are handled, and how test modes are kept out of production behavior.",
  "narrationPoints": [
    "A fixed seed that helps a test should not accidentally become a production default.",
    "Configuration should make the distinction clear, and review should treat accidental production determinism as a serious bug.",
    "Failure tests should cover random-source errors where the API allows failure.",
    "Code review should identify every randomness-dependent value and classify its requirement.",
    "Static analysis, compiler warnings, and runtime checks can help identify unchecked errors, unsafe conversions, range bugs."
  ]
};
