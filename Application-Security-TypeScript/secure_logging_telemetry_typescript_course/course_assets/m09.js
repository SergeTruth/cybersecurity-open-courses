window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-e0913432ea",
  "questions": {
    "q1": {
      "options": {
        "A": "Logging a whole request does not prevent correlation IDs; it creates unnecessary collection of other request data.",
        "B": "Full request serialization can include credentials, personal data, framework state, and future properties outside the approved telemetry contract.",
        "C": "Some objects can be serialized, but successful serialization does not make their contents appropriate to collect.",
        "D": "Whole-request logging does not automatically remove stack traces or protect other sensitive diagnostic information."
      }
    },
    "q2": {
      "options": {
        "A": "JSON representation preserves sensitive values and does not make credentials or personal data non-sensitive.",
        "B": "Structured events still need access restrictions, appropriate retention, and controls on downstream distribution.",
        "C": "External callers should not be allowed to arbitrarily define trusted event names or severity classifications.",
        "D": "Explicit stable fields make collected information reviewable and support consistent searches, alerts, and investigations."
      }
    },
    "q3": {
      "options": {
        "A": "Bearer values can grant access to anyone who obtains them, while raw token contents usually add little diagnostic value.",
        "B": "Tokens do not inherently prevent timestamps from being indexed; credential disclosure is the relevant security concern.",
        "C": "Debug severity does not make reusable credentials safe to collect or adequately restrict every reader.",
        "D": "Tokens can be strings in TypeScript, which makes accidental collection possible rather than impossible."
      }
    },
    "q4": {
      "options": {
        "A": "Remaining identifiers may still be linkable or sensitive; minimization does not automatically anonymize them.",
        "B": "Structured loggers can support redaction, but those rules still need coverage and maintenance.",
        "C": "Excluding unnecessary data before serialization prevents collection that incomplete redaction rules might fail to remove.",
        "D": "Minimization favors collecting less data rather than retaining every body under a shorter schedule."
      }
    },
    "q5": {
      "options": {
        "A": "Structured fields do not guarantee that every dashboard, text export, or viewer handles untrusted content safely.",
        "B": "Field boundaries improve separation, but lengths and downstream HTML, CSV, or other output encoding still need controls.",
        "C": "Allowing client-selected severities can distort trusted event classification and is not required for secure structured logs.",
        "D": "Exports and viewers introduce additional output contexts that still need reviewed handling of untrusted values."
      }
    },
    "q6": {
      "options": {
        "A": "A correlation identifier is not proof of identity, authentication, or permission merely because it arrives in a header.",
        "B": "External request IDs can repeat or contain oversized values and should not be assumed globally unique or safe unchanged.",
        "C": "Copying all headers expands collection and can include credentials unrelated to the actual correlation need.",
        "D": "Bound and validate inbound IDs, then apply the tracing design's normalization or server-generated primary identifier policy."
      }
    },
    "q7": {
      "options": {
        "A": "Successful high-impact changes can be important evidence when valid privileged accounts are compromised or later investigated.",
        "B": "Severity should reflect the event and operational policy rather than classify every success as the highest urgency.",
        "C": "An action's success does not prove that an external correlation identifier is authentic or globally trustworthy.",
        "D": "Success and denial events reveal different security behavior, so one does not eliminate the value of the other."
      }
    },
    "q8": {
      "options": {
        "A": "Public stack traces can expose implementation details, paths, internal configuration, and sensitive contextual values.",
        "B": "Controlled internal stacks can be valuable for unexpected defects, so a universal ban may discard useful diagnostic evidence.",
        "C": "Useful internal defect diagnostics can retain controlled stacks while routine client responses remain minimal and non-sensitive.",
        "D": "Expected validation rejections generally do not need high-severity stack output that increases noise and potential disclosure."
      }
    },
    "q9": {
      "options": {
        "A": "Central systems can implement controls and backups, but centralization alone does not establish their strength or completeness.",
        "B": "Strong audit evidence requires explicit integrity, delivery, access, retention, and tamper-resistance controls beyond central collection.",
        "C": "Mutable local files alone do not provide a universal requirement or sufficient integrity guarantee for audit records.",
        "D": "Central logging can retain structured events; the question is their integrity and delivery guarantees rather than data format."
      }
    },
    "q10": {
      "options": {
        "A": "An invocation count does not show which fields or secret values actually entered serialized telemetry.",
        "B": "Correct HTTP responses do not establish that the logger avoided collecting a newly introduced secret-bearing property.",
        "C": "A compiling assertion performs no runtime inspection of the event sent to serializers and exporters.",
        "D": "Capturing the actual serialized event verifies required evidence while detecting collection of forbidden properties and their secret values."
      }
    }
  }
};
