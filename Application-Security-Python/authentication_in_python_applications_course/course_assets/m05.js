window.COURSE_MODULE = {
  "title": "Tokens and API Authentication",
  "graphicAlt": "Context-appropriate token validation establishes a caller identity, while ownership, rotation and revocation support its lifecycle.",
  "narration": "APIs commonly authenticate callers with bearer tokens, API keys, access tokens, refresh tokens, service accounts, workload identities, or machine-to-machine credentials. A bearer token at a high level grants access to whoever presents it within its validity and scope, so token handling must assume that exposure can matter. API authentication should establish who or what is calling, then authorization should separately decide what that caller may do.\n\nToken validation must be deliberate. Depending on the token type and architecture, validation may include issuer, audience, expiration, signature or integrity checks, intended use, scope, and other claims. A token being present is not enough. The application should know which authority issued it, which service it was meant for, whether it is still valid, and whether it supports the operation being requested.\n\nToken lifetime and revocation are operational choices. Short-lived access tokens can reduce exposure but may require refresh flows. Refresh tokens or long-lived API keys need stronger storage, rotation, revocation, and monitoring. Service accounts and workload identities may have persistent access without direct human interaction, so least privilege, ownership, review, and alerting are especially important.\n\nToken storage risks vary by client and environment. A backend service, browser application, mobile client, CLI tool, and scheduled worker have different storage constraints. Python developers should avoid logging tokens, placing them in broadly readable configuration, or passing them through unnecessary systems. Because token handling errors can affect many endpoints at once, API authentication should be tested and reviewed as shared infrastructure.",
  "narrationPoints": [
    "APIs commonly authenticate callers with bearer tokens.",
    "Token validation must be deliberate.",
    "Token lifetime and revocation are operational choices.",
    "Token storage risks vary by client and environment.",
    "API authentication should establish who or what is calling.",
    "Python developers should avoid logging tokens."
  ]
};
