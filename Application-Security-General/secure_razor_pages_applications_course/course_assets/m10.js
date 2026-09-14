window.COURSE_MODULE = {
  "title": "Course Summary: A Secure Razor Pages Baseline",
  "graphicAlt": "Reviewable Razor Pages combine organization, server authorization, protected forms, constrained input and output, and safe operations.",
  "narration": "A secure Razor Pages baseline starts with reviewable organization. Pages, folders, handlers, and conventions should help the team see which workflows are public, which require identity, which require policy, and which modify important state. The application should not depend on hidden structure or memory to explain access rules.\n\nAuthenticate users explicitly and authorize pages, folders, records, and sensitive actions on the server. User interface behavior can guide users, but server-side handlers own the access decision. For record-specific workflows, the handler should verify ownership, tenant, workflow state, or permission against trusted server-side data.\n\nProtect state-changing browser forms with antiforgery validation and clear request-intent rules. Keep GET-style requests for safe retrieval behavior. Review custom forms, AJAX submissions, partial views, and nonstandard handlers so they receive the same protection as conventional forms.\n\nTreat bound data as untrusted. Use input models to define what a page accepts, validate required fields and business rules on the server, and update only intended fields. Use Razor output encoding correctly, avoid unnecessary raw output, and handle user-generated content according to its destination context.\n\nFinally, review the operational baseline. Cookies, session, TempData, uploads, static files, logs, secrets, errors, dependencies, HTTPS, security headers, and production configuration all shape real application safety. Secure Razor Pages development is not about adding ceremony. It is about making critical decisions explicit, consistent, and ready for production review.",
  "narrationPoints": [
    "A secure Razor Pages baseline starts with reviewable organization.",
    "Authenticate users explicitly and authorize pages, folders, records, and sensitive actions on the server.",
    "Protect state-changing browser forms with antiforgery validation and clear request-intent rules.",
    "Treat bound data as untrusted.",
    "Finally, review the operational baseline."
  ]
};
