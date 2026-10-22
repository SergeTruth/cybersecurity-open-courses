window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-513f230a21",
  "questions": {
    "q1": {
      "options": {
        "A": "Substituted types can select different operations, overloads, and specializations.",
        "B": "Template behavior depends on the concrete types and customization paths actually instantiated.",
        "C": "Generic code can move, store, borrow, or destroy objects and therefore affects lifetime.",
        "D": "Uninstantiated paths and future supported types still need explicit contracts and review."
      }
    },
    "q2": {
      "options": {
        "A": "An expression can compile while violating the algorithm's intended semantic requirements.",
        "B": "Type-dependent syntax and behavior interact, so both need a coherent documented contract.",
        "C": "Constraints can check expressions without proving every required semantic law automatically.",
        "D": "Callers need visible requirements to instantiate and use generic code safely."
      }
    },
    "q3": {
      "options": {
        "A": "Compiling constraints does not replace tests of meaningful representative type behavior.",
        "B": "Constraints reject unsupported expressions and make the intended template input domain clearer.",
        "C": "Constraints normally restrict accepted types rather than admitting every possible program type.",
        "D": "Lifetime and ownership requirements still matter even when all constrained expressions compile."
      }
    },
    "q4": {
      "options": {
        "A": "A broad component can admit many more relevant combinations of type behavior.",
        "B": "Accepting unsupported behaviors enlarges the contract beyond what the implementation can safely preserve.",
        "C": "Explicit constraints and documentation reduce reliance on reviewers guessing hidden exclusions.",
        "D": "User-defined types can change operators, conversions, exceptions, and customization behavior."
      }
    },
    "q5": {
      "options": {
        "A": "Forwarding an argument does not generally extend the lifetime of a temporary source.",
        "B": "A correctly forwarded reference can still dangle if retained beyond its referent's lifetime.",
        "C": "Value category affects moves and borrowing, so forwarding can change ownership-related behavior.",
        "D": "Perfect forwarding preserves argument category while leaving lifetime and ownership obligations unchanged."
      }
    },
    "q6": {
      "options": {
        "A": "Dependent calls inside templates can participate in argument-dependent lookup.",
        "B": "Different argument types can select different overloads and associated namespace functions.",
        "C": "ADL can select user-defined operations associated with an argument's type and namespace.",
        "D": "ADL participates in function lookup and can determine which implementation actually executes."
      }
    },
    "q7": {
      "options": {
        "A": "Customizations can change security-relevant operations and need explicit constraints and review.",
        "B": "A specialization can replace implementation behavior rather than only changing a harmless selection label.",
        "C": "Documenting an extension point does not eliminate review of supplied custom behavior.",
        "D": "Undocumented specializations can create hidden dependencies and inconsistent policy assumptions."
      }
    },
    "q8": {
      "options": {
        "A": "Complex compile-time computation can increase build resources and make failures difficult to diagnose.",
        "B": "Metaprogramming can increase generated code or diagnostic complexity rather than always reducing them.",
        "C": "Compile-time selection can choose validation, authority, or ownership behavior used at runtime.",
        "D": "Compiler diagnostics remain important evidence about rejected instantiations and hidden template assumptions."
      }
    },
    "q9": {
      "options": {
        "A": "Supplied types can change comparison, allocation, movement, conversion, and exception behavior.",
        "B": "Types can have substantially different move guarantees, ordering semantics, and throwing operations.",
        "C": "Generic code must preserve invariants under the actual supplied operations and their failures.",
        "D": "Required operations and semantic guarantees belong in the generic algorithm's explicit contract."
      }
    },
    "q10": {
      "options": {
        "A": "Representative tests provide evidence but do not prove every admitted instantiation sound.",
        "B": "Diagnostics help explain violations but cannot replace a clear intended type contract.",
        "C": "Template-specific instantiations and customization behavior need coverage beyond ordinary call paths.",
        "D": "Exercise meaningful type variants and review the extension points that can alter security behavior."
      }
    }
  }
};
