window.COURSE_MODULE = {
  "title": "Shared Ownership, Weak References, and Cleanup",
  "graphicAlt": "Strong owners keep a shared value alive; Weak must be upgraded and may return Some or None.",
  "narration": "Single ownership is Rust's default, but real systems sometimes need shared ownership. `Box` provides owned indirection. `Rc` supports shared ownership in single-threaded code. `Arc` supports shared ownership across threads. These tools solve real design problems when chosen deliberately.\n\nShared ownership changes cleanup timing. A value behind `Rc` or `Arc` is dropped only when the final strong owner goes away. That prevents ordinary use-after-free in safe Rust because the value remains alive while strong owners exist, but it also means lifecycle and cleanup timing may be less obvious than with a single owner.\n\n`Weak` references model non-owning relationships that may expire. A weak reference does not keep the value alive by itself. Code must check whether the value is still available before using it. This is useful for parent-child relationships, caches, observer lists, graphs, and lifecycle-sensitive designs where not every relationship should extend lifetime.\n\nReference cycles are usually leaks rather than use-after-free in safe Rust, but they are still lifecycle problems. If strong references keep each other alive forever, cleanup may never happen. That can matter for memory, file handles, network connections, locks, and long-running services.\n\nInterior mutability and shared ownership should be reviewed carefully. They can be appropriate, but they move some reasoning into runtime checks or synchronization. The design should explain who owns the value, who can observe it, who can mutate it, how cleanup happens, and what happens when a weak relationship no longer upgrades.",
  "narrationPoints": [
    "Single ownership is Rust's default.",
    "Shared ownership changes cleanup timing.",
    "`Weak` references model non-owning relationships that may.",
    "Reference cycles are usually leaks rather than.",
    "Interior mutability and shared ownership should be reviewed.",
    "Code must check whether the value is still available."
  ]
};
