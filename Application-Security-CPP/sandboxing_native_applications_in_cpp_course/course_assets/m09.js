window.COURSE_MODULE = {
  "title": "Course Summary: Sandboxing Design Habits",
  "graphicAlt": "Sandbox discipline joins threat mapping, authority separation, validated IPC, limits and lifecycle governance.",
  "narration": "Secure sandboxing starts with the right expectation. It is containment, not magic. Continue to validate input, write defensive C++, update dependencies, and test parser behavior. Use the sandbox to reduce what a risky component can access or affect when something still goes wrong. The boundary should be visible enough that engineers can explain it during design review.\n\nStart with a threat model, then isolate risky work into lower-authority components. Keep sensitive operations in a broker, grant only the filesystem, network, device, UI, and credential access required, and make every permission a documented decision.\n\nKeep IPC narrow, validated, and capability-based. The broker should validate every request, issue scoped authority for approved actions, bound message size and rate, and reject unsupported behavior safely. Resource limits should cover CPU, memory, disk, handles, queues, and time.\n\nFinally, govern the lifecycle. Design for crashes, cancellation, shutdown, and partial output. Monitor denied operations and worker failures. Review sandbox policy whenever features, dependencies, platforms, or trust boundaries change. Good sandboxing is an architecture discipline that stays alive after release. It remains effective only when permissions, broker contracts, worker behavior, and monitoring are kept aligned with the real product. When these habits become routine, sandboxing is easier to maintain across releases.",
  "narrationPoints": [
    "Continue to validate input, write defensive C++, update dependencies, and test parser behavior.",
    "The boundary should be visible enough that engineers can explain it during design review.",
    "Start with a threat model, then isolate risky work into lower-authority components.",
    "Keep sensitive operations in a broker, grant only the filesystem, network, device, UI, and credential access required, and make every permission a documented decision.",
    "The broker should validate every request, issue scoped authority for approved actions, bound message size and rate, and reject unsupported behavior safely.",
    "Review sandbox policy whenever features, dependencies, platforms, or trust boundaries change."
  ]
};
