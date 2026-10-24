window.COURSE_MODULE = {
  "title": "Timeouts, Limits, and Availability",
  "graphicAlt": "Per-connection limits, bounded queues and timeouts preserve resources with cleanup.",
  "narration": "Socket services need resource governance because peers may be slow, disconnected, malformed, or unexpectedly active. A service that has no limits can spend too much memory, too many descriptors, too much queue space, or too much time on one peer or one class of requests.\n\nUseful controls include maximum connection counts, maximum message sizes, queue depth limits, request rate limits, idle timeouts, retry limits, and memory caps. These limits should be chosen for the service's role and enforced consistently. Limits are most useful when they are part of the protocol and operational documentation, not hidden surprises.\n\nTimeouts and backpressure keep the service from waiting forever or accepting work it cannot process. A slow peer should not hold critical resources indefinitely. A full output queue should have a defined response. A request that exceeds limits should fail predictably and release resources.\n\nAvoid unbounded allocation based on network-provided lengths or counts. Even when a value is syntactically valid, the service should decide whether it is acceptable. Allocation, copying, parsing, and dispatch should all happen after size and policy checks.\n\nCleanup after disconnects, timeouts, parse failures, and protocol errors is part of availability. Descriptors, buffers, timers, parser state, worker state, and queued output all need a release path. A long-running service that leaks small amounts of state on failure will eventually become unreliable, and reliability is part of secure socket design.",
  "narrationPoints": [
    "Socket services need resource governance because peers may be slow, disconnected, malformed, or unexpectedly active.",
    "Limits are most useful when they are part of the protocol and operational documentation, not hidden surprises.",
    "Timeouts and backpressure keep the service from waiting forever or accepting work it cannot process.",
    "Allocation, copying, parsing, and dispatch should all happen after size and policy checks.",
    "Cleanup after disconnects, timeouts, parse failures, and protocol errors is part of availability."
  ]
};
