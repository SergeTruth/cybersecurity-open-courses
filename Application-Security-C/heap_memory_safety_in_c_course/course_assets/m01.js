window.COURSE_MODULE = {
  "title": "Why Heap Memory Safety Matters",
  "graphicAlt": "Heap storage moves through sizing, initialization, ownership, bounded use and release, with bounds, ownership and lifetime tracked together.",
  "narration": "Heap memory safety is a core reliability, maintainability, and security discipline in C. Dynamic allocation lets programs create objects whose size, count, or lifetime are not known at compile time. That flexibility supports real software: parsers, queues, caches, trees, buffers, request state, and long-lived data structures.\n\nThe same flexibility means the program must define rules that other languages or runtimes may enforce automatically. C code has to decide how much memory to allocate, when the object becomes initialized, who owns it, how long it remains valid, which bounds apply to each access, and which path releases it.\n\nHeap mistakes can appear far from their root cause. A wrong size calculation may surface later as an invalid access. A missing cleanup path may show up only after repeated operations. A stale pointer may be passed through several helper functions before it is used. That distance is why clear contracts are more reliable than local assumptions.\n\nDefensive heap management is practical engineering. It combines explicit ownership, predictable initialization, checked sizes, clear lifetime boundaries, disciplined cleanup, tests that exercise failure paths, and tools that help detect mistakes earlier. The goal is maintainable code that reviewers can reason about before production pressure arrives.",
  "narrationPoints": [
    "Heap memory safety is a core reliability, maintainability, and security discipline in C.",
    "Dynamic allocation lets programs create objects whose size, count, or lifetime are not known at compile time.",
    "The same flexibility means the program must define rules that other languages or runtimes may enforce automatically.",
    "A missing cleanup path may show up only after repeated operations.",
    "A stale pointer may be passed through several helper functions before it is used."
  ]
};
