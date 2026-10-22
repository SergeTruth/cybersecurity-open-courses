window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-1487b8051c",
  "questions": {
    "q1": {
      "options": {
        "A": "Replacing one function leaves other ownership, trust, and failure contracts unresolved.",
        "B": "Deployment configuration and dependencies can affect security beyond the source syntax.",
        "C": "Storage abstractions do not establish user authority or validate application input semantics.",
        "D": "Secure behavior depends on coordinated contracts across memory, trust, failures, concurrency, and deployment."
      }
    },
    "q2": {
      "options": {
        "A": "RAII normally releases resources with their owners rather than retaining everything until exit.",
        "B": "Ownership transfers still need explicit semantics even when cleanup uses RAII.",
        "C": "Owner destruction performs cleanup on normal exits and during appropriate exception unwinding.",
        "D": "Resource acquisition can fail, and constructors must still preserve valid cleanup behavior."
      }
    },
    "q3": {
      "options": {
        "A": "Smart pointers express lifetime responsibility without validating every index or object invariant.",
        "B": "unique_ptr and shared_ptr make exclusive or shared ownership visible in interfaces.",
        "C": "Resetting the last owner can leave unmanaged observers dangling despite smart-pointer use.",
        "D": "Scoped values and exclusive ownership remain preferable where independent shared lifetime is unnecessary."
      }
    },
    "q4": {
      "options": {
        "A": "Views borrow storage, so every use must respect lifetime and invalidation requirements.",
        "B": "Views do not generally copy and own the elements they expose.",
        "C": "string_view does not guarantee null termination at its logical end.",
        "D": "span exposes a range without automatically synchronizing access to its underlying storage."
      }
    },
    "q5": {
      "options": {
        "A": "Input must be rejected before it drives unsafe operations or externally visible changes.",
        "B": "Allocation success does not establish that a requested size meets resource policy.",
        "C": "Mutating first can publish invalid state or cause side effects before rejection.",
        "D": "Syntactic validity and authorization are separate decisions with different required evidence."
      }
    },
    "q6": {
      "options": {
        "A": "Throwing destructors can cause termination during unwinding and are not universal error reporting.",
        "B": "Review failures by the remaining valid state, resource ownership, and committed side effects.",
        "C": "Converting every failure to success hides unmet security and correctness requirements.",
        "D": "Remote error messages should avoid exposing unnecessary internal state or secrets."
      }
    },
    "q7": {
      "options": {
        "A": "Alignment alone does not make conflicting non-atomic accesses synchronized or race-free.",
        "B": "Unsynchronized reading can race with a concurrent write to the same location.",
        "C": "The scheduler does not automatically provide the synchronization required by the C++ memory model.",
        "D": "A data race invokes undefined behavior and cannot be treated as harmless stale data."
      }
    },
    "q8": {
      "options": {
        "A": "Standard algorithms still require sound key management, parameters, and randomness policies.",
        "B": "Successful compilation does not replace dependency provenance, configuration, and maintenance review.",
        "C": "Reviewed providers reduce improvised design and support security maintenance over time.",
        "D": "Understanding a custom cipher's source does not establish its cryptographic security."
      }
    },
    "q9": {
      "options": {
        "A": "File permissions do not justify unnecessary credential copies in diagnostic logs.",
        "B": "Secrets can spread through repositories, binaries, logs, fixtures, and redistributed artifacts.",
        "C": "Test fixtures can be copied or run in shared environments and must avoid real credentials.",
        "D": "Generic variable names do not protect secret values committed to source control."
      }
    },
    "q10": {
      "options": {
        "A": "No single tool proves all memory, concurrency, logic, and policy properties.",
        "B": "Fuzzing needs explicit expectations and cannot define the security contract by itself.",
        "C": "Static analysis does not establish the configuration of the actual deployed dependency set.",
        "D": "Different techniques expose different defects and provide complementary evidence about the system."
      }
    }
  }
};
