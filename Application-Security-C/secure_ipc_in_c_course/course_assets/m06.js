window.COURSE_MODULE = {
  "title": "Shared Memory and Synchronization Safety",
  "graphicAlt": "A synchronized shared-memory layout is checked for readiness and valid fields before use.",
  "narration": "Shared memory can be fast because multiple processes access the same bytes. That speed changes the security and correctness model. Instead of receiving a completed message, a process may observe data while another process is writing it. Permissions, layout, synchronization, and lifecycle all become part of the contract.\n\nA shared memory region should define ownership, size, version, initialization state, and valid fields. If multiple program versions may interact, versioning and compatibility rules matter. If the region contains offsets, counters, lengths, or arrays, those fields still need validation before use. Shared memory does not make input trusted simply because it is local.\n\nReaders and writers need synchronization to avoid inconsistent or partially updated state. The exact mechanism depends on the platform and design, but the principle is stable: a reader should know when data is complete enough to use, and a writer should not leave shared state in an ambiguous condition without a recovery rule.\n\nShared memory should not be used as a shortcut around authorization or message validation. A process that can write shared state can influence another process. That influence should be intentional and constrained. Permissions on the region, peer identity where relevant, and internal consistency checks all matter.\n\nCleanup should handle stale, abandoned, or partially initialized regions safely. A restart may find a leftover region from a previous instance. The program should distinguish usable state from state that must be reinitialized or removed. Without those rules, shared memory can turn recovery into guesswork.",
  "narrationPoints": [
    "Shared memory can be fast because multiple processes access the same bytes.",
    "A shared memory region should define ownership, size, version, initialization state, and valid fields.",
    "Readers and writers need synchronization to avoid inconsistent or partially updated state.",
    "Shared memory should not be used as a shortcut around authorization or message validation.",
    "The program should distinguish usable state from state that must be reinitialized or removed."
  ]
};
