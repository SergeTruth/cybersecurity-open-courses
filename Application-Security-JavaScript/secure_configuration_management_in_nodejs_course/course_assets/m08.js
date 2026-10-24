window.COURSE_MODULE = {
  "title": "Feature Flags, Remote Config, and Runtime Change Risk",
  "graphicAlt": "Runtime flags have owners, reviewed scope, audited changes and reversible behavior that keeps security state visible.",
  "narration": "Feature flags and remote configuration are useful because they let teams roll out features, respond to incidents, and change behavior without redeploying code. That same power can create hidden security states. A flag that changes authentication behavior, authorization rules, admin access, logging, payment flow, exports, file access, or validation is not just a product toggle. It is security-relevant configuration.\n\nDynamic configuration needs governance. Important flags should have clear names, owners, documentation, approval expectations, target environments, expiration dates, and rollback behavior. Long-lived stale flags make security behavior hard to reason about because code may contain multiple possible paths controlled outside the repository. Emergency changes are sometimes necessary, but they should still leave evidence of who changed what, when, why, and how the change was reversed or made permanent.\n\nRemote configuration systems require access control, audit logging, environment separation, and safe defaults. Runtime changes should be observable and reversible. If a flag weakens a protection, it should be visible to operations and security teams. The tradeoff is not whether feature flags are good or bad. The tradeoff is whether the organization treats them as controlled changes to production behavior rather than invisible switches outside normal review.",
  "narrationPoints": [
    "Feature flags and remote configuration are useful because they let teams roll out features, respond to incidents, and change behavior without redeploying code.",
    "Long-lived stale flags make security behavior hard to reason about because code may contain multiple possible paths controlled outside the repository.",
    "Remote configuration systems require access control, audit logging, environment separation, and safe defaults.",
    "A flag that changes authentication behavior, authorization rules, admin access, logging, payment flow, exports, file access, or validation is not just a product toggle.",
    "If a flag weakens a protection, it should be visible to operations and security teams.",
    "Important flags should have clear names, owners, documentation, approval expectations, target environments, expiration dates, and rollback behavior."
  ]
};
