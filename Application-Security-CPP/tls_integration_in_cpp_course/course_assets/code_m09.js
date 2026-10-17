window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "A closed outcome enum produces low-cardinality events and rejects invalid representations.",
  "codeExamples": [
    {
      "title": "Map TLS outcomes to bounded telemetry",
      "language": "cpp",
      "blurb": "A closed outcome enum produces low-cardinality events and rejects invalid representations.",
      "code": "#include <optional>\n#include <string_view>\n\nenum class TlsOutcome { connected, certificate_rejected, hostname_rejected, timeout, transport_error };\n\nstd::optional<std::string_view> event_name(TlsOutcome outcome) noexcept {\n    switch (outcome) {\n        case TlsOutcome::connected: return \"tls_connected\";\n        case TlsOutcome::certificate_rejected: return \"tls_certificate_rejected\";\n        case TlsOutcome::hostname_rejected: return \"tls_hostname_rejected\";\n        case TlsOutcome::timeout: return \"tls_timeout\";\n        case TlsOutcome::transport_error: return \"tls_transport_error\";\n    }\n    return std::nullopt;\n}\n\nint main() {\n    if (event_name(TlsOutcome::connected) != \"tls_connected\") return 1;\n    return event_name(static_cast<TlsOutcome>(99)) ? 2 : 0;\n}\n"
    }
  ]
};
