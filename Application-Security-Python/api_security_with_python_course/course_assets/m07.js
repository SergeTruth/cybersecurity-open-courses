window.COURSE_MODULE = {
  "title": "Injection, Serialization, Files, and Webhooks",
  "graphicAlt": "Separate query values, constrained upload storage and validated webhook events preserve distinct processing boundaries.",
  "narration": "Data processing must preserve trust boundaries after a request is accepted. SQL injection prevention depends on parameterized queries and safe ORM patterns that keep data separate from query structure. Similar thinking applies to NoSQL and other query construction. Dynamic filters, sort fields, raw query fragments, and user-controlled expressions should be reviewed carefully. The goal is not to demonstrate payloads, but to prevent untrusted input from becoming executable query logic.\n\nCommand execution, path handling, and file operations require cautious design. APIs should avoid letting request data control commands, interpreters, or filesystem locations. File uploads need size limits, content expectations, safe naming, constrained storage, cleanup, and authorization around access or deletion. A filename, extension, content type, or metadata field is not proof that the file is safe for storage or downstream processing.\n\nSerialization formats such as JSON, YAML, XML, and CSV are useful, but parser choice and limits matter. Unsafe deserialization at a high level is the risk of turning untrusted data into behavior, objects, references, or resource use the application did not intend. Safer processing uses constrained parser modes, schemas, size and depth limits, and clear decisions about what fields can influence server-side behavior.\n\nWebhooks are security-sensitive because they allow external systems to trigger application behavior. A secure webhook design validates source, integrity, freshness, expected event type, and intended purpose. Request signing concepts and replay resistance concepts can help when used correctly. The API should also handle duplicate delivery, delayed delivery, and malformed events safely. Webhooks are not just inbound requests; they are delegated automation paths that deserve monitoring and review.",
  "narrationPoints": [
    "Data processing must preserve trust boundaries.",
    "Command execution, path handling, and file operations.",
    "Serialization formats such as JSON.",
    "Webhooks are security-sensitive.",
    "Dynamic filters, sort fields, raw query fragments,.",
    "APIs should avoid letting request data control commands."
  ]
};
