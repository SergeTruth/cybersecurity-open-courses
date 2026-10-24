window.COURSE_MODULE = {
  "title": "Rate Limits, Amplification Risk, and Availability",
  "graphicAlt": "Burst datagrams meet cheap early-validation gate before bounded-work engine.",
  "narration": "UDP services need resource limits because datagrams can arrive quickly and without connection setup. A service may receive bursts, repeated messages, unrelated discovery traffic, or datagrams from peers that are not following the expected protocol. The code should not assume that every datagram deserves expensive work.\n\nUseful limits include maximum message size, response size, queue depth, peer state size, request rate, and processing time. These limits should be part of protocol and service design. Without them, a small listener can spend too much memory or CPU on traffic that should have been rejected early.\n\nBasic validation should happen before expensive work. Check size, version, message type, and required fields before parsing deeply, touching storage, allocating large buffers, or generating responses. This keeps invalid input cheap to reject and makes service behavior easier to reason about.\n\nResponse size should be controlled. A service should avoid generating a response that is disproportionate to a small or weakly validated request. For many UDP workflows, small and bounded responses are safer and easier to operate. When larger responses are legitimate, the protocol should define the conditions and limits clearly.\n\nSafe failure behavior protects availability. Malformed, repeated, unexpected, or high-volume traffic should be handled without unbounded allocation, unbounded state growth, or noisy logs that overwhelm operators. Availability is part of secure UDP design, especially for long-running services, discovery components, and embedded systems.",
  "narrationPoints": [
    "UDP services need resource limits because datagrams can arrive quickly and without connection setup.",
    "Useful limits include maximum message size, response size, queue depth, peer state size, request rate.",
    "Check size, version, message type, and required fields before parsing deeply, touching storage.",
    "When larger responses are legitimate, the protocol should define the conditions and limits clearly.",
    "Availability is part of secure UDP design, especially for long-running services, discovery components, and embedded systems."
  ]
};
