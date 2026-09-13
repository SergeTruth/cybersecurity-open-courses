window.COURSE_MODULE = {
  "title": "Course Summary: Secure Go in Practice",
  "graphicAlt": "Validation, error handling, bounded work, data protection, concurrency ownership and release review form repeatable secure Go practices.",
  "narration": "Secure Go development starts with simple, repeatable habits. Define trust boundaries before code starts relying on data. Treat external input as untrusted. Parse and validate close to the boundary. Use types, small interfaces, and explicit conversions to make assumptions visible.\n\nHandle errors deliberately. An ignored error can hide a failed check, partial write, missing configuration value, or broken cleanup path. Limit resources with bounded reads, timeouts, cleanup, and lifecycle ownership. Protect secrets by keeping them out of source, logs, metrics, client responses, and broad operational systems.\n\nReview concurrency with care. Goroutines need owners, contexts need cancellation, channels need clear rules, and shared state needs synchronization. Review HTTP handlers and service boundaries for authentication, authorization, safe responses, logging, and request limits. Manage dependencies and builds as part of the application trust model.\n\nA secure Go application is not secure because it uses Go. It is secure because its design, code, tests, delivery pipeline, and operations make safe behavior visible and repeatable. Go's clarity gives teams a strong foundation. Disciplined engineering turns that foundation into durable security. The habits are intentionally ordinary: check inputs, handle errors, bound work, review dependencies, and make ownership clear. Repeating those habits across services is what keeps security maintainable.",
  "narrationPoints": [
    "Secure Go development starts with simple, repeatable habits.",
    "Handle errors deliberately.",
    "Review concurrency with care.",
    "A secure Go application is not secure because it uses Go."
  ]
};
