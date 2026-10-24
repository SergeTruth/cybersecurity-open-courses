window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-cb8c8938fb",
  "questions": {
    "q1": {
      "options": {
        "A": "Uploads, credentials, headers, and remote mutations also create confidentiality and integrity risks.",
        "B": "A reachable service does not establish permission for the requested application operation.",
        "C": "An automated request can exercise credentials and change remote state, so its destination and effects require deliberate controls.",
        "D": "HTTPS protects transport and does not prevent an authenticated request from modifying remote data."
      }
    },
    "q2": {
      "options": {
        "A": "An encrypted connection to an arbitrary host may still send data outside the script's permitted scope.",
        "B": "TLS authenticates a configured peer relationship rather than deciding the application's destination allowlist.",
        "C": "Successful resolution identifies an address, not whether policy permits contacting it.",
        "D": "Destination checks constrain where sensitive headers, uploads, and fetched content can cross the automation boundary."
      }
    },
    "q3": {
      "options": {
        "A": "Encryption alone does not establish that the intended service controls the other end of the connection.",
        "B": "Automated clients also need to verify the intended server identity, not only browsers.",
        "C": "Disabling certificate verification removes the trust checks needed to reject an impersonated or otherwise untrusted endpoint.",
        "D": "A later file check cannot reverse disclosure of credentials already sent to an untrusted peer."
      }
    },
    "q4": {
      "options": {
        "A": "Arbitrary flags can change destinations, data handling, authentication, and output behavior beyond a validated URL.",
        "B": "Fixed option policy and arrays preserve argument boundaries while keeping each value's permitted meaning explicit.",
        "C": "Eval adds another shell interpretation step and can turn data into executable syntax.",
        "D": "A single option string can introduce splitting and quoting ambiguity absent from a structured argument array."
      }
    },
    "q5": {
      "options": {
        "A": "Process listings, job records, traces, and diagnostics can retain credentials embedded in arguments.",
        "B": "HTTPS protects traffic after request construction and does not encrypt local process arguments.",
        "C": "Argument visibility depends on platform and operational access and is not a universal confidentiality boundary.",
        "D": "CI output masking does not remove secrets from every process, job, or operating-system record."
      }
    },
    "q6": {
      "options": {
        "A": "Logging sensitive headers creates a retained credential copy instead of safely proving delivery.",
        "B": "Forwarding one credential to unrelated redirect destinations can expose authority outside the intended service.",
        "C": "Header formatting does not validate the value's sensitivity or authorize its destination.",
        "D": "Use controlled retrieval and request handling while keeping credential values out of diagnostics and retained logs."
      }
    },
    "q7": {
      "options": {
        "A": "Transport completion does not establish whether the API accepted or completed the requested mutation.",
        "B": "Remote mutations need explicit scope, authorization, status checks, and retry behavior because they can cause lasting effects.",
        "C": "Retrying a mutation can repeat side effects unless the API and request implement suitable idempotency.",
        "D": "An HTTP method describes request semantics rather than proving the caller's authority."
      }
    },
    "q8": {
      "options": {
        "A": "HTTP errors can affect reads and mutations as well as file downloads.",
        "B": "A successful curl transport can still receive an HTTP error response unless appropriate failure handling is configured.",
        "C": "A JSON document can describe failure and does not make the protocol status irrelevant.",
        "D": "Scripts must distinguish successful transport from an acceptable HTTP and application outcome before continuing."
      }
    },
    "q9": {
      "options": {
        "A": "Connect and overall deadlines bound how long unattended automation can remain stuck on an unresponsive request.",
        "B": "Keepalive does not establish a finite completion deadline for every application request.",
        "C": "A scheduler does not universally terminate or clean up every stalled request and descendant.",
        "D": "Retry policies also need deadlines and limits rather than creating an unbounded request lifecycle."
      }
    },
    "q10": {
      "options": {
        "A": "A new host is a new credential and data boundary requiring deliberate forwarding policy.",
        "B": "Following redirects can move data and requests outside the originally validated destination.",
        "C": "A trusted final artifact does not undo earlier disclosure along the request path.",
        "D": "TLS checks server identity under its trust configuration, not the script's complete destination policy."
      }
    },
    "q11": {
      "options": {
        "A": "Random names do not establish trusted directory ownership, safe creation, or appropriate access controls.",
        "B": "A checksum from the same untrusted requester does not independently establish who produced the expected bytes.",
        "C": "Private storage and trusted authenticity evidence reduce exposure and prevent unverified downloads from becoming trusted inputs.",
        "D": "A supplied content type is metadata and does not prove the source or integrity of the bytes."
      }
    },
    "q12": {
      "options": {
        "A": "Secure request automation constrains destinations and effects, protects credentials, checks outcomes, and records safe operational evidence.",
        "B": "Flexible destinations can expose data and credentials beyond the task's intended trust boundary.",
        "C": "Observability should record safe metadata and outcomes rather than retain complete secret-bearing requests.",
        "D": "Bypassing identity checks to improve availability can connect the automation to an untrusted service."
      }
    }
  }
};
