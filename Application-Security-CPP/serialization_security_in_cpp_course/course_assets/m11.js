window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-5df12e1b91",
  "questions": {
    "q1": {
      "options": {
        "A": "Deserialization turns externally controlled bytes into values that can influence trusted operations.",
        "B": "Matching syntax does not establish semantic validity, identity, or authorization.",
        "C": "Decoded values still need domain checks before they become valid application state.",
        "D": "Conversion does not automatically earn trust; the boundary needs explicit validation."
      }
    },
    "q2": {
      "options": {
        "A": "Format selection affects structure and parser behavior rather than only filename conventions.",
        "B": "The format determines schema obligations, version interpretation, and long-term parser maintenance.",
        "C": "Compact binary formats still need explicit bounds, schema checks, and resource budgets.",
        "D": "Storage efficiency does not establish a format's validation or security properties."
      }
    },
    "q3": {
      "options": {
        "A": "A version field does not automatically authorize unknown fields or behaviors.",
        "B": "Documentation cannot prevent runtime inputs from violating the documented structure.",
        "C": "Different versions can require different parsing and semantic interpretation rules.",
        "D": "Schemas define permitted structure, while versions select the appropriate interpretation contract."
      }
    },
    "q4": {
      "options": {
        "A": "Constructing active domain objects too early can trigger effects before validity is established.",
        "B": "Decoded fields remain untrusted until structural, semantic, and authorization checks are complete.",
        "C": "Validate passive intermediate data before constructing objects with trusted invariants or side effects.",
        "D": "Early object construction does not remove the need for input and domain validation."
      }
    },
    "q5": {
      "options": {
        "A": "Limits protect processing resources rather than merely producing smaller serialized output.",
        "B": "Resource ceilings and schema validation address different obligations and both remain necessary.",
        "C": "A small byte stream can still induce deep nesting or costly processing.",
        "D": "Independent bounds on counts, sizes, depth, and work limit parser resource consumption."
      }
    },
    "q6": {
      "options": {
        "A": "Compact native bytes do not guarantee portable or safe durable representation.",
        "B": "A fixed compiler cannot make raw pointers or copied object bytes preserve all invariants.",
        "C": "A stable ABI does not make process-specific pointers valid in another deployment.",
        "D": "Native objects can contain padding, addresses, and metadata unsuitable for portable serialized state."
      }
    },
    "q7": {
      "options": {
        "A": "Constructing before validation can invoke unintended behavior before compatibility is established.",
        "B": "Input-selected types or construction paths can exceed the intended supported object model.",
        "C": "RAII manages cleanup and does not establish reconstructed objects' semantic validity.",
        "D": "Constructor checks do not automatically authorize an arbitrary caller-selected runtime type."
      }
    },
    "q8": {
      "options": {
        "A": "Validation checks permitted structure and meaning; authentication establishes identity or authenticated integrity.",
        "B": "A structurally valid message can still have an unauthenticated or unauthorized sender.",
        "C": "Encryption does not eliminate duplicate-field, type, or semantic validation requirements.",
        "D": "Well-formed data does not establish who created or transmitted it."
      }
    },
    "q9": {
      "options": {
        "A": "Local files can also carry untrusted, replaced, or corrupted serialized data.",
        "B": "Transport byte limits do not automatically bound all parser nesting and computational work.",
        "C": "Trust assumptions and acceptable budgets depend on the actual storage or transport boundary.",
        "D": "Different callers and channels may require different validation policies and resource limits."
      }
    },
    "q10": {
      "options": {
        "A": "A documented format still needs tests showing rejection of malformed representations.",
        "B": "Valid version examples leave malformed inputs, incompatible variants, and failure behavior unexplored.",
        "C": "Combine negative cases, budget tests, compatibility checks, and fuzzing against the defined contract.",
        "D": "A small valid corpus does not exercise oversized inputs or resource-exhaustion boundaries."
      }
    }
  }
};
