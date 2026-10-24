window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-0b3c2b53db",
  "questions": {
    "q01": {
      "options": {
        "A": "Termination may release some process resources but does not automatically complete application-level or persistent cleanup.",
        "B": "Signals affect services and command-line programs as well as graphical applications.",
        "C": "Asynchronous interruption can expose partially updated state or unsafe cleanup and shutdown assumptions.",
        "D": "Interrupted operations do not universally restart automatically or preserve every higher-level application invariant."
      }
    },
    "q02": {
      "options": {
        "A": "Ordinary logging, deallocation, and shutdown can invoke operations unsafe in an asynchronous handler context.",
        "B": "Allocation may reenter interrupted allocator state or acquire a lock already held by the interrupted execution.",
        "C": "Minimal handlers reduce unsafe reentry by restricting work to operations permitted in that context and deferring complex coordination.",
        "D": "A handler's ability to interrupt execution does not make it a safe context for general error processing."
      }
    },
    "q03": {
      "options": {
        "A": "A function's ordinary usability does not establish that it is async-signal-safe when interrupting another operation.",
        "B": "The handler may run while interrupted code holds locks or is midway through updating internal state.",
        "C": "Reentrancy considerations do not remove the need to control delivery during sensitive setup and state transitions.",
        "D": "Signal delivery can occur during mutation; reentrancy does not prove that application state was immutable."
      }
    },
    "q04": {
      "options": {
        "A": "Logging and allocation remain active operations after startup and can touch partially updated internal state.",
        "B": "These operations can be called in ordinary code; the concern is their safety when called asynchronously from a handler.",
        "C": "Ordinary operations do not become atomic simply because they run in a signal handler.",
        "D": "Reentering code that needs already-held locks or inconsistent internal state can deadlock or corrupt behavior."
      }
    },
    "q05": {
      "options": {
        "A": "Signal masks control which signals are blocked; they do not generate formatted diagnostics.",
        "B": "Blocking selected signals does not provide a general synchronization and ownership protocol for arbitrary shared data.",
        "C": "Masks can be changed around setup and runtime transitions rather than applying only at exit.",
        "D": "Blocking selected signals lets code control delivery while establishing or changing state that a handler must not observe halfway through."
      }
    },
    "q06": {
      "options": {
        "A": "Mainline cleanup can use the full set of required operations without assuming they are safe inside an asynchronous handler.",
        "B": "Process termination does not necessarily finish persistent transactions, external coordination, or other application cleanup.",
        "C": "Changing a flag does not cause the compiler to synthesize a complete resource-cleanup protocol.",
        "D": "Resources and ownership must be established before cleanup can safely decide what needs releasing."
      }
    },
    "q07": {
      "options": {
        "A": "A safely coordinated flag transfers the shutdown request to normal execution, where complex cleanup can be performed deliberately.",
        "B": "A flag communicates intent and does not make unsafe handler operations permissible.",
        "C": "Setting a flag does not automatically block future signals across process threads.",
        "D": "Interrupted-call handling and mask restoration remain separate lifecycle responsibilities after a shutdown request."
      }
    },
    "q08": {
      "options": {
        "A": "Creating threads does not universally postpone all asynchronous signals until worker termination.",
        "B": "Threads can have different masks and delivery responsibilities, so policy must be coordinated explicitly.",
        "C": "Multiple threads introduce delivery, mask, lock, and shared-state interactions that need a deliberate process-wide design.",
        "D": "A handler can interrupt execution that already holds a needed lock, so arbitrary locking remains unsafe."
      }
    },
    "q09": {
      "options": {
        "A": "Applications still need an appropriate child-status and reaping policy rather than assuming universal automatic reaping.",
        "B": "Deferring complex child coordination to safe mainline execution avoids performing heavy lifecycle work in the handler.",
        "C": "Blocking child coordination inside a handler can stall execution and invoke unsafe operations.",
        "D": "Delivery order alone does not define ownership, status collection, reaping, and cleanup responsibilities."
      }
    },
    "q10": {
      "options": {
        "A": "Retained logs and dumps can contain credentials, memory contents, and operational details beyond the intended diagnostic audience.",
        "B": "Diagnostics can be useful when their content, storage, and access are controlled appropriately.",
        "C": "Crashing does not imply that memory has been scrubbed of secrets before a dump is captured.",
        "D": "Signal-driven termination does not automatically redact secrets from diagnostic output or memory dumps."
      }
    },
    "q11": {
      "options": {
        "A": "Runtime delivery timing can expose missed cleanup, interruption, and lifecycle assumptions that formatting checks cannot detect.",
        "B": "Successful handler installation does not exercise how the program behaves when signals arrive during real operations.",
        "C": "Comments state intent but cannot establish actual behavior under interruption and partial cleanup.",
        "D": "Tests should exercise the planned coordination and recovery behavior, including masks, child handling, and interrupted operations where practical."
      }
    },
    "q12": {
      "options": {
        "A": "Putting complex operations into handlers increases reliance on code that may not be async-signal-safe.",
        "B": "Minimal safe handlers and explicit coordination keep complex lifecycle work in a context where its assumptions can hold.",
        "C": "Masks address delivery and must be combined with a coherent policy for threads, shared state, and interrupted operations.",
        "D": "Ordinary shutdown can use unsafe operations or depend on corrupted state and should not automatically be invoked from a crash handler."
      }
    }
  }
};
