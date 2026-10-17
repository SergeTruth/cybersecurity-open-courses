window.COURSE_MODULE = {
  "title": "OAuth, OpenID Connect, and External Identity Providers",
  "graphicAlt": "OAuth and OIDC have distinct roles, while provider sign-in still leads to local account checks, session handling and policy.",
  "narration": "Many Node.js teams use external identity providers and assume authentication has been outsourced. In reality, the provider handles part of the flow, while the application still owns important security decisions. OAuth 2.0 is primarily an authorization framework. OpenID Connect adds an identity layer for authentication. The application should understand whether it is validating an ID token, using an access token, exchanging an authorization code, or establishing a local session after a provider login.\n\nModern interactive flows commonly use Authorization Code Flow with PKCE, but the durable lesson is validation and clear responsibility. Redirect URI validation, state, nonce, issuer validation, audience validation, token handling, and provider metadata are security-critical details. These protocols should be implemented through well-maintained libraries and provider configuration, not hand-rolled request parsing and custom assumptions. Protocol correctness is difficult and easy to get subtly wrong.\n\nExternal identity does not remove local account mapping, authorization, session handling, logging, or account lifecycle decisions. After sign-in, the application still decides which local account is associated with the external identity, whether the account is enabled, which tenant or organization applies, what roles or permissions are current, and whether step-up authentication is needed for sensitive actions. Signing in through a provider is the beginning of local trust decisions, not the end.",
  "narrationPoints": [
    "Modern interactive flows commonly use Authorization Code.",
    "External identity does not remove local account mapping.",
    "js teams use external identity providers and assume.",
    "These protocols should be implemented through.",
    "The application should understand whether it is validating.",
    "In reality, the provider handles part of the flow."
  ]
};
