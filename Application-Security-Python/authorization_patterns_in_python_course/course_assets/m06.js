window.COURSE_MODULE = {
  "title": "API, Token, and Service-to-Service Authorization",
  "graphicAlt": "Service identity, validated claims and the requested operation feed explicit policy, and deferred jobs return with preserved authorization context.",
  "narration": "APIs need authorization because they often expose data and business operations directly to clients, services, partners, and automation. A valid bearer token, API key, service account, or workload identity may authenticate the caller, but the application still needs to decide whether that caller can perform the requested action on the requested resource. Token validation and authorization decisions are related, but they are not identical.\n\nScopes and claims can carry authorization-relevant information at a high level. A scope might describe delegated access. A claim might identify a tenant, group, role, or subject property. These values are useful only when they come from a trusted issuer, are validated for the application, and are interpreted correctly. A token claim should not become automatic permission for every endpoint unless the policy explicitly says so.\n\nService-to-service authorization deserves the same discipline as user-facing authorization. Internal APIs should not automatically trust every caller just because traffic is inside a network or platform. Internal services can be misconfigured, compromised, reused outside the intended path, or granted broader access than needed. Service accounts and workload identities should have ownership, least privilege, rotation expectations, and monitoring.\n\nBackground jobs, webhooks, and delegated access require careful context. A job may run later than the user request that created it. A webhook may claim to represent an external event. A delegated application may act on behalf of a user or organization. The system should preserve enough context to authorize safely without trusting unverified input. The durable pattern is to authenticate the caller, validate the request, then authorize the action and resource explicitly.",
  "narrationPoints": [
    "APIs need authorization.",
    "Scopes and claims can carry authorization-relevant.",
    "Service-to-service authorization deserves the same.",
    "Background jobs, webhooks, and delegated access require.",
    "A scope might describe delegated access.",
    "A token claim should not become automatic permission."
  ]
};
