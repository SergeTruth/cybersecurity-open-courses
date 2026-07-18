window.COURSE_MODULE = {
  "title": "Public-Key Cryptography and Signatures",
  "graphicAlt": "Draft visual summary for Public-Key Cryptography and Signatures",
  "narration": "Public-key cryptography uses key pairs with different roles. A public key can be shared broadly. A private key must be protected by its owner. Depending on the scheme and protocol, these keys may support signatures, verification, key agreement, or encryption workflows. The application should not assume that any public-key operation can substitute for another.\n\nDigital signatures provide verifiable authenticity and integrity for data. Verification shows that the data was signed by the holder of the corresponding private key, assuming the public key is trusted for that purpose. It does not automatically prove authorization, freshness, or business approval. Those meanings come from the surrounding protocol and policy.\n\nCertificates bind identities to public keys. A certificate chain connects a peer or signer to trust anchors accepted by the application or platform. The application should know which trust anchors it uses, how they are updated, what identities are expected, and which certificate purposes are acceptable.\n\nTrust decisions should be explicit. A key trusted for test signing should not become a production signing key by accident. A certificate trusted for one service identity should not automatically authorize unrelated operations. Verification should match the intended purpose, context, and identity.\n\nPublic-key operations also have lifecycle concerns. Private keys need protection, public keys need distribution, certificates expire, trust anchors change, and signature formats may need versioning. Reviewers should look for clear ownership, safe verification failure behavior, and tests that exercise invalid, expired, wrong-purpose, and wrong-identity cases.",
  "narrationPoints": [
    "Public-key cryptography uses key pairs with different roles.",
    "Digital signatures provide verifiable authenticity.",
    "Certificates bind identities to public keys.",
    "Trust decisions should be explicit.",
    "Public-key operations also have lifecycle concerns.",
    "A private key must be protected by its owner."
  ]
};
