window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-bbd95d1f2e",
  "questions": {
    "q01": {
      "options": {
        "A": "Allocator internals do not provide a portable ownership and capacity contract through an arbitrary pointer.",
        "B": "Non-nullness does not prove a pointer still designates a live accessible object.",
        "C": "Safe use needs separately established ownership, valid lifetime, bounds, and permitted access rather than an address alone.",
        "D": "Pointer type does not determine which function releases an object or how long aliases remain valid."
      }
    },
    "q02": {
      "options": {
        "A": "Explicit rejection and cleanup prevent failed acquisition from becoming an invalid dereference or trusted partial result.",
        "B": "Allocation can fail under limits and pressure even on virtual-memory systems.",
        "C": "Partial construction needs a documented valid state and cleanup contract rather than accidental continuation.",
        "D": "A retry without bounded policy and consistent resource state can repeat failure or leak partially acquired objects."
      }
    },
    "q03": {
      "options": {
        "A": "Receiving a pointer and its const qualification do not independently transfer cleanup responsibility.",
        "B": "Clearing one local pointer does not make repeated deallocation through other aliases safe.",
        "C": "Containers may own or borrow according to their actual documented contract.",
        "D": "An ownership rule establishes who retains the allocation and which component must eventually release it."
      }
    },
    "q04": {
      "options": {
        "A": "Even modest resize requests can move storage and invalidate old reference assumptions.",
        "B": "For nonzero resizing, failure preserves the old allocation while success can change storage, capacity, and alias validity.",
        "C": "Direct assignment can lose the original allocation handle when a nonzero resize fails.",
        "D": "Length and interior references may need adjustment when capacity and allocation lifetime change."
      }
    },
    "q05": {
      "options": {
        "A": "Publishing intended capacity before acquisition succeeds can let other code access storage that does not yet exist.",
        "B": "Portable code must not assume a pointer exposes the intended usable-size metadata.",
        "C": "Pointer, capacity, and relevant content state must agree before the resized object is made available for use.",
        "D": "Keeping a stale smaller capacity can misrepresent successful storage changes and confuse later operation contracts."
      }
    },
    "q06": {
      "options": {
        "A": "Independent pointer copies are separate variables and are not rewritten by a local null assignment.",
        "B": "Aliases need lifetime rules because nulling one owner does not invalidate every retained reference elsewhere.",
        "C": "Another copied ownership pointer can still attempt a repeated release.",
        "D": "Avoid relying on stale pointer values; non-dereferencing use does not restore the object's valid lifetime."
      }
    },
    "q07": {
      "options": {
        "A": "Used contents and total storage are separate quantities that must be tracked in documented consistent units.",
        "B": "This reverses the roles of initialized content length and available capacity.",
        "C": "Unused storage need not contain meaningful initialized data merely because it is allocated.",
        "D": "An ordinary pointer type does not identify the allocation's usable element count."
      }
    },
    "q08": {
      "options": {
        "A": "Unsigned size calculations can wrap even when their result is passed to the matching allocator type.",
        "B": "Calloc does not establish application-specific limits or every later size calculation's safety.",
        "C": "A wrapped nonzero size can look like a valid smaller allocation request.",
        "D": "Incorrect arithmetic can under-allocate storage while later indexing or copies rely on the larger intended range."
      }
    },
    "q09": {
      "options": {
        "A": "Exit-time reports need interpretation because some retained objects have an intentional documented lifetime.",
        "B": "Unreleased resources often point to missed cleanup, inconsistent ownership transfer, or untested partial-failure paths.",
        "C": "A clean exercised path does not establish correct cleanup for untested inputs.",
        "D": "A tool identifies evidence, while reviewers must establish the intended owner and safe cleanup location."
      }
    },
    "q10": {
      "options": {
        "A": "Borrow validity follows the documented owner lifetime rather than an assumed notification mechanism.",
        "B": "Const controls certain writes and does not keep the referenced allocation alive.",
        "C": "Borrowing avoids transfer but requires callers to stay within the owner's permitted access and lifetime contract.",
        "D": "Deallocation is an ownership action and cannot be claimed merely because local use ended."
      }
    },
    "q11": {
      "options": {
        "A": "Unexecuted production paths can contain defects absent from a clean diagnostic run.",
        "B": "Static analysis benefits from explicit contracts and cannot universally infer intended ownership.",
        "C": "Leak, bounds, and stale-reference checks address different defect classes.",
        "D": "Tools reveal selected lifetime and memory failures while explicit design establishes the valid resource behavior to preserve."
      }
    },
    "q12": {
      "options": {
        "A": "Consistent resource contracts tie acquisition, initialization, permitted access, and release to inspectable ownership state.",
        "B": "Nulling locals does not resolve undocumented transfers or stale external aliases.",
        "C": "One cleanup function cannot correct an undersized allocation or references already used after release.",
        "D": "Allocator diagnostics supplement explicit bounds and lifetime rules rather than replacing them."
      }
    }
  }
};
