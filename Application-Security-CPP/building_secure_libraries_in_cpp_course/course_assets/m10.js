window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-8ad5fd73b9",
  "questions": {
    "q01": {
      "options": {
        "A": "Reusable sensitive operations must defend their contracts because callers can supply different data, authority, and lifetime assumptions.",
        "B": "Sharing an address space does not establish that every caller supplies valid or permitted input.",
        "C": "Library functions can allocate, parse, access secrets, or perform privileged actions and therefore expose security-relevant boundaries.",
        "D": "Multiple consumers and evolving call paths make library-owned invariant enforcement necessary even when callers also validate."
      }
    },
    "q02": {
      "options": {
        "A": "Silently interpreting every input can hide invalid or ambiguous states rather than make misuse difficult.",
        "B": "Safe defaults and constrained representations guide callers toward valid behavior and make dangerous combinations harder to construct.",
        "C": "Unrestricted void pointers obscure type and lifetime contracts that callers need to use the interface safely.",
        "D": "Disabling protections by default makes ordinary use depend on each caller remembering to configure security correctly."
      }
    },
    "q03": {
      "options": {
        "A": "Parameter names alone cannot reliably establish borrowing, transfer, retention, or cleanup responsibilities.",
        "B": "An ownership contract defines resource creation, permitted lifetime relationships, transfers, and the component responsible for release.",
        "C": "Returned pointers can be borrowed, shared, or library-owned; deletion responsibility requires an explicit contract.",
        "D": "RAII manages an owner's cleanup but does not automatically document the validity of references that escape it."
      }
    },
    "q04": {
      "options": {
        "A": "Checking representation, bounds, meaning, and policy before use prevents invalid values from driving allocation or sensitive effects.",
        "B": "Validation after an operation cannot prevent side effects already triggered by invalid input.",
        "C": "Other callers can bypass one consumer's checks, so the library must enforce its own boundary assumptions.",
        "D": "A parsed value can still request an operation forbidden to the caller or invalid in the current state."
      }
    },
    "q05": {
      "options": {
        "A": "Implementation-specific exceptions may expose internals or depend on runtime behavior that the receiving boundary cannot support.",
        "B": "Reporting success after failure can cause callers to act on invalid outputs or incomplete state.",
        "C": "Detailed inputs can contain credentials or private data and create another exposure path when logged.",
        "D": "Stable errors let callers handle rejection deliberately while preserving invariants and understanding whether any state changed."
      }
    },
    "q06": {
      "options": {
        "A": "Version labels express policy but do not prove that compiled representations and calling contracts remain compatible.",
        "B": "A header can remain source-compatible while a new binary breaks previously compiled consumers.",
        "C": "Independent evolution requires explicit source, binary, behavioral, and lifecycle compatibility expectations for each release.",
        "D": "Compiled object files can retain layout and calling assumptions even when delivered through static libraries."
      }
    },
    "q07": {
      "options": {
        "A": "Concurrency contracts must describe shared state, reentrancy, callbacks, and value lifetimes so callers can coordinate operations correctly.",
        "B": "One atomic operation does not make a larger sequence or all shared state thread-safe.",
        "C": "Callbacks can reenter code or cause lock interactions even when internal state is protected by a mutex.",
        "D": "Const methods can access mutable or shared state and are not automatically safe for concurrent calls."
      }
    },
    "q08": {
      "options": {
        "A": "Transitive dependencies contribute code and behavior and belong in dependency risk assessment.",
        "B": "Unnecessary public linkage increases coupling and can expose implementation dependencies as consumer requirements.",
        "C": "Floating resolution can change shipped code without deliberate version, integrity, and compatibility review.",
        "D": "Reviewed pinned inputs, limited public coupling, and verified build protections make dependency and artifact behavior more predictable."
      }
    },
    "q09": {
      "options": {
        "A": "Signatures do not fully express threading, ownership, preconditions, or partial-failure behavior that callers must respect.",
        "B": "Contract changes also require updating reference documentation, migration guidance, and relevant tests.",
        "C": "Documented operating contracts help callers preserve the assumptions on which safe library behavior depends.",
        "D": "Callers need to understand security defaults to configure and use the library correctly; secrecy is not a substitute."
      }
    },
    "q10": {
      "options": {
        "A": "Compiler warnings cannot establish application invariants, safe ownership, authorization, or complete runtime behavior.",
        "B": "Delaying ownership and error contracts allows unsafe assumptions to become embedded in consumers.",
        "C": "Unit tests cover selected behaviors and do not replace fuzzing, compatibility checks, or real consumer integration evidence.",
        "D": "Secure publication combines intentional interfaces and ownership with validation, compatibility checks, tests, and inspectable release evidence."
      }
    }
  }
};
