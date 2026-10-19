window.COURSE_MODULE = {
  "title": "Verification Flows in Python Applications",
  "graphicAlt": "Bounded challenges connect verification to the right user, session and purpose, with explicit upgrade and sensitive-action step-up.",
  "narration": "A common verification flow starts with primary authentication, then requires MFA before the session becomes fully authenticated. The Python backend should keep partial-login state separate from the final authenticated session. A user who has completed only the first step should not be treated as fully signed in. The application should limit what partial state can do, how long it lasts, and which user, session, purpose, and challenge it belongs to.\n\nStep-up MFA applies additional proof to higher-risk actions or contexts. A user may already have a normal session, but the application may require fresh verification before changing MFA settings, exporting sensitive data, updating payment information, managing administrators, viewing highly sensitive records, or performing risky operations. Step-up works best when tied to a clear policy rather than sprinkled into code by individual route owners.\n\nChallenge state needs replay resistance and expiration. A challenge result should not be reusable for the wrong user, session, purpose, or action. Failed attempts should be handled with rate limiting, throttling, alerting, or temporary protective controls as appropriate. The goal is to slow abuse and protect users without turning every mistake into permanent lockout. Error messages should be useful but not reveal sensitive verification details.\n\nAfter MFA succeeds, the application may upgrade the session, record the authentication context, and continue to the intended action. That upgrade should be explicit. Remembering trusted devices at a high level may reduce friction, but it requires careful lifetime, device binding, revocation, and user visibility. MFA verification must be connected to the right session and purpose because detached verification creates confusion and risk.",
  "narrationPoints": [
    "A common verification flow starts with primary.",
    "Step-up MFA applies additional proof to higher-risk actions.",
    "Challenge state needs replay resistance and expiration.",
    "After MFA succeeds.",
    "The Python backend should keep partial-login state separate.",
    "A user who has completed only the first step should not."
  ]
};
