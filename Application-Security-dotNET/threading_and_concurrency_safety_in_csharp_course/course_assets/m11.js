window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-99d73b8c46",
  "questions": {
    "q1": {
      "options": {
        "A": "Compilation does not establish safe interleavings or correct coordination of shared state.",
        "B": "Timing-dependent shared operations can lose updates, violate invariants, or block progress.",
        "C": "Concurrency affects data integrity and availability rather than merely interface appearance.",
        "D": "Tasks, asynchronous continuations, and framework workers can also execute concurrently."
      }
    },
    "q2": {
      "options": {
        "A": "A task need not map directly to a thread, and asynchronous waiting need not use more cores.",
        "B": "Tasks and threads describe work and execution rather than disk files and request formats.",
        "C": "Distinguish execution paths, represented work, simultaneous execution, and nonblocking waiting when designing coordination.",
        "D": "Parallelism and asynchrony can apply to many workloads beyond these narrow categories."
      }
    },
    "q3": {
      "options": {
        "A": "Conflicting operations can observe and modify shared data in unsafe timing-dependent sequences.",
        "B": "Fields and shared objects can be mutable unless their design makes them immutable.",
        "C": "Several methods and operations can access the same mutable object.",
        "D": "Storing state in a field does not automatically synchronize access to it."
      }
    },
    "q4": {
      "options": {
        "A": "Locks can protect shared state throughout the application beyond console formatting.",
        "B": "Locking can introduce contention and does not universally improve execution speed.",
        "C": "A critical section coordinates related access to preserve a defined shared invariant.",
        "D": "Ownership and which state a lock protects still need an explicit design contract."
      }
    },
    "q5": {
      "options": {
        "A": "Blocking can reduce available worker capacity and degrade I/O-heavy application throughput.",
        "B": "Synchronous waits can cause context deadlocks or thread starvation and complicate failure handling.",
        "C": "Waiting on a task does not create a correct parallel execution protocol.",
        "D": "Task failures must still be observed and handled at an appropriate boundary."
      }
    },
    "q6": {
      "options": {
        "A": "Cancellation tokens communicate a runtime request to stop work when code cooperates.",
        "B": "Partial-state validity and cleanup need design even when cancellation is supported.",
        "C": "Running operations must observe cancellation and preserve a valid state while stopping.",
        "D": "Cancellation tokens do not forcibly terminate every operation immediately."
      }
    },
    "q7": {
      "options": {
        "A": "Concurrent containers do not enforce application authorization or every business invariant.",
        "B": "Thread-safe collections are useful when their operation-level guarantees match the design.",
        "C": "Collection synchronization does not determine freshness in every external data store.",
        "D": "Several individually safe operations can interleave and violate a larger application invariant."
      }
    },
    "q8": {
      "options": {
        "A": "Servers and background services also need bounds on simultaneous work.",
        "B": "Additional simultaneous requests can overload scarce resources instead of improving system health.",
        "C": "Concurrency policies should reflect downstream throughput, connections, and request budgets.",
        "D": "Limit fan-out so accepted work does not exhaust local or downstream capacity."
      }
    },
    "q9": {
      "options": {
        "A": "Review synchronization, progress, retained work, deadlines, and evidence of duplicate or missed processing.",
        "B": "An Async suffix does not establish nonblocking behavior or correct synchronization.",
        "C": "Interface themes do not reveal races, starvation, deadlocks, or runaway queues.",
        "D": "Source-file count does not determine safe lifetime or coordination of concurrent operations."
      }
    },
    "q10": {
      "options": {
        "A": "Public locks and unowned background work make coordination and lifecycle control harder.",
        "B": "Combine explicit ownership, limited sharing, synchronization, async discipline, bounded work, and safe diagnostics.",
        "C": "Unlimited fan-out and absent cancellation can retain work beyond available capacity or shutdown.",
        "D": "Blocking every task can cause starvation and deadlocks rather than guarantee safer execution."
      }
    }
  }
};
