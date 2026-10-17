window.COURSE_MODULE = {
  "title": "API Architecture and Trust Boundaries",
  "graphicAlt": "External and internal requests both reach the application policy gate before accessing a resource.",
  "narration": "A secure API architecture starts by identifying the moving parts. Clients may include browsers, mobile apps, scripts, partner systems, backend services, automation jobs, and administrators. Behind the API may be application services, databases, identity providers, message queues, file stores, analytics systems, and downstream third-party services. Each component has different privileges, assumptions, and failure modes.\n\nTrust boundaries show where data, identity, control, or responsibility moves between systems. A request crossing from a client into an API gateway crosses a boundary. A gateway forwarding to application code crosses another. Application code reading from a database or calling a downstream service crosses additional boundaries. Security decisions should be explicit at these points so the application does not accidentally inherit trust from a place that should only route traffic.\n\nInternal APIs should not automatically trust every request. Internal services can be misconfigured, compromised, called through unexpected paths, or reused outside their original design. A private network location is useful context, but it is not a complete identity or authorization model. Service-to-service calls should still have clear caller identity, scoped permissions, input validation, logging, and monitoring appropriate to their risk.\n\nCentralized controls can help when they are difficult to bypass. Gateways, shared authentication middleware, reusable validation helpers, common authorization libraries, and standard logging patterns reduce inconsistency. But centralization should not hide responsibility. Sensitive operations still need local context, especially for object ownership, tenant boundaries, workflow state, and business-specific authorization. Good architecture makes the safe path easy and the bypass path obvious during review.",
  "narrationPoints": [
    "A secure API architecture starts by identifying the moving.",
    "Trust boundaries show where data.",
    "Internal APIs should not automatically trust every request.",
    "Centralized controls can help.",
    "Service-to-service calls should still have clear caller.",
    "But centralization should not hide responsibility."
  ]
};
