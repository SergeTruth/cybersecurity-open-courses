window.COURSE_MODULE = {
  "title": "Secrets, Configuration, and Sensitive Data",
  "graphicAlt": "Scoped secrets reach the application through approved storage, with startup configuration checks, redacted logs, and rotation.",
  "narration": "Rust applications often need configuration values, API tokens, database credentials, private keys, certificates, session secrets, and service credentials. These values should not be hard-coded into source code, checked into repositories, printed during debugging, or written into broad logs. A safe configuration pattern keeps sensitive values outside the codebase and makes runtime expectations explicit.\n\nConfiguration should be environment-specific, validated, and owned. Startup validation can catch missing required settings, inconsistent options, invalid endpoints, unsupported modes, and risky defaults before the application begins serving traffic. Configuration errors should be reported clearly without exposing the secret values themselves.\n\nSecrets should come from approved mechanisms such as runtime injection, platform secret stores, managed identities, or protected files where appropriate. The exact mechanism depends on the deployment environment, but the principle stays the same: keep secrets scoped, limit where they are copied, and avoid turning generated files, logs, shell history, or artifacts into new secret stores.\n\nTeams should also think about data lifetime. Where do sensitive values enter the process? Which components receive them? Are they cloned, serialized, cached, logged, or included in error contexts? How are they rotated operationally? Secure Rust code uses redaction, careful ownership, and clear interfaces so sensitive data flows are visible and reviewable.",
  "narrationPoints": [
    "Rust applications often need configuration values.",
    "Configuration should be environment-specific.",
    "Secrets should come from approved mechanisms.",
    "Teams should also think about data lifetime.",
    "These values should not be hard-coded into source code.",
    "Configuration errors should be reported clearly."
  ]
};
