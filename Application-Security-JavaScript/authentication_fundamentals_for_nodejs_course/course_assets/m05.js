window.COURSE_MODULE = {
  "title": "Tokens, JWTs, and API Authentication",
  "graphicAlt": "Decoded claims remain unverified, while validation checks establish an identity that still faces authorization.",
  "narration": "Bearer tokens grant access to whoever presents them, so storage, transmission, logging, and lifetime matter. A Node.js API that receives an Authorization header should not treat the token as trusted just because it has the right shape. The request pipeline should validate the token using trusted configuration, map validated claims to an account or service identity, check account state, and pass only a verified identity to later authorization logic.\n\nJWTs are signed data structures, not magic security containers. Before trusting JWT claims, an API should validate the signature, expected algorithm, issuer, audience, expiration, not-before time if used, and intended use. Decoding a token is not validation. Accepting unsigned tokens, unexpected algorithms, stale keys, wrong issuers, wrong audiences, or claims from the wrong token type can break the boundary between identity assertion and application trust.\n\nToken lifetime, refresh behavior, revocation, key rotation, and compromised-token response should be designed intentionally. Long-lived tokens reduce friction but increase exposure when leaked. Short-lived tokens reduce exposure but require safe refresh patterns. Sensitive tokens should not be logged, placed in URLs, committed to repositories, copied into support tickets, or exposed to browser scripts unnecessarily. API keys can identify an integration or application, but they do not automatically prove an individual user's identity.",
  "narrationPoints": [
    "Bearer tokens grant access to whoever presents them.",
    "JWTs are signed data structures.",
    "Token lifetime, refresh behavior, revocation, key rotation,.",
    "js API that receives an Authorization header should not.",
    "Before trusting JWT claims.",
    "Sensitive tokens should not be logged."
  ]
};
