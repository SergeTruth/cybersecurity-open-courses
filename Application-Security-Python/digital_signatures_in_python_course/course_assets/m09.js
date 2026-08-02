window.COURSE_MODULE = {
  "title": "Course Summary and Key Takeaways",
  "graphicAlt": "Summary diagram for Course Summary and Key Takeaways, showing signer, protected private key, message bytes, signature, and verifier public key; labeled arrows identify signing and verification boundaries and the point where unsafe input or behavior is rejected.",
  "narration": "Digital signatures help Python applications verify authenticity and integrity when the signing key, signed data, and trust model are clear. They are useful for API requests, webhooks, tokens, software packages, configuration, documents, logs, and service messages. They are not the same as encryption, and they do not automatically make data authorized, fresh, valid, or safe for every business action.\n\nStrong designs use vetted libraries, protected private keys, explicit data representation, strict verification, context checks, safe error handling, key rotation, logging, testing, and monitoring. The application should know exactly what is signed, who is expected to sign it, which public keys are trusted, which algorithms are allowed, and what happens when verification fails. Ambiguity is the enemy of reliable signature systems.\n\nA valid signature is not the same as authorization, correctness, freshness, or business approval. Signed content still needs schema validation, authorization, replay protection where needed, timestamp or audience checks, and application-specific rules. Accepting any valid signature from any key is unsafe. Trust must be scoped to signer, purpose, key, data, and context.\n\nThe goal is not to write cryptography from scratch. The goal is to use digital signatures safely in real Python systems. That means relying on mature libraries, protecting keys, centralizing verification, testing negative paths, logging carefully, planning rotation, and assigning ownership for operation and incident response. Signatures are powerful when they are part of a complete trust design.",
  "narrationPoints": [
    "Digital signatures help Python applications verify authenticity and integrity when the signing key, signed data, and trust model are clear.",
    "Ambiguity is the enemy of reliable signature systems.",
    "Signed content still needs schema validation, authorization, replay protection where needed, timestamp or audience checks, and application-specific rules.",
    "Accepting any valid signature from any key is unsafe.",
    "The goal is not to write cryptography from scratch.",
    "Signatures are powerful when they are part of a complete trust design."
  ]
};
