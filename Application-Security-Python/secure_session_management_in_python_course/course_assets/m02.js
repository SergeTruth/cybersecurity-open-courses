window.COURSE_MODULE = {
  "title": "Session Architecture and Trust Boundaries",
  "graphicAlt": "Shared validation and consistent state govern authenticated context across distributed components.",
  "narration": "Session architecture starts with the path authenticated state takes through the system. Browser clients may send cookies. API clients may send bearer tokens or API keys. Backend services may use service credentials or workload identity. The application may consult a server-side session store, validate a signed cookie, call an identity provider, or check a token. Each step has a trust boundary and a failure mode.\n\nThe major boundaries are between client and application, application and session storage, application and identity provider, reverse proxy and backend service, load balancer and application instances, and application and downstream services. TLS termination at a high level also matters because the component that terminates encrypted traffic may be the component that adds forwarding headers or handles cookie-related deployment behavior. The application should know which upstream signals are trusted and why.\n\nSession decisions should be centralized and explicit where practical. If one route reads a cookie directly, another route uses middleware, a third route trusts a header, and a background job uses a separate convention, reviewers cannot easily determine whether authenticated state is handled consistently. Middleware, framework session support, shared token validators, and common helpers can make the safe path easier to use and harder to bypass accidentally.\n\nArchitecture should also account for distributed deployment. Multiple application instances may need consistent session lookup, shared signing keys, shared revocation state, or predictable routing. Background jobs may run after the user who created them has logged out or lost access. Downstream services may need proof of caller identity and authorization context. A good architecture explains how session state is established, trusted, propagated, constrained, and ended.",
  "narrationPoints": [
    "Session architecture starts with the path authenticated.",
    "The major boundaries are between client and application.",
    "Session decisions should be centralized and explicit.",
    "Architecture should also account for distributed deployment.",
    "Backend services may use service credentials or workload.",
    "The application may consult a server-side session store."
  ]
};
