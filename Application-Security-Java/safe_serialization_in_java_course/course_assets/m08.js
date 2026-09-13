window.COURSE_MODULE = {
  "title": "Secrets, Sensitive Fields, Logging, and Data Exposure",
  "graphicAlt": "An explicit output contract selects document fields for an API response while minimal logs record event identifiers, actions and outcomes; secrets are excluded and retained failures are protected.",
  "narration": "Serialization is not only input. Output serialization can leak data too. A Java entity may contain password hashes, reset tokens, internal roles, tenant IDs, audit metadata, private notes, service credentials, or configuration details. If the application serializes the entity directly to JSON, a response can expose fields the caller should never see. Safe output mapping is a first-class part of serialization security.\n\nUse response DTOs, views, serializers, or explicit mapping to control what leaves the application. Avoid serializing secrets into messages, logs, cache entries, client responses, debug dumps, support bundles, exported files, or dead-letter stores unless there is a clear need and a protection plan. Encryption may protect storage or transport, but it does not replace minimization, authorization, redaction, and access control.\n\nLogs are a common secondary exposure path. Redact sensitive fields before logging parse errors, validation failures, rejected messages, raw payload samples, or exception details. Do not log full serialized payloads when they may contain secrets, tokens, authorization headers, cookies, private URLs, credentials, sensitive records, or unnecessary personal data. A safe log should help operators investigate without preserving the sensitive data that caused the concern.\n\nDead-letter queues, failed-message stores, caches, traces, object storage, and support bundles can become sensitive-data stores. Retention and deletion expectations should be defined for serialized sensitive data. Review who can access those stores, how long data remains, what gets replayed, and what must be rotated or remediated after exposure. Serialization can copy data widely; minimization keeps that spread under control.",
  "narrationPoints": [
    "Serialization is not only input.",
    "Use response DTOs.",
    "Logs are a common secondary exposure path.",
    "Dead-letter queues, failed-message stores, caches, traces.",
    "If the application serializes the entity directly to JSON.",
    "Encryption may protect storage or transport."
  ]
};
