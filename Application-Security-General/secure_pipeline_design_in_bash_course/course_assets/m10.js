window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-90527a4986",
  "questions": {
    "q1": {
      "options": {
        "A": "Downstream commands can use streamed values to select resources, change state, or make sensitive decisions.",
        "B": "Stream contents can drive state-changing commands and remain security-relevant input.",
        "C": "Pipelines also implement unattended operational workflows with effects beyond interactive formatting.",
        "D": "A successful final stage does not validate earlier data or establish that producers succeeded."
      }
    },
    "q2": {
      "options": {
        "A": "A plain pipe does not merge stderr with stdout without additional redirection.",
        "B": "Standard pipe input is a byte stream on stdin rather than argument-array construction from stderr.",
        "C": "The ordinary pipe connects the producer's standard output stream to the next command's standard input.",
        "D": "Exit status is separate process outcome metadata rather than automatically transmitted stream content."
      }
    },
    "q3": {
      "options": {
        "A": "Merging diagnostics can add records that violate the downstream data schema.",
        "B": "After streams are mixed, a parser may have no reliable way to recover their original provenance.",
        "C": "Shared locale does not transform diagnostic prose into validated machine-readable records.",
        "D": "Keeping diagnostics separate prevents error messages from being mistaken for authoritative pipeline data."
      }
    },
    "q4": {
      "options": {
        "A": "Shell quoting protects argument construction, not every later parser and transformation.",
        "B": "Each consumer must verify the structure and meaning it assumes about the producer's data.",
        "C": "Receiving bytes does not establish their validity, completeness, or permitted use.",
        "D": "Pipefail reports process failures rather than enforcing a schema or semantic contract."
      }
    },
    "q5": {
      "options": {
        "A": "Formatting, localization, and version changes can invalidate assumptions built around display-oriented output.",
        "B": "Pinned versions can still emit different error, locale, environment, and data-dependent output.",
        "C": "Locale can change delimiters, ordering, formatting, and parsing assumptions beyond simple labels.",
        "D": "A textual match does not establish every field's range, provenance, or application meaning."
      }
    },
    "q6": {
      "options": {
        "A": "Capturing output does not automatically preserve or check every command's exit status.",
        "B": "A consumer can produce nonempty output even after an upstream error or incomplete result.",
        "C": "Ordinary pipeline status commonly reflects the final command rather than always reporting the first failure.",
        "D": "A successful final command can mask an earlier failed producer unless the script explicitly checks pipeline outcomes."
      }
    },
    "q7": {
      "options": {
        "A": "Pipefail changes status reporting; it does not prevent all downstream execution and side effects.",
        "B": "Exit statuses do not validate the fields and semantics of records passed between commands.",
        "C": "Pipefail helps make upstream nonzero outcomes visible in the pipeline's resulting status for explicit handling.",
        "D": "Pipefail does not automatically retry failed stages or define safe retry behavior."
      }
    },
    "q8": {
      "options": {
        "A": "Quoted arguments preserve the intended value boundaries; validation separately checks whether those values are acceptable.",
        "B": "Quoting does not establish record schema, permitted meaning, or trusted provenance.",
        "C": "Later transformations can introduce new invalid states or different interpretation boundaries that need checks.",
        "D": "Filenames can contain newlines, so newline splitting is not a universal filename-boundary mechanism."
      }
    },
    "q9": {
      "options": {
        "A": "An implicit default can cause an unintended action when a required producer supplied no usable data.",
        "B": "Required data absence needs an explicit decision before another command acts on missing or default values.",
        "C": "Blind retry can repeat state-changing effects without establishing why the required data was absent.",
        "D": "Empty output is acceptable only when the workflow's documented contract permits it."
      }
    },
    "q10": {
      "options": {
        "A": "Step names do not prevent commands or diagnostics from exposing secret values.",
        "B": "Additional processes do not by themselves validate data or constrain authority.",
        "C": "Intermediate files remain inputs requiring privacy, safe creation, and content checks.",
        "D": "Named steps expose intermediate outcomes and contracts, making failures easier to validate, review, and diagnose."
      }
    },
    "q11": {
      "options": {
        "A": "Raw records can contain secrets, private data, or uncontrolled content unsuitable for retained logs.",
        "B": "Hashing one token does not redact other sensitive fields or make weak secrets unguessable.",
        "C": "Logs should retain useful outcomes and safe metadata while avoiding secrets and unnecessary raw payload copies.",
        "D": "Error output can contain credentials, paths, payload fragments, and attacker-controlled text."
      }
    },
    "q12": {
      "options": {
        "A": "Final-stage success does not prove earlier stages produced complete or valid data.",
        "B": "Explicit stream contracts and checked outcomes keep operational processing predictable and provide useful safe failure evidence.",
        "C": "Combining diagnostics with data can corrupt machine interpretation and obscure the actual failing stage.",
        "D": "Reducing command count does not justify hidden boundaries, unchecked failures, or ambiguous data contracts."
      }
    }
  }
};
