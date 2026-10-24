window.COURSE_MODULE = {
  "title": "Course Summary: Key Management Habits",
  "graphicAlt": "Key management joins purpose, controlled storage, scoped access, checked use and planned replacement.",
  "narration": "Key management in C++ starts with treating keys as managed sensitive assets, not incidental strings. Every key should have a purpose, owner, access rule, storage location, and lifecycle.\n\nGenerate keys through approved sources and store them outside code in controlled backends. Avoid hardcoded secrets, developer convenience copies, and production material shared into lower environments.\n\nGrant C++ processes only the key access they need. Prefer handles or opaque references where possible, keep key-handling APIs narrow, and separate business logic from raw key material.\n\nUse keys through approved libraries, check return values, reject failed verification, and avoid accepting unauthenticated data. A failed crypto operation is a security-relevant state.\n\nPlan rotation and revocation before production. Version keys, document compatibility windows, and define how old data, signatures, caches, and unavailable keys are handled.\n\nFinally, keep secrets out of logs, crash artifacts, broad APIs, and long-lived memory where practical. Review key boundaries, runtime configuration, and lifecycle behavior as security-critical engineering work.\n\nThe overall habit is to make key decisions visible. If a reviewer can see purpose, ownership, storage, access, use, rotation, and failure behavior, the system is much easier to defend and maintain.\n\nKeys deserve the same engineering care as the data and identities they protect.",
  "narrationPoints": [
    "Key management in C++ starts with treating keys as managed sensitive assets, not incidental strings.",
    "Avoid hardcoded secrets, developer convenience copies, and production material shared into lower environments.",
    "Prefer handles or opaque references where possible, keep key-handling APIs narrow, and separate business logic from raw key material.",
    "Use keys through approved libraries, check return values, reject failed verification, and avoid accepting unauthenticated data.",
    "Review key boundaries, runtime configuration, and lifecycle behavior as security-critical engineering work.",
    "If a reviewer can see purpose, ownership, storage, access, use, rotation, and failure behavior, the system is much easier to defend and maintain."
  ]
};
