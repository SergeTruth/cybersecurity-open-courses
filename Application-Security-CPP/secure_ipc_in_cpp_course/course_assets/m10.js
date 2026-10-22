window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-3f6c37b77d",
  "questions": {
    "q01": {
      "options": {
        "A": "Local IPC can cross identity, privilege, and trust boundaries between separate processes.",
        "B": "Sharing a host does not imply that two processes deserve equal trust.",
        "C": "Serialization transfers data and does not automatically transfer the sender's authorization.",
        "D": "Endpoint permissions supplement rather than replace validation of each received message."
      }
    },
    "q02": {
      "options": {
        "A": "A small interface is useful but does not inherently provide strong authorization guarantees.",
        "B": "Reliable delivery does not establish field validity or define application-level failure outcomes.",
        "C": "Choose the mechanism against explicit identity, access, validation, resource, and lifecycle requirements.",
        "D": "Identity and authority requirements must inform mechanism selection alongside performance evidence."
      }
    },
    "q03": {
      "options": {
        "A": "The endpoint's path identifies a rendezvous location rather than proving the caller's identity.",
        "B": "Connection to an endpoint does not entitle the caller to all server authority.",
        "C": "An authenticated peer can still send malformed or unauthorized message fields.",
        "D": "The server needs trustworthy caller identity to apply operation-specific authorization policy."
      }
    },
    "q04": {
      "options": {
        "A": "Different callers can need different commands even when endpoint membership is permitted.",
        "B": "Expose the minimum operations and authority required by each caller's task.",
        "C": "A broad capability may grant more authority than a caller's particular operation needs.",
        "D": "Blocking remote connections does not limit excessive authority available to local clients."
      }
    },
    "q05": {
      "options": {
        "A": "Documentation does not prevent a sender from transmitting malformed fields at runtime.",
        "B": "Connection permissions do not validate a message's type, format version, or field values.",
        "C": "An explicit contract lets the receiver reject unsupported or invalid messages before acting.",
        "D": "Unknown fields need an explicit policy and must not silently expand privileged behavior."
      }
    },
    "q06": {
      "options": {
        "A": "Check declared lengths against remaining bytes and budgets before reading or allocating.",
        "B": "A local sender can still request excessive allocation or provide inconsistent lengths.",
        "C": "Received bytes do not automatically satisfy native structure layout, alignment, or lifetime requirements.",
        "D": "Outer framing limits must be checked before deeper parsing consumes unbounded data."
      }
    },
    "q07": {
      "options": {
        "A": "A transferred handle can grant actual access rather than merely descriptive metadata.",
        "B": "Received resource lifetime needs explicit ownership and can extend beyond the message buffer.",
        "C": "The receiver must follow the transfer contract and release resources it owns.",
        "D": "Handles can convey powerful access rights that require authorization and carefully scoped ownership."
      }
    },
    "q08": {
      "options": {
        "A": "Disconnects must leave defined state rather than an ambiguous partial privileged operation.",
        "B": "Failure handling must preserve valid state, bounded resources, and matching cleanup obligations.",
        "C": "Authenticated peers can still exhaust unbounded queues or send requests too quickly.",
        "D": "Logging malformed input does not restore any invariant already affected during processing."
      }
    },
    "q09": {
      "options": {
        "A": "A shared repository does not cover hostile messages, unauthorized peers, or process lifecycle failures.",
        "B": "In-process API tests do not fully exercise operating-system identity and resource-transfer boundaries.",
        "C": "Throughput tests do not replace invalid-input and sequence checks against the protocol contract.",
        "D": "Exercise rejected requests, budgets, ordering, timeouts, and shutdown across the actual boundary."
      }
    },
    "q10": {
      "options": {
        "A": "Review connection identity, authority, validation, limits, resource ownership, and failure semantics together.",
        "B": "Process-group membership does not automatically authorize every operation the server exposes.",
        "C": "Validate and authorize before privileged side effects rather than relying on rollback afterward.",
        "D": "Both sides using RAII does not establish which side owns each transferred handle."
      }
    }
  }
};
