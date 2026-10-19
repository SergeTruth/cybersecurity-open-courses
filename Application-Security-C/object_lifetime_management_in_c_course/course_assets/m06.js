window.COURSE_MODULE = {
  "title": "Static and Shared Lifetime Risks",
  "graphicAlt": "Long-lived and thread-local objects still require explicit dependencies, mutation rules, initialization and shutdown.",
  "narration": "Static and long-lived objects can look simple because their storage lasts for a long time. That does not make them automatically safe or maintainable. A long lifetime removes one category of scope problem, but it introduces questions about access order, initialization assumptions, shared mutation, testing, and shutdown behavior.\n\nGlobal objects can hide dependencies. A function may appear independent while reading or modifying state that lives elsewhere. This makes code harder to test and harder to review because the lifetime of the object is long, but the valid-use rules are still distributed across the program.\n\nStatic locals preserve state between calls. That can be useful for caches or counters, but it may affect reentrancy and repeated use. A function that seems pure or isolated may behave differently on the second call because the static object retained previous state.\n\nThread-local storage can help avoid some cross-thread sharing, but it has its own lifetime and initialization rules. Pointers to thread-local objects should not escape into contexts that can outlive the thread or use the pointer from another thread without a clear contract.\n\nShared mutable state needs synchronization and ownership discipline. A long-lived object may still be invalid for a particular operation if another part of the program is modifying it, shutting it down, or resetting it. Shutdown behavior should be explicit rather than based on guesses about module order.",
  "narrationPoints": [
    "Static and long-lived objects can look simple because their storage lasts for a long time.",
    "A function may appear independent while reading or modifying state that lives elsewhere.",
    "A function that seems pure or isolated may behave differently on the second call because the static object retained previous state.",
    "Thread-local storage can help avoid some cross-thread sharing, but it has its own lifetime and initialization rules.",
    "Shutdown behavior should be explicit rather than based on guesses about module order."
  ]
};
