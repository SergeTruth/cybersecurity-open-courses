window.COURSE_MODULE = {
  "title": "Course Summary and Practical Checklist",
  "graphicAlt": "Safe serialization combines inventory, constrained parsing, validation and authorization, bounded work and minimized data copies around an explicit data contract, with a legacy migration path.",
  "narration": "Safe serialization in Java starts with inventory. Find the places where APIs, queues, caches, sessions, files, RPC systems, workers, admin tools, object storage jobs, and integration paths serialize or deserialize data. Identify who creates the data, what format it uses, what parser reads it, what object or DTO is created, what validation runs, what action follows, and who owns the path.\n\nAvoid native Java object deserialization of untrusted data. Where legacy object streams remain, use narrow filters, class allowlists, resource limits, authentication, monitoring, and migration plans. Prefer constrained data formats and explicit DTO mapping for external input. Review JSON, XML, YAML, and binary parser configuration, especially polymorphic type handling, class-name-based binding, external resource behavior, and broad object construction.\n\nValidate schemas, versions, fields, types, sizes, and business rules before acting. Remember that schema validation does not replace authentication, authorization, object ownership, tenant checks, or business-state checks. Apply resource limits so oversized or deeply nested payloads cannot exhaust services. Avoid serializing secrets and internal fields into responses, logs, messages, caches, dead-letter queues, support bundles, or exported files.\n\nA practical first-week plan is direct: search for ObjectInputStream, inventory JSON, XML, and YAML parser settings, disable or constrain polymorphic binding where unnecessary, add DTO validation, review raw payload logging, check message size limits, test rejected payloads, and document owners for serialization paths. Then build serialization review into pull requests, CI/CD, dependency review, logging, monitoring, and incident response.",
  "narrationPoints": [
    "Safe serialization in Java starts with inventory.",
    "Avoid native Java object deserialization of untrusted data.",
    "Validate schemas, versions, fields, types, sizes,.",
    "A practical first-week plan is direct: search.",
    "Where legacy object streams remain.",
    "Review JSON, XML, YAML, and binary parser configuration."
  ]
};
