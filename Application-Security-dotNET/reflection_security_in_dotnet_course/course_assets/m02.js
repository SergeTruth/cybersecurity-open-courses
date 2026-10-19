window.COURSE_MODULE = {
  "title": "Metadata Discovery and Information Exposure",
  "graphicAlt": "A disclosure review provides safe diagnostic context to authorized operators while excluding raw internals from public output.",
  "narration": "Reflection can reveal architecture and implementation details that are not meant for broad exposure. Metadata may include assembly names, namespaces, type names, property names, method names, attributes, generic type shapes, internal conventions, feature flags, and dependency details.\n\nThat information may not be sensitive in isolation, but context matters. Internal names and conventions can help unauthorized users understand how the system is organized, which features exist, which components are loaded, and which dependencies or plugins are present. That can increase the value of other observations.\n\nLogs, debug endpoints, API responses, admin tools, plugin inventories, health checks, and exception messages can expose more metadata than intended. A diagnostic page that is useful during development may be too detailed for production clients or low-trust support workflows.\n\nDiagnostics should provide enough information for operators without exposing internal structure broadly. Safe context might include an operation name, a stable type key, a category, a correlation ID, an environment, and a safe version identifier. Raw internal type lists, assembly paths, and reflected values should be limited to tightly controlled operational contexts.\n\nReflection-based inspection tools should be access-controlled, environment-scoped, redacted, and reviewed before production. If the tool helps operators understand runtime state, it also needs ownership, logging, and a clear audience.",
  "narrationPoints": [
    "Reflection can reveal architecture and implementation details that are not meant for broad exposure.",
    "Internal names and conventions can help unauthorized users understand how the system is organized.",
    "A diagnostic page that is useful during development may be too detailed for production clients or low-trust support workflows.",
    "Raw internal type lists, assembly paths, and reflected values should be limited to tightly controlled operational contexts.",
    "If the tool helps operators understand runtime state, it also needs ownership, logging, and a clear audience."
  ]
};
