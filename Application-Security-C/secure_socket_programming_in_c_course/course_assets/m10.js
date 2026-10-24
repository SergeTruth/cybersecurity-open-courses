window.COURSE_MODULE = {
  "title": "Course Summary: Socket-Safe C Habits",
  "graphicAlt": "Socket discipline restricts exposure, authorizes peers, validates frames, bounds resources and protects data.",
  "narration": "Socket-safe C begins with the assumption that every socket is a trust boundary. The peer may be expected, but the data is still external. The endpoint may be local, but local does not automatically mean authorized. The service may be internal, but internal systems still need clear boundaries.\n\nRestrict endpoint exposure and run services with least privilege. Binding choices, interface selection, service accounts, firewall policy, container networking, and deployment configuration all shape who can reach the service and what the process can affect if something goes wrong.\n\nValidate protocol messages before allocation, copying, deep parsing, command dispatch, or state changes. TCP needs explicit framing. UDP needs size, source, and content checks. Lengths, commands, flags, and payloads need consistent limits and schema expectations.\n\nHandle partial I/O, timeouts, disconnects, and cleanup as normal operating conditions. Socket code should expect incomplete reads, partial writes, slow peers, dropped connections, and parser failures. Resource release needs to work on every path, not only during graceful shutdown.\n\nFinally, protect sensitive data with appropriate transport security and logging discipline. Use tests, static analysis, sanitizers, runtime diagnostics, and code review to keep behavior predictable under failure and load. Secure socket programming is disciplined boundary management applied to every connection.",
  "narrationPoints": [
    "Socket-safe C begins with the assumption that every socket is a trust boundary.",
    "Restrict endpoint exposure and run services with least privilege.",
    "Validate protocol messages before allocation, copying, deep parsing, command dispatch, or state changes.",
    "Socket code should expect incomplete reads, partial writes, slow peers, dropped connections, and parser failures.",
    "Secure socket programming is disciplined boundary management applied to every connection."
  ]
};
