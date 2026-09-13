window.COURSE_MODULE = {
  "title": "Weak<T>, Cycles, and Lifecycle Risk",
  "graphicAlt": "Strong cycles retain values; a non-owning Weak back-reference can break the cycle and must be upgraded with absence handled.",
  "narration": "Reference counting solves some ownership problems, but it can introduce lifecycle problems when strong owners form cycles. If two values strongly own each other, the strong counts may never reach zero. Safe Rust still protects memory safety, but the values may not be cleaned up when the design expects.\n\nA leak is not automatically an exploit, and safe Rust prevents many dangerous outcomes, but leaks still matter in real systems. Long-running services, background workers, desktop applications, caches, and agents can suffer resource growth, stale state, delayed cleanup, and operational instability when lifecycle behavior is not reviewed.\n\n`Weak<T>` models a non-owning relationship to a reference-counted value. A weak reference does not keep the value alive. Code must attempt to upgrade the weak reference and handle the case where the value has already been dropped. That checked access makes non-owning relationships explicit.\n\nThis is useful for parent-child relationships, back-references, observer lists, caches, registries, and graph-like structures. A child may need to know about its parent without keeping the parent alive forever. A cache may want to remember a value if it still exists but not force it to remain allocated.\n\nThe review question is whether each relationship should own, share, or merely observe. Strong references should represent real ownership responsibility. Weak references should represent optional, non-owning access. When that distinction is clear, cleanup behavior becomes easier to test, maintain, and explain.",
  "narrationPoints": [
    "Reference counting solves some ownership problems.",
    "A leak is not automatically an exploit.",
    "`Weak<T>` models a non-owning relationship.",
    "This is useful for parent-child relationships.",
    "The review question is whether each relationship should own.",
    "Code must attempt to upgrade the weak reference and handle."
  ]
};
