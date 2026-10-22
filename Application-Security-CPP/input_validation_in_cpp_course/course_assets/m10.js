window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-3a2bffaab9",
  "questions": {
    "q1": {
      "options": {
        "A": "Removing punctuation does not define which values are semantically valid for an operation.",
        "B": "Validation produces a value only after its representation satisfies a stated contract.",
        "C": "Successful storage allocation does not validate input structure, meaning, or allowed range.",
        "D": "Encoding must match each output context and cannot replace semantic input validation."
      }
    },
    "q2": {
      "options": {
        "A": "A defined contract makes expected shape, conversion, and semantic limits reviewable.",
        "B": "A type's representable values can greatly exceed the application's permitted values.",
        "C": "Scattered rules can disagree about validity and make bypasses harder to detect.",
        "D": "Observed inputs are not a sufficient specification of permitted security-sensitive values."
      }
    },
    "q3": {
      "options": {
        "A": "Failed parsers can leave outputs unchanged or partially modified depending on their contract.",
        "B": "Some parsers report errors without exceptions and still require explicit result checks.",
        "C": "Standard containers manage storage but do not establish that parsing succeeded completely.",
        "D": "Check success, complete consumption, and any partial output before accepting a parsed value."
      }
    },
    "q4": {
      "options": {
        "A": "Unsigned conversion can wrap negative values and does not enforce resource budgets.",
        "B": "Untrusted sizes can cause overflow, out-of-bounds access, and excessive computational work.",
        "C": "Validate sizes and arithmetic before they drive allocation or other expensive operations.",
        "D": "Valid individual elements do not make an unbounded collection affordable or consistent."
      }
    },
    "q5": {
      "options": {
        "A": "Whitespace trimming does not implement Unicode normalization or an application identity policy.",
        "B": "Validation and authorization must use a consistent canonical representation at the correct boundary.",
        "C": "Representation differences can bypass comparisons unless normalization and comparison rules agree.",
        "D": "Canonicalization follows defined equivalence rules rather than converting every string into ASCII."
      }
    },
    "q6": {
      "options": {
        "A": "Duplicate security fields can create conflicting interpretations between parsers and downstream consumers.",
        "B": "Balanced delimiters do not establish required fields, types, limits, or semantic validity.",
        "C": "Unknown fields need an explicit policy and should not silently override known security fields.",
        "D": "Validate structural rules and semantic limits, including duplicates and bounded nesting."
      }
    },
    "q7": {
      "options": {
        "A": "Syntactically valid input can still impose excessive memory or computational costs.",
        "B": "Parsing boundaries need local limits even when infrastructure supplies additional protection.",
        "C": "A large collection can exceed total budgets despite bounded individual elements.",
        "D": "CPU, recursion, and total work need limits in addition to allocated memory."
      }
    },
    "q8": {
      "options": {
        "A": "Publishing fields before complete validation exposes partially trusted state to the application.",
        "B": "Typed rejection keeps incomplete or invalid state from escaping into trusted consumers.",
        "C": "Error messages should omit secrets and unnecessary copies of rejected sensitive data.",
        "D": "Silent repair can select an unintended action and hide policy violations."
      }
    },
    "q9": {
      "options": {
        "A": "Malformed and boundary-focused cases challenge the contract beyond ordinary successful examples.",
        "B": "Oversized cases verify that resource limits reject input before costly processing.",
        "C": "Different parser errors can follow distinct paths and require separate test coverage.",
        "D": "Coverage counts executed code without proving semantic limits are correctly enforced."
      }
    },
    "q10": {
      "options": {
        "A": "Library defaults may be looser than the application's actual validation contract.",
        "B": "Internal callers can carry untrusted data across boundaries and still need enforceable contracts.",
        "C": "Centralize the policy and validate before input affects resources, dispatch, or shared state.",
        "D": "Assertions may disappear in release builds and should not enforce untrusted-input rejection."
      }
    }
  }
};
