window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-a6ed9b2c9c",
  "questions": {
    "q01": {
      "options": {
        "A": "Allocation metadata does not choose the application's responsible owner or cleanup location.",
        "B": "Each dynamic object needs explicit responsibility for lifetime, transfer, and matching cleanup.",
        "C": "Borrowing does not transfer release responsibility to the first caller using an object.",
        "D": "Requested byte count does not determine which application scope owns an allocation."
      }
    },
    "q02": {
      "options": {
        "A": "Containers and RAII can still encounter allocation failure and need appropriate error handling.",
        "B": "Clear value ownership makes lifecycle decisions easier to review rather than hiding them.",
        "C": "Automatic cleanup and explicit owning types make lifetime responsibility easier to enforce.",
        "D": "RAII describes ownership and cleanup rather than converting dynamic allocations into stack storage."
      }
    },
    "q03": {
      "options": {
        "A": "Temporary mutation permission does not establish lifetime or destruction responsibility.",
        "B": "Knowing an allocation site does not identify who must eventually release its object.",
        "C": "Ownership can end at a scope or transfer and need not last until termination.",
        "D": "An owner must manage valid lifetime, deliberate transfer, and timely matching release."
      }
    },
    "q04": {
      "options": {
        "A": "A borrower uses another owner's object within a promised interval without assuming cleanup.",
        "B": "The final read does not grant a borrower permission to destroy the target.",
        "C": "Borrowing creates access rather than a second independent ownership responsibility.",
        "D": "A borrowed pointer or reference does not automatically extend its target's lifetime."
      }
    },
    "q05": {
      "options": {
        "A": "Several independent owners need a considered sharing model rather than unique ownership.",
        "B": "unique_ptr expresses exclusive lifetime responsibility and requires deliberate movement to transfer it.",
        "C": "A nullable temporary view generally should not claim ownership through unique_ptr.",
        "D": "unique_ptr normally destroys its target when the responsible owner ends."
      }
    },
    "q06": {
      "options": {
        "A": "Validation does not automatically widen expressions; choose safe arithmetic before evaluation.",
        "B": "An allocator only sees the computed size and cannot verify an earlier wrapped calculation.",
        "C": "Checks after allocation cannot repair arithmetic information already lost through wrapping.",
        "D": "Validate arithmetic and budgets before allocating, regardless of whether allocation would succeed."
      }
    },
    "q07": {
      "options": {
        "A": "Partial acquisition and failures must leave every acquired resource with a valid cleanup owner.",
        "B": "Exception propagation does not automatically delete raw allocations lacking scoped owners.",
        "C": "Retaining resources for hypothetical future success can leak or expose inconsistent state.",
        "D": "Failure does not make already acquired resources harmless or remove cleanup obligations."
      }
    },
    "q08": {
      "options": {
        "A": "A valid numeric prefix can be followed by invalid or unexpected trailing input.",
        "B": "Allocate only after checking the external value against representation and policy limits.",
        "C": "External sizes can be inconsistent, malicious, or beyond permitted resource budgets.",
        "D": "Reading an external size does not enforce a budget; explicit validation must do so."
      }
    },
    "q09": {
      "options": {
        "A": "Pool lifetimes may be shared, so objects do not necessarily have independent release schedules.",
        "B": "Document pool validity, reset, destruction, and exhaustion semantics for every borrower and owner.",
        "C": "Custom allocation can change release and lifetime assumptions that callers need documented.",
        "D": "Resetting an arena can invalidate storage still referenced by live application objects."
      }
    },
    "q10": {
      "options": {
        "A": "Passing tests does not guarantee enough memory for every future allocation request.",
        "B": "Instrumentation supplements rather than replaces explicit ownership and release contracts.",
        "C": "Exercised instrumentation can reveal leaks, stale accesses, allocation errors, and boundary defects.",
        "D": "Boundary cases provide evidence but do not prove every platform's allocation behavior."
      }
    }
  }
};
