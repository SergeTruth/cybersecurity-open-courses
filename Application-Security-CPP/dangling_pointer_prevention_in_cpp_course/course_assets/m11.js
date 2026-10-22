window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-95accf4bf2",
  "questions": {
    "q01": {
      "options": {
        "A": "Heap allocation alone does not make an otherwise live pointer dangling.",
        "B": "An observer dangles when destruction or invalidation ends the validity of its target.",
        "C": "A short use interval is safe only if the target remains valid throughout.",
        "D": "Unique or automatic ownership can support valid observers without shared ownership."
      }
    },
    "q02": {
      "options": {
        "A": "Owners control destruction responsibility, while borrowers receive access within a valid interval.",
        "B": "A borrower generally has no authority or obligation to destroy its referent.",
        "C": "Ownership also applies to automatic objects and non-memory resources with scoped lifetimes.",
        "D": "Confusing ownership with access obscures who must keep an object alive."
      }
    },
    "q03": {
      "options": {
        "A": "Ordinary references name objects without automatically owning or destroying them.",
        "B": "Only specific temporary-binding rules extend lifetimes; references do not universally preserve sources.",
        "C": "Every reference use depends on the referent remaining alive and uninvalidated.",
        "D": "References can be retained in objects or captures, creating lifetime obligations."
      }
    },
    "q04": {
      "options": {
        "A": "Independent lifetime extension by multiple owners may require a deliberate shared ownership model.",
        "B": "unique_ptr represents ownership rather than an intentionally ownerless dynamic allocation.",
        "C": "Using unique_ptr makes ownership and transfer explicit in types and interfaces.",
        "D": "A single responsible owner is directly represented by unique_ptr and its automatic cleanup."
      }
    },
    "q05": {
      "options": {
        "A": "Shared pointers cannot automatically repair undocumented aliases, cycles, or synchronization obligations.",
        "B": "Unclear sharing makes destruction timing and responsibility difficult to predict and review.",
        "C": "Components must still understand shared ownership, final release, and observer lifetimes.",
        "D": "Shared ownership is a runtime lifetime model and is not limited to constants."
      }
    },
    "q06": {
      "options": {
        "A": "Observers of old element storage can dangle when reallocation relocates the elements.",
        "B": "Ordinary iterators are not automatically rewritten to point at relocated elements.",
        "C": "Erasure and some insertions can invalidate element references before container destruction.",
        "D": "Reallocation can allocate new storage and move elements before releasing old storage."
      }
    },
    "q07": {
      "options": {
        "A": "These views store borrowed access information rather than copying the source into owned storage.",
        "B": "Constructing a view does not generally extend a temporary source's lifetime.",
        "C": "The owner and relevant range must remain valid until every view access ends.",
        "D": "Views can borrow automatic or dynamic storage when their use stays within its lifetime."
      }
    },
    "q08": {
      "options": {
        "A": "Deferred execution can outlive the scopes and objects mentioned in a capture.",
        "B": "Reference captures and raw pointer captures do not automatically transfer ownership.",
        "C": "Value captures can safely own suitable state when the complete lifetime contract is respected.",
        "D": "Callback registration alone does not guarantee that the target object remains alive."
      }
    },
    "q09": {
      "options": {
        "A": "Tools supplement rather than replace explicit ownership design and lifetime review.",
        "B": "Instrumented executions can expose stale accesses along the paths the tests exercise.",
        "C": "A clean test run cannot establish safety for every untested execution.",
        "D": "Sanitizers and debug modes inspect instrumented runtime operations and library contracts."
      }
    },
    "q10": {
      "options": {
        "A": "Blind conversion can create cycles or incorrect shared owners without clarifying responsibility.",
        "B": "Understand existing creation, access, and destruction paths before changing the component.",
        "C": "Regression tests remain necessary because mapping alone does not verify implementation changes.",
        "D": "Mapping creators, owners, observers, and destruction points exposes the actual lifetime contract."
      }
    }
  }
};
