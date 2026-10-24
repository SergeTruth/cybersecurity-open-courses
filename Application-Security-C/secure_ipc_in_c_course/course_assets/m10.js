window.COURSE_MODULE = {
  "title": "Course Summary: IPC-Safe C Habits",
  "graphicAlt": "IPC contracts define peers, restrict endpoints, validate messages, bound work and clean resources.",
  "narration": "Secure IPC in C starts by defining the boundary. Know which processes may connect, which identity or role they have, who owns the endpoint, how long it exists, and what operations the protocol allows. A channel that feels local still needs a clear trust model.\n\nRestrict endpoint exposure with permissions, least privilege, controlled descriptor and handle inheritance, and predictable cleanup. Named endpoints, shared memory regions, queues, and inherited handles should all be part of the application design rather than accidental side effects of startup.\n\nValidate every message before parsing deeply, allocating, copying, or dispatching actions. Byte streams need framing. Lengths and counts need limits. Unsupported commands and malformed sequences need safe failure. Shared memory needs synchronization, layout contracts, and consistency checks before shared state becomes trusted.\n\nAvailability belongs in the security model. Limit message sizes, queues, connections, shared memory, request rates, and processing time. Define behavior for slow, malformed, disconnected, or unexpected peers. Release resources on every path, including interrupted operations and protocol failures.\n\nFinally, use layered assurance. Tests, logging discipline, static analysis, sanitizers, runtime diagnostics, and code review all support IPC safety. The best review traces endpoint creation, peer checks, message validation, dispatch, state changes, cleanup, and error handling. That trace keeps IPC behavior predictable as systems evolve.",
  "narrationPoints": [
    "Secure IPC in C starts by defining the boundary.",
    "Restrict endpoint exposure with permissions, least privilege, controlled descriptor and handle inheritance, and predictable cleanup.",
    "Validate every message before parsing deeply, allocating, copying, or dispatching actions.",
    "Release resources on every path, including interrupted operations and protocol failures.",
    "Tests, logging discipline, static analysis, sanitizers, runtime diagnostics, and code review all support IPC safety."
  ]
};
