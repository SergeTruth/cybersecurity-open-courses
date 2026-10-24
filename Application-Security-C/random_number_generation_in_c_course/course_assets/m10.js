window.COURSE_MODULE = {
  "title": "Course Summary: Randomness-Safe C Habits",
  "graphicAlt": "Four-stage main flow classify property -> trusted source -> checked bytes/unbiased mapping -> protected value lifecycle.",
  "narration": "Randomness-safe C starts by choosing the source based on the consequence of prediction, repetition, or bias. Not every random value is a secret, and not every generator is suitable for every purpose. Classify the value before choosing the API.\n\nUse security-grade platform or approved library sources for security-sensitive values. Do not design or implement your own cryptographic random number generator in application code. Let the operating system or trusted library handle entropy and generator state, and make your code responsible for requesting bytes correctly and handling failure safely.\n\nAvoid predictable seeding, legacy APIs for sensitive values, unchecked random-source failures, and biased range mapping. Each of these mistakes can weaken an otherwise reasonable design. A small wrapper can centralize the correct behavior and make call sites easier to review.\n\nKeep test randomness separate from production randomness. Deterministic seeds can be useful in tests, but production security-sensitive values need unpredictability from the approved source. Configuration should prevent test behavior from leaking into operational use.\n\nFinally, protect generated secrets through careful storage, logging discipline, comparison, expiration, and cleanup. Use documentation, tests, review, and operational checks to keep randomness behavior consistent over time. Good randomness engineering is mostly about choosing boring, trusted mechanisms and using them carefully.",
  "narrationPoints": [
    "Not every random value is a secret, and not every generator is suitable for every purpose.",
    "Do not design or implement your own cryptographic random number generator in application code.",
    "Avoid predictable seeding, legacy APIs for sensitive values, unchecked random-source failures, and biased range mapping.",
    "Configuration should prevent test behavior from leaking into operational use.",
    "Use documentation, tests, review, and operational checks to keep randomness behavior consistent over time."
  ]
};
