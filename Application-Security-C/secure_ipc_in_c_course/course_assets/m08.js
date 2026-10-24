window.COURSE_MODULE = {
  "title": "Secrets, Handles, and Descriptor Hygiene",
  "graphicAlt": "Explicit inheritance and ownership pass only intended handles and minimal data.",
  "narration": "IPC can accidentally expose more than the intended request or response. Messages may contain secrets, tokens, file paths, descriptors, handles, configuration values, internal identifiers, or state snapshots. Even when the channel is local, that data should be protected according to the trust level of the peers.\n\nChild processes may inherit descriptors, handles, environment values, or other process state unless launch behavior is controlled. A helper process that only needs one pipe may receive access to other IPC channels if the parent does not manage inheritance. That can make the boundary between processes less clear.\n\nSensitive messages should be minimized. If a peer only needs a reference or status value, avoid sending large internal structures or secrets. Logs and diagnostics should avoid dumping IPC payloads or internal authorization details. Good troubleshooting output identifies the failed operation without exposing the data that the IPC channel was meant to protect.\n\nPassing handles or descriptors requires clear ownership, lifetime, and permission expectations. Who may use the handle? Who closes it? Does receiving it imply authorization for the underlying object? Can it outlive the request? These questions should be part of the protocol design.\n\nDescriptor and handle hygiene should be reviewed wherever processes are launched, privileges change, or helpers are invoked. The review should confirm what is inherited, what is closed, what is intentionally passed, and how sensitive values are kept out of places that do not need them.",
  "narrationPoints": [
    "Even when the channel is local, that data should be protected according to the trust level of the peers.",
    "Child processes may inherit descriptors, handles, environment values, or other process state unless launch behavior is controlled.",
    "Logs and diagnostics should avoid dumping IPC payloads or internal authorization details.",
    "Passing handles or descriptors requires clear ownership, lifetime, and permission expectations.",
    "Descriptor and handle hygiene should be reviewed wherever processes are launched, privileges change, or helpers are invoked."
  ]
};
