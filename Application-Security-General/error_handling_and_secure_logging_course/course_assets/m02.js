window.COURSE_MODULE = {
  "title": "Secure Error Handling Principles",
  "narration": "The first principle is to fail safely. When a required check fails, the application should reject the action, stop the risky workflow, or move into a safe degraded state. It should not continue with partially initialized data, guessed defaults, stale permissions, or incomplete authorization. A secure failure is predictable. The caller may not get the result they wanted, but the system should remain consistent and protected.\n\nThe second principle is controlled disclosure. User-facing errors should usually avoid stack traces, internal paths, SQL queries, secrets, tokens, architecture details, cloud resource names, and dependency internals. Those details can help attackers understand the system, but they are often useful to defenders and maintainers. The answer is not to throw them away. The answer is to send detailed diagnostics to protected internal logs and give the user a safe message plus a supportable reference such as a correlation ID.\n\nThe third principle is to avoid silent failure. A swallowed exception, ignored error code, or empty catch block can be worse than a visible failure because the application keeps moving without a reliable state. Graceful degradation is different from pretending nothing happened. If a recommendation service fails, the application might continue without recommendations. If an authorization check fails, the secure response is denial. Error handling should be explicit about which failures are recoverable and which ones must stop the workflow.",
  "graphicAlt": "A failed required check stops action; recoverable failures can use a safe degraded service with audience-appropriate diagnostics.",
  "narrationPoints": [
    "The first principle is to fail safely.",
    "The second principle is controlled disclosure.",
    "The third principle is to avoid silent failure."
  ]
};
