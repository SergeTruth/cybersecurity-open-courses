window.COURSE_MODULE = {
  "title": "Security-Sensitive Random Values",
  "graphicAlt": "Three differentiated objects: token behind guess-resistance label, nonce beside protocol-rule document, key inside secret-storage container.",
  "narration": "Security-sensitive random values do not all serve the same role. Tokens, session identifiers, reset codes, nonces, salts, keys, and correlation identifiers each have different requirements. A salt usually needs to avoid repetition. A token usually needs to be hard to guess. A key has stronger confidentiality requirements. A nonce may have protocol-specific uniqueness rules.\n\nSome values need uniqueness, some need unpredictability, and some need both. These properties are related but not identical. A counter can be unique without being unpredictable. A random-looking value can still collide if it is too short or generated from the wrong source. The requirement should be named before the implementation is chosen.\n\nGenerated secrets should be long enough for their purpose and should come from a security-grade source. The length should be chosen based on the value's role and the system's policy, not on whatever size is convenient to print. Short values may be easier to handle but may not provide enough safety margin.\n\nSensitive random values should not be logged, exposed in diagnostics, included in support bundles, or passed to child processes that do not need them. If the value protects access, treat it like a secret through its entire lifecycle.\n\nRandom values may require careful storage, comparison, expiration, rotation, and cleanup. A strong random source does not help if the value is stored broadly, compared unsafely, never expired, or copied into logs. Naming and documentation should make the security purpose visible so reviewers can protect the value consistently.",
  "narrationPoints": [
    "Security-sensitive random values do not all serve the same role.",
    "The requirement should be named before the implementation is chosen.",
    "The length should be chosen based on the value's role and the system's policy, not on whatever size is convenient to print.",
    "Sensitive random values should not be logged, exposed in diagnostics, included in support bundles.",
    "Random values may require careful storage, comparison, expiration, rotation, and cleanup."
  ]
};
