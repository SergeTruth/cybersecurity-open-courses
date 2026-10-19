window.COURSE_MODULE = {
  "title": "Testing, Review, Logging, and Monitoring",
  "graphicAlt": "Missing, invalid and expired token tests confirm rejection before action, with safe event logging, monitoring and regression checks.",
  "narration": "CSRF protection should be tested as part of normal application quality. Reviewers should identify state-changing routes, confirm that framework middleware or equivalent protection applies, and verify that missing, invalid, or expired tokens are rejected before action. The inventory should include forms, admin actions, settings pages, JavaScript routes, and session-bound API endpoints.\n\nTesting should focus on safe defensive cases. The goal is not to build attack pages or teach abuse. The goal is to confirm that protected routes require the expected token or equivalent control, that the failure path does not perform the action, and that newly added custom routes do not bypass the established framework protection.\n\nLogging should record rejected CSRF validation events at a useful level without exposing raw token values, secrets, sensitive request bodies, or unnecessary personal data. A log entry can identify the route, high-level failure reason, timestamp, and safe request context. It should help defenders investigate misconfiguration without creating a sensitive data leak.\n\nMonitoring can identify unusual rejection patterns, misconfiguration, or regressions. A sudden spike in token failures may indicate a broken frontend release, expired session behavior, proxy issue, or suspicious activity. Regression tests are especially valuable because CSRF gaps often appear when a team adds a custom form, admin route, or API endpoint outside the standard path.",
  "narrationPoints": [
    "CSRF protection should be tested as part of normal.",
    "Testing should focus on safe defensive cases.",
    "Logging should record rejected CSRF validation events at.",
    "Monitoring can identify unusual rejection patterns.",
    "The inventory should include forms.",
    "A log entry can identify the route."
  ]
};
