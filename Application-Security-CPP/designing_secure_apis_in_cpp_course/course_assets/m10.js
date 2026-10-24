window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-72bf8ac083",
  "questions": {
    "q01": {
      "options": {
        "A": "Short names do not establish safe ownership, valid inputs, or appropriate authority.",
        "B": "Local callers can pass malformed data or violate contracts, so process locality does not remove validation needs.",
        "C": "Clear valid-use paths and explicit security assumptions make it easier for callers to preserve the API's intended boundary.",
        "D": "Hidden ownership and authority rules make it harder for consumers to use an interface safely."
      }
    },
    "q02": {
      "options": {
        "A": "Explicit input, ownership, lifetime, and failure agreements tell both implementers and callers which invariants must hold.",
        "B": "Documentation states the contract, while regression tests check whether the implementation continues to honor it.",
        "C": "Contracts should guide runtime checks and implementation decisions rather than remain unenforced comments.",
        "D": "A typed parameter can still contain an out-of-range, unauthorized, or otherwise invalid value."
      }
    },
    "q03": {
      "options": {
        "A": "Reusing primitives for unrelated concepts makes accidental substitution easier for callers and harder for the compiler to detect.",
        "B": "Domain-specific types and scoped enums distinguish concepts and make unsupported combinations harder to pass accidentally.",
        "C": "Magic values can make valid data, absence, and failure ambiguous rather than improve the type contract.",
        "D": "Hiding failures prevents callers from distinguishing a usable value from an unsuccessful operation."
      }
    },
    "q04": {
      "options": {
        "A": "Access to an object can be borrowed or restricted and does not automatically confer ownership.",
        "B": "Deferring cleanup responsibility can cause leaks, double release, and use after the actual owner has destroyed the resource.",
        "C": "A raw pointer can represent borrowing as well as transfer, so ownership must be stated explicitly.",
        "D": "An explicit resource contract establishes which lifetimes callers may rely on and who performs cleanup."
      }
    },
    "q05": {
      "options": {
        "A": "Boundary checks establish that incoming values satisfy the assumptions required before constructing trusted internal state.",
        "B": "Validation may reject input; it does not automatically transform every submitted value into something semantically acceptable.",
        "C": "Valid representation does not establish the caller's permission to access an object or perform an action.",
        "D": "Local library interfaces can receive invalid or attacker-influenced values and still need to defend their invariants."
      }
    },
    "q06": {
      "options": {
        "A": "Partial effects require a documented failure guarantee, rather than leaving callers to infer what changed.",
        "B": "Diagnostic usefulness does not justify exposing credentials, private data, or sensitive internals in returned errors.",
        "C": "Safe rejection preserves the stated invariants, resource cleanup, and clear information about the operation's outcome.",
        "D": "Silent failure can make callers treat invalid output or incomplete work as a successful operation."
      }
    },
    "q07": {
      "options": {
        "A": "Passing narrowly scoped authority reduces reliance on broad process-wide privileges and limits what an operation can exercise.",
        "B": "Capabilities represent authority that still needs deliberate creation, scope, and delegation decisions.",
        "C": "The purpose is to constrain authority, rather than reduce source-file count.",
        "D": "Capability holders and implementers still need documented scope, lifetime, and delegation boundaries."
      }
    },
    "q08": {
      "options": {
        "A": "Versions can change checks, defaults, errors, and compatibility assumptions that affect secure behavior.",
        "B": "A changed contract can invalidate a caller's security assumptions even when the call still compiles.",
        "C": "Age alone does not establish that a version has stronger protections or fewer known defects.",
        "D": "Compatibility decisions must address security requirements rather than automatically retaining unsafe validation or authorization behavior."
      }
    },
    "q09": {
      "options": {
        "A": "Happy-path tests omit the rejection and recovery behavior that enforces important security boundaries.",
        "B": "Formatting does not establish how the API behaves under invalid input or failure.",
        "C": "Invalid data, denied operations, limits, and operational failures exercise the boundaries that successful calls do not cover.",
        "D": "Ideal performance tests alone do not establish safe behavior under misuse, exhaustion, or denied access."
      }
    },
    "q10": {
      "options": {
        "A": "Undocumented requirements invite inconsistent caller assumptions that are difficult to correct after adoption.",
        "B": "Checks performed after a sensitive operation cannot prevent effects already caused by invalid input.",
        "C": "Ignoring every error can cause callers to rely on invalid results or incomplete state.",
        "D": "Reviewing trust, ownership, validation, rejection, and authority together reveals contracts that callers could otherwise violate accidentally."
      }
    }
  }
};
