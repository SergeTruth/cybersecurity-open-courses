window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-f3f1900882",
  "questions": {
    "q1": {
      "options": {
        "A": "Integer defects affect ordinary sizes, permissions, and indexes, not only mathematical applications.",
        "B": "C++ does not universally trap integer overflow; behavior depends on type and operation.",
        "C": "Incorrect integer values can undermine memory bounds and security-sensitive application decisions.",
        "D": "Unsigned types still wrap and can represent invalid sizes or converted negative inputs."
      }
    },
    "q2": {
      "options": {
        "A": "Representation limits also matter for local arithmetic, storage, and interface conversions.",
        "B": "Choose a representation covering the valid domain and validate incoming conversions explicitly.",
        "C": "Unsigned naming does not establish appropriate range, units, or handling of negative input.",
        "D": "The widest primitive type may obscure domain limits instead of expressing them clearly."
      }
    },
    "q3": {
      "options": {
        "A": "Implicit conversions can turn negative operands into large unsigned values and alter comparisons.",
        "B": "Signed and unsigned comparisons can differ when negative operands undergo conversion.",
        "C": "Mixed-sign expressions often compile, leaving the programmer responsible for their conversion behavior.",
        "D": "Conversion to unsigned can produce a modular value rather than a validation error."
      }
    },
    "q4": {
      "options": {
        "A": "Checking after narrowing risks losing the original value before its validity is established.",
        "B": "static_cast makes conversion explicit without proving that its source value is representable.",
        "C": "Unsigned destinations still have finite ranges and do not accept negative values safely.",
        "D": "Check destination representability and domain policy before performing a narrowing conversion."
      }
    },
    "q5": {
      "options": {
        "A": "Unsigned wrapping does not automatically raise a standard overflow exception.",
        "B": "Wrapped values can change allocation, comparison, counters, and ordinary application state.",
        "C": "Language-defined behavior can still produce a value that violates application policy.",
        "D": "Modular arithmetic may be defined while still breaking the intended size or quota invariant."
      }
    },
    "q6": {
      "options": {
        "A": "A wrapped allocation size can be smaller than the subsequent indexing operation assumes.",
        "B": "A wrapped result can pass a maximum check because the original magnitude was lost.",
        "C": "Allocation APIs receive the computed value and cannot reconstruct lost arithmetic information.",
        "D": "Two individually representable operands can produce a product outside the result type's range."
      }
    },
    "q7": {
      "options": {
        "A": "Trailing characters can hide malformed input despite a valid initial numeric prefix.",
        "B": "atoi cannot clearly distinguish some failures from a legitimate zero result.",
        "C": "Require complete parsing and permitted range before checked conversion or arithmetic.",
        "D": "size_t is an integer type and does not automatically validate textual negative input."
      }
    },
    "q8": {
      "options": {
        "A": "Optimization benchmarks do not specify valid input values or arithmetic failure behavior.",
        "B": "Explicit units, bounds, and failure guarantees let callers use numeric results safely.",
        "C": "Ignoring overflow reports lets invalid derived values reach allocation or control decisions.",
        "D": "A primitive return type cannot express every semantic range or unit requirement."
      }
    },
    "q9": {
      "options": {
        "A": "Sanitizer behavior depends on enabled instrumentation and is not universal release overflow trapping.",
        "B": "Tools supplement explicit preconditions and tests for rejection and boundary behavior.",
        "C": "Warnings do not verify that every runtime input satisfies an application's policy.",
        "D": "Diagnostics and exercised instrumentation reveal conversion and arithmetic defects missed by inspection."
      }
    },
    "q10": {
      "options": {
        "A": "These paths connect untrusted numbers directly to bounds, storage, and compatibility interfaces.",
        "B": "Security review should find latent numeric defects before they cause production crashes.",
        "C": "Formatted numbers can influence later parsing, logging, and decisions, so risk determines priority.",
        "D": "Fixed-width integers still overflow and require conversion and arithmetic range checks."
      }
    }
  }
};
