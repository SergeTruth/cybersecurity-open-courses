window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-c75ded7479",
  "questions": {
    "q01": {
      "options": {
        "A": "Validation checks acceptance rules before values influence trusted application behavior.",
        "B": "Logging records events rather than establish whether input is acceptable.",
        "C": "Encryption protects representation and does not validate application domain rules.",
        "D": "Valid values can still request actions requiring separate caller authorization."
      }
    },
    "q02": {
      "options": {
        "A": "External sources may violate expected format, range, meaning, or resource limits.",
        "B": "Input origin does not guarantee correctness or agreement with application assumptions.",
        "C": "Receiving external data cannot guarantee the safety of later processing.",
        "D": "External values especially need validation before security-sensitive use."
      }
    },
    "q03": {
      "options": {
        "A": "Validation and encoding enforce different contracts at different processing boundaries.",
        "B": "Validation applies to services, files, configuration, and other input sources.",
        "C": "Encoding for one destination does not establish acceptable business meaning.",
        "D": "Validate domain acceptability and encode appropriately for each output context."
      }
    },
    "q04": {
      "options": {
        "A": "Request bodies provide externally influenced values to application operations.",
        "B": "Files, services, and configuration also supply input beyond keyboard entry.",
        "C": "Executable input can arrive through many channels besides source comments.",
        "D": "Administrative identity does not define the complete set of application inputs."
      }
    },
    "q05": {
      "options": {
        "A": "Internal records may retain externally influenced, outdated, or compromised values.",
        "B": "Internal storage does not automatically establish current semantic trustworthiness.",
        "C": "Imported or stored strings can still influence unsafe interpreter contexts.",
        "D": "Internal state evolves and may become inconsistent with later consumers."
      }
    },
    "q06": {
      "options": {
        "A": "Interface wording does not specify the accepted value's semantic constraints.",
        "B": "Define representation, bounds, allowed choices, and related business requirements explicitly.",
        "C": "Field colors do not enforce safe type, range, or interpretation.",
        "D": "A database name does not define every input contract for an operation."
      }
    },
    "q07": {
      "options": {
        "A": "Allowlists explicitly define the accepted values or patterns for a field.",
        "B": "Default acceptance leaves unsupported and unexpected values without a clear contract.",
        "C": "Blocking known bad examples is deny-list rather than allow-list validation.",
        "D": "Rejection behavior still needs deliberate clear safe error handling."
      }
    },
    "q08": {
      "options": {
        "A": "Known bad strings cannot enumerate every future harmful representation.",
        "B": "Normalization matters when validation and use interpret representations differently.",
        "C": "A deny list does not establish safe construction of downstream API calls.",
        "D": "New encodings and unexpected variants can bypass incomplete forbidden-input lists."
      }
    },
    "q09": {
      "options": {
        "A": "Canonicalization changes representation rather than identifying the requesting user.",
        "B": "Removing records is a state change rather than representation normalization.",
        "C": "Password encryption is distinct from selecting a consistent comparison representation.",
        "D": "Normalize equivalent representations before applying decisions that depend on their meaning."
      }
    },
    "q10": {
      "options": {
        "A": "Additional decoding can change an already approved value's security interpretation.",
        "B": "Transformations can introduce new interpretation risks rather than always improve safety.",
        "C": "Encoded values can carry harmful data when later decoded or reinterpreted.",
        "D": "Decoding must align with validation rather than replace semantic acceptance checks."
      }
    },
    "q11": {
      "options": {
        "A": "Context changes permitted interpretation and business meaning beyond visual appearance.",
        "B": "Different fields and operations have different valid domains and constraints.",
        "C": "A valid value for one purpose may violate another destination's requirements.",
        "D": "Context-sensitive validation does not decide whether the caller has authority."
      }
    },
    "q12": {
      "options": {
        "A": "Browser validation does not establish an authenticated identity or its permissions.",
        "B": "Direct or modified clients can skip interface validation and submit arbitrary requests.",
        "C": "Browser checks alone cannot enforce the server's accepted input contract.",
        "D": "Servers can validate both representation and business rules before acting."
      }
    },
    "q13": {
      "options": {
        "A": "Schema conformance does not guarantee every domain relationship or business invariant.",
        "B": "Rejections should have controlled observable outcomes rather than disappear silently.",
        "C": "Safe downstream APIs remain necessary after schema-based input checks.",
        "D": "Schemas formalize expected structure, required fields, types, and applicable constraints."
      }
    },
    "q14": {
      "options": {
        "A": "Errors should not disclose credentials while explaining how to correct input.",
        "B": "Raw traces can expose private implementation and infrastructure details.",
        "C": "Database structure is usually unnecessary for a caller correcting a field.",
        "D": "Explain usable correction guidance while keeping internal diagnostic details controlled."
      }
    },
    "q15": {
      "options": {
        "A": "Explicit contracts and consistent normalization support safe context-appropriate input handling.",
        "B": "Input validity does not prove identity or grant resource permissions.",
        "C": "Validation matters for APIs, files, queues, and configuration beyond forms.",
        "D": "Validation reduces certain risks without eliminating every security threat."
      }
    },
    "q16": {
      "options": {
        "A": "Changing representations does not inherently preserve the meaning of a prior check.",
        "B": "A downstream interpreter can assign different significance after decoding or parsing.",
        "C": "Business rules still apply to the representation actually used by the operation.",
        "D": "Output destinations still require their own safe encoding and rendering."
      }
    },
    "q17": {
      "options": {
        "A": "Client rules can be bypassed and cannot govern authoritative server state.",
        "B": "Well-formed input can still target unauthorized resources or invalid workflows.",
        "C": "Enforce related-field constraints and authoritative ownership rules before sensitive processing.",
        "D": "Correct individual formats do not establish valid combinations of values."
      }
    },
    "q18": {
      "options": {
        "A": "Tests should exercise validation rather than disable the control being checked.",
        "B": "Production-only discovery leaves avoidable defects in deployed rejection behavior.",
        "C": "Combine valid, invalid, boundary, encoding, and semantic cases against explicit expectations.",
        "D": "Happy paths leave rejection and edge-case behavior substantially unverified."
      }
    }
  }
};
