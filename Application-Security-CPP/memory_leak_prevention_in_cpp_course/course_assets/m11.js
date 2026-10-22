window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-a0bb69651c",
  "questions": {
    "q01": {
      "options": {
        "A": "Long-running services can suffer retention problems well before normal process shutdown occurs.",
        "B": "Continued retention consumes finite resources and can degrade service reliability and availability.",
        "C": "Leaked handles and connections can exhaust limits and disrupt service even without heap exhaustion.",
        "D": "Operational problems can arise from cumulative retention long before physical memory is exhausted."
      }
    },
    "q02": {
      "options": {
        "A": "Unbounded retention and cyclic ownership can leak resources even when delete is not missing.",
        "B": "Ownership cycles, growing caches, and retained callbacks also cause unwanted resource retention.",
        "C": "Strong-reference cycles and unbounded caches can keep smart-pointer-managed objects alive indefinitely.",
        "D": "Stack unwinding does not automatically release a raw resource lacking a cleanup owner."
      }
    },
    "q03": {
      "options": {
        "A": "Read access can be borrowed and does not establish ownership or cleanup responsibility.",
        "B": "A borrower's final access does not transfer destruction responsibility from the actual owner.",
        "C": "Pointers can be observers or owners; they do not all have equal destruction authority.",
        "D": "Ownership assigns responsibility for the resource's valid lifetime and matching release operation."
      }
    },
    "q04": {
      "options": {
        "A": "Borrowers must not destroy resources that another component still owns and uses.",
        "B": "Overwriting a borrowed pointer does not end the lifetime of its target object.",
        "C": "Borrowing grants temporary access while another owner retains lifetime and cleanup responsibility.",
        "D": "Temporary borrowing does not transfer cleanup authority merely because its scope has ended."
      }
    },
    "q05": {
      "options": {
        "A": "A scoped owner performs its matching cleanup when its destructor runs.",
        "B": "RAII also supports cleanup during exception unwinding through successfully constructed owners.",
        "C": "RAII ordinarily releases resources with their owners rather than requiring process-long retention.",
        "D": "RAII wrappers can own operating-system handles and library resources as well as memory."
      }
    },
    "q06": {
      "options": {
        "A": "Several independent lifetime owners need a deliberate sharing contract rather than unique ownership.",
        "B": "A borrowing parameter generally should not claim unique ownership of its target.",
        "C": "unique_ptr is movable but does not freely copy ownership among components.",
        "D": "unique_ptr clearly assigns one owner and releases the object when that ownership ends."
      }
    },
    "q07": {
      "options": {
        "A": "Reference counting does not collect cycles just because their counts happen to match.",
        "B": "Strong references in a cycle prevent counts reaching zero and block automatic destruction.",
        "C": "weak_ptr observes a control block without adding a strong ownership reference.",
        "D": "noexcept affects exception behavior and does not break strong-reference ownership cycles."
      }
    },
    "q08": {
      "options": {
        "A": "Explicit capacity, eviction, and cleanup policies bound retained entries and pending work.",
        "B": "Small entries can still consume substantial resources when their count grows without bound.",
        "C": "Producers need explicit backpressure or rejection rather than an assumed natural pause.",
        "D": "Destruction at shutdown does not limit memory consumed while the service is running."
      }
    },
    "q09": {
      "options": {
        "A": "A release function must match the allocation or resource API, not just its address.",
        "B": "A custom resource may require a library release function instead of C++ delete.",
        "C": "Use the creator's documented release operation with the correct handle and ownership contract.",
        "D": "A superficially similar cleanup API can violate allocator, handle, or library invariants."
      }
    },
    "q10": {
      "options": {
        "A": "One clean leak report cannot prove absence of every retention defect.",
        "B": "Different lifecycles and error paths require coverage beyond one representative execution.",
        "C": "Review can miss runtime retention patterns that tools and long-running tests expose.",
        "D": "Combine leak diagnostics, repeated lifecycle tests, and ownership review for complementary evidence."
      }
    }
  }
};
