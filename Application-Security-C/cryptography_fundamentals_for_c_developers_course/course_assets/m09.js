window.COURSE_MODULE = {
  "title": "Protocol Context and Misuse Prevention",
  "graphicAlt": "Draft visual summary for Protocol Context and Misuse Prevention",
  "narration": "Cryptographic primitives need protocol context. A correct encryption call, MAC calculation, or signature verification can still be misused if the application does not define message purpose, identity, ordering, freshness, and authorization. The primitive provides a property; the protocol decides how that property is interpreted.\n\nContext binding helps prevent confusion between different uses. A signed message should identify what was signed, which version of the format is in use, which application or tenant context applies, and which key purpose is expected. AEAD associated data and structured metadata can help bind protected data to the setting where it is valid.\n\nReplay prevention needs explicit design at a high level. If an old valid message should not be accepted again, the protocol needs a way to recognize freshness, ordering, session scope, or one-time use according to the application requirement. Cryptographic validity alone does not always mean a message is current or authorized.\n\nVersioning and configuration require review. Applications need a plan for retiring old behavior, adding new algorithms or formats, and rejecting unsupported combinations safely. Algorithm agility should make maintenance possible without allowing unreviewed or weaker configurations to appear through compatibility shortcuts.\n\nTransport security does not replace application authorization. A TLS connection, signed message, or authenticated object can establish important facts, but the application still needs to decide whether the identified party may perform the requested action. Keep cryptographic verification and authorization linked, but do not collapse them into the same assumption.\n\nReviewers should read the protocol, not only the function calls. What is authenticated? What is encrypted? What identities are bound? What can be replayed? What versions are accepted? What happens on failure? Clear answers turn cryptography from a collection of primitives into a maintainable security design.",
  "narrationPoints": [
    "Cryptographic primitives need protocol context.",
    "Context binding helps prevent confusion between different.",
    "Replay prevention needs explicit design at a high level.",
    "Versioning and configuration require review.",
    "Transport security does not replace application.",
    "Reviewers should read the protocol."
  ]
};
