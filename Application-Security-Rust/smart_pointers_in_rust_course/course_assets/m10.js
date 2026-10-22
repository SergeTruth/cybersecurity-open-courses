window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-9611dded10",
  "questions": {
    "q1": {
      "options": {
        "A": "Smart pointers are explicit types with ownership behavior rather than automatic compiler selection settings.",
        "B": "A smart-pointer type combines pointer-like access with particular rules for ownership, cleanup, sharing, or controlled mutation.",
        "C": "Smart pointers do not automatically convert every borrowed reference into a heap allocation.",
        "D": "Smart pointers can enforce ownership contracts rather than simply bypass borrowing rules like unrestricted raw access."
      }
    },
    "q2": {
      "options": {
        "A": "Selecting a pointer type does not automatically eliminate deadlocks, starvation, contention, or lifecycle defects.",
        "B": "Global sharing is not the default for every smart pointer; Box commonly represents single ownership.",
        "C": "Pointer types communicate who owns data, how sharing works, and which mutation and cleanup assumptions apply.",
        "D": "Cleanup and lifecycle behavior are central to choosing and reviewing a smart-pointer design."
      }
    },
    "q3": {
      "options": {
        "A": "Box provides owned indirection with one owner of the boxed allocation under ordinary safe use.",
        "B": "Non-owning observations of reference-counted data are represented by Weak rather than ordinary Box ownership.",
        "C": "Box alone does not provide multiple shared owners or synchronization for concurrent mutation.",
        "D": "RefCell supplies runtime borrow checking, whereas Box provides ownership of an allocation."
      }
    },
    "q4": {
      "options": {
        "A": "Both types support shared ownership; neither distinction means that one permits arbitrary mutation and the other prevents access.",
        "B": "Rc and Arc both own shared data through reference counts rather than one being merely a borrow.",
        "C": "Strong-reference cycles can prevent cleanup with either Rc or Arc and need deliberate lifecycle design.",
        "D": "Rc uses single-threaded reference counting, while Arc provides atomic counting suitable for appropriately constrained cross-thread sharing."
      }
    },
    "q5": {
      "options": {
        "A": "Shared ownership alone does not grant unrestricted mutable access to the value held by multiple owners.",
        "B": "Mutation needs a suitable controlled mechanism, such as interior mutability or synchronization that preserves access rules.",
        "C": "Shared ownership permits access to data; it does not categorically prohibit all reading and writing.",
        "D": "Heap allocation does not itself justify mutation through overlapping owners or remove access constraints."
      }
    },
    "q6": {
      "options": {
        "A": "Reference counting does not disable lifetime checking or permit invalid ordinary references to shared data.",
        "B": "Strong counts track ownership rather than a value's serialized or on-disk size.",
        "C": "The contained value is destroyed once its final strong owner is released, subject to the ownership design.",
        "D": "A strong count does not grant a thread permission to mutate shared data without appropriate synchronization."
      }
    },
    "q7": {
      "options": {
        "A": "Weak references express lifecycle relationships but do not replace locking or other coordination for shared mutation.",
        "B": "Weak references intentionally avoid retaining the value after its final strong owner disappears.",
        "C": "Weak relationships can break ownership cycles, and upgrade checks whether the referenced value remains alive.",
        "D": "Weak does not promote borrowed data into globally mutable storage or extend arbitrary borrowed lifetimes."
      }
    },
    "q8": {
      "options": {
        "A": "Reference cycles do not automatically execute unsafe operations; their common problem is retained strong ownership.",
        "B": "A cycle does not automatically upgrade weak references; weak edges can instead help prevent strong-ownership cycles.",
        "C": "The compiler still enforces ownership rules even when a reference-counted structure retains a cycle.",
        "D": "Strong cycles can keep counts above zero, preventing destruction and accumulating resources in long-running programs."
      }
    },
    "q9": {
      "options": {
        "A": "Interior mutability permits controlled mutation through shared access while preserving the type's required safety invariants.",
        "B": "Interior mutability concerns access rules and mutation rather than serialization of pointers into text.",
        "C": "Interior mutability still requires ownership, access-policy, and implementation review to preserve its invariants.",
        "D": "Controlled shared mutation does not make borrowed data static or keep every value alive forever."
      }
    },
    "q10": {
      "options": {
        "A": "RefCell enables controlled mutation rather than preventing all mutation after the value is constructed.",
        "B": "RefCell checks borrow compatibility at runtime, with violations causing panics or fallible-borrow errors depending on the API.",
        "C": "RefCell is not a general cross-thread synchronization mechanism and does not automatically make shared access thread safe.",
        "D": "Runtime borrow checking does not force cleanup before the owner reaches the end of its lifecycle."
      }
    },
    "q11": {
      "options": {
        "A": "Arc can be cloned without a mutex; cloning adds a strong owner rather than modifying its inner value.",
        "B": "Arc supports access to its contents subject to their traits and access rules rather than requiring unread values.",
        "C": "Arc coordinates shared ownership, while mutation of shared state needs its own safe access and synchronization design.",
        "D": "Synchronization controls access but does not replace lifecycle documentation, shutdown rules, or ownership review."
      }
    },
    "q12": {
      "options": {
        "A": "Cleanup tests can expose cycles, retained owners, and lifecycle assumptions that the compiler does not resolve automatically.",
        "B": "Clear ownership documentation helps callers understand retention, mutation, synchronization, and cleanup responsibilities.",
        "C": "The right pointer matches actual ownership needs rather than maximizing complexity in every API.",
        "D": "Defensive pointer choices make ownership, retention, mutation, cleanup, and concurrency requirements explicit and auditable."
      }
    }
  }
};
