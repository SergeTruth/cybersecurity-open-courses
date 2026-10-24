window.COURSE_MODULE = {
  "title": "Concurrency, Forking, and Long-Running Programs",
  "graphicAlt": "Central trusted random helper connects to thread pair, forked processes, and restart lifecycle with amber state-review badges.",
  "narration": "Threaded and long-running programs need predictable initialization and safe use of random sources. The code should define when random functionality becomes available, what happens if initialization fails, and how multiple threads call the source safely through the supported API.\n\nForked processes can duplicate process state, which matters for stateful generators. If a design uses a deterministic generator for non-security purposes, fork behavior should be considered. For security-sensitive values, the safer pattern is to rely on platform or approved library sources that are designed to handle process behavior correctly.\n\nDaemons, containers, embedded systems, and service restarts may encounter repeated initialization patterns. Cloned images, repeated startup paths, or unusual boot timing can expose assumptions about seeding and entropy. These concerns belong in design and operational review, not in application-level invention.\n\nDo not cache or reuse security-sensitive random values beyond their intended lifetime. A token, nonce, key, or one-time code should have a clear purpose and lifecycle. Reuse can break the property the value was meant to provide, even if the original generation was strong.\n\nCentralized random helper functions can enforce consistent behavior across threads, processes, and modules. They make it easier to check errors, use the correct source, avoid biased ranges, and document security intent. Review should consider startup, restart, fork, error, and recovery paths.",
  "narrationPoints": [
    "Threaded and long-running programs need predictable initialization and safe use of random sources.",
    "If a design uses a deterministic generator for non-security purposes, fork behavior should be considered.",
    "Daemons, containers, embedded systems, and service restarts may encounter repeated initialization patterns.",
    "A token, nonce, key, or one-time code should have a clear purpose and lifecycle.",
    "Review should consider startup, restart, fork, error, and recovery paths."
  ]
};
