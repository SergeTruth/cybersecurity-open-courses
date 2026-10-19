window.COURSE_MODULE = {
  "title": "Origin, Referer, CORS, and API Boundaries",
  "graphicAlt": "CORS governs response access, while CSRF protection validates state-changing requests according to their credential model.",
  "narration": "Origin and Referer validation can provide useful defense in depth for state-changing requests, especially when token validation is difficult or when additional assurance is desired. These headers can help the server reason about where a browser request appears to come from. They should be implemented carefully because proxies, privacy settings, deployment architecture, and browser behavior can affect what the application receives.\n\nCORS is often misunderstood in CSRF discussions. CORS controls which browser-based cross-origin responses are readable by frontend code. It is not, by itself, a complete CSRF protection model for cookie-authenticated state-changing requests. A request can be security-relevant even when the response is not readable by another origin.\n\nAPI boundaries deserve clear design. Browser clients using session cookies have different assumptions from non-browser clients using service credentials or bearer tokens. A Python backend that supports both should not mix the models casually. Each route should have an authentication method, CSRF expectation, and client assumption that reviewers can understand.\n\nThe safest review posture is to match protections to the credential model. Session-authenticated browser flows usually need CSRF controls. Token-based APIs may have different protections, but they still need clear origin, authorization, and logging decisions. False confidence is the risk: CORS, Origin checks, cookies, and tokens each solve different parts of the problem.",
  "narrationPoints": [
    "Origin and Referer validation can provide useful defense.",
    "CORS is often misunderstood in CSRF discussions.",
    "API boundaries deserve clear design.",
    "The safest review posture is to match protections.",
    "They should be implemented carefully.",
    "A Python backend that supports both should not mix."
  ]
};
