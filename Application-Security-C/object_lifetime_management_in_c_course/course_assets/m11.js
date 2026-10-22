window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-7e933b3501",
  "questions": {
    "q01": {
      "options": {
        "A": "Lifetime defines when the object exists; valid use also depends on initialization, access, and bounds rules.",
        "B": "Type size is one storage property rather than the duration of the object's existence.",
        "C": "Naming does not determine whether an object remains valid during execution.",
        "D": "A pointer does not keep an object valid after its lifetime ends."
      }
    },
    "q02": {
      "options": {
        "A": "A reference value must be paired with valid lifetime, initialized state, bounds, and operation-specific access assumptions.",
        "B": "Ordinary pointers do not automatically carry every lifetime and ownership fact needed for safety.",
        "C": "Pointers can designate automatic, static, and dynamically allocated objects.",
        "D": "Cleanup ownership is an API and design contract rather than compiler metadata embedded in every pointer."
      }
    },
    "q03": {
      "options": {
        "A": "Ordinary automatic local objects cease to exist when execution leaves their lifetime-defining block.",
        "B": "Borrowers do not manually free ordinary automatic objects they observe.",
        "C": "Program-duration objects are associated with static storage rather than all automatic locals.",
        "D": "Allocation functions create dynamically managed storage rather than ordinary block-bound local objects."
      }
    },
    "q04": {
      "options": {
        "A": "After the automatic local's lifetime ends, the returned address cannot safely be used as a reference to that object.",
        "B": "Returning an address does not promote the local object into static storage.",
        "C": "The caller cannot extend an expired local lifetime merely by receiving its address.",
        "D": "Returning one pointer does not copy the local object into every global variable."
      }
    },
    "q05": {
      "options": {
        "A": "Available bytes do not alone establish meaningful field values or the invariants required for later operations.",
        "B": "Initialization establishes state rather than inherently releasing an object's storage.",
        "C": "A successful allocation can leave contents without the meaningful values the application requires.",
        "D": "C resource handling must distinguish acquired storage from a successfully initialized usable object."
      }
    },
    "q06": {
      "options": {
        "A": "Release ends the allocated object's lifetime for every alias, not only the variable passed to cleanup.",
        "B": "The allocator does not redirect independent stale pointer copies to a safe new object.",
        "C": "Other aliases refer to the same expired object even when their variables remain unchanged.",
        "D": "Borrowing does not become owning authority when the actual owner releases storage."
      }
    },
    "q07": {
      "options": {
        "A": "Long lifetime can create shared-state and coordination problems that still need explicit access and shutdown rules.",
        "B": "Static state can intentionally persist between calls and influence later operations.",
        "C": "Long-lived storage does not remove concurrency, ownership, or permitted-access requirements.",
        "D": "Static objects are not limited to the lifetime of a single expression."
      }
    },
    "q08": {
      "options": {
        "A": "A borrow grants only the documented access during the owner's valid lifetime and does not assign cleanup responsibility.",
        "B": "Ordinary pointer observation does not authorize a callee to deallocate the object.",
        "C": "A borrowed address does not keep its target alive without an explicit supporting lifetime protocol.",
        "D": "Borrowing can reference properly initialized objects and does not imply uninitialized storage."
      }
    },
    "q09": {
      "options": {
        "A": "Returned-pointer contracts must establish ownership, validity duration, mutability, and the appropriate release or retention behavior.",
        "B": "Nonzero representation does not prove that a returned pointer can be used safely.",
        "C": "Guessing lifetime and ownership creates inconsistent release or retention assumptions.",
        "D": "Returned pointers need review because their target can have different ownership and storage-duration rules."
      }
    },
    "q10": {
      "options": {
        "A": "Partial construction needs a known cleanup state so only live owned members are released after failure.",
        "B": "An incomplete object's unestablished invariants can make ordinary API use invalid.",
        "C": "Failed initialization can already own resources and therefore needs explicit cleanup rules.",
        "D": "Partial initialization can occur with dynamic or automatic storage and does not imply static duration."
      }
    },
    "q11": {
      "options": {
        "A": "Diagnostics expose evidence while explicit object and interface contracts establish the intended valid behavior.",
        "B": "Tool results cannot supply every missing lifetime and ownership guarantee for callers.",
        "C": "Unexecuted inputs and future changes can violate assumptions despite a clean current check.",
        "D": "The intended owner must be designed and documented rather than universally inferred by tooling."
      }
    },
    "q12": {
      "options": {
        "A": "Safe use coordinates object existence, initialized invariants, access authority, borrowing duration, and eventual cleanup.",
        "B": "A stored address can outlive the object and does not prove permanent validity.",
        "C": "Storage duration informs lifetime but does not automatically implement resource cleanup and transfer policy.",
        "D": "Different resource and API contracts require deliberate choices beyond one universal cleanup pattern."
      }
    }
  }
};
