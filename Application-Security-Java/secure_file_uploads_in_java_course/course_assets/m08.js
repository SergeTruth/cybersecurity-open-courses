window.COURSE_MODULE = {
  "title": "Abuse Prevention, Denial of Service, and Operational Limits",
  "graphicAlt": "Quota and rate controls feed a bounded queue and limited workers within a storage budget, supported by queue-age monitoring and cleanup.",
  "narration": "Upload features consume real resources: bandwidth, memory, CPU, disk, object storage, database capacity, scanner capacity, queue capacity, application-server threads, and support attention. Resource abuse can be accidental or malicious. A normal user may upload the wrong file repeatedly, while an attacker may try to exhaust storage or processing capacity. The controls should protect the platform while preserving legitimate workflows.\n\nApply limits based on user, tenant, API key, IP address, endpoint, file type, and business workflow. Useful controls include quotas, rate limits, size limits, file count limits, timeout controls, concurrency limits, queue backpressure, scanner capacity limits, and storage lifecycle rules. The right limits depend on the use case. A customer document portal, profile image endpoint, and administrative import feature should not inherit the same upload budget without thought.\n\nPlan for failed uploads, interrupted uploads, duplicate uploads, retries, and abandoned temporary files. Cleanup jobs should remove orphaned temporary content and expired quarantined files. Expensive processing such as image resizing, archive extraction, document conversion, OCR, and malware scanning should be bounded and observable. A feature that accepts files faster than it can scan or process them can become an operational backlog and a security visibility problem.\n\nMonitoring should cover unusual upload volume, repeated rejections, scanner failures, storage growth, queue age, processing latency, access-denied patterns, cleanup failures, and download anomalies. Alerts should be actionable, not just noisy. A good alert helps defenders understand whether the issue is abuse, a broken client, a configuration mistake, scanner failure, storage pressure, or a downstream service problem.",
  "narrationPoints": [
    "Upload features consume real resources: bandwidth.",
    "Apply limits based on user.",
    "Plan for failed uploads.",
    "Monitoring should cover unusual upload volume.",
    "The controls should protect the platform.",
    "The right limits depend on the use case."
  ]
};
