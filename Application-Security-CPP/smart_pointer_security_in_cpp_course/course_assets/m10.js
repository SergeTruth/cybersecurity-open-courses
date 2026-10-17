window.COURSE_MODULE = {
  "title": "Course Summary: A Smart Pointer Safety Roadmap",
  "graphicAlt": "A smart-pointer roadmap combines ownership choices, deliberate sharing, clear API and deleter contracts, and lifetime testing.",
  "narration": "A smart pointer safety roadmap starts with ownership design. Before choosing a type, decide whether the object should be a value, uniquely owned, shared, weakly observed, or borrowed for a short operation. Prefer value ownership when it is practical because it keeps lifetime tied directly to scope and containing objects. When dynamic exclusive ownership is needed, prefer std::unique_ptr .\n\nUse std::shared_ptr deliberately. It is a tool for real shared lifetime, not a substitute for deciding ownership. Review shared ownership graphs for cycles, accidental lifetime extension, retained sensitive resources, and unclear shutdown behavior. Use std::weak_ptr when code needs to observe a shared object without keeping it alive, and handle expiration as part of the normal design.\n\nMake APIs say what they mean. Transfer ownership with types that show transfer. Borrow with references or raw pointers when the access is short-lived and the lifetime contract is clear. Use RAII and correct deleters for resources beyond memory, and wrap recurring cleanup rules in simple resource-owning types.\n\nFinally, treat smart pointer use as part of normal secure engineering. Test destruction order, error paths, callbacks, async work, and legacy migration boundaries. Use diagnostics and code review to follow ownership graphs. The goal is practical: fewer hidden lifetimes, fewer manual cleanup mistakes, and C++ code that remains understandable under maintenance and change.",
  "narrationPoints": [
    "A smart pointer safety roadmap starts with ownership design.",
    "Before choosing a type, decide whether the object should be a value, uniquely owned, shared, weakly observed, or borrowed for a short operation.",
    "Review shared ownership graphs for cycles, accidental lifetime extension, retained sensitive resources, and unclear shutdown behavior.",
    "Use RAII and correct deleters for resources beyond memory, and wrap recurring cleanup rules in simple resource-owning types.",
    "Test destruction order, error paths, callbacks, async work, and legacy migration boundaries.",
    "Finally, treat smart pointer use as part of normal secure engineering."
  ]
};
