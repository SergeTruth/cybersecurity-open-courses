window.COURSE_MODULE = {
  "title": "Course Summary: A Defensive TCP Service Checklist",
  "graphicAlt": "Explicit exposure, framing, state ownership and trust decisions are supported by monitoring and failure testing.",
  "narration": "A defensive TCP service starts with explicit scope. What address and interface does it listen on? Who is expected to connect? Does the deployment require loopback-only access, private network access, or controlled external reachability? Socket setup should match the service purpose and be visible in configuration and review.\n\nThe protocol contract comes next. How is data framed? What maximum sizes and timeouts apply? How does the parser handle partial reads and writes? Which fields are validated, how are integer conversions checked, and how is malformed data rejected? TCP provides bytes; the service must define safe message boundaries.\n\nMemory and state need ownership. Which code owns each buffer? How is state isolated between clients? What concurrency model is used? Who closes descriptors or handles? What happens during disconnect, parse failure, timeout, partial setup, and shutdown? Cleanup should be predictable on every path.\n\nFinally, make trust and operations reviewable. What authentication and authorization are required? Is sensitive traffic protected appropriately? What does the service log, and what does it intentionally avoid logging? Which metrics show health and resource pressure? How are failure paths tested? Secure TCP service development is the practice of making these answers explicit and keeping them true as the service evolves.",
  "narrationPoints": [
    "Socket setup should match the service purpose and be visible in configuration and review.",
    "Does the deployment require loopback-only access, private network access, or controlled external reachability?",
    "Which fields are validated, how are integer conversions checked, and how is malformed data rejected?",
    "What happens during disconnect, parse failure, timeout, partial setup, and shutdown?",
    "Secure TCP service development is the practice of making these answers explicit and keeping them true as the service evolves."
  ]
};
