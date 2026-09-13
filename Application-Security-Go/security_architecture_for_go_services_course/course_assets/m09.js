window.COURSE_MODULE = {
  "title": "Course Summary: Secure Go Service Design Habits",
  "graphicAlt": "Boundary maps, explicit contracts, enforced authority, protected data, bounded failures and useful evidence support ongoing service review and improvement.",
  "narration": "Secure Go service architecture begins with clear boundaries and explicit assumptions. A team should know who can call the service, what the service trusts, which dependencies it relies on, and where security decisions are made. When boundaries are visible, controls become easier to place and easier to review.\n\nIdentify what data enters and leaves the service, and which actions need authorization. Validate external input before business logic depends on it. Normalize data into safer internal models. Limit outputs so callers receive what they need without accidental exposure of internal fields or sensitive records.\n\nProtect secrets, use safe configuration practices, and minimize dependencies. Configuration should be validated before the service handles traffic. Secrets should stay out of source code, logs, client bundles, and ordinary string handling patterns. Dependencies and build artifacts should be reviewed, versioned, traceable, and maintained.\n\nDesign for failure with timeouts, cancellation, careful retries, resource limits, and meaningful error handling. Go's context patterns help when they are used consistently. Defensive services fail safely, preserve useful evidence, and avoid exposing internal details that callers do not need.\n\nMake behavior observable through useful logs, metrics, traces, and audit events. Incident readiness depends on evidence quality before something goes wrong. Good architecture is not security decoration. It is practical engineering that makes safer behavior easier to build, maintain, operate, and improve over time.",
  "narrationPoints": [
    "Secure Go service architecture begins with clear boundaries and explicit assumptions.",
    "Identify what data enters and leaves the service, and which actions need authorization.",
    "Protect secrets, use safe configuration practices, and minimize dependencies.",
    "Design for failure with timeouts, cancellation, careful retries, resource limits, and meaningful error handling.",
    "Make behavior observable through useful logs, metrics, traces, and audit events."
  ]
};
