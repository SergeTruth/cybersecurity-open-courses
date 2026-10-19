window.COURSE_MODULE = {
  "title": "Course Summary: A Secure Resource Management Baseline",
  "graphicAlt": "A resource baseline defines ownership and lifetime, releases resources explicitly, bounds work and retention, and observes recovery behavior.",
  "narration": "A secure resource management baseline in C# starts with clarity. Identify what resources the application uses, who owns them, how long they should live, what releases them, and what limits prevent one feature from consuming capacity needed elsewhere.\n\nUse IDisposable and IAsyncDisposable intentionally. Dispose or asynchronously dispose files, streams, handles, commands, readers, transactions, network-backed abstractions, and other owned resources according to their APIs. Do not rely on garbage collection to release external capacity at the moment production needs it released.\n\nControl the resources that cross service boundaries. Reuse network clients safely, scope database resources and transactions carefully, keep dependency injection lifetimes aligned with ownership, and make background work create and clean up the scopes it needs.\n\nBound memory, buffers, caches, queues, fan-out, retries, and concurrency. Pass cancellation where supported, set timeouts where waiting forever would be harmful, and design cleanup paths that leave application state consistent after failure or shutdown.\n\nFinally, make resource behavior observable. Redact diagnostics, monitor production signals, review cleanup and recovery paths before release, and keep runbooks close to the systems they describe. Secure resource management is practical engineering discipline applied before resource problems become incidents.",
  "narrationPoints": [
    "A secure resource management baseline in C# starts with clarity.",
    "Do not rely on garbage collection to release external capacity at the moment production needs it released.",
    "Reuse network clients safely, scope database resources and transactions carefully, keep dependency injection lifetimes aligned with ownership.",
    "Pass cancellation where supported, set timeouts where waiting forever would be harmful.",
    "Secure resource management is practical engineering discipline applied before resource problems become incidents."
  ]
};
