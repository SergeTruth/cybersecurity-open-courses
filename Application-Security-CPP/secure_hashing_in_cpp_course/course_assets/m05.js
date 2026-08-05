window.COURSE_MODULE = {
  "title": "HMAC and Authenticated Integrity",
  "graphicAlt": "Hashing workflow for HMAC and Authenticated Integrity, tracing canonical input through an approved cryptographic provider to versioned digest metadata, bounded verification, and a documented acceptance or migration decision.",
  "narration": "A plain hash can tell you whether bytes match an expected digest, but only when the expected digest is already trusted. It does not prove who created the digest or whether the digest came from an authorized source. For example, a public file fingerprint can help detect accidental corruption or mismatch, but it is not the same as authenticating a message from a trusted party.\n\nWhen origin and integrity both matter, systems usually need an approved message authentication mechanism such as HMAC. HMAC uses a secret key with a hash construction in a standardized way. That secret key must be stored, rotated, and protected like other application secrets. The design question is not whether the code can append a secret to data and hash the result. The design question is whether the security goal requires a vetted keyed authentication construction.\n\nDo not invent custom hash-plus-secret formats. Small changes in ordering, encoding, length handling, or key reuse can create avoidable risk and make review difficult. Use approved APIs and document what is authenticated: the exact bytes, the algorithm, the key identity, and the verification rules. Plain hashes still have a valid place for fingerprints and non-authenticated integrity checks, but keyed authentication belongs in a separate, explicit path. That separation helps operators rotate keys, audit access, and distinguish public integrity metadata from trusted authentication decisions.",
  "narrationPoints": [
    "A plain hash can tell you whether bytes match an expected digest, but only when the expected digest is already trusted.",
    "HMAC uses a secret key with a hash construction in a standardized way.",
    "The design question is not whether the code can append a secret to data and hash the result.",
    "Small changes in ordering, encoding, length handling, or key reuse can create avoidable risk and make review difficult.",
    "Use approved APIs and document what is authenticated: the exact bytes, the algorithm, the key identity, and the verification rules.",
    "Plain hashes still have a valid place for fingerprints and non-authenticated integrity checks, but keyed authentication belongs in a separate, explicit path."
  ]
};
