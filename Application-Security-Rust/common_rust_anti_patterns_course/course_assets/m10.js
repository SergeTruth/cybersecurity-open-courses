window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-3f21685dd7",
  "questions": {
    "q1": {
      "options": {
        "A": "Warnings can identify real problems; an anti-pattern is broader than a warning that may be ignored.",
        "B": "Repeated convenient habits can create longer-term reliability, security, clarity, or maintenance costs.",
        "C": "An anti-pattern is a problematic habit rather than a required production design approach.",
        "D": "Enums and traits can improve design; using them does not inherently constitute an anti-pattern."
      }
    },
    "q2": {
      "options": {
        "A": "Rust compilation includes syntax checking, although successful syntax and type checking do not establish overall security.",
        "B": "The compiler does not approve dependency trust, log redaction, or every operational behavior.",
        "C": "Valid Rust can still have application-level defects in validation, errors, authority, dependencies, and resource handling.",
        "D": "Compiled applications can be tested throughout their lifecycle, including after a release is produced."
      }
    },
    "q3": {
      "options": {
        "A": "Repeated cloning can conceal ownership confusion and add copying or allocation costs that clearer borrowing avoids.",
        "B": "Cloning remains checked by Rust and does not switch off ownership or borrowing rules.",
        "C": "Cloning is sometimes intentional and appropriate; its purpose and cost should be reviewed rather than forbidden.",
        "D": "Clone does not establish synchronization or make every copied value safe for cross-thread sharing."
      }
    },
    "q4": {
      "options": {
        "A": "Tests remain useful while ownership or lifetime problems are investigated and the design is improved.",
        "B": "Adding shared ownership everywhere can obscure responsibilities without resolving the underlying access design.",
        "C": "Panicking on every error does not repair conflicting borrows or clarify ownership relationships.",
        "D": "Examining the ownership model and access sequence can produce a simpler design that satisfies borrowing rules."
      }
    },
    "q5": {
      "options": {
        "A": "These methods panic on failure cases rather than making every runtime error impossible.",
        "B": "Unwrap or expect can turn expected failures into panics instead of controlled, recoverable application behavior.",
        "C": "Extracting a successful value does not validate its domain meaning or establish its invariants.",
        "D": "Panic messages and logs can still expose sensitive data; these methods do not provide redaction."
      }
    },
    "q6": {
      "options": {
        "A": "Explicit domain concepts in signatures help avoid primitive obsession rather than exemplifying it.",
        "B": "Validated newtypes can encode meaning and constraints that raw strings fail to express.",
        "C": "Raw primitives can hide domain distinctions and allow invalid combinations that stronger types would prevent.",
        "D": "Enums model finite alternatives; primitive obsession concerns losing domain meaning through overly generic primitive values."
      }
    },
    "q7": {
      "options": {
        "A": "Newtypes and enums provide explicit static structure rather than turning every value dynamically typed.",
        "B": "External input still requires validation before it can be trusted to satisfy domain invariants.",
        "C": "Meaningful types expose intent and constrain representable states, making invalid combinations harder to construct.",
        "D": "Type modeling does not excuse unsafe operations from their validity and safety requirements."
      }
    },
    "q8": {
      "options": {
        "A": "A safety contract supports review but does not eliminate the need for tests or implementation checks.",
        "B": "Safety documentation explains invariants rather than converting raw pointers into another data representation.",
        "C": "External libraries still require trust and interface review independent of local safety comments.",
        "D": "The contract states the assumptions and invariants that justify each unsafe operation and its safe interface."
      }
    },
    "q9": {
      "options": {
        "A": "Parsing establishes representation, while range, consistency, authority, size, and business suitability require further checks.",
        "B": "Successfully parsed lengths or sizes may still exceed safe resource limits or trigger excessive allocation.",
        "C": "External data and operation boundaries need validation whether or not values are eventually stored in memory.",
        "D": "Parsing does not automatically establish business permissions, tenant ownership, or application-specific semantic rules."
      }
    },
    "q10": {
      "options": {
        "A": "Unbounded work does not guarantee short lock duration and can increase contention and delays.",
        "B": "Unlimited tasks or queues can exhaust resources and make overload, shutdown, and recovery unpredictable.",
        "C": "Cancellation requires explicit design; spawning unlimited work does not automatically make its behavior reviewable.",
        "D": "Monitoring is still needed to detect resource pressure, growing queues, and deteriorating application availability."
      }
    },
    "q11": {
      "options": {
        "A": "Features affect conditional compilation and dependency selection, so their security effects extend beyond comments.",
        "B": "Enabling features may activate optional dependencies rather than guarantee those dependencies remain unused.",
        "C": "Reviewing enabled features reveals additional dependencies, attack surfaces, protocol handlers, and runtime behavior.",
        "D": "Feature choices may enable dependencies with build scripts or macros instead of preventing their execution."
      }
    },
    "q12": {
      "options": {
        "A": "Compiler acceptance does not remove opportunities to improve clarity, validation, reliability, or operational safety.",
        "B": "Reviewing anti-patterns should improve code and design rather than assign blame for compiler diagnostics.",
        "C": "Different boundaries and ownership needs require appropriate designs rather than a single universal coding pattern.",
        "D": "Making assumptions explicit enables meaningful review of ownership, errors, types, inputs, resources, dependencies, and operations."
      }
    }
  }
};
