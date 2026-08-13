window.COURSE_MODULE = {
  "title": "Course Summary: A Practical API Key Baseline",
  "graphicAlt": "Bullet summary graphic for Course Summary: A Practical API Key Baseline.",
  "narration": "A practical API key baseline for ASP.NET Core starts by treating keys as credentials across the full lifecycle. Keys should have owners, purposes, environments, scopes, storage expectations, rotation paths, revocation procedures, and incident response plans.\n\nKeep keys out of source code, logs, URLs, frontend assets, public configuration, documentation, and sample projects. Use HTTPS for credential-bearing requests. Prefer placement and redaction patterns that are easy to handle consistently, and treat diagnostics and support artifacts as possible exposure paths.\n\nValidate inbound keys consistently, and store accepted keys safely. Where possible, avoid retaining full raw keys for inbound validation. Use lookup identifiers, protected verifiers, safe comparisons, predictable failure behavior, and deployment-aware revocation state.\n\nSeparate authentication from authorization. A valid key identifies a caller or integration, but scopes, tenants, endpoint policy, resource boundaries, and high-impact operations still need server-side authorization. Least privilege and clear accountability make the system easier to operate.\n\nFinally, rotate, revoke, expire, monitor, and rate-limit key usage deliberately. Review outbound provider keys, client-side assets, deployment configuration, logs, alerting, quotas, and third-party restrictions. API key security is not one check in one endpoint. It is a lifecycle discipline.",
  "narrationPoints": [
    "A practical API key baseline for ASP.NET Core starts by treating keys as credentials across the full lifecycle.",
    "Prefer placement and redaction patterns that are easy to handle consistently, and treat diagnostics and support artifacts as possible exposure paths.",
    "Use lookup identifiers, protected verifiers, safe comparisons, predictable failure behavior, and deployment-aware revocation state.",
    "A valid key identifies a caller or integration, but scopes, tenants, endpoint policy, resource boundaries, and high-impact operations still need server-side authorization.",
    "API key security is not one check in one endpoint."
  ]
};
