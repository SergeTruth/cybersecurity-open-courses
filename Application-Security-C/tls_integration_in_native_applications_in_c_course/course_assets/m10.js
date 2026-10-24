window.COURSE_MODULE = {
  "title": "Course Summary: TLS as a Maintained Security Control",
  "graphicAlt": "Maintained TLS combines reviewed libraries, peer verification, lifecycle management, application checks and testing.",
  "narration": "TLS integration in native C applications is a maintained security control. It starts with a reviewed library or platform capability, an intentional configuration baseline, and a clear understanding of how TLS state fits between sockets and the application protocol. It does not start with custom cryptography or scattered settings that no one owns.\n\nPeer identity must be verified before the application trusts the channel. Clients need the right trust store and expected server identity. Servers need protected private keys and certificates that clients can validate. When validation fails, application logic should stop trusting the connection and should report the failure safely.\n\nLifecycle details matter. Handshakes, partial reads and writes, retry behavior, nonblocking integration, shutdown semantics, buffer ownership, and cleanup paths should all follow the TLS library contract. Application-level parsing, authorization, resource limits, and logging remain necessary after the channel is protected.\n\nFinally, keep the control alive. Ask which TLS library is used, how it is updated, what trust store is configured, how private keys are protected, which settings are approved, what negative tests exist, what logs reveal, and how certificate rotation is managed. TLS stays useful when it is tested, monitored, reviewed, and updated as the application changes.",
  "narrationPoints": [
    "TLS integration in native C applications is a maintained security control.",
    "When validation fails, application logic should stop trusting the connection and should report the failure safely.",
    "Application-level parsing, authorization, resource limits, and logging remain necessary after the channel is protected.",
    "Ask which TLS library is used, how it is updated, what trust store is configured, how private keys are protected, which settings are approved, what negative tests exist, what logs reveal, and how certificate rotation is managed.",
    "TLS stays useful when it is tested, monitored, reviewed, and updated as the application changes."
  ]
};
