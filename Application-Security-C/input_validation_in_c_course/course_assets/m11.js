window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-707a77aee6",
  "questions": {
    "q01": {
      "options": {
        "A": "Validation must precede unsafe memory and state effects rather than address syntax alone.",
        "B": "Even the initial storage operation needs an established safe size and data contract.",
        "C": "Parser success establishes selected representation rules rather than every downstream policy requirement.",
        "D": "Validation establishes the assumptions required before outside values direct memory, resources, decisions, or application state."
      }
    },
    "q02": {
      "options": {
        "A": "A module edge matters when relevant source trust or authority assumptions change, not merely because functions differ.",
        "B": "External or lower-trust data needs a checked transition before code relies on stronger assumptions about it.",
        "C": "Local files and sockets can represent different users, services, and privilege levels.",
        "D": "Decoding and transformation can change meaning and create new constraints requiring validation."
      }
    },
    "q03": {
      "options": {
        "A": "Known-dangerous lists can miss alternate encodings and previously unseen invalid forms.",
        "B": "Unspecified coercion can silently accept meanings outside the intended field contract.",
        "C": "Defining permitted structure and values gives code and tests a bounded acceptance rule to enforce.",
        "D": "A global length cap does not validate each field's type, range, or permitted behavior."
      }
    },
    "q04": {
      "options": {
        "A": "The correct limit depends on the actual destination, units, framing, appended data, and required terminators.",
        "B": "A value fitting one large buffer can exceed a later smaller destination or transformed representation.",
        "C": "Copying and allocation also need space for required string termination.",
        "D": "Expansion during decoding or appending can invalidate an earlier bound."
      }
    },
    "q05": {
      "options": {
        "A": "The end pointer and error result can reveal incomplete conversion and out-of-range input.",
        "B": "Narrowing first can discard the evidence needed to reject an invalid original value.",
        "C": "Short numeric text can represent a value outside the application's permitted range.",
        "D": "Complete conversion, sign, representability, and policy constraints must all hold before a number drives an operation."
      }
    },
    "q06": {
      "options": {
        "A": "Length-aware buffers do not change where ordinary null-terminated string functions stop.",
        "B": "A later decoder can introduce a terminator even when the original encoded text had none.",
        "C": "Mixed byte-length and C-string interpretations can make validation inspect a different value than downstream processing uses.",
        "D": "Text validation and byte-length consumption can disagree about data after the first embedded null."
      }
    },
    "q07": {
      "options": {
        "A": "A valid multibyte encoding does not make byte length equal character count.",
        "B": "Different decoding and comparison assumptions can produce inconsistent acceptance, identity, and truncation decisions.",
        "C": "Normalization can change representation and storage needs and requires an explicit policy.",
        "D": "Comparison order and locale-sensitive rules can affect identifier meaning before later character restrictions apply."
      }
    },
    "q08": {
      "options": {
        "A": "A record's contract includes individual fields and the relationships needed for the complete object to be valid.",
        "B": "Duplicate and unknown-field rules affect interpretation and should not depend on accidental parse order.",
        "C": "Publishing fields before complete validation can expose partial state from a rejected record.",
        "D": "Cross-field rules must hold before the complete object is accepted or made visible."
      }
    },
    "q09": {
      "options": {
        "A": "Even a later field failure can invalidate the combined record and its already applied values.",
        "B": "Default substitution needs explicit policy and must not conceal invalid security-relevant input.",
        "C": "Failed required checks should prevent sensitive use and leave the program in a defined safe state.",
        "D": "An error return does not undo partial effects, and raw rejected data can leak sensitive content."
      }
    },
    "q10": {
      "options": {
        "A": "A rejected candidate can leave incompatible mixed values unless acceptance and publication are coordinated.",
        "B": "Individually valid values can violate constraints when combined with incomplete or old state.",
        "C": "Later cleanup does not protect consumers that can already observe an invalid intermediate object.",
        "D": "A validation interface needs a defined post-failure invariant rather than passing inconsistent state to callers."
      }
    },
    "q11": {
      "options": {
        "A": "Fuzzing needs a contract or invariant to distinguish acceptable behavior from defects.",
        "B": "Tests and analysis expose implementation gaps while the application must explicitly define accepted forms and safe rejection.",
        "C": "A current analysis result cannot establish correct handling of future unspecified formats.",
        "D": "Malformed encodings, duplicates, relationships, and partial states can fail despite numeric extrema passing."
      }
    },
    "q12": {
      "options": {
        "A": "Type and range checks do not authenticate the source or grant access permission.",
        "B": "Broad normalization before field meaning is known can hide ambiguity or change intended identity.",
        "C": "A defensive API still needs correct bounds and valid values before its memory operations.",
        "D": "Source-aware representation and semantic rules should establish trust before the value reaches sensitive use."
      }
    }
  }
};
