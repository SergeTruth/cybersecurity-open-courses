window.COURSE_MODULE = {
  "title": "What Cryptography Is For",
  "graphicAlt": "Draft visual summary for What Cryptography Is For",
  "narration": "Cryptography is not a decoration added at the end of a C project. It is a set of tools selected to meet specific security goals. Before choosing an algorithm, mode, key size, or library setting, developers should know what they are trying to protect and from whom. The usual goals include confidentiality, integrity, authentication, and, in some workflows, non-repudiation.\n\nConfidentiality means keeping information private from parties that should not see it. Integrity means detecting unauthorized change. Authentication means establishing which peer, service, user, or key is involved. Non-repudiation depends on a broader system of signatures, identity management, policy, and evidence. These goals are related, but they are not interchangeable.\n\nEncryption alone does not solve authorization, input validation, memory safety, or key management. Encrypted data may still be malformed. An authenticated client may still be unauthorized for a specific operation. A strong primitive can still fail if keys are logged, reused incorrectly, stored without control, or handled by code that ignores errors.\n\nC developers also need to think about the environment around the cryptographic call. Buffers have sizes, return values must be checked, memory must be cleaned up, dependencies must be maintained, and sensitive material must be kept out of logs. Cryptography often fails at the integration boundary rather than inside the primitive itself.\n\nThe defensive habit is to start with a clear goal and a reviewed design. What data needs protection? What identity must be verified? What keys are used? Where does randomness come from? What happens when verification fails? When those questions are answered first, cryptographic choices become engineering decisions instead of guesses.",
  "narrationPoints": [
    "Cryptography is not a decoration added at the end of a C.",
    "Confidentiality means keeping information private.",
    "Encryption alone does not solve authorization.",
    "C developers also need to think about the environment.",
    "The defensive habit is to start with a clear goal.",
    "Before choosing an algorithm."
  ]
};
