window.COURSE_MODULE = {
  "title": "Course Summary: Atomic Safety Habits",
  "graphicAlt": "An atomic-safety summary links race freedom, legal transitions, publication, lifetime, shutdown, testing, and preference for clearer mutex designs.",
  "narration": "Safe atomic use begins with minimizing shared mutable state. If data can be immutable, thread-confined, moved through a queue, or protected by ownership transfer, the design may not need an atomic at all.\n\nUse atomics for simple, well-defined coordination. Flags, counters, and small state transitions should have clear meanings, named states where appropriate, and known readers and writers.\n\nPrefer simple memory ordering unless there is a clear reason not to. Sequential consistency is often the easiest default to review. Relaxed ordering and custom acquire-release protocols should be documented and justified.\n\nUse mutexes for compound invariants. If correctness depends on several fields, a container relationship, ownership handoff, or a transaction-like update, a lock may make the design safer and more readable.\n\nReview lifetime and shutdown together with synchronization. Atomic visibility does not keep objects alive, stop detached work, or guarantee cleanup by itself.\n\nFinally, test the boundaries. Exercise state transitions, shutdown, publication, and contention. Atomic code is security-sensitive because small synchronization mistakes can affect integrity, availability, and safe cleanup.\n\nThese habits keep atomic operations as precise tools rather than vague promises of thread safety.\n\nThey also make maintenance reviews faster and more dependable.\n\nThat matters in production.",
  "narrationPoints": [
    "Safe atomic use begins with minimizing shared mutable state.",
    "Flags, counters, and small state transitions should have clear meanings, named states where appropriate, and known readers and writers.",
    "Prefer simple memory ordering unless there is a clear reason not to.",
    "Relaxed ordering and custom acquire-release protocols should be documented and justified.",
    "If correctness depends on several fields, a container relationship, ownership handoff, or a transaction-like update, a lock may make the design safer and more readable.",
    "Atomic code is security-sensitive because small synchronization mistakes can affect integrity, availability, and safe cleanup."
  ]
};
