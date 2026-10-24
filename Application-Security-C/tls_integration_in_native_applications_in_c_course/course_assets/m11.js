window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-d2f4afb312",
  "questions": {
    "q01": {
      "options": {
        "A": "Correct TLS integration protects transport confidentiality and integrity and validates the peer identity required by the configured connection policy.",
        "B": "Authenticated transport identity does not authorize every application operation the peer might request.",
        "C": "Decrypted application fields still need framing, validation, state checks, and authorization.",
        "D": "TLS cannot prevent the application from logging or otherwise disclosing plaintext after decryption."
      }
    },
    "q02": {
      "options": {
        "A": "TLS requires protocol state, credential and trust configuration, and error handling rather than a single generic local-socket switch.",
        "B": "Maintained TLS libraries commonly integrate with socket transports; the work is handling their contracts correctly.",
        "C": "Connection lifecycle and application authorization remain responsibilities after encrypted transport is added.",
        "D": "A secure integration coordinates peer trust, protocol configuration, I/O state, failure handling, cleanup, and application policy."
      }
    },
    "q03": {
      "options": {
        "A": "Reviewed maintained implementations provide protocol and validation support that should be configured and updated rather than replaced with improvised cryptography.",
        "B": "Defaults and application requirements can differ, so library maintenance does not eliminate configuration review.",
        "C": "A valid chain can belong to another server; matching the intended server identity remains necessary.",
        "D": "TLS identity verification does not automatically assign application roles or authorize requested commands."
      }
    },
    "q04": {
      "options": {
        "A": "Hostname verification checks server identity, not whether the server implements or authorizes particular application commands.",
        "B": "Identity matching complements trust-chain validation rather than replacing it.",
        "C": "The client must verify that the presented certificate is valid for the intended server, preventing trust in an unrelated certified endpoint.",
        "D": "Hostname verification is a client-side identity check and does not serve as storage protection for the server's private key."
      }
    },
    "q05": {
      "options": {
        "A": "Handshake error records are diagnostics, whereas the trust store supplies certificate-validation authority.",
        "B": "Approved trust anchors define which certificate chains the application can accept under its trust policy.",
        "C": "Decrypted messages belong to application processing buffers and are not the purpose of a trust store.",
        "D": "Application command permissions are authorization policy, distinct from certificate-chain trust anchors."
      }
    },
    "q06": {
      "options": {
        "A": "A failed validation does not establish that application data was safely delivered or that continued exchange is trustworthy.",
        "B": "Certificate validation determines peer trust and is not merely a diagnostic formatting choice.",
        "C": "Accepting the connection after failed validation bypasses the identity assurance the TLS configuration was supposed to enforce.",
        "D": "Ignoring a validation error does not guarantee that another layer will later establish the missing peer trust."
      }
    },
    "q07": {
      "options": {
        "A": "Certificates are normally presented publicly, while the corresponding private key must remain protected and is not sent to clients.",
        "B": "A window title does not provide the cryptographic signing authority associated with a TLS private key.",
        "C": "Deployment records can matter operationally, but they do not replace the private credential proving the server's TLS identity.",
        "D": "The corresponding private key supplies sensitive cryptographic authority, so access, storage, use, and lifecycle controls are essential."
      }
    },
    "q08": {
      "options": {
        "A": "TLS record processing does not guarantee one complete application message per read.",
        "B": "TLS write APIs can require retry and partial-progress handling according to the library's contract.",
        "C": "TLS has its own I/O and protocol states, so callers must handle progress, retries, deadlines, and errors deliberately.",
        "D": "The application still needs buffering and message framing above the protected byte transport."
      }
    },
    "q09": {
      "options": {
        "A": "Appropriate error categories can support diagnosis without exposing keys or plaintext.",
        "B": "Secret and plaintext logging adds durable exposure outside the protected connection, while excessive peer content can also abuse diagnostics.",
        "C": "Expiration warnings can be useful, whereas decrypted payloads can contain sensitive data that should not be logged indiscriminately.",
        "D": "Configuration diagnosis should preserve useful context without recording complete credentials or secret material."
      }
    },
    "q10": {
      "options": {
        "A": "Handshake rejection tests do not validate the application's handling of plaintext received over accepted connections.",
        "B": "Finite tests cannot anticipate every future protocol issue or replace maintaining libraries and trust configuration.",
        "C": "Forcing acceptance of invalid credentials defeats the trust boundary rather than demonstrating safe availability.",
        "D": "Rejection tests establish that incorrect identities and invalid credential conditions fail without silently enabling untrusted communication."
      }
    },
    "q11": {
      "options": {
        "A": "Updates can change fixes, supported behavior, and trust handling, so TLS dependencies need continued review and maintenance.",
        "B": "Updated code still needs the application's intended certificate and identity verification policy configured correctly.",
        "C": "Released TLS dependencies can develop known vulnerabilities and still require updates after application publication.",
        "D": "TLS implementations and platform trust components directly influence protocol negotiation and authentication decisions."
      }
    },
    "q12": {
      "options": {
        "A": "One certificate setting cannot establish correct identity checks, I/O behavior, error handling, and lifecycle management.",
        "B": "TLS remains effective through correct integration and ongoing validation, configuration, testing, maintenance, and operational monitoring.",
        "C": "Encryption and peer identity do not establish that application data is valid or that each requested action is permitted.",
        "D": "Custom protocol cryptography adds substantial implementation risk compared with using and maintaining a suitable reviewed TLS library."
      }
    }
  }
};
