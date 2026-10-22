window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-b1ffabdc32",
  "questions": {
    "q1": {
      "options": {
        "A": "Compiler restrictions should prompt sound design rather than automatic expansion of unsafe code.",
        "B": "Language features, sound APIs, focused review, and tests can prevent invalid memory operations from being easily expressed.",
        "C": "Ownership checks help review but do not eliminate unsafe assumptions, boundary contracts, or API design obligations.",
        "D": "Compilation does not establish complete security of application logic, authorization, dependencies, configuration, or operations."
      }
    },
    "q2": {
      "options": {
        "A": "Safe API design determines how callers can preserve the memory invariants that language checks support.",
        "B": "Invalid input can still trigger panics, resource exhaustion, or unauthorized actions despite memory safety.",
        "C": "Ownership, borrowing, lifetimes, and type checks prevent many ordinary invalid accesses before execution.",
        "D": "Dependency implementations and supply-chain integrity still require review beyond the compiler's memory-safety checks."
      }
    },
    "q3": {
      "options": {
        "A": "Application security requires reviewed boundaries, validated inputs, trusted dependencies, and controlled operations beyond successful compilation.",
        "B": "The compiler checks language properties rather than proving every business decision or authorization rule correct.",
        "C": "Compiler-enforced ownership and access rules provide substantial protection against many memory-safety defects.",
        "D": "Foreign contracts often include manual assumptions that compilation alone cannot verify."
      }
    },
    "q4": {
      "options": {
        "A": "Ownership identifies resource responsibility rather than determining which log fields contain sensitive information.",
        "B": "Program ownership is distinct from authenticating an external user's identity or checking permissions.",
        "C": "Dependency version freshness is a package-maintenance concern rather than a value's ownership relationship.",
        "D": "Ownership makes responsibility for a value's valid use and eventual cleanup explicit in the program."
      }
    },
    "q5": {
      "options": {
        "A": "Lifetimes describe validity relationships without making all data globally stored or permanently alive.",
        "B": "A reference's lifetime must be compatible with the continued existence of the data it borrows.",
        "C": "Tests still verify implementation behavior, boundary cases, and application requirements beyond lifetime checking.",
        "D": "Lifetime relationships work with borrowing rules rather than offering an escape from them."
      }
    },
    "q6": {
      "options": {
        "A": "Types encode useful invariants but do not eliminate all checks of external input and runtime state.",
        "B": "Some systems need unsafe implementation details; types help contain and expose them through sound interfaces.",
        "C": "Validated construction and meaningful types can exclude invalid states from ordinary internal application operations.",
        "D": "A string's safety depends on context-specific meaning and validation rather than its primitive type alone."
      }
    },
    "q7": {
      "options": {
        "A": "Foreign assumptions remain relevant and should be documented alongside unsafe operations that depend on them.",
        "B": "Unsafe operations can be justified, but hiding them makes their manual safety obligations harder to inspect.",
        "C": "Explicit boundaries and documentation expose the invariants that programmers must preserve where automatic verification is incomplete.",
        "D": "Unsafe code can compile with violated preconditions, so testing and careful review still matter."
      }
    },
    "q8": {
      "options": {
        "A": "The compiler cannot fully verify external allocation, cleanup, pointer validity, or representation contracts.",
        "B": "FFI documentation records obligations shared by Rust and foreign code, making correct use reviewable.",
        "C": "Foreign calls may violate memory assumptions unless both sides preserve a carefully defined contract.",
        "D": "FFI requires agreement on valid pointers, ownership, allocation, representation, and permitted access lifetimes."
      }
    },
    "q9": {
      "options": {
        "A": "Direct indexing can panic when assumptions about length or valid indexes are wrong.",
        "B": "Indexing does not validate the structure, completeness, or semantic rules of externally supplied data.",
        "C": "A particular valid access does not prove that an entire input has the expected shape.",
        "D": "Invalid direct indexing generally panics instead of returning a substitute element or safe default value."
      }
    },
    "q10": {
      "options": {
        "A": "Concurrent behavior affects availability, progress, ordering, cancellation, and reliability and therefore needs deliberate design.",
        "B": "Data-race prevention does not prevent deadlocks, starvation, unbounded work, or other availability failures.",
        "C": "Safe Rust does not automatically cap tasks, queue lengths, memory use, or connection counts.",
        "D": "Send and Sync express thread-safety constraints but do not prove correct locking, bounded work, or shutdown behavior."
      }
    },
    "q11": {
      "options": {
        "A": "Comments and names help understanding but do not establish the validity of unsafe operations and boundary assumptions.",
        "B": "Executable size does not show whether references, allocations, indexes, or concurrency contracts are valid.",
        "C": "Reviewing manual boundaries and failure paths tests the assumptions most likely to escape ordinary compiler guarantees.",
        "D": "One successful compilation does not exercise unsafe preconditions, invalid inputs, failures, or concurrent execution behavior."
      }
    },
    "q12": {
      "options": {
        "A": "API design controls which memory operations callers can express and is central to preserving safety invariants.",
        "B": "Broad unsafe regions enlarge the set of manual assumptions that must remain correct across future changes.",
        "C": "Tests check behavior and boundaries beyond what compilation and static lifetime checking can establish.",
        "D": "Dependable memory safety combines clear ownership, sound interfaces, small trusted regions, focused testing, and review."
      }
    }
  }
};
