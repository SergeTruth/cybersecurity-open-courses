window.COURSE_MODULE = {
  "title": "Course Summary: Crypto-Safe C++ Habits",
  "graphicAlt": "Summary pipeline from approved randomness and key custody through authenticated encryption, verification, cleanup, and misuse-focused review.",
  "narration": "Crypto-safe C++ starts with the security goal. Decide whether the system needs confidentiality, integrity, authenticity, identity verification, or another trust decision before choosing an API.\n\nUse trusted libraries and approved platform mechanisms. Do not implement cryptographic primitives from scratch, and avoid custom protocols when a mature library provides the needed behavior.\n\nProtect keys, randomness, and nonces. Generate security-sensitive values through approved sources, keep key ownership clear, avoid accidental exposure, and document rotation or lifecycle policy.\n\nUse authenticated encryption for protected data where appropriate, validate signatures and certificates correctly, and reject data that fails verification before the application acts on it.\n\nKeep crypto code small, boring, and reviewable. Treat ignored errors, nonce reuse, hardcoded secrets, custom trust decisions, stale dependencies, and unauthenticated protected data as high-priority findings.\n\nFinally, combine design review, focused tests, dependency maintenance, and operational key management. Cryptography works best when the surrounding engineering is disciplined enough to support it.\n\nThe durable habit is to make every crypto boundary explainable: goal, API, key source, trust decision, validation result, and safe failure behavior.\n\nWhen those details are visible, crypto becomes a dependable engineering control instead of a fragile assumption.\n\nThat visibility is the habit to keep.\n\nAlways.",
  "narrationPoints": [
    "Crypto-safe C++ starts with the security goal.",
    "Use trusted libraries and approved platform mechanisms.",
    "Generate security-sensitive values through approved sources, keep key ownership clear, avoid accidental exposure, and document rotation or lifecycle policy.",
    "Treat ignored errors, nonce reuse, hardcoded secrets, custom trust decisions, stale dependencies, and unauthenticated protected data as high-priority findings.",
    "Cryptography works best when the surrounding engineering is disciplined enough to support it.",
    "When those details are visible, crypto becomes a dependable engineering control instead of a fragile assumption."
  ]
};
