window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-ed9077a8d5",
  "questions": {
    "q1": {
      "options": {
        "A": "Many performance improvements use safe Rust; unsafe should require a specific justified low-level need.",
        "B": "Unsafe permits particular low-level operations whose safety conditions cannot always be established by automatic compiler checks.",
        "C": "Unsafe code increases the importance of explicit contracts, review, tests, and maintenance of invariants.",
        "D": "Unsafe does not switch off every language rule or justify skipping normal type and ownership design."
      }
    },
    "q2": {
      "options": {
        "A": "The compiler continues checking types and ordinary Rust rules while specific operations impose additional manual obligations.",
        "B": "Documentation is especially useful where reviewers must understand assumptions beyond the compiler's verification.",
        "C": "Programmers must establish and maintain the safety conditions required by operations the compiler cannot fully verify.",
        "D": "Callers and implementers still need clear contracts identifying valid inputs, ownership, lifetime, and other obligations."
      }
    },
    "q3": {
      "options": {
        "A": "Unsafe enables specific operations with manual proof obligations while the surrounding Rust type and ownership rules remain relevant.",
        "B": "Types and ownership still apply inside unsafe code rather than disappearing completely.",
        "C": "Unsafe code remains subject to many checks and language requirements despite its additional permitted operations.",
        "D": "Unsafe permits otherwise restricted operations, so it has a real effect on what code may express."
      }
    },
    "q4": {
      "options": {
        "A": "Safety obligations apply to private internals and implementations as well as publicly documented APIs.",
        "B": "A bare assertion does not identify the concrete conditions that make a pointer operation or external call valid.",
        "C": "A contract guides tests and review rather than replacing verification that its requirements are upheld.",
        "D": "A safety contract explains the exact preconditions, invariants, assumptions, and caller duties required for valid operation."
      }
    },
    "q5": {
      "options": {
        "A": "Raw pointers do not receive all the automatic validity and lifetime guarantees of ordinary safe references.",
        "B": "Valid raw access depends on manually established alignment, initialization, lifetime, aliasing, and ownership conditions.",
        "C": "Raw pointers still depend on valid storage lifetimes even though those lifetimes may not be tracked automatically.",
        "D": "Raw pointers alone do not establish who allocates, owns, or eventually releases the referenced storage."
      }
    },
    "q6": {
      "options": {
        "A": "Mutable static state can directly affect application behavior, global invariants, and cross-thread access.",
        "B": "Shared global mutation does not automatically receive the synchronization needed to avoid invalid concurrent access.",
        "C": "Global mutable state requires explicit synchronization, limited access, and review of initialization and lifetime assumptions.",
        "D": "Mutable statics are specifically capable of mutation, so they cannot be treated as inherently immutable values."
      }
    },
    "q7": {
      "options": {
        "A": "An unsafe implementation may violate its contract, so declaring it does not automatically prevent every misuse.",
        "B": "Unsafe traits have safety requirements that implementers must satisfy beyond ordinary compiler-checked trait syntax.",
        "C": "Safe or unsafe consumers may rely on the implementation preserving guarantees that the compiler cannot independently prove.",
        "D": "Unsafe traits define usable interfaces and obligations rather than serving only as non-executable comments."
      }
    },
    "q8": {
      "options": {
        "A": "Rust does not fully verify arbitrary foreign implementation behavior or every external memory contract.",
        "B": "Foreign calls need explicit ownership and release agreements because both sides may manage resources differently.",
        "C": "FFI can affect memory validity through pointers, representation, allocation, cleanup, retained callbacks, and threading.",
        "D": "Differing foreign conventions create manual obligations around representation, ownership, error behavior, allocation, and concurrency."
      }
    },
    "q9": {
      "options": {
        "A": "A sound safe interface checks or structurally enforces the conditions required by its unsafe implementation.",
        "B": "Broad unsafe surfaces distribute manual obligations to more callers and make invariant preservation harder to review.",
        "C": "API documentation should explain valid use and any obligations relevant to soundness and lifecycle behavior.",
        "D": "Requiring every caller to manage raw assumptions increases risk compared with enforcing them in a sound abstraction."
      }
    },
    "q10": {
      "options": {
        "A": "Useful safety comments should identify the assumptions and show why they hold at that operation.",
        "B": "Explaining validity under concrete conditions gives reviewers a checkable argument instead of an unsupported assertion.",
        "C": "Compilation cannot establish every unsafe precondition, so a valid safety explanation remains necessary.",
        "D": "Comments, review, and tests provide complementary evidence; none automatically replaces the other two."
      }
    },
    "q11": {
      "options": {
        "A": "Tests need documented expectations to determine whether an implementation preserves its required safety conditions.",
        "B": "Unsafe boundaries also need tests for invalid inputs, edge cases, lifecycle transitions, and regression risks.",
        "C": "Boundary and regression tests help detect later changes that violate the assumptions supporting unsafe operations.",
        "D": "Tests improve confidence but cannot prove that every possible execution or future change remains sound."
      }
    },
    "q12": {
      "options": {
        "A": "The security goal is to avoid undefined behavior by preserving validity conditions rather than explore it as normal operation.",
        "B": "Unsafe trust boundaries need concentrated review because their correctness depends on manually maintained safety arguments.",
        "C": "Strict safe-code rules should prompt deliberate design, not automatic use of unsafe as a workaround.",
        "D": "Unsafe should remain a small justified boundary with clear contracts, focused tests, careful review, and ongoing maintenance."
      }
    }
  }
};
