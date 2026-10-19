window.COURSE_MODULE = {
  "title": "Errors, Logging, and Security Visibility",
  "graphicAlt": "Safe user responses and sanitized, access-controlled logs preserve useful event context without exposing secrets.",
  "narration": "Error handling should help users, operators, and developers without exposing unnecessary detail. A user-facing error should be safe, clear, and limited. It should not reveal stack traces, connection strings, internal paths, tokens, raw exception details, sensitive records, or infrastructure information.\n\nDiagnostic detail belongs in protected logs that are available to authorized operators. Even there, logs need data classification. Secrets, credentials, tokens, private keys, sensitive personal data, and excessive request content should be redacted or avoided. Privacy-aware logging is part of application security.\n\nSecurity visibility depends on logging the right events with useful context. Authentication events, authorization failures, suspicious validation failures, account recovery actions, administrative changes, configuration changes, high-risk data access, and deployment changes may all be relevant. Logs should support investigation without becoming a second sensitive database.\n\nCorrelation IDs, request IDs, user or service identifiers, tenant identifiers, and event categories can make logs useful during operations and incident response. The goal is to reconstruct what happened, when it happened, which component was involved, and what decision the application made without exposing more data than necessary.\n\nGood logging also supports future review. When teams can see recurring validation failures, permission denials, dependency errors, or deployment issues, they can improve the application. Security visibility is not only for incidents; it is feedback for engineering.",
  "narrationPoints": [
    "Error handling should help users, operators, and developers without exposing unnecessary detail.",
    "Diagnostic detail belongs in protected logs that are available to authorized operators.",
    "Security visibility depends on logging the right events with useful context.",
    "Correlation IDs, request IDs, user or service identifiers, tenant identifiers.",
    "When teams can see recurring validation failures, permission denials, dependency errors, or deployment issues."
  ]
};
