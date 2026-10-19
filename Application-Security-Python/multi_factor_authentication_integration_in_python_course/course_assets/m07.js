window.COURSE_MODULE = {
  "title": "SSO, APIs, and Delegated Identity",
  "graphicAlt": "Validated provider assertions and understood authentication context inform local authorization; workload identity uses distinct controls.",
  "narration": "Many Python applications rely on an external identity provider to handle primary authentication and MFA. Single sign-on can improve user experience and centralize governance, but it also shifts some trust to identity assertions. The application still needs to validate tokens, signatures or integrity, issuer, audience, expiration, and relevant claims according to the protocol and provider guidance. It also still needs to enforce local authorization.\n\nOpenID Connect concepts at a high level provide an identity layer for sign-in and identity claims. SAML concepts support enterprise federation in many environments. OAuth delegated access concepts are different: OAuth can authorize an application to access resources, but it should not be confused with authentication unless an identity layer and validation model are present. Mature libraries and provider guidance should be used instead of hand-rolling federation behavior.\n\nClaims may indicate authentication context or assurance at a high level. For example, a provider may communicate whether MFA occurred or what kind of authentication was used. Python applications should not blindly trust any claim from any source. They should validate the assertion, understand what the claim means for that provider, and decide whether local policy accepts it for the requested action. Ambiguous claims should not silently grant high-risk access.\n\nAPIs and service-to-service calls also need thoughtful identity design. A human user's MFA status may not be relevant to a machine credential, and a service account may need separate controls. Some applications may enforce local step-up even when SSO handles primary login, especially for sensitive local actions. MFA is part of a broader identity system that includes SSO, sessions, tokens, delegated access, workload identity, and authorization.",
  "narrationPoints": [
    "Many Python applications rely on an external identity.",
    "OpenID Connect concepts at a high level provide an identity.",
    "Claims may indicate authentication context or assurance at.",
    "APIs and service-to-service calls also need thoughtful.",
    "Mature libraries and provider guidance should be used.",
    "Python applications should not blindly trust any claim."
  ]
};
