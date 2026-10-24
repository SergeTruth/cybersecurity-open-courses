window.COURSE_MODULE = {
  "title": "Protocol Parsers as Trust Boundaries",
  "graphicAlt": "Protocol bytes cross decoding, validation and authorization boundaries before affecting application behavior.",
  "narration": "A protocol parser transforms received bytes into application meaning. It takes raw input and decides where a message begins, which fields exist, which values are valid, and which application action may follow. That makes the parser one of the most important trust boundaries in a C program.\n\nProtocol input may come from another process, device, service, tenant, network zone, or user-controlled source. Even when the source is expected, the bytes are still external to the receiving component. They can be incomplete, outdated, malformed, unsupported, repeated, or valid for a different state than the one the application is currently in.\n\nA defensive parser treats input as untrusted until structure, state, and value checks succeed. A field is not a trusted length simply because bytes exist where a length is expected. A command is not authorized simply because the command identifier is recognized. Each piece of meaning is earned by validation.\n\nParser defects can affect more than immediate decoding. They can influence memory safety, authorization decisions, business logic, service stability, session state, and data integrity. A parser that accepts the wrong structure may hand later code a trusted-looking object that should never have existed.\n\nSecure parsing begins with a clear boundary between raw input, decoded fields, validated messages, and trusted application objects. That separation keeps parser responsibilities visible. It also gives reviewers a practical way to ask whether each transition is justified by an explicit rule.",
  "narrationPoints": [
    "A protocol parser transforms received bytes into application meaning.",
    "Protocol input may come from another process, device, service, tenant, network zone.",
    "A field is not a trusted length simply because bytes exist where a length is expected.",
    "A parser that accepts the wrong structure may hand later code a trusted-looking object that should never have existed.",
    "Secure parsing begins with a clear boundary between raw input, decoded fields, validated messages, and trusted application objects."
  ]
};
