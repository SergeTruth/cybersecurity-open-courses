window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-0ae641aca9",
  "questions": {
    "q1": {
      "options": {
        "A": "Reads from released storage also violate object lifetime; lack of a write does not make access valid.",
        "B": "Use-after-free accesses an object after its allocation or lifetime has ended, through a stale reference.",
        "C": "A pointer variable's scope and the referenced object's lifetime are separate; the actual object lifetime determines validity.",
        "D": "Multiple aliases can be used safely while the object remains alive and their access obeys the ownership contract."
      }
    },
    "q2": {
      "options": {
        "A": "The allocator does not generally track and extend lifetime for every application pointer copy.",
        "B": "A non-null address does not retain an allocation after its owner releases it.",
        "C": "Stored address bits do not extend the object's lifetime or authorize dereferencing a stale pointer.",
        "D": "Keeping an address in another variable does not preserve the validity of the released object."
      }
    },
    "q3": {
      "options": {
        "A": "Copying a pointer does not establish ownership; responsibility comes from the API or program's explicit lifetime contract.",
        "B": "Const qualification controls certain access expressions and does not determine who owns or releases an object.",
        "C": "The last observed user does not automatically acquire permission to free an allocation.",
        "D": "Ownership includes cleanup responsibility, while borrowing permits only access within the owner's documented lifetime."
      }
    },
    "q4": {
      "options": {
        "A": "Releasing the shared object invalidates references held elsewhere unless the lifetime protocol prevents later use.",
        "B": "Clearing aliases after their own use is too late if an owner already freed the shared object.",
        "C": "Const access still requires a live object and can become stale after release.",
        "D": "Ordinary allocators do not automatically intercept and make safe every dereference through a stale alias."
      }
    },
    "q5": {
      "options": {
        "A": "Assigning one pointer variable does not update every independent copy of its former address.",
        "B": "Nulling a variable only changes that variable; other aliases still need their lifetimes constrained by the ownership design.",
        "C": "The allocator does not generally redirect old pointer copies to a safe replacement object.",
        "D": "Copies remain independent variables even when they originally came from the same owner pointer."
      }
    },
    "q6": {
      "options": {
        "A": "Freeing the same non-null allocation twice is not generally safe or idempotent.",
        "B": "Cleanup needs valid acquisition and initialization state rather than interpreting arbitrary non-null bytes as live resources.",
        "C": "Code must not continue using objects whose lifetime ended or whose ownership is no longer valid.",
        "D": "Known resource state lets cleanup release only valid owned resources and prevents subsequent code from reusing released objects."
      }
    },
    "q7": {
      "options": {
        "A": "For a failed nonzero resize request, the original allocation remains owned and should not be overwritten or leaked.",
        "B": "Shrinking can also move storage or fail; resizing needs consistent result and alias handling.",
        "C": "For nonzero resizing, a temporary preserves the original pointer on failure; zero-size requests need a separate explicit policy.",
        "D": "A successful realloc does not update external pointer copies, so callers must handle aliases and lifetime changes."
      }
    },
    "q8": {
      "options": {
        "A": "Transfer rules tell callers whether access may continue, which component retains the object, and who may release it.",
        "B": "Pointer types and argument direction do not fully express transfer and post-call lifetime behavior in C.",
        "C": "Retained aliases and validity after a call are essential parts of the ownership contract.",
        "D": "Functions within one component can also misunderstand resource transfer and create stale references."
      }
    },
    "q9": {
      "options": {
        "A": "Storing a pointer for longer does not automatically transfer ownership to a container.",
        "B": "Removal behavior depends on whether the API transfers, borrows, or destroys the removed element.",
        "C": "The container's own allocation strategy does not define who owns its stored elements.",
        "D": "Explicit element ownership and destruction rules prevent callers and containers from freeing or retaining the same objects inconsistently."
      }
    },
    "q10": {
      "options": {
        "A": "A clean run covers exercised behavior and does not prove lifetime safety on untested paths.",
        "B": "Static findings need an intended ownership contract; tools cannot universally infer the application's correct lifetime policy.",
        "C": "Complementary checks reveal stale references and cleanup defects, while explicit ownership design prevents recurring lifetime mistakes.",
        "D": "Leaks and stale access are different defects, so leak detection alone does not establish use-after-free safety."
      }
    }
  }
};
