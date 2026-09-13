window.COURSE_MODULE = {
  "title": "Why Double Free Matters",
  "graphicAlt": "Memory, files, handles, and devices need one clear cleanup authority; independent duplicate owners are rejected.",
  "narration": "A double free occurs when the same memory allocation or resource is cleaned up more than once. In manual-memory environments, this class of bug can cause severe reliability and security problems because two paths both believe they have the right to release the same underlying resource.\n\nThe core issue is not only memory. It is cleanup responsibility. Files, sockets, native handles, lock guards, database handles, temporary directories, externally allocated buffers, and device resources all need one clear authority for release. When responsibility is duplicated or unclear, lifecycle bugs become much easier to introduce.\n\nIn everyday engineering work, double-free risk often appears where a Rust abstraction meets a manual cleanup rule. A library might expose a handle, a platform API might require a matching close function, or a wrapper might support early shutdown. The question is always the same: which path owns cleanup right now?\n\nRust changes the default model by assigning each value a clear owner. Safe Rust ties cleanup to ownership and runs cleanup when ownership ends. Moved values cannot keep acting as old owners, and ordinary borrowed references do not own cleanup responsibility. Those rules make duplicate cleanup difficult to express in safe code.\n\nThat safety story is strongest inside Rust's normal ownership system. Risk can re-enter at unsafe code, raw pointers, custom allocation boundaries, foreign function interfaces, external cleanup functions, callback contracts, and low-level wrappers where the compiler cannot prove the ownership contract.\n\nThe defensive goal is one clear cleanup authority per resource. If a design needs shared ownership, use coordinated ownership tools. If a design crosses unsafe or external boundaries, document who owns, who frees, which cleanup function applies, and how error paths change responsibility. Every exception should be explicit, tested, and reviewed.",
  "narrationPoints": [
    "A double free occurs.",
    "The core issue is not only memory.",
    "In everyday engineering work.",
    "Rust changes the default model by assigning each value.",
    "That safety story is strongest inside Rust's normal.",
    "The defensive goal is one clear cleanup authority per."
  ]
};
