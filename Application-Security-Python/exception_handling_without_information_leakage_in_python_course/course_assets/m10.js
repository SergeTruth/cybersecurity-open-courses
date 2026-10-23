window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-205a166300",
  "questions": {
    "q01": {
      "options": {
        "A": "Exceptions do not inherently grant privileges; unsafe handlers can.",
        "B": "Framework configuration controls traceback exposure independently of logging settings.",
        "C": "Internal logs also leak secrets when access or retention fails.",
        "D": "Responses and diagnostics can expose secrets and implementation details."
      }
    },
    "q02": {
      "options": {
        "A": "Raw exceptions can expose details unnecessary for user recovery.",
        "B": "Give actionable recovery guidance while keeping implementation details private.",
        "C": "Distinct dependency details can unnecessarily disclose application internals publicly.",
        "D": "Raw exceptions often contain sensitive details unrelated to recovery."
      }
    },
    "q03": {
      "options": {
        "A": "Tracebacks may include sensitive paths, values, and dependency details.",
        "B": "Production does not automatically sanitize every traceback or value.",
        "C": "Tracebacks expose application structure and potentially sensitive diagnostic values.",
        "D": "Sanitization requires deliberate configuration; production alone provides no guarantee."
      }
    },
    "q04": {
      "options": {
        "A": "Correlation identifiers connect public errors to protected diagnostic records.",
        "B": "An identifier references diagnostics without embedding encrypted traceback contents.",
        "C": "Operators still need protected records to investigate the identifier.",
        "D": "Correlation identifiers require corresponding protected diagnostic records for investigation."
      }
    },
    "q05": {
      "options": {
        "A": "Runtime failures can reveal sensitive implementation details and data.",
        "B": "Stable messages and identifiers support recovery without exposing internals.",
        "C": "These details expose implementation structure and potentially usable secrets.",
        "D": "Authentication does not justify disclosing arbitrary server diagnostic details."
      }
    },
    "q06": {
      "options": {
        "A": "Confirming account names helps attackers enumerate valid authentication targets.",
        "B": "Monitoring can classify failures internally without exposing distinct messages.",
        "C": "Distinct messages can reveal account or factor existence externally.",
        "D": "Enumeration remains possible when failures disclose account existence separately."
      }
    },
    "q07": {
      "options": {
        "A": "Exclude secrets and unnecessary personal data from diagnostic records.",
        "B": "Controlled identifiers and exception categories can support safe diagnostics.",
        "C": "Tokens and reset links remain sensitive after failed requests.",
        "D": "Partial tokens may still disclose sensitive information or enable correlation."
      }
    },
    "q08": {
      "options": {
        "A": "Exceptions may incorporate attacker input and sensitive application values.",
        "B": "Library exceptions can also include paths, queries, and credentials.",
        "C": "Trusted libraries can propagate sensitive input and configuration details.",
        "D": "Review exception strings before exposing or retaining diagnostic content."
      }
    },
    "q09": {
      "options": {
        "A": "Lowercasing does not remove sensitive information from diagnostic values.",
        "B": "Hashing everything does not reliably protect low entropy secrets.",
        "C": "Remove or mask sensitive values before recording diagnostic information.",
        "D": "Renaming fields leaves their sensitive values exposed in logs."
      }
    },
    "q10": {
      "options": {
        "A": "Reporting success can conceal failure and bypass required checks.",
        "B": "Swallowed failures can bypass cleanup and security decision handling.",
        "C": "Hiding failures does not establish safe behavior during errors.",
        "D": "Successful status codes do not make swallowed failures safe."
      }
    },
    "q11": {
      "options": {
        "A": "Deny privileged outcomes when required security checks cannot complete.",
        "B": "Cached decisions can be stale or inappropriate for this request.",
        "C": "Unknown authorization results must not silently become access approvals.",
        "D": "Reusing earlier approval can grant access after permissions change."
      }
    },
    "q12": {
      "options": {
        "A": "External origin does not make dependency error content safe.",
        "B": "Relaying bodies can expose secrets and internal dependency details.",
        "C": "Ownership does not prevent sensitive content appearing in dependency errors.",
        "D": "Translate dependency failures into safe local messages and diagnostics."
      }
    },
    "q13": {
      "options": {
        "A": "Success status and debug content misrepresent failures and expose details.",
        "B": "Stable responses and identifiers support recovery and protected investigation.",
        "C": "Dependency bodies and messages require local review and translation.",
        "D": "Raw debug fields still expose secrets despite successful status."
      }
    },
    "q14": {
      "options": {
        "A": "Deployment settings and response paths can expose otherwise hidden diagnostics.",
        "B": "Test configuration does not automatically prove production configuration safety.",
        "C": "Integration tests can inspect framework responses and proxy headers.",
        "D": "Production behavior requires checks using representative deployment settings too."
      }
    },
    "q15": {
      "options": {
        "A": "Deletion cannot invalidate credentials copied from the exposed record.",
        "B": "Renaming exception fields does not revoke the disclosed credential.",
        "C": "Copies may survive deletion; exposed credentials still require remediation.",
        "D": "Revoke exposed credentials and correct the path that leaked them."
      }
    },
    "q16": {
      "options": {
        "A": "Catching BaseException broadly can conceal termination and critical failures.",
        "B": "Operators still need protected observability to investigate application failures.",
        "C": "Separate safe public messages from controlled and redacted diagnostics.",
        "D": "Empty messages alone do not ensure safe failure behavior."
      }
    }
  }
};
