window.COURSE_MODULE = {
  "title": "Messages, Validation, and Serialization Boundaries",
  "graphicAlt": "Narrow hub messages are validated, and client-supplied routing identifiers are checked against trusted context before delivery to an authorized target.",
  "narration": "Every hub method argument is untrusted input. The fact that a message arrives through SignalR instead of an HTTP controller does not make it safer. Required fields, types, lengths, ranges, formats, enum values, and business rules should be validated before the server changes state, queries sensitive data, joins a group, or sends a targeted message.\n\nNarrow message contracts help. Use DTOs that describe the specific operation rather than binding broad domain objects directly to hub methods. A narrow contract makes it clearer which values the client is allowed to provide and which values must come from trusted server-side data. It also limits accidental exposure when domain objects gain new fields later.\n\nPay close attention to identifiers supplied by the client. User names, tenant IDs, group names, target IDs, room IDs, conversation IDs, and message IDs can all influence routing or authorization. The server should verify those values against trusted data and current policy. A client-supplied tenant or target should not become the authority for where a message goes.\n\nContent also has a display boundary. User-generated text or markup sent through SignalR may later appear in a browser, desktop view, notification surface, or log. Safe rendering, encoding, sanitization, and content rules should be selected based on where the message is displayed and what the receiving client expects.\n\nSerialization settings and protocol choices should be reviewed for compatibility, size, and data exposure. The goal is a predictable contract: inputs are intentionally shaped, invalid messages are rejected safely, sensitive fields are not accidentally serialized, and authorization depends on trusted server decisions rather than client-provided claims.",
  "narrationPoints": [
    "Every hub method argument is untrusted input.",
    "Narrow message contracts help.",
    "Pay close attention to identifiers supplied by the client.",
    "Content also has a display boundary.",
    "Serialization settings and protocol choices should be reviewed for compatibility, size, and data exposure."
  ]
};
