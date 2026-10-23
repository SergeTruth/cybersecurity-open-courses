window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-cfe71fed9d",
  "questions": {
    "q01": {
      "options": {
        "A": "Complete bodies can expose credentials, private data, and unnecessary contents.",
        "B": "Removing all failures undermines security monitoring and operational investigation.",
        "C": "Collect useful events while minimizing exposure of sensitive diagnostic data.",
        "D": "Available fields should be selected deliberately rather than collected indiscriminately."
      }
    },
    "q02": {
      "options": {
        "A": "Log systems do not automatically prevent applications recording sensitive fields.",
        "B": "Logs can reveal secrets, private data, and sensitive operational patterns.",
        "C": "Log access may extend beyond administrators through exports and integrations.",
        "D": "Encryption at rest does not remove authorized access disclosure risks."
      }
    },
    "q03": {
      "options": {
        "A": "Random request identifiers can provide correlation without revealing credentials.",
        "B": "Controlled event outcomes support investigation without disclosing authentication secrets.",
        "C": "These values can expose credentials or grant unintended account access.",
        "D": "Base64 is reversible encoding and does not protect secret tokens."
      }
    },
    "q04": {
      "options": {
        "A": "Retention should match legitimate needs rather than arbitrary universal deletion.",
        "B": "Debug levels do not make sensitive production payloads safe.",
        "C": "Collect only fields justified by a legitimate operational purpose.",
        "D": "Collecting everything first still exposes unnecessary sensitive log data."
      }
    },
    "q05": {
      "options": {
        "A": "Dumping local variables can expose secrets rather than meaningful structure.",
        "B": "Sorting events does not create a consistent named field schema.",
        "C": "Named fields support consistent interpretation and querying of relevant events.",
        "D": "Structured logs still require intentional field selection and minimization."
      }
    },
    "q06": {
      "options": {
        "A": "Correlation identifiers do not authenticate calls between distributed services.",
        "B": "User attribution requires trusted identity context beyond random identifiers.",
        "C": "Shared identifiers alone cannot prove the authenticated event originator.",
        "D": "Correlation links events while keeping internal diagnostics out of responses."
      }
    },
    "q07": {
      "options": {
        "A": "Full request bodies may contain credentials and private user information.",
        "B": "Exception diagnostics should exclude sensitive credentials and unnecessary payload data.",
        "C": "Library exceptions can include credentials and other sensitive input values.",
        "D": "Error severity does not make sensitive exception payloads safe."
      }
    },
    "q08": {
      "options": {
        "A": "Exception messages may contain sensitive values beyond safe categories.",
        "B": "Raw exceptions can reveal paths, queries, and downstream sensitive contents.",
        "C": "Redacting labels leaves sensitive values embedded elsewhere in records.",
        "D": "Maintained libraries can still propagate sensitive input in exception text."
      }
    },
    "q09": {
      "options": {
        "A": "Post-retention hashing cannot prevent earlier disclosure of sensitive log contents.",
        "B": "Redact sensitive values before they enter diagnostic collection pipelines.",
        "C": "Renaming fields leaves sensitive data exposed in their values.",
        "D": "Retaining original payloads elsewhere preserves the sensitive disclosure risk."
      }
    },
    "q10": {
      "options": {
        "A": "Size is not the only concern; bodies contain sensitive data.",
        "B": "Structured formatting does not automatically remove private application fields.",
        "C": "Default body capture can expose secrets and private user communications.",
        "D": "Authentication does not justify recording every sensitive request body."
      }
    },
    "q11": {
      "options": {
        "A": "Untrusted text can forge apparent events or mislead log interpretation.",
        "B": "Request-controlled log configuration is distinct from forged event content.",
        "C": "Encryption does not inherently prevent reliable event timestamp ordering.",
        "D": "Newline escaping addresses only part of broader log integrity risks."
      }
    },
    "q12": {
      "options": {
        "A": "Access controls limit readers but cannot prevent unsafe application writes.",
        "B": "Employee access should follow legitimate role and investigation requirements.",
        "C": "Restrict log access because records may contain sensitive operational information.",
        "D": "Encryption does not replace authorization for analysts reading decrypted records."
      }
    },
    "q13": {
      "options": {
        "A": "Delivery latency and retention duration are different logging properties.",
        "B": "Retention length alone does not prevent modification of events.",
        "C": "Permanent retention unnecessarily extends exposure of sensitive operational data.",
        "D": "Retention balances investigation needs against the lifetime of sensitive information."
      }
    },
    "q14": {
      "options": {
        "A": "Revoke exposed secrets and fix the mechanism that recorded them.",
        "B": "Deleting one event cannot invalidate copies or exposed credentials.",
        "C": "Restricted logs may still disclose credentials requiring rotation or revocation.",
        "D": "Deletion alone cannot undo prior access to plaintext credentials."
      }
    },
    "q15": {
      "options": {
        "A": "Serializing every object can expose secrets and unnecessary internal state.",
        "B": "Replay capture can unnecessarily retain credentials and private payloads.",
        "C": "Useful event coverage does not require complete sensitive payload capture.",
        "D": "Verify required event detail while confirming sensitive data stays absent."
      }
    },
    "q16": {
      "options": {
        "A": "Authorization failures provide valuable security signals when logged safely.",
        "B": "Encryption complements minimization, access restrictions, redaction, and appropriate retention.",
        "C": "Deliberate event design and lifecycle controls keep logging useful safely.",
        "D": "Omitting all authorization failures can conceal attacks and configuration problems."
      }
    }
  }
};
