window.COURSE_MODULE = {
  "title": "Course Summary: Keep Signal Paths Simple",
  "graphicAlt": "Simple signal paths combine minimal handlers, explicit masks, mainline work and interruption tests.",
  "narration": "The central rule for signal handling security in C is to keep signal paths simple. A signal handler is not an ordinary function call. It may interrupt code at an awkward moment, while shared state, library state, locks, or resources are in transition. That is why handlers should be minimal, async-signal-safe, and easy to review.\n\nMove real work into normal control flow. Let the handler record intent or wake a safe path, then let mainline code perform shutdown, cleanup, logging, child management, and diagnostics. This design keeps complex behavior in code that can use ordinary synchronization, error handling, resource management, and tests.\n\nUse signal masks intentionally. Know which signals are handled, which are blocked during setup or state transitions, and how masks are restored. In threaded and event-driven programs, define which thread or loop observes signal requests and how shared state is coordinated. Avoid relying on accidental delivery behavior.\n\nFinally, review and test the lifecycle. Ask which signals the program handles, what each handler does, whether complex work is deferred, what state can be touched, how shutdown works, how child processes are managed, whether diagnostics protect sensitive state, and whether interruption behavior is tested. Signal handling is safer when the path from asynchronous event to controlled program behavior is short, explicit, and repeatable.",
  "narrationPoints": [
    "The central rule for signal handling security in C is to keep signal paths simple.",
    "Let the handler record intent or wake a safe path, then let mainline code perform shutdown, cleanup, logging, child management, and diagnostics.",
    "In threaded and event-driven programs, define which thread or loop observes signal requests and how shared state is coordinated.",
    "Signal handling is safer when the path from asynchronous event to controlled program behavior is short, explicit, and repeatable.",
    "That is why handlers should be minimal, async-signal-safe, and easy to review."
  ]
};
