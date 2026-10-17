window.COURSE_MODULE = {
  "title": "Authentication and Token Validation",
  "graphicAlt": "Token validation establishes identity, followed by a separate authorization decision before an action is permitted.",
  "narration": "Authentication verifies who or what is calling the API. Python services may use API keys, bearer tokens, signed tokens, OAuth and OpenID Connect concepts, service accounts, workload identity, or session-based approaches for browser clients. Each pattern has tradeoffs, but none of them removes the need for careful validation and follow-on authorization. An API should know how the caller identity was established and what confidence that identity carries.\n\nSigned token validation should check more than token presence. At a high level, the service may need to verify signature integrity, issuer, audience, expiration, not-before time, intended use, and relevant claims. A token meant for one service should not automatically be accepted by another. An expired token should not remain useful simply because it is well formed. A token with missing context should not be treated as a blank check.\n\nAPI keys and service accounts also require lifecycle thinking. They should have owners, scopes, storage rules, rotation plans, and logging. Long-lived credentials increase exposure when they leak, so teams should prefer narrow capability and operational visibility. Revocation concepts matter because identity is not only about initial issuance; the system needs a way to respond when access should end, credentials are replaced, or a service relationship changes.\n\nAuthentication must be followed by authorization, logging, and monitoring. A valid token may identify a user who cannot access the requested object. A valid service account may be allowed to read one dataset but not trigger administrative work. Token presence is only the beginning of the decision. Secure APIs validate the token, understand the subject, enforce permissions, record meaningful events, and watch for unusual usage patterns.",
  "narrationPoints": [
    "Authentication verifies who or what is calling the API.",
    "Signed token validation should check more than token.",
    "API keys and service accounts also require lifecycle.",
    "Authentication must be followed by authorization.",
    "An API should know how the caller identity was established.",
    "At a high level."
  ]
};
