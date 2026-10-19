window.COURSE_MODULE = {
  "title": "Course Summary: CSRF Protection Checklist",
  "graphicAlt": "CSRF review inventories state-changing routes, applies framework controls, validates before action and tests ongoing coverage.",
  "narration": "CSRF protection in Python is a layered secure design habit. Start by identifying state-changing routes. Any workflow that creates, updates, deletes, approves, configures, transfers, or submits data deserves review. Avoid side effects in GET requests and use protected request flows for actions that change server-side state.\n\nUse framework CSRF middleware, decorators, helpers, or established extensions where practical. Include and validate tokens for forms and session-authenticated state-changing requests. Apply protection consistently across standard forms, custom routes, admin actions, settings workflows, JavaScript requests, and session-bound API endpoints.\n\nConfigure cookies carefully with SameSite, Secure, and HttpOnly where appropriate, but avoid assuming cookie settings solve every CSRF problem by themselves. Use Origin or Referer checks as defense in depth when suitable, and do not confuse CORS with CSRF protection. Review SPA and API authentication models so each route has clear assumptions about browser credentials and user intent.\n\nIn code review, keep the core question visible: does this route change state, and can a browser send it with session credentials? If the answer is yes, reviewers should be able to point to the CSRF control, the token validation path, the cookie assumptions, and the failure behavior. That simple question helps teams find gaps in custom endpoints, internal tools, and JavaScript-heavy workflows before those gaps become production issues.\n\nFinally, test and operate the controls. Verify missing, invalid, and expired token cases. Log validation failures without exposing raw token values or sensitive request contents. Monitor unusual rejection patterns and add regression tests for new forms and routes. The closing idea is simple: CSRF defense is about proving user intent, not only proving that a browser has a session.",
  "narrationPoints": [
    "CSRF protection in Python is a layered secure design habit.",
    "Use framework CSRF middleware.",
    "Configure cookies carefully with SameSite.",
    "In code review.",
    "Finally, test and operate the controls.",
    "Any workflow that creates."
  ]
};
