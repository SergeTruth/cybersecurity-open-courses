window.COURSE_MODULE = {
  "title": "Trust Boundaries and Data Sources",
  "graphicAlt": "API bodies, uploads, webhooks, queue messages, configuration files, and third-party responses converge on one validation boundary before separating into domain objects, storage, logs, and downstream actions.",
  "narration": "Before parsing JSON or YAML, understand where it came from and what authority it should have. API request bodies, uploaded files, webhooks, queue messages, third-party responses, user-edited files, and generated machine output should usually be treated as untrusted until validated. Even internal services can produce stale, malformed, incomplete, or unexpected data.\n\nConfiguration files need a separate trust decision. A deployment-owned configuration file may be trusted enough to control application behavior, while a user-submitted YAML file should not be allowed to control the same settings. The format may look identical, but the source, owner, review process, freshness, and intended use are different. Security comes from that context.\n\nCI/CD inputs, cloud metadata, service responses, and environment-generated configuration deserve care because they often influence build, deployment, routing, or credential behavior. A Python application should not automatically treat data as safe merely because it arrived from automation. Automation can be misconfigured, compromised, stale, or used outside the original assumptions.\n\nA practical trust-boundary review asks who controls the data, who reviews it, how fresh it is, how large it may be, what schema it should follow, and what code will do after parsing. When these questions are answered before implementation, developers can choose appropriate parsers, limits, validation, logging, and authorization checks instead of relying on broad trust.",
  "narrationPoints": [
    "Before parsing JSON or YAML, understand where it came from and what authority it should have.",
    "The format may look identical, but the source, owner, review process, freshness, and intended use are different.",
    "A Python application should not automatically treat data as safe merely because it arrived from automation.",
    "When these questions are answered before implementation, developers can choose appropriate parsers, limits, validation, logging, and authorization checks instead of relying on broad trust.",
    "Automation can be misconfigured, compromised, stale, or used outside the original assumptions.",
    "Even internal services can produce stale, malformed, incomplete, or unexpected data."
  ]
};
