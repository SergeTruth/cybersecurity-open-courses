window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-d7443abab3",
  "questions": {
    "q01": {
      "options": {
        "A": "HTTP helpers do not define framing for arbitrary socket protocols.",
        "B": "Encryption alone omits peer permissions, parsing, resources, and lifecycle controls.",
        "C": "Local services still need message validation and action authorization.",
        "D": "Secure sockets require explicit trust, message, endpoint, and resource controls."
      }
    },
    "q02": {
      "options": {
        "A": "Connections alone do not authenticate peers or authorize protocol messages.",
        "B": "Operating systems deliver bytes without validating their application meaning.",
        "C": "Sockets connect separate trust domains and expose shared system resources.",
        "D": "Local and private peers may still be compromised or unauthorized."
      }
    },
    "q03": {
      "options": {
        "A": "TCP preserves byte order without preserving application message boundaries.",
        "B": "TCP does not guarantee one receive for each send operation.",
        "C": "TCP delivers ordered bytes; applications must frame messages themselves.",
        "D": "Connecting does not reveal the future application response length automatically."
      }
    },
    "q04": {
      "options": {
        "A": "Framing tells receivers where messages begin, end, and require parsing.",
        "B": "Transport encryption does not inherently define application message boundaries.",
        "C": "Timeouts are unreliable as universal application message boundary markers.",
        "D": "sendall does not guarantee one corresponding receive returns the whole message."
      }
    },
    "q05": {
      "options": {
        "A": "Kernel networking does not validate arbitrary application protocol messages.",
        "B": "Private addresses do not grant permission for every application command.",
        "C": "Untrusted peers can send hostile data and unauthorized protocol operations.",
        "D": "TLS authentication does not validate application message contents or permissions."
      }
    },
    "q06": {
      "options": {
        "A": "DNS resolution alone does not enforce approved endpoint access policies.",
        "B": "Destination controls prevent requests reaching unintended sensitive network services.",
        "C": "Approved ports alone do not constrain unsafe host or address choices.",
        "D": "Public certificates do not authorize endpoints for this application's tasks."
      }
    },
    "q07": {
      "options": {
        "A": "Backlogs do not make publicly bound services equivalent to local-only services.",
        "B": "Wildcard binds may expose more interfaces than the application intends.",
        "C": "Bind addresses define which network interfaces accept incoming service connections.",
        "D": "Network exposure and authentication are separate security relevant decisions."
      }
    },
    "q08": {
      "options": {
        "A": "TCP handshake completion does not prove permission for sensitive actions.",
        "B": "Authorize each requested action and resource for the connected peer.",
        "C": "Certificate identity must be mapped to intended application permissions.",
        "D": "Valid syntax does not authorize every connected peer's command request."
      }
    },
    "q09": {
      "options": {
        "A": "TCP flow control cannot bound application parser memory or processing costs.",
        "B": "Parsed structures may consume much more memory than receive buffers.",
        "C": "Datagram limits do not establish appropriate application resource budgets.",
        "D": "Size limits reduce memory exhaustion and oversized input processing abuse."
      }
    },
    "q10": {
      "options": {
        "A": "Ignoring invalid bytes and fields can conceal malformed protocol messages.",
        "B": "Lengths, counts, ranges, and protocol states also require validation.",
        "C": "Authentication does not make broken framing safe to accept.",
        "D": "Validate message structure and allowed semantics before sensitive processing."
      }
    },
    "q11": {
      "options": {
        "A": "Application authorization does not replace transport confidentiality or peer authentication.",
        "B": "Correct TLS protects traffic confidentiality, integrity, and authenticated endpoint identity.",
        "C": "TLS does not validate application schemas, size, or business meaning.",
        "D": "TLS transport protection does not automatically encrypt data at rest."
      }
    },
    "q12": {
      "options": {
        "A": "Trusted issuance alone does not establish the intended hostname match.",
        "B": "Hostname checks match the certificate to the intended service identity.",
        "C": "DNS resolution alone does not provide TLS server identity verification.",
        "D": "Matching hostnames do not grant application action or resource permissions."
      }
    },
    "q13": {
      "options": {
        "A": "Transport identity still needs mapping to allowed actions and resources.",
        "B": "Encryption does not automatically authorize each application protocol command.",
        "C": "Trusted certificates do not imply access to every tenant object.",
        "D": "Mutual TLS identifies peers but does not define business permissions."
      }
    },
    "q14": {
      "options": {
        "A": "Authenticated peers can still consume resources through stalled reads or writes.",
        "B": "Individual operation timeouts do not necessarily bound complete session lifetime.",
        "C": "Bound stalled operations and inactivity to limit retained server resources.",
        "D": "Slow peers need controlled deadlines rather than indefinite worker retention."
      }
    },
    "q15": {
      "options": {
        "A": "Avoid credentials and unnecessary raw frame contents in diagnostic logs.",
        "B": "Encrypted transport does not make decrypted payload logging harmless.",
        "C": "Rejected frames may contain tokens or sensitive private information.",
        "D": "Authentication credentials must not become metric dimensions or ordinary logs."
      }
    },
    "q16": {
      "options": {
        "A": "TLS alone leaves framing, resource, and authorization risks unresolved.",
        "B": "Private network placement does not guarantee trusted peers or safe parsing.",
        "C": "Kernel defaults cannot define the application's protocol and resource policy.",
        "D": "Combine explicit protocol boundaries, authorization, transport protection, limits, and monitoring."
      }
    }
  }
};
