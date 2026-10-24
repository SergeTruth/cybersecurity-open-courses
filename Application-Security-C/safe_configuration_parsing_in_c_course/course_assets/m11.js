window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-710792156f",
  "questions": {
    "q01": {
      "options": {
        "A": "Permissions and deployment context can change after installation, and restricted input can still be malformed or unsafe.",
        "B": "Configuration can directly control sizes, file paths, network exposure, and sensitive behavior before or after requests arrive.",
        "C": "Configuration crosses deployment and operational boundaries and can change security behavior, so it needs explicit validation as input.",
        "D": "Copying bytes establishes ownership of memory, not the validity, meaning, or authority of the configuration."
      }
    },
    "q02": {
      "options": {
        "A": "An implementation description leaves key ambiguity and failure decisions unresolved unless the contract constrains them.",
        "B": "Implicit deployment-specific defaults can produce inconsistent and unexpected security behavior.",
        "C": "Duplicate resolution is part of the application contract; leaving it to library defaults can change effective settings across versions.",
        "D": "Explicit field, default, duplicate, unknown-key, and rejection rules prevent consumers from relying on conflicting interpretations."
      }
    },
    "q03": {
      "options": {
        "A": "A bounded file can still contain invalid values or unsupported structure, so semantic validation remains necessary.",
        "B": "Early size and line limits bound memory and parsing work before unexpectedly large input reaches unsafe assumptions.",
        "C": "Waiting for allocation failure lets untrusted input dictate excessive consumption before rejection.",
        "D": "Limits applied after tokenization can arrive too late to protect the tokenizer's memory and buffer handling."
      }
    },
    "q04": {
      "options": {
        "A": "Rejecting ambiguity or applying a documented rule makes the effective configuration predictable and reviewable.",
        "B": "Activating only a parsed prefix can leave required or security-sensitive settings silently absent.",
        "C": "An undocumented conservative guess still gives different consumers and versions room for conflicting interpretation.",
        "D": "Deferring ambiguity into runtime consumers can cause different components to act on different effective settings."
      }
    },
    "q05": {
      "options": {
        "A": "Representability alone does not reject trailing junk, invalid units, or values outside the application's safe range.",
        "B": "Premature narrowing can lose information or apply unintended conversions before the original value's range is established.",
        "C": "Restricted access does not prevent mistakes or values that exhaust resources within the destination type's range.",
        "D": "Numeric checks must establish complete conversion and the units, ranges, arithmetic safety, and meaning needed by the consuming operation."
      }
    },
    "q06": {
      "options": {
        "A": "Precedence and defaults select the actual runtime value, which can enable or weaken security-sensitive behavior.",
        "B": "Source order must follow a deliberate policy rather than assuming every later value is authorized to override earlier ones.",
        "C": "Defaults still need to satisfy current invariants and remain safe when surrounding code changes.",
        "D": "An override is new input whose type, range, and permitted authority still need validation."
      }
    },
    "q07": {
      "options": {
        "A": "Preserving legacy behavior can retain unnecessary exposure rather than provide a safe current default.",
        "B": "Silently continuing after arbitrary parser errors can hide which safety assumptions no longer hold.",
        "C": "A safe default limits unnecessary authority or exposure when the operator has not explicitly supplied a setting.",
        "D": "An absent setting and an explicitly invalid value are different cases; silently substituting a default can conceal a configuration error."
      }
    },
    "q08": {
      "options": {
        "A": "Parse failures can expose the same secrets as successful loads and are not an exception to redaction.",
        "B": "Logs can outlive the original configuration and reach additional readers or export systems, widening any secret disclosure.",
        "C": "Low-entropy secrets can be guessed against logged hashes, so hashing is not a universal safe-logging rule.",
        "D": "Permissions on the original file do not automatically govern centralized logs or downstream copies."
      }
    },
    "q09": {
      "options": {
        "A": "Combining accepted fields with default substitutions can activate a configuration whose complete constraints never passed validation.",
        "B": "Rejecting the invalid candidate prevents ambiguous or unsafe settings from becoming active runtime state.",
        "C": "Partial overrides can break relationships between fields even when the previous configuration was valid.",
        "D": "Activating invalid configuration for inspection still risks exposing runtime behavior before its invariants have been established."
      }
    },
    "q10": {
      "options": {
        "A": "Individually valid fields can form an invalid combination, and a later failure can leave the overall update incomplete.",
        "B": "Runtime state should represent an accepted configuration, not an incomplete record of parser progress.",
        "C": "Partial commits can mix incompatible old and new settings, so validation should finish before the candidate becomes active.",
        "D": "Deferring recovery leaves the application operating with a mixed configuration until another reload occurs."
      }
    },
    "q11": {
      "options": {
        "A": "Valid, invalid, ambiguous, and boundary cases verify both the accepted contract and safe rejection behavior.",
        "B": "A valid example and one size case omit duplicate, unknown, missing, and semantic-boundary behavior.",
        "C": "Fuzzing complements deliberate contract tests rather than replacing assertions about known precedence and rejection requirements.",
        "D": "Deployment policy does not prove that secret and path values are well-formed or safe when consumed."
      }
    },
    "q12": {
      "options": {
        "A": "Parser-library defaults may not match the application's intended duplicate, coercion, or unknown-field policy.",
        "B": "Local files can be invalid or influenced through deployment and ownership boundaries, so they also require validation.",
        "C": "Preserving partially parsed fields can activate state that never satisfied the complete configuration contract.",
        "D": "Safe loading, explicit interpretation, complete validation, deliberate precedence, secret protection, and safe rejection must work together."
      }
    }
  }
};
