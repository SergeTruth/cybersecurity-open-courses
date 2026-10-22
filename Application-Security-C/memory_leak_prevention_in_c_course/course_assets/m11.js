window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-a2678e329f",
  "questions": {
    "q1": {
      "options": {
        "A": "A leak leaves storage reserved without a correct reachable ownership path to release it when required.",
        "B": "A resource legitimately transferred to a caller can remain allocated after the callee returns.",
        "C": "Available address space does not restore a lost allocation handle or correct ownership.",
        "D": "Allocator rounding is not the same as losing the ability to release owned storage."
      }
    },
    "q2": {
      "options": {
        "A": "Pointer type does not state every transfer and deallocation responsibility in C.",
        "B": "Assignment alone does not change the documented owner or permission to free the target.",
        "C": "Clearing a local variable cannot explain which other component owns the allocation.",
        "D": "The program and API must separately define the meaning, lifetime, and release responsibility associated with the stored address."
      }
    },
    "q3": {
      "options": {
        "A": "An allocator does not automatically free an allocation when a pointer variable is reassigned.",
        "B": "Overwriting the final owned reference can leave reserved storage unreachable by the program's cleanup logic.",
        "C": "Internal allocator records do not supply a general portable way to recover a lost ownership handle.",
        "D": "Losing the final reference can leak an allocation regardless of the replacement's size."
      }
    },
    "q4": {
      "options": {
        "A": "Initialization to null helps track state but does not release objects successfully acquired before a later error.",
        "B": "Waiting for process exit does not establish correct reusable function or resource-lifecycle behavior.",
        "C": "Failure exits must account for resources already acquired so they do not bypass the appropriate release path.",
        "D": "Callers cannot reliably free hidden allocations that a failed callee never transferred or returned."
      }
    },
    "q5": {
      "options": {
        "A": "Borrowers use an object within its owner's lifetime without independently scheduling its deallocation.",
        "B": "Retaining a pointer longer does not automatically transfer ownership or extend validity.",
        "C": "Const qualification does not determine the owner of the referenced storage.",
        "D": "Copying an address does not establish safe shared ownership or permit either holder to free it arbitrarily."
      }
    },
    "q6": {
      "options": {
        "A": "A container must not release borrowed elements merely because their pointers appear in its storage.",
        "B": "The container's own storage duration does not determine who owns its elements.",
        "C": "Element contracts establish who frees stored objects and what happens on removal, replacement, and destruction.",
        "D": "A non-null return does not define transfer semantics, and replacing an element can require releasing or returning the previous one."
      }
    },
    "q7": {
      "options": {
        "A": "Freeing an outer C structure does not automatically release its separately allocated fields.",
        "B": "A failed constructor may already own several initialized members requiring cleanup.",
        "C": "Borrowed and uninitialized fields must be distinguished from valid owned allocations before release.",
        "D": "Dedicated cleanup follows each successfully acquired nested resource and supports defined partial-construction states."
      }
    },
    "q8": {
      "options": {
        "A": "For nonzero resize failure, the original object remains owned and should not be overwritten by the null result.",
        "B": "A temporary preserves the original allocation handle on a failed nonzero resize; zero-size requests need explicit handling.",
        "C": "Both growth and shrink operations can require new storage and invalidate earlier assumptions.",
        "D": "Recording requested capacity after failure misrepresents the storage the program actually owns."
      }
    },
    "q9": {
      "options": {
        "A": "A failed operation should preserve pointer, content, count, and capacity invariants describing the original usable object.",
        "B": "Publishing an intended count early can expose data or storage that has not been established.",
        "C": "For a failed nonzero realloc, the old allocation remains valid under its prior contract.",
        "D": "Metadata must remain accurate for all consumers rather than depend on every later access reinterpreting an error."
      }
    },
    "q10": {
      "options": {
        "A": "A clean report covers the checked run and does not identify every intentional retention or hidden ownership error.",
        "B": "Static evidence does not universally infer the application's correct release and transfer intent.",
        "C": "Unit-level allocation failures can reveal cleanup gaps before complex integration obscures them.",
        "D": "Tools find candidate leaks and untested exits while ownership design establishes exactly which component must release each resource."
      }
    }
  }
};
