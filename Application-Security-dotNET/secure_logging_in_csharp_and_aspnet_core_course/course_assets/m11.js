window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-18a0adb4f7",
  "questions": {
    "q1": {
      "options": {
        "A": "Collect only useful approved context rather than every possible value or object.",
        "B": "Logs support response and troubleshooting while also creating potential sensitive-data exposure paths.",
        "C": "Operational records are commonly retained, indexed, copied, and shared with other systems.",
        "D": "Logging affects observability, privacy, and incident investigation rather than only page layout."
      }
    },
    "q2": {
      "options": {
        "A": "Troubleshooting and accountability have different audiences and can require different retention policies.",
        "B": "Diagnostic detail should exclude credentials and unnecessary confidential information.",
        "C": "Diagnostics explain operation behavior, while audit trails record important attributable actions and decisions.",
        "D": "Audit records cover access and administrative actions rather than only compiler errors."
      }
    },
    "q3": {
      "options": {
        "A": "Stable templates and named fields make event content easier to query and review consistently.",
        "B": "A structured log API does not prevent application or dependency exceptions.",
        "C": "Structured logging supports fixed templates rather than requiring unreviewed string-built messages.",
        "D": "Log stores still need access control over accumulated sensitive operational context."
      }
    },
    "q4": {
      "options": {
        "A": "Verbose detail does not substitute for meaningful monitoring and response rules.",
        "B": "Production systems need suitable controlled diagnostics rather than an absence of all records.",
        "C": "Excessive detail can expose values, increase costs, and obscure meaningful operational signals.",
        "D": "Debug records can include information inappropriate for broad production audiences."
      }
    },
    "q5": {
      "options": {
        "A": "Presentation changes alone omit authentication, denied access, and sensitive operational activity.",
        "B": "These event categories reveal access decisions, privileged changes, and important application lifecycle behavior.",
        "C": "Raw request bodies can expose secrets and create excessive diagnostic volume.",
        "D": "Outcome information helps distinguish attempted actions from successful or denied operations."
      }
    },
    "q6": {
      "options": {
        "A": "Audit events can identify actions without embedding reusable credentials or full connection details.",
        "B": "A dashboard does not remove the access value of a logged token or key.",
        "C": "Access-bearing material can spread through retained diagnostic copies to unintended consumers.",
        "D": "These values can be highly sensitive in .NET services and need exclusion or redaction."
      }
    },
    "q7": {
      "options": {
        "A": "Log infrastructure can persist and export request values independently of application storage.",
        "B": "Requests can carry personal data and credentials beyond simple route identifiers.",
        "C": "Clients and upstream systems can influence headers, query strings, and body contents.",
        "D": "Review request capture because it may include secret or sensitive workflow data."
      }
    },
    "q8": {
      "options": {
        "A": "A correlation identifier links events and does not need to publish the request's contents.",
        "B": "Traceability does not decide whether the underlying operation is authorized.",
        "C": "Related-event identifiers still need an appropriate log retention policy.",
        "D": "Approved identifiers connect activity across boundaries without copying raw sensitive payloads into each event."
      }
    },
    "q9": {
      "options": {
        "A": "Public guidance and protected operator diagnostics serve different audiences and detail requirements.",
        "B": "A detailed internal error record is not safe for every remote caller.",
        "C": "Operators need enough protected context to investigate failures without unnecessary secret disclosure.",
        "D": "Stack traces and internal paths can expose implementation details inappropriate for user-facing errors."
      }
    },
    "q10": {
      "options": {
        "A": "An audit event usually needs approved references rather than every private record field.",
        "B": "Record who acted, what was targeted, when, under which context, and with what outcome.",
        "C": "Passwords and raw tokens add reusable secrets rather than necessary accountability context.",
        "D": "An unrelated message does not establish the action, actor, object, or result."
      }
    },
    "q11": {
      "options": {
        "A": "Useful operational context can be sensitive even when the underlying event was legitimate.",
        "B": "Log access and retention need explicit governance over aggregated operational information.",
        "C": "Recorded identities, errors, timing, and privileged actions can reveal sensitive system behavior.",
        "D": "Logs should have a deliberate audience and are not universally public assets."
      }
    },
    "q12": {
      "options": {
        "A": "Incident feedback helps tune alerts and should inform continued monitoring improvement.",
        "B": "Removing context makes alerts harder to investigate and assign appropriately.",
        "C": "Treating every isolated event as critical creates noise and unnecessary escalation.",
        "D": "Meaningful patterns with tuned thresholds, severity, routing, and ownership improve actionable alerting."
      }
    }
  }
};
