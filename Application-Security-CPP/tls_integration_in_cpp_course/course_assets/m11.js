window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-67f45a65f7",
  "questions": {
    "q1": {
      "options": {
        "A": "Encryption must be combined with intended-peer validation and safe lifecycle and failure behavior.",
        "B": "Negotiated encryption alone does not establish that the connected peer is the intended service.",
        "C": "Transport authentication does not replace application-level user identity and authorization decisions.",
        "D": "Library defaults do not independently define the application's expected service identity."
      }
    },
    "q2": {
      "options": {
        "A": "A small custom implementation can still omit subtle protocol and integration protections.",
        "B": "Private services also need reviewed transport security and intended-peer authentication.",
        "C": "Maintained reviewed facilities reduce the burden of implementing a complex security protocol correctly.",
        "D": "Restricting features does not remove the specialized maintenance demands of custom TLS."
      }
    },
    "q3": {
      "options": {
        "A": "Independent certificate rules can produce inconsistent or silently weakened trust decisions.",
        "B": "Central configuration makes required trust settings, exceptions, and failure handling reviewable.",
        "C": "Centralizing policy does not remove the need for security updates to dependencies.",
        "D": "Scattered settings can create bypasses and make effective transport behavior harder to verify."
      }
    },
    "q4": {
      "options": {
        "A": "Invalid deployment certificates should be corrected rather than bypassing verification.",
        "B": "Private networks still need authentication of the peer expected by the application.",
        "C": "Untrusted protocol content must not be used to postpone required certificate authentication.",
        "D": "Keep required production checks active and prevent test-only exceptions entering deployed paths."
      }
    },
    "q5": {
      "options": {
        "A": "Hostname validation authenticates identity rather than improving compression or encryption efficiency.",
        "B": "Hostname and certificate-chain checks address complementary requirements and neither replaces the other.",
        "C": "A trusted certificate chain may belong to a different service than the intended endpoint.",
        "D": "Verify that the certificate covers the expected service name for the actual connection."
      }
    },
    "q6": {
      "options": {
        "A": "SNI carries a requested service name rather than storing private key material.",
        "B": "SNI helps a server choose configuration and a certificate for the requested name.",
        "C": "SNI is not an application diagnostic channel or permission to send plaintext payloads.",
        "D": "SNI selection does not perform the client's certificate or hostname verification."
      }
    },
    "q7": {
      "options": {
        "A": "Certificate holders may need different permissions even when every certificate authenticates successfully.",
        "B": "Mutual authentication still requires issuance, expiry, rotation, and appropriate revocation planning.",
        "C": "Map authenticated client identities to authorized actions and manage the full certificate lifecycle.",
        "D": "Certificate authentication supplies identity evidence rather than every application's authorization policy."
      }
    },
    "q8": {
      "options": {
        "A": "Limit key access and copies, exclude secret diagnostics, and plan controlled rotation.",
        "B": "Startup diagnostics can expose private keys and should not print private material.",
        "C": "Shell history can retain passphrases and is not an appropriate production secret store.",
        "D": "File permissions limit access but do not replace certificate and key lifecycle management."
      }
    },
    "q9": {
      "options": {
        "A": "TLS operations require handling partial progress, retry conditions, closure, and fatal failures.",
        "B": "TLS reads do not necessarily align with the application's logical message boundaries.",
        "C": "Downgrading to plaintext after TLS failure can violate the required transport security policy.",
        "D": "Handshake success does not guarantee every later read or write completes in one operation."
      }
    },
    "q10": {
      "options": {
        "A": "Certificates, configurations, and dependencies change, so verification must continue beyond initial release.",
        "B": "Monitoring can detect problems but cannot substitute for authenticating the intended peer.",
        "C": "Protocol tests complement rather than replace tracking dependency and configuration changes.",
        "D": "Tests, updates, monitoring, and review keep trust behavior and maintenance risks visible."
      }
    }
  }
};
