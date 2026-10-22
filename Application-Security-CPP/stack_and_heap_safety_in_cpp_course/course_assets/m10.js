window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-4f8ebddd81",
  "questions": {
    "q1": {
      "options": {
        "A": "Heap storage can be appropriate when explicit ownership must outlive the current scope.",
        "B": "Both storage classes need explicit valid lifetimes, bounds, owners, and cleanup responsibility.",
        "C": "Global storage can increase coupling and does not automatically provide safe access bounds.",
        "D": "Annotations support review but do not replace tests of actual lifetime behavior."
      }
    },
    "q2": {
      "options": {
        "A": "The problem is ended object lifetime rather than the performance of reference syntax.",
        "B": "Returning leaves a reference to a local object whose lifetime has ended.",
        "C": "Ordinary references do not extend an automatic local object's lifetime after return.",
        "D": "A later heap allocation cannot repair an already dangling reference to the destroyed local object."
      }
    },
    "q3": {
      "options": {
        "A": "Allocation comments identify a site without assigning lifetime and deletion responsibility.",
        "B": "Hidden cleanup among raw aliases obscures responsibility and makes lifetime review harder.",
        "C": "An allocation needs a known owner rather than eventual accidental discovery by another component.",
        "D": "The ownership contract must identify who releases the object and under what conditions."
      }
    },
    "q4": {
      "options": {
        "A": "Source termination does not prove sufficient writable capacity in the destination buffer.",
        "B": "An unbounded copy can overflow the destination before reaching a valid source terminator.",
        "C": "Preserve range extent and validate indexes and subranges before accessing any element.",
        "D": "Capacity includes storage beyond size where container elements may not be constructed."
      }
    },
    "q5": {
      "options": {
        "A": "Dangling access uses an observer after destruction or invalidation ended its permitted access.",
        "B": "Variable naming does not determine whether an object's lifetime remains valid.",
        "C": "Copying an owned value can create a separate live object with its own lifetime.",
        "D": "Initialization before use is appropriate and does not itself create dangling access."
      }
    },
    "q6": {
      "options": {
        "A": "Mutation can invalidate existing iterators, making later operations violate their required preconditions.",
        "B": "Reallocation commonly invalidates iterators that refer to the container's previous storage.",
        "C": "Ordinary iterators borrow elements rather than allocating independent copies of them.",
        "D": "Invalidation affects correctness and can produce undefined behavior, not merely slower traversal."
      }
    },
    "q7": {
      "options": {
        "A": "RAII does not prevent arbitrary logic defects in operations preceding cleanup.",
        "B": "Different RAII owners can have distinct scoped lifetimes rather than one global lifetime.",
        "C": "Destruction of the owner performs matching cleanup when that ownership lifetime ends.",
        "D": "Exception unwinding normally invokes destructors of successfully constructed automatic owners."
      }
    },
    "q8": {
      "options": {
        "A": "Independent shared lifetime responsibility requires a sharing model rather than unique ownership.",
        "B": "unique_ptr normally releases the target with its owner instead of intentionally retaining it forever.",
        "C": "A borrowed reference or pointer better expresses temporary access to a stack object.",
        "D": "unique_ptr clearly expresses one responsible owner for a dynamically allocated object."
      }
    },
    "q9": {
      "options": {
        "A": "Validation should make allocation preconditions clearer rather than hide them from reviewers.",
        "B": "Reject invalid or excessive requests before their sizes consume memory or overflow calculations.",
        "C": "Validating sizes does not require moving externally sized objects onto the stack.",
        "D": "Successful allocation does not make every subsequent index automatically valid."
      }
    },
    "q10": {
      "options": {
        "A": "Analysis and instrumentation supplement good ownership and bounds design with defect detection.",
        "B": "Passing tool checks cannot certify the absence of every possible memory defect.",
        "C": "Explicit lifetime and ownership contracts remain necessary even with strong diagnostic tooling.",
        "D": "These tools analyze source or instrument execution rather than merely improving source notes."
      }
    }
  }
};
