window.COURSE_MODULE = {
  "title": "Testing, Code Review, CI/CD, and Incident Response",
  "graphicAlt": "An engineering loop inventories deserialization boundaries, tests malformed, oversized and unauthorized input, reviews changes and responds across queues, caches and secrets.",
  "narration": "Serialization review should be repeatable. Code review should identify ObjectInputStream, Serializable classes, readObject methods, deserialization filters, JSON, XML, and YAML parser configuration, polymorphic binding, custom deserializers, message DTOs, raw payload logging, and direct entity serialization. Reviewers should ask what is being deserialized, who supplied it, which classes or DTOs are allowed, what limits apply, and what happens on failure.\n\nTests should cover malformed payloads, unknown fields, unsupported versions, oversized data, deeply nested data, rejected classes, unauthorized messages, sensitive field exclusion, and safe error responses. Fuzzing can be useful for parsers, binary formats, custom deserializers, and file or message boundaries. These tests are not only about parser crashes. They verify that the application rejects unexpected state before it becomes business behavior.\n\nCI/CD should run tests, dependency checks, secret scanning, static analysis where useful, and review dependency changes that affect serializers or parsers. A new library version can change parser defaults, subtype handling, XML behavior, YAML construction, or DTO mapping. Dependency review matters because serialization behavior often lives in framework integration code rather than obvious business logic.\n\nIncident response should include affected parser review, classpath dependency review, secret rotation when needed, log review, message replay review, cache and dead-letter inspection, and remediation validation. Serialization paths should have owners and documented expectations. During an incident, someone needs to know which inputs were accepted, which fields were logged, which messages can be replayed, and which downstream actions may have occurred.",
  "narrationPoints": [
    "Serialization review should be repeatable.",
    "Tests should cover malformed payloads.",
    "CI/CD should run tests.",
    "Incident response should include affected parser review.",
    "They verify that the application rejects unexpected state.",
    "Dependency review matters."
  ]
};
