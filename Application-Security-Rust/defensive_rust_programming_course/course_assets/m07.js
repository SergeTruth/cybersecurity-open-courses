window.COURSE_MODULE = {
  "title": "Secrets, Configuration, and Logging Hygiene",
  "graphicAlt": "Secrets reach runtime through scoped mechanisms, configuration is validated, and emitted logs are redacted.",
  "narration": "Defensive Rust code treats secrets and configuration as operational security concerns. Applications may use API tokens, database credentials, private keys, certificates, session secrets, signing keys, service credentials, or sensitive feature flags. These values should not be hard-coded, checked into repositories, printed during debugging, or written into broad logs.\n\nConfiguration should be explicit, validated, and environment-specific. Startup validation can catch missing required settings, inconsistent options, invalid endpoints, unsupported modes, and risky defaults before the application begins serving traffic. Configuration errors should be clear without exposing the secret values themselves.\n\nSecrets should come from approved runtime mechanisms such as platform secret stores, runtime injection, managed identity patterns, or protected files where appropriate. The exact mechanism depends on the deployment environment, but the principle stays the same: keep secrets scoped, limit where they are copied, and avoid turning generated files, crash reports, logs, or artifacts into new secret stores.\n\nLogs should be structured enough to support operations but redacted enough to protect sensitive data. Useful logs identify events, status, request categories, validation failures, dependency issues, and operational outcomes. They should avoid secrets, tokens, personal data, sensitive configuration, internal topology, and excessive raw payloads.\n\nTeams should understand where sensitive values enter the process, where they are cloned or serialized, how they are passed between components, and how they are rotated or replaced. Defensive Rust does not rely on good intentions at every log statement. It uses interfaces, redaction, and review to make sensitive data flow visible.",
  "narrationPoints": [
    "Defensive Rust code treats secrets and configuration.",
    "Configuration should be explicit.",
    "Secrets should come from approved runtime mechanisms.",
    "Logs should be structured enough to support operations.",
    "Teams should understand where sensitive values enter.",
    "Applications may use API tokens."
  ]
};
