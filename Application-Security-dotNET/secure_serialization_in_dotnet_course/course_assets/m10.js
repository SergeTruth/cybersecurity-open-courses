window.COURSE_MODULE = {
  "title": "Course Summary: Secure Serialization Workflow",
  "graphicAlt": "Bullet summary graphic for Course Summary: Secure Serialization Workflow.",
  "narration": "Secure serialization in .NET is a repeatable engineering workflow. Start by identifying where objects become data and where data becomes objects again. Look at APIs, queues, files, caches, cookies, sessions, imports, exports, logs, telemetry, integrations, and stored serialized records. Those paths are boundary decisions, not just plumbing.\n\nPrefer explicit contracts and maintained framework-supported serializers. Shape DTOs for the boundary, not for internal convenience. Use System.Text.Json and other supported platform features intentionally. Document ownership, expected fields, versions, and consumers so future changes are reviewable.\n\nTreat deserialized data as untrusted until validated. Check required fields, business meaning, authorization context, object state, size, version, and compatibility before making decisions. Keep parsing, validation, authorization, and business logic distinct enough that reviewers can see where trust is earned.\n\nAvoid unsafe type handling and arbitrary runtime type selection. Where polymorphism is necessary, use explicit allow-lists of known contract types and clear validation. Review legacy serializers, broad compatibility shortcuts, custom converters, XML parser settings, caches, queues, plugin systems, imports, exports, and diagnostic object dumps.\n\nFinally, protect serialized output. Use minimization, projection, ignore rules, access control, retention, and secure transfer where needed. Secure serialization is not a one-time setting. It is an ongoing habit of making data boundaries deliberate, testable, and maintainable.",
  "narrationPoints": [
    "Secure serialization in .NET is a repeatable engineering workflow.",
    "Document ownership, expected fields, versions, and consumers so future changes are reviewable.",
    "Keep parsing, validation, authorization, and business logic distinct enough that reviewers can see where trust is earned.",
    "Where polymorphism is necessary, use explicit allow-lists of known contract types and clear validation.",
    "Use minimization, projection, ignore rules, access control, retention, and secure transfer where needed."
  ]
};
