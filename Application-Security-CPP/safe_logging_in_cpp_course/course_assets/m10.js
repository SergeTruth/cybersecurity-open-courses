window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-713518fb15",
  "questions": {
    "q01": {
      "options": {
        "A": "Complete state dumps can expose secrets and create excessive diagnostic volume.",
        "B": "Operational logs need controlled internal context beyond messages intended for end users.",
        "C": "Useful diagnostics require deliberate limits on sensitive data, access, and operational cost.",
        "D": "Sensitive workflows still need appropriately scoped logging rather than losing all operational visibility."
      }
    },
    "q02": {
      "options": {
        "A": "Bounded independent request identifiers can support correlation without recording authentication secrets.",
        "B": "API tokens and session identifiers can grant access and must be excluded from logs.",
        "C": "Documented bounded event names provide useful classification without revealing credential values.",
        "D": "Coarse outcomes can be useful metadata when they avoid unnecessary sensitive context."
      }
    },
    "q03": {
      "options": {
        "A": "A complete request can include secrets that are unnecessary for event correlation.",
        "B": "Internal object graphs can expose excessive state without identifying the relevant request safely.",
        "C": "Source location alone does not connect an event to the operation and request involved.",
        "D": "Approved operation context and correlation identifiers connect related events without full state capture."
      }
    },
    "q04": {
      "options": {
        "A": "Consistent schemas make bounded event fields easier to query, inspect, and review.",
        "B": "Structured logging can still expose secrets if sensitive values are placed in fields.",
        "C": "Log schemas do not replace authorization over the stored diagnostic records.",
        "D": "Field names alone do not justify retaining every emitted value indefinitely."
      }
    },
    "q05": {
      "options": {
        "A": "Untrusted text must remain data rather than becoming an executable formatting template.",
        "B": "Serializing entire objects can expose secrets before a backend has filtered them.",
        "C": "Fixed templates and separately encoded data preserve record structure and reduce injection risk.",
        "D": "Length limits do not prevent raw control characters from forging record boundaries."
      }
    },
    "q06": {
      "options": {
        "A": "Encoding prevents untrusted control characters from confusing record boundaries or displayed meaning.",
        "B": "Encoding protects the log representation without establishing trust in the original input.",
        "C": "Escaped output still needs length and rate limits to control resource consumption.",
        "D": "Raw control characters can make record boundaries ambiguous instead of reliably inferable."
      }
    },
    "q07": {
      "options": {
        "A": "Internal exception text may expose implementation details inappropriate for remote users.",
        "B": "A generic public message does not justify recording raw secrets in internal logs.",
        "C": "Controlled internal diagnostics can retain useful evidence without indiscriminate sensitive disclosure.",
        "D": "Separate public errors from reviewed internal diagnostics with suitable detail and access controls."
      }
    },
    "q08": {
      "options": {
        "A": "Storage quotas do not eliminate formatting, transport, or synchronous logging latency.",
        "B": "High log volume consumes resources and can bury the signals operators need.",
        "C": "Excessive noise can make rare important events harder to locate and investigate.",
        "D": "Synchronous emission can block requests and reduce availability when logging slows down."
      }
    },
    "q09": {
      "options": {
        "A": "Aggregated context can remain sensitive after the incident or request has ended.",
        "B": "Derived operational records may need stricter access than ordinary application data.",
        "C": "Protect accumulated context through defined access, retention, and eventual deletion policies.",
        "D": "Retention should match event purpose and sensitivity rather than one unlimited policy."
      }
    },
    "q10": {
      "options": {
        "A": "Reproducibility does not justify capturing unnecessary full requests or embedded secrets.",
        "B": "Evaluate each event's diagnostic value against disclosure and operational cost.",
        "C": "Indefinite retention increases exposure and should not replace a defined retention policy.",
        "D": "Additional internal state can enlarge risk and does not replace a documented event schema."
      }
    }
  }
};
