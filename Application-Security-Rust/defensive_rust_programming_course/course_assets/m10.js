window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-fd9b78bf1b",
  "questions": {
    "q1": {
      "options": {
        "A": "Result expresses possible failure, but callers still need deliberate error handling and recovery behavior.",
        "B": "Defensive programming combines language guarantees with engineering practices that make safe behavior explicit and reviewable.",
        "C": "Unsafe code introduces additional obligations and should not be a reflexive response to compiler restrictions.",
        "D": "Successful compilation does not establish correct authorization, validated inputs, trusted dependencies, or operational resilience."
      }
    },
    "q2": {
      "options": {
        "A": "Rust provides substantial memory-safety benefits, although those benefits address only part of application security.",
        "B": "Memory safety does not determine whether a user has permission to perform an operation.",
        "C": "Logic, validation, supply-chain, disclosure, and availability defects can remain despite memory-safe application code.",
        "D": "Rust applications commonly use dependencies whose origin, configuration, maintenance, and behavior require review."
      }
    },
    "q3": {
      "options": {
        "A": "Types can encode valid states and require validation before external data enters trusted domain operations.",
        "B": "Type-driven design supports review but does not eliminate implementation mistakes or unsafe assumptions.",
        "C": "A string's suitability depends on its intended context and the validation performed at relevant boundaries.",
        "D": "Runtime configuration still affects authority, exposure, limits, and other behavior that types alone cannot establish."
      }
    },
    "q4": {
      "options": {
        "A": "Newtypes complement tests by expressing distinctions and invariants; they do not verify every behavior automatically.",
        "B": "A newtype wraps a value with distinct meaning without requiring global storage or shared state.",
        "C": "Wrapping unvalidated input does not itself establish validity; constructors should enforce the required domain rules.",
        "D": "Separate types distinguish concepts such as identifiers and validated paths even when both use strings internally."
      }
    },
    "q5": {
      "options": {
        "A": "The compiler cannot infer every application's allowed ranges, business rules, tenant policy, or permissions.",
        "B": "Untrusted values can control sensitive operations, so parsing and domain validation must precede trusted use.",
        "C": "Safe Rust still needs validation of business meaning, resource limits, authorization inputs, and external operations.",
        "D": "Crossing into Rust does not change the trustworthiness or application-level validity of external input."
      }
    },
    "q6": {
      "options": {
        "A": "Unwrap and expect can panic on error or missing values rather than preventing panics.",
        "B": "These methods do not sanitize sensitive details that may appear in panic messages or logs.",
        "C": "Predictable failure cases can become panics instead of controlled error responses when extraction is careless.",
        "D": "Graceful recovery requires intentional handling; unwrap and expect do not provide it automatically."
      }
    },
    "q7": {
      "options": {
        "A": "Hidden assumptions make unsafe behavior harder to audit and can expose safe callers to invalid operations.",
        "B": "Spreading unsafe logic increases the surface over which reviewers must track and preserve manual invariants.",
        "C": "Small, documented boundaries concentrate the invariants that justify unsafe operations and make validation more manageable.",
        "D": "Compilation does not prove unsafe preconditions, so targeted tests and review remain necessary."
      }
    },
    "q8": {
      "options": {
        "A": "Rust cannot automatically verify every foreign function's pointer validity, ownership conventions, or synchronization requirements.",
        "B": "FFI documentation is essential because both sides must agree on memory ownership and call behavior.",
        "C": "Foreign code can violate memory assumptions or return invalid pointers, making FFI directly relevant to memory safety.",
        "D": "Reviewing representation, lifetime, allocation, ownership, and threading contracts helps keep foreign calls within valid assumptions."
      }
    },
    "q9": {
      "options": {
        "A": "Features may activate new parsers, protocols, integrations, or dependency code that changes the application's security exposure.",
        "B": "Feature configuration does not replace lockfiles or records of the versions used in a build.",
        "C": "Enabling features does not establish that a dependency's implementation or supply chain is trustworthy.",
        "D": "Features can alter executable code and dependencies rather than merely modify descriptive comments."
      }
    },
    "q10": {
      "options": {
        "A": "Clear event names and outcomes can provide useful evidence without unnecessarily exposing sensitive values.",
        "B": "Logs can distribute and retain secrets or personal data, so output should be minimized and redacted.",
        "C": "Non-sensitive operational evidence helps diagnose failures and investigate incidents without revealing protected application data.",
        "D": "Redacted failure details support troubleshooting when sensitive values and excessive internals have been removed."
      }
    },
    "q11": {
      "options": {
        "A": "Memory safety does not prevent excessive task creation, queue growth, connection pressure, or overload.",
        "B": "Limits bound consumption, while monitoring remains necessary to identify saturation and abnormal operating conditions.",
        "C": "Concurrency needs bounded work and controlled contention to protect availability and predictable failure behavior.",
        "D": "Concurrency affects availability, synchronization, cancellation, and access ordering, all of which can influence security."
      }
    },
    "q12": {
      "options": {
        "A": "Dependencies and operations can introduce security failures and belong within the application's trust review.",
        "B": "Broad unsafe boundaries make manual assumptions harder to maintain and enlarge the potential impact of mistakes.",
        "C": "Tests verify application behavior beyond the properties enforced by the Rust compiler.",
        "D": "Explicit constraints, review, tests, observability, and recovery practices extend language guarantees into resilient application behavior."
      }
    }
  }
};
