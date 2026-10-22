window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-176978d0c3",
  "questions": {
    "q01": {
      "options": {
        "A": "Nearby ordinary objects still need an appropriate synchronization and lifetime protocol.",
        "B": "Atomicity of individual objects does not create a transaction across multiple fields.",
        "C": "An atomic operation need not lock the process or wait for every observer.",
        "D": "Atomic operations prevent tearing on their object and follow the selected memory ordering."
      }
    },
    "q02": {
      "options": {
        "A": "Independent local objects do not conflict merely because computations produce different results.",
        "B": "Concurrent reads alone do not conflict when the object is safely published and live.",
        "C": "Conflicting accesses without synchronization form a race when at least one writes.",
        "D": "Scheduling-dependent behavior can be synchronized correctly and still produce different outcomes."
      }
    },
    "q03": {
      "options": {
        "A": "The observation and modification belong to one indivisible operation on that atomic object.",
        "B": "Separating an atomic load from an update does not provide read-modify-write atomicity.",
        "C": "Read-modify-write atomicity applies to its object rather than all expression operands.",
        "D": "Other threads can continue accessing unrelated objects during an atomic operation."
      }
    },
    "q04": {
      "options": {
        "A": "Stronger ordering can restrict optimization; sequential consistency is not always fastest.",
        "B": "Its single ordering model is a clear baseline before carefully justified weakening.",
        "C": "Relaxed operations provide atomicity without automatically publishing surrounding non-atomic payload data.",
        "D": "Independent counters may use relaxed ordering when no additional synchronization is needed."
      }
    },
    "q05": {
      "options": {
        "A": "One critical section can protect relationships and transitions across several fields.",
        "B": "Multiple related statements often need compound protection beyond individual atomic operations.",
        "C": "Mutexes commonly protect ordinary non-atomic state through consistent locking discipline.",
        "D": "An ordering argument must be understandable before replacing a clearer locking design."
      }
    },
    "q06": {
      "options": {
        "A": "A successful compare_exchange does not prove the requested transition is semantically legal.",
        "B": "Atomic storage cannot decide whether a lifecycle transition violates the application's contract.",
        "C": "Numeric encodings alone omit who may transition and what states are valid.",
        "D": "A complete contract defines permitted transitions, synchronization, ownership, and failure behavior."
      }
    },
    "q07": {
      "options": {
        "A": "An atomic pointer stores an address without automatically owning the pointed-to object.",
        "B": "Destroying atomic storage during another thread's access violates its lifetime requirements.",
        "C": "Release ordering does not track readers or defer destruction until they exit.",
        "D": "Atomicity does not replace ownership, reclamation, or coordination with object destruction."
      }
    },
    "q08": {
      "options": {
        "A": "Requesting shutdown does not prove workers have stopped accessing shared resources.",
        "B": "Safe shutdown combines notification with state lifetime guarantees and worker completion.",
        "C": "A relaxed flag does not by itself publish unrelated cleanup or payload writes.",
        "D": "Observing a flag once does not establish that a worker has finished."
      }
    },
    "q09": {
      "options": {
        "A": "ThreadSanitizer can find races in executed paths while leaving untested interleavings uncovered.",
        "B": "Race detection does not determine whether application-specific transitions are semantically valid.",
        "C": "One clean run cannot cover every architecture or weak-memory execution.",
        "D": "Tools cannot infer and replace the algorithm's intended invariant or ownership contract."
      }
    },
    "q10": {
      "options": {
        "A": "Compiling an atomic expression does not establish a correct memory-ordering argument.",
        "B": "Lock freedom describes progress properties and does not prove application-level correctness.",
        "C": "State the invariant and explain the ordering that makes all relevant accesses safe.",
        "D": "A passing run exercises particular interleavings rather than all possible thread schedules."
      }
    }
  }
};
