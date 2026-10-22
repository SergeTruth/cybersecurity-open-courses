window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-5b79f4c1aa",
  "questions": {
    "q01": {
      "options": {
        "A": "Tight budgets leave less tolerance for unexpected sizes, fragmentation, stack depth, and incomplete recovery.",
        "B": "Limited capacity increases the need to reject excessive or invalid input before consumption.",
        "C": "Useful bounded diagnostics remain important for observing faults and operational state.",
        "D": "C does not automatically scale buffers or prevent unsafe memory pressure."
      }
    },
    "q02": {
      "options": {
        "A": "A useful budget covers storage categories, simultaneous workloads, input limits, and worst-case use rather than average demand alone.",
        "B": "Compiler identity does not quantify the program's actual simultaneous memory requirements.",
        "C": "Parser comments alone omit other tasks, allocations, stack use, and deployment behavior.",
        "D": "One array does not account for all buffers, call stacks, shared state, and concurrent allocations."
      }
    },
    "q03": {
      "options": {
        "A": "Fixed storage still needs a contract defining safe sizes, termination, truncation, and rejection before memory operations.",
        "B": "Fixed buffers have a declared capacity and do not automatically grow.",
        "C": "An allocation strategy does not decide which component owns and may reuse storage.",
        "D": "Parsing safety depends on representation and semantic checks beyond selecting a fixed array."
      }
    },
    "q04": {
      "options": {
        "A": "Input-dependent call depth can exhaust a small stack unless the design establishes and enforces a safe bound.",
        "B": "Recursion adds call frames and is not inherently lower-stack than iteration.",
        "C": "Unbounded input can drive unbounded recursive work despite the chosen algorithm's intent.",
        "D": "The actual input and control flow determine depth unless explicit restrictions prevent growth."
      }
    },
    "q05": {
      "options": {
        "A": "Heap policy defines when allocation is allowed and how failure, fragmentation, ownership, and resource release are handled.",
        "B": "Constrained heaps can fail because of exhaustion, fragmentation, or enforced budgets.",
        "C": "Headless and embedded systems also need predictable allocation and cleanup rules.",
        "D": "An allocation call does not document ownership transfer or borrowing semantics."
      }
    },
    "q06": {
      "options": {
        "A": "Incremental processing can bound working storage while retaining enough validated state to interpret the complete input safely.",
        "B": "Streaming still needs total size, work, state, and message-completeness limits.",
        "C": "Chunking does not validate fields or make malformed data harmless by itself.",
        "D": "Streaming is intended to avoid requiring the entire input in one allocation."
      }
    },
    "q07": {
      "options": {
        "A": "An enforced maximum constrains memory and buffering demand before an oversized message controls resource consumption.",
        "B": "Other concurrent demands and fragmentation can still cause allocation failure within a message limit.",
        "C": "Binary formats and stream protocols also need explicit total-size constraints.",
        "D": "Size limits do not release resources acquired before a later error or disconnect."
      }
    },
    "q08": {
      "options": {
        "A": "Reused storage and untracked copies can extend secret lifetime unless ownership, clearing, and observability policy are deliberate.",
        "B": "Small devices can hold credentials, identity keys, personal data, and protected measurements.",
        "C": "Secret buffers need lifetime and access ownership so reuse does not expose prior contents.",
        "D": "Raw memory logging can disclose secrets and inconsistent state regardless of device size."
      }
    },
    "q09": {
      "options": {
        "A": "A safe failure path rejects unavailable work while maintaining invariants and releasing resources still owned by the operation.",
        "B": "Using an unacquired object can cause invalid access and corrupted state.",
        "C": "Silent partial updates can violate the application's resource and consistency contracts.",
        "D": "Earlier successful acquisitions still need appropriate release after a later failure."
      }
    },
    "q10": {
      "options": {
        "A": "Targeted low-resource tests exercise conditions likely in constrained deployments and expose hidden cleanup or state defects.",
        "B": "Pressure and partial acquisition failures are realistic production conditions.",
        "C": "Valid examples do not exercise exhaustion, truncation, or incomplete-initialization paths.",
        "D": "Tests check behavior against the budget; they do not define the intended limits automatically."
      }
    },
    "q11": {
      "options": {
        "A": "Measurements verify actual demand and failure behavior against an explicitly justified design budget.",
        "B": "Tools can report use but cannot determine every acceptable business and device limit.",
        "C": "Review is still needed to assess untested lifetimes and worst-case assumptions.",
        "D": "Development measurements can identify oversubscription and unsafe growth before release."
      }
    },
    "q12": {
      "options": {
        "A": "Bounded resource contracts and tested safe rejection let the device remain controlled under malformed input and low-memory pressure.",
        "B": "Allocator selection does not establish every bounds, lifetime, secret, and failure rule.",
        "C": "Accepting oversized requests can exhaust capacity or violate downstream size assumptions.",
        "D": "Low-memory behavior is part of the required operating contract and needs relevant verification."
      }
    }
  }
};
