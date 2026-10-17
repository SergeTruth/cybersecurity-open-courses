window.COURSE_MODULE = {
  "title": "Refactoring Legacy Pointer Code",
  "graphicAlt": "Ownership mapping and lifetime regression tests guide incremental replacement of hidden owners while preserving clear borrowing contracts.",
  "narration": "Many C++ systems contain raw owning pointers, manual delete paths, pointer caches, mixed allocation conventions, and comments that describe lifetime rules no one fully trusts anymore. Smart pointer migration should begin with ownership mapping, not search-and-replace. Identify who creates each object, who owns it, who merely observes it, who may store access, and who destroys it.\n\nReplace owning raw pointers before observer pointers. If one component clearly owns the object, std::unique_ptr is often the safest migration target. It reduces manual cleanup and makes transfer explicit. Use std::shared_ptr only when the existing design truly requires shared lifetime, and record why sharing is necessary. Otherwise, migration can turn unclear raw ownership into unclear shared ownership.\n\nRefactoring should be incremental and test-driven. Add regression tests around destruction order, error paths, early returns, cancellation, and object graph behavior before making broad changes. Watch for APIs that return raw pointers, store callbacks, or expose caches. These are places where ownership and observation can become tangled.\n\nSome raw pointers may remain as borrowed access, especially at legacy or C interfaces. Document those conventions and keep them narrow. The goal is not to eliminate every raw pointer; it is to eliminate hidden ownership and make remaining borrowing rules clear enough for maintainers, reviewers, and tools to reason about.",
  "narrationPoints": [
    "Many C++ systems contain raw owning pointers, manual delete paths, pointer caches, mixed allocation conventions, and comments that describe lifetime rules no one fully trusts anymore.",
    "Smart pointer migration should begin with ownership mapping, not search-and-replace.",
    "Use std::shared_ptr only when the existing design truly requires shared lifetime, and record why sharing is necessary.",
    "If one component clearly owns the object, std::unique_ptr is often the safest migration target.",
    "Add regression tests around destruction order, error paths, early returns, cancellation, and object graph behavior before making broad changes.",
    "Some raw pointers may remain as borrowed access, especially at legacy or C interfaces."
  ]
};
