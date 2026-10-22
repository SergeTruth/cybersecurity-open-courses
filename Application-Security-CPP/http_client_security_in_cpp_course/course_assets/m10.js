window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-3a7d8f006d",
  "questions": {
    "q1": {
      "options": {
        "A": "Outbound clients cross trust boundaries with sensitive requests and externally influenced responses.",
        "B": "Initiating a connection does not make its destination or returned content trustworthy.",
        "C": "Read requests can hang, consume resources, or reach unintended sensitive endpoints.",
        "D": "TLS protects transport but does not validate application response syntax or semantics."
      }
    },
    "q2": {
      "options": {
        "A": "Independent call-site policies can silently omit required certificate, timeout, or redirect controls.",
        "B": "Defaults and versions must be reviewed to establish the actual required transport behavior.",
        "C": "Handwritten HTTP and TLS substantially increase implementation and maintenance obligations.",
        "D": "A reviewed adapter centralizes policy and verifies the settings used by the transport."
      }
    },
    "q3": {
      "options": {
        "A": "Certificate identity does not authorize every server-side process for every application operation.",
        "B": "Hostname verification checks that the authenticated certificate covers the intended destination name.",
        "C": "Transport encryption does not remove the need for application response validation.",
        "D": "Hostname checks authenticate each connection but do not define redirect policy."
      }
    },
    "q4": {
      "options": {
        "A": "Removing spaces does not safely encode URL components or validate allowed destinations.",
        "B": "Header construction must reject invalid characters rather than assume automatic newline removal.",
        "C": "Structured components allow context-appropriate encoding and explicit request policy enforcement.",
        "D": "Shell quoting applies to a different interpreter and is not HTTP request encoding."
      }
    },
    "q5": {
      "options": {
        "A": "Approved bounded status metadata is useful for diagnostics without exposing request secrets.",
        "B": "Sensitive values and unbounded peer-controlled data create disclosure and log-exhaustion risks.",
        "C": "Bounded timing and retry metadata can support operations without revealing credential values.",
        "D": "Method and destination metadata require policy review but are not universally secret."
      }
    },
    "q6": {
      "options": {
        "A": "Service clients also need redirect limits to prevent loops and resource exhaustion.",
        "B": "Every redirect can create a new connection requiring its own destination and certificate checks.",
        "C": "A redirect hop can cross trust boundaries, leak credentials, or target internal services.",
        "D": "A response status does not authorize every destination named in its Location field."
      }
    },
    "q7": {
      "options": {
        "A": "Successful HTTP status does not establish that the body satisfies an application contract.",
        "B": "Bodies may be binary, incomplete, oversized, or inconsistently described by headers.",
        "C": "An approved host can still return malformed or inappropriate application data.",
        "D": "Apply byte limits and validate media type, syntax, and schema before using response data."
      }
    },
    "q8": {
      "options": {
        "A": "Bound attempts and total elapsed time while considering repeated side effects and load.",
        "B": "Fresh unlimited per-attempt timeouts can exceed the caller's total operation budget.",
        "C": "Authentication and validation failures generally require correction rather than blind repeated attempts.",
        "D": "Some operations have side effects and cannot safely be retried without additional guarantees."
      }
    },
    "q9": {
      "options": {
        "A": "DNS and TLS errors mean the intended request did not complete successfully.",
        "B": "Typed failure categories help choose safe retries, diagnostics, and caller responses.",
        "C": "Raw exception content and credentials can expose secrets without improving safe error classification.",
        "D": "Separate failure categories so recovery and reporting match the actual failing boundary."
      }
    },
    "q10": {
      "options": {
        "A": "Response bodies may contain secrets or attacker-controlled volume and should not be logged indiscriminately.",
        "B": "Verify that the effective transport enforces the adapter's complete destination and resource policy.",
        "C": "Unreviewed bypasses defeat centralized controls and create inconsistent transport behavior.",
        "D": "Unbounded retries can exhaust resources and repeat operations without meeting caller deadlines."
      }
    }
  }
};
