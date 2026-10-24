window.COURSE_MODULE = {
  "title": "OAuth, Access Tokens, and Refresh Tokens",
  "graphicAlt": "Access tokens reach resource APIs, ID tokens identify users to clients, and refresh tokens renew access at the authorization server.",
  "narration": "OAuth and OpenID Connect introduce several token-like values with different jobs. Access tokens authorize access to protected resources. ID tokens identify an authenticated user to a client. Refresh tokens can obtain new access tokens. State and nonce values help bind redirect flows and reduce request confusion. Treating these values as interchangeable is a design error.\n\nAccess tokens should be scoped, audience-bound where possible, short lived, and validated by the intended resource server. ID tokens should not be sent to APIs as if they were access tokens. Refresh tokens are high-value because they can extend a session or obtain new access. They usually deserve stronger storage, rotation where supported, and revocation on logout, suspicious use, account changes, or compromise events.\n\nFor modern interactive flows, Authorization Code Flow with PKCE is commonly preferred because it avoids exposing long-lived credentials to the browser and helps bind the code exchange to the client. OAuth state and OpenID Connect nonce values should be generated securely, stored for the flow, and validated when the redirect returns. These values are not decorative; they bind the response to the request the application actually initiated.\n\nUsing an identity provider does not eliminate application responsibility. The Node.js app still owns local authorization, tenant boundaries, session handling, token storage, logging, account lifecycle, and incident response. The app must validate the right token for the right purpose and then enforce what the authenticated identity may actually do.",
  "narrationPoints": [
    "Access tokens authorize access to protected resources.",
    "ID tokens should not be sent to APIs as if they were access tokens.",
    "OAuth state and OpenID Connect nonce values should be generated securely, stored for the flow, and validated when the redirect returns.",
    "The app must validate the right token for the right purpose and then enforce what the authenticated identity may actually do.",
    "Access tokens should be scoped, audience-bound where possible, short lived, and validated by the intended resource server.",
    "Refresh tokens are high-value because they can extend a session or obtain new access."
  ]
};
