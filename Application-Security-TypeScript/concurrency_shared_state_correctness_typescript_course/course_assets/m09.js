window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-283d705fd2",
  "questions": {
    "q1": {
      "options": {
        "A": "Using await does not prevent another handler from changing shared state between the read and write.",
        "B": "The event loop can run other work while database operations are awaiting completion.",
        "C": "Asynchronous handlers and external writers can interleave, so the authoritative mutation must protect its own invariant.",
        "D": "Overlapping database operations and logical races can occur without worker threads or parallel JavaScript execution."
      }
    },
    "q2": {
      "options": {
        "A": "Two successful sales can both write zero, so the final quantity does not establish a single committed sale.",
        "B": "A nonnegative stored total can hide duplicate successes when both operations relied on the same stale stock snapshot.",
        "C": "Independent positive-stock reads do not reserve the unit or prevent another request from selling it.",
        "D": "Individual accepted writes do not prove that each complete sale preserved the inventory invariant."
      }
    },
    "q3": {
      "options": {
        "A": "A syntactically successful query can affect no rows, meaning the requested transition did not occur.",
        "B": "A later read cannot reliably identify whether this particular request performed the conditional decrement.",
        "C": "The application-side snapshot can become stale; the guarded mutation result must determine this request's outcome.",
        "D": "Success requires the qualifying mutation to occur and commit; no affected row means no successful reservation."
      }
    },
    "q4": {
      "options": {
        "A": "Transactions do not universally serialize all business operations under every isolation level and query design.",
        "B": "A local mutex does not automatically coordinate other processes or database connections using different writers.",
        "C": "Correctness depends on isolation, protected predicates, constraints or locking, and appropriate conflict handling.",
        "D": "A longer deadline does not repair missing concurrency protection or enforce the intended business invariant."
      }
    },
    "q5": {
      "options": {
        "A": "A TypeScript field does not force the database to compare the version during the write.",
        "B": "Comparing and advancing the expected version in one mutation detects stale edits without a separate race window.",
        "C": "Detecting a conflict after an unconditional overwrite cannot undo the already committed loss of another writer's data.",
        "D": "A separate read and version increment leave windows where other writers can interleave changes."
      }
    },
    "q6": {
      "options": {
        "A": "Submission timing alone does not establish that stale whole-document content incorporates another writer's meaningful changes.",
        "B": "Expected-version checks are an optimistic-concurrency technique and do not inherently require pessimistic locking.",
        "C": "A version mismatch indicates a conflicting state transition rather than necessarily proving database unavailability.",
        "D": "Retrying stale content with a newer version can erase valid changes unless the operation deliberately recomputes or merges them."
      }
    },
    "q7": {
      "options": {
        "A": "A new identifier per attempt prevents the server from recognizing retries of the same logical operation.",
        "B": "A stable scoped identifier and atomically committed effect and result let repeated delivery reuse one authoritative outcome.",
        "C": "A missing response does not prove the earlier operation failed to commit its effect.",
        "D": "Per-instance memory does not coordinate replicas and loses deduplication history on restart."
      }
    },
    "q8": {
      "options": {
        "A": "Independent local locks cannot protect an invariant against other replicas or direct database writers.",
        "B": "One JavaScript thread per replica still permits overlapping asynchronous operations and independent writers elsewhere.",
        "C": "Sharing a database hostname does not turn separate process-local mutexes into one shared lock.",
        "D": "Holding a local lock longer does not make unrelated replicas participate in its protection."
      }
    },
    "q9": {
      "options": {
        "A": "Separate commits can leave a redemption recorded without its credit or create inconsistent retry behavior.",
        "B": "A lease alone does not permanently enforce one redemption and may expire while work is still running.",
        "C": "A check followed by separate credit and insert steps allows overlapping requests to pass the same precondition.",
        "D": "A unique account-coupon constraint and one transaction bind the winning redemption to exactly its corresponding credit."
      }
    },
    "q10": {
      "options": {
        "A": "Deliberate overlap and inspection of committed state expose overselling and partial effects across competing requests.",
        "B": "Serialized requests on one connection do not reproduce the competing transactions the invariant must tolerate.",
        "C": "Fixed sleeps and one passing run do not reliably exercise conflicting operations or prove race freedom.",
        "D": "Sequential status checks cannot establish correctness when transactions actually overlap at the protected state boundary."
      }
    }
  }
};
