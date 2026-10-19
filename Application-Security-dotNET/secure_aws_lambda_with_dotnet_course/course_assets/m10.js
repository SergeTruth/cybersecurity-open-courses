window.COURSE_MODULE = {
  "title": "Course Summary: A Secure .NET Lambda Baseline",
  "graphicAlt": "A secure Lambda baseline combines clean artifacts, least-privilege identity, validated events, idempotent bounded work and operational recovery.",
  "narration": "A secure AWS Lambda baseline for .NET starts with clean deployment packages and least-privilege execution roles. Ship only the runtime artifacts the function needs, protect build outputs and deployment logs, and keep permissions narrow enough that reviewers can explain each action and resource.\n\nTreat every event source as a trust boundary. Secure HTTP exposure through the appropriate front door and authorization controls, validate events before side effects, use governed secret handling for sensitive values, and review VPC access, service boundaries, and network assumptions.\n\nDesign for retries, duplicate events, and partial failures. Idempotent processing, dead-letter handling, destinations, retry limits, alerting, and recovery steps should be part of the workload design rather than added after production failures.\n\nFinally, align concurrency, timeouts, memory, storage, and downstream capacity. Redact logs, monitor failure signals, and keep operational review connected to code, IAM, configuration, and deployment automation. Secure Lambda work is practical engineering across the full function lifecycle.",
  "narrationPoints": [
    "A secure AWS Lambda baseline for .NET starts with clean deployment packages and least-privilege execution roles.",
    "Ship only the runtime artifacts the function needs, protect build outputs and deployment logs.",
    "Secure HTTP exposure through the appropriate front door and authorization controls, validate events before side effects.",
    "Idempotent processing, dead-letter handling, destinations, retry limits, alerting.",
    "Secure Lambda work is practical engineering across the full function lifecycle."
  ]
};
