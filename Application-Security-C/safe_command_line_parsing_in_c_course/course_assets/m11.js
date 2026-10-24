window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-a254ecd09d",
  "questions": {
    "q01": {
      "options": {
        "A": "A known launcher can still pass malformed, excessive, or unauthorized argument values.",
        "B": "Arguments are external runtime inputs that can control sensitive operations and must satisfy the application's accepted contract.",
        "C": "Separate argument strings do not establish their permitted meaning, range, count, or resource scope.",
        "D": "Owning a copy of bytes does not validate their meaning or authorize their effects."
      }
    },
    "q02": {
      "options": {
        "A": "Argc counts the available argument entries, including the program-name entry when present; it is not a byte length.",
        "B": "Each argument has its own string length; argc reports entry count rather than total storage.",
        "C": "A count is not the highest valid index; indexing must respect the available entry range.",
        "D": "Argc ordinarily includes the program-name entry rather than counting only user-supplied values."
      }
    },
    "q03": {
      "options": {
        "A": "Silently accepting unknown options can conceal mistakes and unsupported behavior rather than provide safe compatibility.",
        "B": "Parser branch order should implement a defined contract rather than accidentally decide option semantics.",
        "C": "Duplicate and missing-option behavior must be intentional application policy rather than an unexamined library default.",
        "D": "Explicit syntax, values, defaults, duplicates, and error rules keep accepted invocation behavior predictable and reviewable."
      }
    },
    "q04": {
      "options": {
        "A": "Immediate actions can leave side effects behind when a later option fails validation.",
        "B": "Positionals can invalidate the full request after flag-triggered actions already occurred.",
        "C": "Parsing a complete candidate before acting prevents rejected invocations from partially changing files, resources, or state.",
        "D": "Globally visible partial settings can be consumed before the entire invocation becomes valid."
      }
    },
    "q05": {
      "options": {
        "A": "Nonnegative representability does not establish appropriate application limits or complete string consumption.",
        "B": "Narrowing before validation can lose information needed to reject out-of-range input correctly.",
        "C": "Complete numeric validation checks conversion, trailing text, sign, range, and the intended operation's constraints.",
        "D": "Accepting a numeric prefix can hide malformed units or trailing input that the contract should reject."
      }
    },
    "q06": {
      "options": {
        "A": "Removing particular tokens does not establish safe filesystem resolution or containment under changing directory entries.",
        "B": "Paths can resolve outside the intended scope or depend on unexpected working directories, lengths, and empty-value behavior.",
        "C": "A short relative path can still escape or reach an unintended resource.",
        "D": "String concatenation alone does not prove containment when filesystem resolution can interpret separators and links."
      }
    },
    "q07": {
      "options": {
        "A": "Copying needs actual destination capacity and valid termination, because an externally supplied argument may exceed the internal buffer.",
        "B": "The shell does not know the sizes of the program's internal destination objects.",
        "C": "The available destination capacity, not the source length alone, determines a safe copy bound.",
        "D": "A copy can succeed while the value still violates encoding, termination, or application-level length requirements."
      }
    },
    "q08": {
      "options": {
        "A": "Ending option interpretation does not validate the remaining values or their permitted use.",
        "B": "The end-of-options marker does not inherently enable defaults or define all unknown-option policy.",
        "C": "Positionals still need count and semantic validation after option parsing has stopped.",
        "D": "Where supported by the command contract, -- distinguishes later positional data from option syntax."
      }
    },
    "q09": {
      "options": {
        "A": "Clear rejection prevents accidental interpretation of unsupported or ambiguous requests outside the documented contract.",
        "B": "Guessing a nearby option can cause an unintended sensitive operation despite issuing a warning.",
        "C": "Unknown-option behavior must follow explicit policy rather than silently reinterpret unexpected switches as data.",
        "D": "Duplicate handling should follow the documented rule even when two submitted values happen to match."
      }
    },
    "q10": {
      "options": {
        "A": "Individually valid settings can still form an invalid or incomplete combined invocation.",
        "B": "Some filesystem and process effects cannot be reliably undone merely by printing an error.",
        "C": "Observable partial configuration can violate invariants while callers believe parsing failed without effects.",
        "D": "Committing only an accepted complete request avoids mixed state after a later validation failure."
      }
    },
    "q11": {
      "options": {
        "A": "Fuzzing can reveal unexpected inputs but does not define which invocations the application intends to accept.",
        "B": "Current static results do not establish the semantics of future option forms and changes.",
        "C": "Tools test the implementation against edge cases, while a clear contract defines the correct accepted and rejected behavior.",
        "D": "Missing values, duplicates, ranges, counts, ambiguity, and partial failures need suitable explicit cases."
      }
    },
    "q12": {
      "options": {
        "A": "Rollback may not undo every external effect triggered before the entire invocation was validated.",
        "B": "A defined contract and side-effect-free validation ensure only complete, acceptable requests trigger program actions.",
        "C": "Automated and wrapper-supplied arguments can also be invalid or unsafe and need the same boundary checks.",
        "D": "Per-option actions can leave partial effects when later values invalidate the complete request."
      }
    }
  }
};
