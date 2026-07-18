window.COURSE_MODULE = {
  "title": "Threads, Data Races, Atomics, and volatile",
  "graphicAlt": "Bullet summary graphic for Threads, Data Races, Atomics, and volatile.",
  "narration": "The C memory model includes rules for shared memory between threads. A data race occurs when multiple threads access the same memory location concurrently, at least one access modifies it, and the accesses are not properly synchronized. Data races can produce undefined behavior.\n\nMutexes and other synchronization mechanisms protect shared state and establish ordering. They are often the clearest choice when a shared invariant involves more than one object, more than one field, or a sequence of operations that must be understood together.\n\n_Atomic types and atomic operations provide language-level tools for shared data when used correctly. Atomics can be useful for counters, flags, references, and carefully designed coordination, but they do not remove the need to define invariants and ownership. Atomic access to one variable does not automatically make a larger data structure safe.\n\nMemory order controls how operations are ordered around atomic accesses and should be chosen deliberately. Stronger ordering can be easier to reason about, while weaker ordering requires careful proof of correctness. Teams should prefer designs that reviewers can explain and maintain.\n\nvolatile is not a general-purpose thread synchronization mechanism. It may be relevant for certain special interactions, but it should not be used as a substitute for atomics or locks. Concurrent C should be designed around ownership, invariants, synchronization policy, and reviewable shared-state rules.",
  "narrationPoints": [
    "The C memory model includes rules for shared memory between threads.",
    "Mutexes and other synchronization mechanisms protect shared state and establish ordering.",
    "_Atomic types and atomic operations provide language-level tools for shared data when used correctly.",
    "Memory order controls how operations are ordered around atomic accesses and should be chosen deliberately.",
    "Concurrent C should be designed around ownership, invariants, synchronization policy, and reviewable shared-state rules."
  ]
};
