window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-c5c9e14e76",
  "questions": {
    "q01": {
      "options": {
        "A": "HTTP parsing and Go types do not enforce all field formats, allowed values, or business constraints.",
        "B": "A value can have the correct Go type while violating the range, format, or policy required for safe use.",
        "C": "Static typing does not rule out incorrect business decisions or unsafe assumptions about input.",
        "D": "Types do not decide whether the current caller may perform an action on a resource."
      }
    },
    "q02": {
      "options": {
        "A": "Crossing a trust boundary changes the assumptions under which data can safely be consumed.",
        "B": "A module version identifies a dependency release, rather than a transition between trust contexts.",
        "C": "Compiler optimization affects generated code, not the trust assigned to incoming data.",
        "D": "A log filename does not itself describe a change in data's trust context."
      }
    },
    "q03": {
      "options": {
        "A": "Non-form inputs, including files and integration responses, can also contain attacker-controlled or invalid data.",
        "B": "Server integrations and local configuration can cross trust boundaries even when no browser is involved.",
        "C": "Every listed source can carry unexpected or externally controlled runtime values that need appropriate validation.",
        "D": "Command-line arguments are only one source; HTTP, files, configuration, and APIs also supply runtime input."
      }
    },
    "q04": {
      "options": {
        "A": "Zero values are defaults, not encrypted representations of missing fields.",
        "B": "A default value can still violate a required-field or business rule.",
        "C": "A missing field can become a valid-looking zero, so required-field intent still needs explicit checking.",
        "D": "A zero value can represent either omission or deliberate input unless the request model preserves that distinction."
      }
    },
    "q05": {
      "options": {
        "A": "A pointer can represent absence separately from a supplied numeric zero or false value, subject to the decoder's null behavior.",
        "B": "A pointer's presence does not establish the caller's permission to set that field.",
        "C": "Pointer fields do not prevent malformed JSON or incompatible value types from causing decoding errors.",
        "D": "A non-nil pointer still needs validation of its value and permitted use."
      }
    },
    "q06": {
      "options": {
        "A": "Successful decoding establishes a representation, not that every value is safe or meaningful.",
        "B": "Decoded fields still need range, format, cross-field, and policy checks before sensitive use.",
        "C": "Parsing a request does not establish permission to perform its requested operation.",
        "D": "Full request logging can expose secrets or personal information and does not validate the data."
      }
    },
    "q07": {
      "options": {
        "A": "An unknown field can come from a typo or version mismatch, so it is not automatic proof of attack.",
        "B": "JSON syntax permits object fields that an application model may not recognize.",
        "C": "Unknown fields can reveal a mismatch between the submitted request and the application contract.",
        "D": "Silently ignoring new fields can conceal mistakes or unsupported behavior rather than guarantee safe compatibility."
      }
    },
    "q08": {
      "options": {
        "A": "Formatting affects readability; a size limit bounds the resources consumed while accepting input.",
        "B": "Size limits constrain consumption, whereas authentication establishes the caller's identity.",
        "C": "A bounded body can still contain malicious values or trigger unrelated logic flaws.",
        "D": "Bounding request size reduces memory, CPU, and processing exposure from oversized input."
      }
    },
    "q09": {
      "options": {
        "A": "ParseInt converts a numeric string and reports parsing errors that the application must check.",
        "B": "Numeric parsing transforms representation and does not encrypt request data.",
        "C": "Parsing an integer does not inspect uploaded file content or its safety.",
        "D": "A successfully parsed integer can still exceed the application's permitted range."
      }
    },
    "q10": {
      "options": {
        "A": "Parsing establishes numeric representability, rather than suitability for the intended operation.",
        "B": "Business and security limits can be narrower than the numeric type accepted by the parser.",
        "C": "Range constraints apply to numeric values regardless of their original string representation.",
        "D": "Parsing requires error handling for out-of-range input, and later arithmetic may also need overflow checks."
      }
    },
    "q11": {
      "options": {
        "A": "Requests and integration data can supply timestamps, durations, and expiration values.",
        "B": "Timezone and offset interpretation can change the instant used for expiration or scheduling.",
        "C": "Ambiguous or incorrectly interpreted times can change security decisions, event ordering, and audit meaning.",
        "D": "Parsing a timestamp does not decide whether the caller may perform a time-dependent action."
      }
    },
    "q12": {
      "options": {
        "A": "Untrusted path components can cause file access to escape the directory the application intended to expose.",
        "B": "Go test tooling is unrelated to the file-access escape described by path traversal.",
        "C": "A struct tag describes encoding metadata, rather than a filesystem containment violation.",
        "D": "Log formatting affects records, while path traversal affects which files can be reached."
      }
    },
    "q13": {
      "options": {
        "A": "An attacker can rename a file without changing its bytes or actual format.",
        "B": "An expected extension does not prove that an upload is well-formed or safe.",
        "C": "Content and structural checks remain necessary because a suffix alone does not validate a file.",
        "D": "The filename is often caller-controlled and can disagree with the uploaded content."
      }
    },
    "q14": {
      "options": {
        "A": "Validated text can still become SQL syntax if inserted into an unsafe query string.",
        "B": "Parameters separate values from SQL syntax; validation adds useful constraints but does not replace safe construction.",
        "C": "Go applications can expose SQL injection when they combine untrusted values with query syntax.",
        "D": "Parameters control query execution semantics, rather than merely formatting logs."
      }
    },
    "q15": {
      "options": {
        "A": "A decoded struct can still contain forbidden, missing, excessive, or inconsistent values.",
        "B": "Attackers can bypass frontend checks and send arbitrary requests to the server.",
        "C": "Careful decoding and explicit constraints turn external values into data suitable for the application's intended operations.",
        "D": "Validation does not establish access permission or replace APIs that keep data separate from interpreter syntax."
      }
    }
  }
};
