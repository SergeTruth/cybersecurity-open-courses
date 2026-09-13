window.COURSE_MODULE = {
  "title": "Streams, Size Limits, Resource Controls, and Cleanup",
  "graphicAlt": "A bounded stream uses controlled buffers, size and time limits, concurrency limits and backpressure, with resource closure and cleanup of partial files.",
  "narration": "Safe file handling includes availability. A file operation can be correct from an authorization perspective and still unsafe if it exhausts memory, fills disk, ties up worker threads, leaks file descriptors, overwhelms a scanner, or saturates a downstream service. File operations consume memory, CPU, disk, bandwidth, file handles, thread pools, queues, parser capacity, and storage capacity. Those resources need explicit limits.\n\nAvoid loading large or untrusted files fully into memory unless the use case and limits justify it. Use streaming approaches where appropriate, with bounded buffers, timeouts, and error handling. Apply file size limits, request body limits, file count limits, timeout controls, concurrency limits, storage quotas, and queue backpressure. The right limit depends on the workflow, but unlimited should not be the default.\n\nHandle partial reads, partial writes, aborted requests, failed transfers, interrupted threads, and retry behavior. Close streams and file handles reliably using appropriate Java patterns. A file that fails halfway through generation, upload, download, conversion, or transfer should not leave a confusing artifact that later code treats as complete. State and cleanup should reflect whether the operation succeeded, failed, was canceled, or is still pending.\n\nCleanup is part of the feature, not janitorial work to add later. Remove abandoned temporary files, failed exports, stale cache entries, expired generated files, and incomplete processing artifacts. Monitor storage growth, processing latency, parser failures, scanner failures, queue age, and cleanup failures. A healthy file system is one where expected files exist, unexpected files are investigated, and old temporary data does not quietly accumulate.",
  "narrationPoints": [
    "Safe file handling includes availability.",
    "Avoid loading large or untrusted files fully into memory.",
    "Handle partial reads.",
    "Cleanup is part of the feature.",
    "Use streaming approaches where appropriate.",
    "The right limit depends on the workflow."
  ]
};
