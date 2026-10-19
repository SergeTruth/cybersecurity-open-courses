window.COURSE_MODULE = {
  "title": "Course Summary: A Secure Token Handling Baseline",
  "graphicAlt": "A token baseline connects purpose, full validation, client protection, resource authorization and managed key/session lifecycles.",
  "narration": "A secure token handling baseline for .NET starts with purpose. Know whether a token is an access token, ID token, refresh token, account workflow token, antiforgery token, or Data Protection-protected payload. Each type has a different trust boundary and validation path.\n\nValidate JWT bearer tokens fully. Use maintained authentication components, confirm issuer, audience, lifetime, signature, signing key, and expected algorithm behavior, and interpret claims only after validation succeeds. A readable token is not automatically a trusted token.\n\nProtect tokens in storage and transport. Keep tokens out of URLs, logs, frontend assets, public artifacts, and broad support tooling. Use protected channels, review cookie behavior, and choose client storage patterns according to the client type and sensitivity of the token.\n\nSeparate authentication from authorization. Claims, scopes, audiences, tenants, and resource identifiers need server-side interpretation. A valid token establishes context, but endpoint policy, resource checks, tenant boundaries, and business rules decide what is allowed.\n\nFinally, manage refresh tokens, lifetimes, revocation, signing keys, Data Protection keys, redaction, monitoring, and compromise response deliberately. Secure token handling is a lifecycle discipline that connects identity design, application code, infrastructure, and operations.",
  "narrationPoints": [
    "Know whether a token is an access token, ID token, refresh token, account workflow token, antiforgery token.",
    "Use maintained authentication components, confirm issuer, audience, lifetime, signature.",
    "Use protected channels, review cookie behavior, and choose client storage patterns according to the client type and sensitivity of the token.",
    "A valid token establishes context, but endpoint policy, resource checks, tenant boundaries.",
    "Secure token handling is a lifecycle discipline that connects identity design, application code, infrastructure."
  ]
};
