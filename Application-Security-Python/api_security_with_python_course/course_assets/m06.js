window.COURSE_MODULE = {
  "title": "Response Safety, CORS, and Data Exposure",
  "graphicAlt": "Authorized field selection produces a limited response; excluded fields stop, while a separate browser-origin inset explains CORS.",
  "narration": "API responses should expose only what the caller is authorized to receive. Response minimization means returning the fields needed for the operation, not every field available in a database model or internal object. Response models, serializers, and field filtering can help when they are used intentionally. They reduce accidental exposure of internal identifiers, administrative flags, secrets, relationship data, or sensitive metadata.\n\nError message design is part of response safety. Detailed errors can be useful during development, but production clients should not receive raw stack traces, token details, database fragments, internal paths, or sensitive business rules. Pagination and bulk exports also need attention because large responses can expose more data than a user interface would normally show. An export is not just a bigger list response; it is often a higher-risk operation.\n\nCORS is a browser mechanism that controls which browser-based origins can make cross-origin requests under browser rules. It is not general API authentication and not a substitute for authorization. Browser clients and machine clients have different trust models. If browser credentials are involved, cookie behavior, token storage, and CSRF concepts matter. Credentialed cross-origin access should be deliberate and limited to expected origins.\n\nResponse safety also includes redirects and security headers at a high level. Redirect targets should be constrained so unchecked input does not send users or clients to unintended destinations. Headers can provide defense in depth for browser-facing APIs, but they do not replace careful response content. The API should consistently ask: who is the caller, what are they allowed to receive, and what could this response reveal beyond the immediate business need.",
  "narrationPoints": [
    "API responses should expose only what the caller is.",
    "Error message design is part of response safety.",
    "CORS is a browser mechanism that controls.",
    "Response safety also includes redirects and security.",
    "Credentialed cross-origin access should be deliberate.",
    "Redirect targets should be constrained."
  ]
};
