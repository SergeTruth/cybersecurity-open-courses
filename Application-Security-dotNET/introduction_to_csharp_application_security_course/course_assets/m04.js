window.COURSE_MODULE = {
  "title": "Authentication and Session Security",
  "graphicAlt": "A maintained identity system supports enrollment, sign-in, protected sessions and recovery, while authorization remains a separate application decision.",
  "narration": "Authentication answers the question, who is this user or service. It does not answer every question about what that identity may do. Keeping that distinction clear prevents applications from treating a successful login as permission for every record, action, or administrative workflow.\n\nPrefer mature identity providers and framework-supported authentication flows. Identity systems involve password handling, account recovery, MFA, tokens, cookies, session lifetimes, federation, revocation, and audit expectations. Custom schemes are easy to get subtly wrong and difficult to maintain over time.\n\nPassword storage should use approved platform or identity-provider mechanisms, not homegrown hashing or encryption. In many systems, the best choice is to avoid storing passwords directly by relying on an identity provider. When the application does own password handling, it should use established framework mechanisms and current organizational policy.\n\nCookies and tokens should be treated as sensitive session material. They should be protected by secure transport, appropriate flags, reasonable lifetimes, and clear revocation behavior. Token contents, claims, expiration, audience, issuer, and storage location should all match the application design rather than being copied from examples without review.\n\nAccount recovery, enrollment, lockout, MFA reset, email verification, device changes, and administrator identity workflows deserve the same care as login. These lifecycle paths often determine whether identity proof remains reliable after the first session is created.",
  "narrationPoints": [
    "Authentication answers the question, who is this user or service.",
    "Prefer mature identity providers and framework-supported authentication flows.",
    "When the application does own password handling, it should use established framework mechanisms and current organizational policy.",
    "Password storage should use approved platform or identity-provider mechanisms, not homegrown hashing or encryption.",
    "Cookies and tokens should be treated as sensitive session material."
  ]
};
