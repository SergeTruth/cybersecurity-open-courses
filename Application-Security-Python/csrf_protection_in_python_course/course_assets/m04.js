window.COURSE_MODULE = {
  "title": "Safe Forms and State-Changing Requests",
  "graphicAlt": "GET retrieves information, while an explicit change flow validates its token and authorization before changing state.",
  "narration": "A secure Python web application treats state-changing behavior carefully. Actions that create, update, delete, approve, transfer, configure, or submit data should use a request method and application flow designed for changes. A casual link, image request, or simple navigation action should not perform a meaningful server-side change.\n\nGET requests should avoid side effects. They are intended for retrieval and are easier to trigger unintentionally through ordinary browser behavior, previews, crawlers, or embedded references. State-changing actions should require an explicit form or request flow that includes CSRF protection and fits the application's authorization model.\n\nProtected forms should include the framework's CSRF token or equivalent established control, and the server should validate that token before performing the action. Token validation belongs before the state change, not after. A failure should not partially complete the operation, modify one field, queue one job, or make a downstream call before the application rejects the request.\n\nSensitive workflows deserve explicit review. Administration screens, billing settings, account changes, approval queues, and security settings should be easy to identify and easy to test. Request semantics, CSRF protection, authorization, user confirmation, logging, and rollback expectations should fit the impact of the action.",
  "narrationPoints": [
    "A secure Python web application treats state-changing.",
    "GET requests should avoid side effects.",
    "Protected forms should include the framework's CSRF token.",
    "Sensitive workflows deserve explicit review.",
    "Actions that create.",
    "A casual link."
  ]
};
