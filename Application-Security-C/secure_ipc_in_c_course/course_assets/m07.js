window.COURSE_MODULE = {
  "title": "Resource Limits and Denial-of-Service Resistance",
  "graphicAlt": "IPC limits bound message size, queues and time, with cleanup on rejected work.",
  "narration": "IPC services need resource limits because peers can behave unexpectedly. A local client may send too much data, connect too often, stop reading, stop writing, keep a connection open, or make requests that are expensive to process. The service should not assume every peer is cooperative or perfectly implemented.\n\nUseful limits include maximum message size, queue depth, connection count, shared memory size, request rate, nesting depth, and processing time. These limits should be chosen for the workflow and enforced consistently. A limit that is documented but not checked does not protect the service.\n\nTimeouts, backpressure, and controlled failure behavior are part of secure IPC. A slow peer should not hold critical resources indefinitely. A full queue should have a defined response. A request that exceeds limits should fail in a way that preserves service stability and releases owned resources.\n\nAvoid unbounded allocation based on peer-provided lengths or counts. Even when a message is well-formed, the service should decide how much memory and work it is willing to spend. Allocation, copying, and dispatch should follow validated size and policy limits.\n\nCleanup is essential after disconnects, errors, interrupted operations, and protocol failures. Long-running services accumulate reliability problems when partial state, descriptors, shared memory, queue entries, or timers are not released. Availability is part of secure IPC because a service that cannot stay healthy cannot enforce its security boundary reliably.",
  "narrationPoints": [
    "IPC services need resource limits because peers can behave unexpectedly.",
    "Useful limits include maximum message size, queue depth, connection count, shared memory size, request rate, nesting depth, and processing time.",
    "Timeouts, backpressure, and controlled failure behavior are part of secure IPC.",
    "Allocation, copying, and dispatch should follow validated size and policy limits.",
    "Availability is part of secure IPC because a service that cannot stay healthy cannot enforce its security boundary reliably."
  ]
};
