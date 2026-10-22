window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-15c5fc20b4",
  "questions": {
    "q01": {
      "options": {
        "A": "A double free releases one allocation again after its ownership and valid lifetime have already ended.",
        "B": "Two distinct allocations can legitimately have the same requested size.",
        "C": "Borrowed access within the owner's lifetime does not inherently release the object twice.",
        "D": "A null check is not itself a repeated deallocation operation."
      }
    },
    "q02": {
      "options": {
        "A": "A named cleanup owner prevents multiple components from independently claiming responsibility for the same allocation.",
        "B": "Receiving a pointer does not automatically grant permission to free the referenced object.",
        "C": "Clear cleanup documentation helps reviewers and callers maintain the intended ownership rules.",
        "D": "Independent conflicting cleanup assumptions can cause both sides to release the same object."
      }
    },
    "q03": {
      "options": {
        "A": "Borrowing permits access under a lifetime contract without transferring the owner's responsibility to release storage.",
        "B": "An ownership transfer requires an explicit contract rather than ordinary borrowed access.",
        "C": "Freeing through every observer would release shared storage more than once.",
        "D": "Borrowers must stop using references before the owning object's valid lifetime ends."
      }
    },
    "q04": {
      "options": {
        "A": "Repeated branches can converge on the same resource with inconsistent assumptions about whether it was already released.",
        "B": "Duplicated releases can create double frees rather than guarantee exactly-once cleanup.",
        "C": "Code duplication does not explain whether a caller or callee owns the allocation.",
        "D": "Several cleanup paths can still execute during failure and need coordinated state."
      }
    },
    "q05": {
      "options": {
        "A": "The former owner must update its state so later cleanup does not release an object now owned elsewhere.",
        "B": "Ownership transfer should leave one responsible release path rather than two independent owners.",
        "C": "Callers need visible transfer and post-call validity rules to use the API correctly.",
        "D": "A transferred resource still needs a designated owner and eventual cleanup."
      }
    },
    "q06": {
      "options": {
        "A": "Null assignment updates one variable while other copied pointers can remain stale and attempt another release.",
        "B": "Pointer copies in other variables and structures are not automatically rewritten.",
        "C": "Changing the pointer value does not restore the freed allocation's lifetime.",
        "D": "Borrowers do not gain deallocation authority when the owner clears its local pointer."
      }
    },
    "q07": {
      "options": {
        "A": "Construction state must identify which members were actually acquired and which cleanup paths still own them.",
        "B": "Uninitialized fields can contain invalid values that must not be passed to deallocation functions.",
        "C": "Partial construction can already have acquired resources needing release on failure.",
        "D": "The constructor and API should expose ownership state rather than require caller guesses."
      }
    },
    "q08": {
      "options": {
        "A": "Destroy contracts identify managed resources, unaffected references, post-call state, and whether another invocation is supported.",
        "B": "Source location does not define lifetime or deallocation responsibilities for callers.",
        "C": "Visibility of a pointer is not permission to release its allocation.",
        "D": "Ownership remains necessary throughout destruction as well as initialization and normal use."
      }
    },
    "q09": {
      "options": {
        "A": "Insertion needs a clear transfer or borrowing rule so caller and container do not both schedule the same release.",
        "B": "Containers may retain pointers without copying pointed-to allocations, depending on their API.",
        "C": "Containers can store dynamically allocated objects and must define their element-lifetime policy.",
        "D": "Passing a pointer to insertion does not automatically erase the caller's independent variable."
      }
    },
    "q10": {
      "options": {
        "A": "Diagnostic allocators and instrumentation can expose exercised cleanup defects while explicit ownership prevents ambiguous release responsibility.",
        "B": "Tools report evidence but cannot universally define the application's intended transfer contracts.",
        "C": "Unexercised partial failures can still contain ownership mistakes and need suitable tests.",
        "D": "A clean diagnostic run does not prove every possible cleanup path is correct."
      }
    },
    "q11": {
      "options": {
        "A": "Each failure exit must release the resources it still owns once, respecting earlier cleanup and transfers.",
        "B": "Every branch that can observe a pointer is not necessarily its owner.",
        "C": "Borrowed references should not become cleanup owners merely because an error occurred.",
        "D": "Hidden unrelated release behavior makes ownership and failure recovery harder to inspect."
      }
    },
    "q12": {
      "options": {
        "A": "Explicit ownership and lifetime state align callers, containers, and cleanup paths around one valid release responsibility.",
        "B": "A cleared local variable leaves other aliases and cleanup owners unchanged.",
        "C": "A pointer can represent borrowing, so freeing every received pointer is unsafe.",
        "D": "Diagnostics complement ownership contracts rather than replacing them with inferred intent."
      }
    }
  }
};
