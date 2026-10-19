window.COURSE_MODULE = {
  "title": "Common Secure Configuration Failures",
  "narration": "Some secure configuration failures appear again and again. Debug mode in production can expose internals. Verbose error messages can reveal stack traces, file paths, environment details, or downstream service names. Default credentials can leave administrative interfaces open to anyone who knows the vendor default. Missing audit logging can make security events harder to investigate.\n\nCloud and web settings are frequent sources of risk. Public storage buckets can expose data. Overly permissive CORS can allow unintended web origins to interact with browser-accessible API responses. Weak cookie settings can make session protection worse. Disabled TLS verification can weaken the application's ability to confirm the identity of remote services. These are often one-line settings with large consequences.\n\nInfrastructure exposure is another common pattern. Open management ports, permissive firewall rules, broad security groups, public dashboards, and default administrative interfaces create opportunities for misuse. Excessive IAM permissions can let a service do far more than it needs. When these settings are buried in cloud consoles or copied templates, teams may not notice the overexposure until an incident or audit.\n\nFeature flags and runtime switches also need security review. A flag that bypasses validation, disables authorization, changes data visibility, or enables an experimental integration can be as sensitive as code. Unsafe feature flags should have owners, expiration, monitoring, and rollout plans. Configuration failures are often simple, but their impact can be serious because they change how secure code is allowed to behave.",
  "graphicAlt": "A review spans debug disclosure, public data, broad access and sensitive runtime switches.",
  "narrationPoints": [
    "Some secure configuration failures appear again and again.",
    "Cloud and web settings are frequent sources of risk.",
    "Infrastructure exposure is another common pattern.",
    "Feature flags and runtime switches also need security review."
  ]
};
