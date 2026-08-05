window.COURSE_MODULE = {
  "title": "Custom Allocators, Memory Pools, and Performance Tradeoffs",
  "graphicAlt": "Memory-pool diagram showing fixed-capacity blocks, alignment and lifetime boundaries, synchronized allocation, explicit exhaustion, matching deallocation, and measurement points used to justify a custom allocator over standard ownership.",
  "narration": "Some C++ systems use custom allocators, memory pools, arenas, or std::pmr to improve performance, locality, determinism, or integration with platform constraints. These tools can be valuable, but they change lifetime assumptions and should be treated as design decisions.\n\nPools and arenas need clear reset and ownership rules. A pool reset may invalidate many objects at once. An arena may make individual deallocation impossible. A monotonic allocation strategy may retain memory until a larger scope ends. Code using these strategies must know which lifetime is being chosen.\n\nstd::pmr can centralize allocation strategy for standard-library-compatible types. That can make allocation behavior more consistent, but it also means the memory resource's lifetime must outlive the objects using it. The allocation strategy and object lifecycle must be reviewed together.\n\nPerformance choices should not obscure safety. An optimization that hides ownership, cleanup, or thread-safety rules can make future defects more likely. Specialized allocation should make the intended lifetime clearer, not less visible.\n\nSpecialized allocators need documentation and review. State who owns the allocator or pool, when memory is released, whether the strategy is thread-safe, what happens on exhaustion, and how diagnostics observe usage. Tests should include realistic lifecycle scenarios, not only fast-path allocation.",
  "narrationPoints": [
    "Some C++ systems use custom allocators, memory pools, arenas, or std::pmr to improve performance, locality, determinism, or integration with platform constraints.",
    "A monotonic allocation strategy may retain memory until a larger scope ends.",
    "Code using these strategies must know which lifetime is being chosen.",
    "The allocation strategy and object lifecycle must be reviewed together.",
    "Specialized allocation should make the intended lifetime clearer, not less visible.",
    "State who owns the allocator or pool, when memory is released, whether the strategy is thread-safe, what happens on exhaustion, and how diagnostics observe usage."
  ]
};
