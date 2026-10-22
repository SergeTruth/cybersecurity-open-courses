window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-1351f42baa",
  "questions": {
    "q01": {
      "options": {
        "A": "Standard containers do not provide a universal hidden mutex around all member functions.",
        "B": "Separate iterators can still access shared elements or container metadata unsafely.",
        "C": "Conflicting unsynchronized operations can race on elements, storage, or container invariants.",
        "D": "Const access is not generally safe while unsynchronized mutation changes the accessed state."
      }
    },
    "q02": {
      "options": {
        "A": "A contract can specify locking behavior without promising a lock-free implementation.",
        "B": "Explicit operations, ownership, invariants, and lifetimes define what concurrent callers may safely do.",
        "C": "Contracts guide tests but cannot replace exercising implementation behavior under concurrency.",
        "D": "Signatures alone omit synchronization obligations and the validity interval of returned access."
      }
    },
    "q03": {
      "options": {
        "A": "A returned iterator can become invalid once the wrapper releases its protection.",
        "B": "Separate locked calls can interleave, so compound workflows need an explicit atomic operation.",
        "C": "Encapsulation can require callers to use operations that preserve the protected invariant.",
        "D": "Callbacks under a lock still need documented reentrancy, blocking, and deadlock constraints."
      }
    },
    "q04": {
      "options": {
        "A": "A full bounded queue may require waiting, rejection, or another explicit overload policy.",
        "B": "Shutdown still needs explicit close behavior so blocked producers and consumers can exit.",
        "C": "Capacity limits affect exhaustion, overload behavior, and how shutdown releases blocked operations.",
        "D": "Bounds cap retained work, while backpressure specifies how producers handle exhausted capacity."
      }
    },
    "q05": {
      "options": {
        "A": "A notification does not prove the predicate remains true when the waiter proceeds.",
        "B": "Spurious wakeups are permitted, and competing threads can also change the condition.",
        "C": "Fixed delays do not reliably communicate shutdown or establish synchronized state access.",
        "D": "Wait predicates must recheck protected conditions and permit termination when shutdown is requested."
      }
    },
    "q06": {
      "options": {
        "A": "A borrowed reference does not itself keep an evicted cache entry alive.",
        "B": "Erasure or replacement needs a policy ensuring returned access remains valid during use.",
        "C": "A shared lock stops protecting an entry after the read operation releases it.",
        "D": "Eviction driven by size limits can end the lifetime of returned borrowed values."
      }
    },
    "q07": {
      "options": {
        "A": "Unlocked aliases can outlive the protection that made their initial lookup safe.",
        "B": "Ordinary iterators do not retain the structure's mutex or lock guard automatically.",
        "C": "A const reference borrows a value and does not create an owned snapshot.",
        "D": "Invalidation rules apply regardless of which thread performs the mutating operation."
      }
    },
    "q08": {
      "options": {
        "A": "Several individually atomic operations can interleave and violate a multi-field invariant.",
        "B": "An atomic field does not automatically synchronize all neighboring non-atomic accesses.",
        "C": "A successful compare_exchange loop does not prove lifecycle or application invariants are correct.",
        "D": "Sequential consistency orders operations without combining separate updates into one transaction."
      }
    },
    "q09": {
      "options": {
        "A": "A reader may retain an earlier pointer even after the node is unlinked.",
        "B": "Exchanging a pointer does not wait for outstanding readers of its old value.",
        "C": "Returned references can outlive locks, so reclamation also matters in lock-based structures.",
        "D": "Removal and destruction must be separated until the reclamation protocol excludes remaining readers."
      }
    },
    "q10": {
      "options": {
        "A": "Race detectors observe executed schedules and cannot prove every possible interleaving correct.",
        "B": "Complementary contracts, tests, race detection, and lifetime review address different failure modes.",
        "C": "Stable throughput cannot establish correct synchronization, lifetime, or operation semantics.",
        "D": "One crash-free stress run leaves unexercised schedules and lifetime defects possible."
      }
    }
  }
};
