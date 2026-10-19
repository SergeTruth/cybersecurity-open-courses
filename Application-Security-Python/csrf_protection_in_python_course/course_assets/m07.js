window.COURSE_MODULE = {
  "title": "SPAs, AJAX, and Modern Frontends",
  "graphicAlt": "A modern frontend sends the framework CSRF token with its session-authenticated request, and the server validates before action.",
  "narration": "Modern Python backends often serve APIs used by single-page applications, JavaScript-enhanced pages, or separate frontend applications. CSRF protection still matters when the browser automatically sends session cookies. The presence of JavaScript, JSON, or a frontend framework does not automatically remove the need to prove user intent for state-changing requests.\n\nMany designs use a CSRF token delivered through a trusted page, safe bootstrap response, or framework-supported cookie and header pattern. The frontend then sends the token in a request header for state-changing actions. This approach can work well when token delivery, storage, renewal, and validation are implemented consistently and are aligned with the framework's expectations.\n\nTeams should avoid exposing tokens unnecessarily or mixing unrelated authentication models. A session-cookie API, a bearer-token API, and a service-to-service API may all exist in the same Python system, but they do not have the same CSRF assumptions. Route design should make those boundaries clear so developers know which protection applies.\n\nThe key question remains practical: can a browser send an authenticated state-changing request without the user's intended application flow? If the answer may be yes, the route needs CSRF review. Modern frontend architecture changes the shape of the request, but it does not remove the need for deliberate protection.",
  "narrationPoints": [
    "Modern Python backends often serve APIs used by single-page.",
    "Many designs use a CSRF token delivered through a trusted.",
    "Teams should avoid exposing tokens unnecessarily or mixing.",
    "The key question remains practical: can a browser send.",
    "Route design should make those boundaries clear.",
    "If the answer may be yes, the route needs CSRF review."
  ]
};
