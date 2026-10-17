window.COURSE_MODULE = {
  "title": "SSO, OAuth, and OpenID Connect in Python Applications",
  "graphicAlt": "Federation inputs feed local account governance, tenant context and offboarding before deliberate local authorization.",
  "narration": "Single sign-on allows a relying application to depend on an identity provider for sign-in. In Python applications, this often means integrating with organization identity systems, customer identity platforms, or cloud identity providers. Federation can improve user experience and centralize identity governance, but it also creates trust boundaries around redirects, callback endpoints, claims, tokens, application assignment, and user provisioning.\n\nOAuth concepts at a high level are about delegated access. OpenID Connect adds an identity layer that can support sign-in and identity claims. SAML is another federation approach used in many enterprise environments. Developers should not confuse delegated access with authentication unless an identity layer and validation model are present. The application needs to know what it is receiving, who issued it, and what claims are trustworthy.\n\nRedirects and callback endpoints deserve careful architecture and testing. They connect the application to the identity provider and often handle security-sensitive state. Mature libraries and provider guidance help reduce protocol mistakes. Hand-rolling federation protocols is risky because small validation, state, claim, or redirect mistakes can affect the entire authentication boundary.\n\nFederation governance matters after login works. User provisioning, application assignment, group or claim mapping, tenant separation, offboarding, and role synchronization need ownership. Claims from an identity provider may be useful identity signals, but authorization decisions should still be made deliberately in the application context. SSO reduces password burden; it does not eliminate the need for authorization, logging, monitoring, and review.",
  "narrationPoints": [
    "Single sign-on allows a relying application to depend on.",
    "OAuth concepts at a high level are about delegated access.",
    "Redirects and callback endpoints deserve careful.",
    "Federation governance matters after login works.",
    "Developers should not confuse delegated access.",
    "Claims from an identity provider may be useful identity."
  ]
};
