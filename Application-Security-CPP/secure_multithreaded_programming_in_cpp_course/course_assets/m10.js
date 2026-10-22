window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-afaff0d6d9",
  "questions": {
    "q01": {
      "options": {
        "A": "Threads share process memory and do not provide the isolation of separate processes.",
        "B": "Concurrency failures can corrupt state and undermine cleanup and availability.",
        "C": "Synchronous network parsing does not remove races in other shared state or worker lifetimes.",
        "D": "Threading defects can affect security through state corruption, exhaustion, and unsafe shutdown."
      }
    },
    "q02": {
      "options": {
        "A": "Different completion orders can occur in correctly synchronized programs without data races.",
        "B": "Concurrent immutable reads alone do not form a conflicting read-write access pair.",
        "C": "A race involves conflicting unsynchronized concurrent accesses, including at least one write.",
        "D": "Data races concern concurrent memory access rather than competition between optimizer passes."
      }
    },
    "q03": {
      "options": {
        "A": "A scoped lock owner releases the mutex when control leaves its scope.",
        "B": "Locking protects a critical section rather than making its object permanently immutable.",
        "C": "RAII cleanup does not fix inconsistent acquisition order across several locks.",
        "D": "The programmer must define the protected invariant; a wrapper cannot infer it."
      }
    },
    "q04": {
      "options": {
        "A": "Blocking I/O under a lock can enlarge contention and create deadlock or availability risk.",
        "B": "State the shared invariant so every required access uses the same protection discipline.",
        "C": "Mutexes do not automatically assign protection to arbitrary nearby objects.",
        "D": "Reads still need synchronization when they conflict with concurrent mutation."
      }
    },
    "q05": {
      "options": {
        "A": "Varying acquisition order can create circular waiting rather than prevent it.",
        "B": "A consistent ordering policy removes a common source of circular lock dependencies.",
        "C": "Holding locks during network I/O can block progress and complicate shutdown.",
        "D": "Nested RAII wrappers still deadlock if threads acquire mutexes in conflicting orders."
      }
    },
    "q06": {
      "options": {
        "A": "Separate atomic fields do not create a transaction across a larger invariant.",
        "B": "Replacing a lock needs a new ordering and lifetime argument, not a mechanical substitution.",
        "C": "Default ordering does not prove a compound protocol or state machine correct.",
        "D": "Individual atomic operations still need a protocol preserving higher-level state relationships."
      }
    },
    "q07": {
      "options": {
        "A": "Without a join owner, completion and captured-resource lifetimes become harder to coordinate.",
        "B": "A detached worker does not automatically retain the objects its references name.",
        "C": "Detachment removes joining through the thread object without inventing a cancellation protocol.",
        "D": "A background worker can continue accessing shared state during or after shutdown begins."
      }
    },
    "q08": {
      "options": {
        "A": "Notifications do not preserve the condition or guarantee it remains true for a waiter.",
        "B": "The condition must be checked under the appropriate lock rather than through unsynchronized state.",
        "C": "A predicate rechecks the protected condition after normal or spurious wakeups.",
        "D": "Condition variables coordinate waiting and do not own queued application data."
      }
    },
    "q09": {
      "options": {
        "A": "Instrumented test runs can expose data races on the execution paths exercised.",
        "B": "An unreported schedule does not establish the safety of every other execution.",
        "C": "Instrumentation detects races rather than supplying missing application synchronization.",
        "D": "Deadlocks and starvation require additional analysis beyond ordinary data-race detection."
      }
    },
    "q10": {
      "options": {
        "A": "Removing locks without a valid alternative can introduce races and broken invariants.",
        "B": "Infrequent callbacks still need valid lifetime and shutdown coordination for retained objects.",
        "C": "Identify shared state, its protection, and all lifetime and shutdown interactions.",
        "D": "Weaker ordering needs a correctness argument rather than a performance improvement alone."
      }
    }
  }
};
