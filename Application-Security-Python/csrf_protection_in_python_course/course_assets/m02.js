window.COURSE_MODULE = {
  "title": "How CSRF Appears in Python Web Apps",
  "graphicAlt": "Forms, admin actions, custom routes and cookie-authenticated APIs are inventoried for CSRF coverage.",
  "narration": "CSRF risk is not limited to one Python framework or one kind of page. It can appear in Django, Flask, FastAPI, Pyramid, custom WSGI applications, and internal tools whenever browser-based authentication and state-changing requests meet. The technology stack changes, but the review question remains similar: can a browser send this request with the user's credentials, and does the request change server-side state?\n\nTraditional HTML forms are the familiar case, but they are not the only one. Admin panels, account settings, preference updates, workflow approval screens, and internal dashboards often include state-changing behavior. Because internal tools may be built quickly and used by trusted staff, teams sometimes assume they are lower risk and accidentally skip protections that would be standard in a public-facing application.\n\nCookie-authenticated APIs also need review. A Python backend may serve server-rendered pages, JavaScript-enhanced pages, or endpoints used by a frontend. If the browser automatically sends the user's session cookie, then state-changing API calls may need CSRF protection even when the request body is JSON. The format of the request does not by itself answer whether CSRF is relevant.\n\nCustom routes are a common gap. A framework may protect standard forms, but a developer may add a custom endpoint, webhook-like path, admin action, or JavaScript route that bypasses the default protection. Good CSRF review inventories state-changing routes and checks whether the configured protection actually applies to each one.",
  "narrationPoints": [
    "CSRF risk is not limited to one Python framework or one.",
    "Traditional HTML forms are the familiar case.",
    "Cookie-authenticated APIs also need review.",
    "Custom routes are a common gap.",
    "Good CSRF review inventories state-changing routes.",
    "The technology stack changes."
  ]
};
