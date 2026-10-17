window.COURSE_MODULE = {
  "title": "Enforcement Points in Python Applications",
  "graphicAlt": "API requests, jobs and internal tools all face backend action-and-resource enforcement before a sensitive operation.",
  "narration": "An enforcement point is where the application applies an authorization decision. Python applications may enforce access at route level, view level, service layer, data layer, middleware, decorators, dependency injection hooks, guard clauses, reusable helpers, or centralized policy checks. Each location has strengths and limits. A route-level check may ensure the caller is authenticated and has a broad role, while a service-layer check may understand the specific resource and action.\n\nServer-side enforcement is essential. Client-side checks, hidden buttons, disabled controls, and hidden routes can improve user experience, but they do not protect sensitive operations by themselves. Requests can come from scripts, direct API calls, background jobs, alternate clients, or modified browsers. Trusted application logic must enforce decisions before returning sensitive data, changing state, launching jobs, or invoking privileged integrations.\n\nReusable patterns help prevent scattered one-off checks. Decorators or dependencies can be useful for common route guards. Middleware can ensure authentication state is present. Service-layer helpers can centralize object-specific checks. Data-layer filters can limit list results. Centralized policy functions can give reviewers one place to inspect high-value rules. The goal is not to put every rule in one file; it is to make the pattern predictable and hard to forget.\n\nEnforcement should happen before sensitive actions and before data disclosure. A list endpoint should not fetch every record and rely on the frontend to hide unauthorized items. An export job should not start before checking the caller's permission for the selected tenant and resource. A background worker should not assume that the scheduling user had permission unless that authorization decision is preserved and rechecked as needed. Good enforcement is close to risk, not merely close to routing.",
  "narrationPoints": [
    "An enforcement point is.",
    "Server-side enforcement is essential.",
    "Reusable patterns help prevent scattered one-off checks.",
    "Enforcement should happen.",
    "Client-side checks, hidden buttons, disabled controls,.",
    "Trusted application logic must enforce decisions."
  ]
};
