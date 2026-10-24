window.COURSE_MODULE = {
  "title": "Seeding and Entropy Sources",
  "graphicAlt": "Known seed document loops into repeatable test generator.",
  "narration": "A seed initializes deterministic generator state. For non-security uses, a known seed can be useful because it makes a sequence repeatable. For security-sensitive uses, predictable seeding is a problem because predictable state leads to predictable output.\n\nTime values, process identifiers, counters, and simple combinations of low-entropy values should not be treated as strong entropy. They may vary, but they are often guessable, repeated, or constrained by the environment. They are not a substitute for a security-grade random source.\n\nSome environments deserve special attention. Embedded systems, early boot contexts, virtual machines, containers, and cloned images may have unusual initialization patterns or limited entropy availability. The correct response is not to invent a custom entropy scheme in application code. The correct response is to use the platform or approved library mechanism designed for that environment and to document the operational requirement.\n\nSecurity-sensitive applications should rely on trusted platform randomness instead of assembling their own entropy collection. The operating system or approved cryptographic library is where entropy collection, conditioning, and state management should live. Application code should request bytes and handle success or failure carefully.\n\nFailure to obtain adequate random bytes should be handled explicitly. If a security-sensitive value cannot be generated with the required source, the operation should fail safely. Continuing with a predictable fallback is worse than returning a clear error.",
  "narrationPoints": [
    "For security-sensitive uses, predictable seeding is a problem because predictable state leads to predictable output.",
    "Time values, process identifiers, counters, and simple combinations of low-entropy values should not be treated as strong entropy.",
    "The correct response is not to invent a custom entropy scheme in application code.",
    "The operating system or approved cryptographic library is where entropy collection, conditioning, and state management should live.",
    "Failure to obtain adequate random bytes should be handled explicitly."
  ]
};
