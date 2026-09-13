window.COURSE_MODULE = {
  "title": "Why Serialization Security Matters",
  "graphicAlt": "External API, queue and cache data passes through parsing, DTO validation and authorization before application behavior; arbitrary object graphs are blocked.",
  "narration": "Serialization is how Java applications turn data or objects into a form that can be stored, transmitted, cached, queued, logged, or written to disk. Deserialization is the reverse operation: the application reconstructs data or objects from that representation. Those operations sound routine, and they are routine, but they sit directly on an input boundary. When a Java service accepts serialized data, it is deciding what external bytes are allowed to become application state.\n\nModern Java systems deserialize data from many places. A web service receives JSON from an API request. A worker reads a message from a queue. A partner sends XML. A configuration tool reads YAML. A session store restores state. A batch job imports files from object storage. A cache returns values created earlier by another service. Each path may look ordinary, but each one reconstructs data that code may trust and act on.\n\nUnsafe deserialization can create many kinds of harm: unauthorized actions, object confusion, validation bypass, excessive resource consumption, sensitive data exposure, or execution of code paths the developer did not intend. Native Java object serialization is especially sensitive when the data is not fully trusted because it can rebuild complex object graphs and involve class behavior from the application and its dependencies. But ordinary JSON, XML, YAML, and binary formats can also be risky when configured broadly.\n\nThe goal is to serialize intentionally and deserialize defensively. A safe design identifies the trust boundary, chooses a format appropriate to the use case, constrains the allowed types, validates the data shape, enforces authentication and authorization, applies resource limits, avoids sensitive output leaks, logs safely, and gives reviewers a clear way to reason about what data is allowed to become application state.",
  "narrationPoints": [
    "Serialization is how Java applications turn data or objects.",
    "Modern Java systems deserialize data from many places.",
    "Unsafe deserialization can create many kinds of harm.",
    "The goal is to serialize intentionally and deserialize.",
    "A safe design identifies the trust boundary.",
    "Deserialization is the reverse operation: the application."
  ]
};
