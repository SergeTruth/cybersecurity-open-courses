window.COURSE_MODULE = {
  "title": "Course Summary: Secure Go REST Habits",
  "graphicAlt": "Every route repeats validation, authorization and scoping, minimal output, safe errors and logs, resource bounds, and release review.",
  "narration": "Secure Go REST APIs are built from durable habits. Treat every route as a security boundary. Validate request bodies, parameters, headers, content types, and identifiers before sensitive use. Keep handlers small enough that parsing, validation, authorization, business logic, and response writing are visible during review.\n\nUse middleware intentionally, but do not hide authorization. Authentication identifies the caller; authorization decides whether that caller may perform the action on the object, tenant, and workflow state. Enforce sensitive decisions on the server and close to the protected operation.\n\nProtect data on the way in and on the way out. Use safe database patterns, preserve tenant separation, return explicit response models, map errors to safe responses, redact logs, and keep secrets out of source, responses, and operational systems. Bound request size, time, goroutines, files, connections, and downstream calls.\n\nFinally, govern the system around the code. Review dependencies, validate configuration, test rejection paths, use CI checks, document releases, and keep patch paths clear. A secure Go REST API is a predictable boundary between untrusted requests and trusted business operations. Its strength comes from the same habits applied repeatedly across every route and release, not from a one-time review or checklist alone.",
  "narrationPoints": [
    "Secure Go REST APIs are built from durable habits.",
    "Use middleware intentionally, but do not hide authorization.",
    "Protect data on the way in and on the way out.",
    "Finally, govern the system around the code."
  ]
};
