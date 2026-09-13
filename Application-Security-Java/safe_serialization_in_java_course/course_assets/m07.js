window.COURSE_MODULE = {
  "title": "Resource Limits, Parser Safety, and Denial of Service",
  "graphicAlt": "Size, depth, count and time limits protect a parser, bounded streaming, heap memory, worker threads and queues while excess input is rejected safely.",
  "narration": "Serialized input can be harmful even when it does not exploit a code path. A huge payload, deeply nested structure, recursive reference, large array, entity expansion, compressed input, oversized string, or slow parser path can exhaust memory, CPU, threads, disk, queues, or downstream capacity. Java services have finite heap, file descriptors, worker pools, network connections, and validation budgets.\n\nApply request size limits, message size limits, nesting limits, array limits, field count limits, timeout controls, stream limits, queue backpressure, and parser-specific safety settings where appropriate. Avoid reading unbounded untrusted data fully into memory. Streaming parsers can help for large data, but only when validation and authorization can remain safe. A streaming design still needs limits and clear failure behavior.\n\nConfigure XML, JSON, YAML, archive, and binary parsers intentionally. XML entity behavior, YAML construction settings, JSON depth and number handling, and binary format limits should be reviewed for the use case. Failed parses and validation failures should not crash the service or leak stack traces, parser internals, classpath details, internal paths, or raw sensitive payloads to clients.\n\nMonitor parse failures, validation failures, message rejection rates, memory pressure, CPU spikes, repeated malformed payloads, and dead-letter volume. Safe serialization includes availability and observability. A service that handles invalid input safely gives operators evidence, protects shared resources, and continues serving legitimate traffic.",
  "narrationPoints": [
    "Serialized input can be harmful even.",
    "Apply request size limits.",
    "Configure XML, JSON, YAML, archive, and binary parsers.",
    "Monitor parse failures.",
    "Avoid reading unbounded untrusted data fully into memory.",
    "XML entity behavior."
  ]
};
