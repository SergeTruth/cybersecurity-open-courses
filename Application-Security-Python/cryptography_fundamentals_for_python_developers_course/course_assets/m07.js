window.COURSE_MODULE = {
  "title": "Digital Signatures, Tokens, and Data Integrity",
  "graphicAlt": "A signed message is verified with the corresponding public key, then checked for issuer, audience, expiry and authorization before action.",
  "narration": "Digital signatures help verify authenticity and integrity. A signer uses a private key to sign data. A verifier uses the corresponding public key to check that the signed data has not changed and that it was signed by the holder of the private key. Signing is not the same as encryption. Signed data may still be readable. Encryption is about confidentiality. Signing is about trust in origin and change detection.\n\nSignatures and MACs are common in APIs, webhooks, software updates, artifacts, and message workflows. The receiver should verify before trusting. That means checking the signature or MAC, the key or issuer, the intended use, and any freshness or replay protections required by the design. A valid signature proves only what the signature scheme is designed to prove. It does not automatically prove authorization, business validity, or user intent.\n\nSigned tokens at a high level often carry claims such as subject, issuer, audience, expiration, scopes, roles, or other context. Token validation should check signature validity, issuer, audience, expiration, intended use, and any application-specific requirements as appropriate. Accepting an unsigned token, trusting claims without validation, or ignoring expiration can affect many endpoints at once because tokens often sit at the front of API access.\n\nKey rotation for signing keys requires planning. Verifiers may need to trust old and new keys during a transition, tokens may remain valid for a period, and services must refresh key material safely. Replay and freshness concepts also matter when signed messages can be captured and sent again. Signed data still requires authorization, input validation, and business-rule checks before the application acts on it.",
  "narrationPoints": [
    "Digital signatures help verify authenticity and integrity.",
    "Signatures and MACs are common in APIs.",
    "Signed tokens at a high level often carry claims.",
    "Key rotation for signing keys requires planning.",
    "The receiver should verify before trusting.",
    "Token validation should check signature validity."
  ]
};
