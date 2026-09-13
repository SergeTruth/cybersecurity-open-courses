window.COURSE_MODULE = {
  "title": "Smart Pointers and Shared Ownership",
  "graphicAlt": "Strong owners coordinate a shared value's lifetime, with value cleanup after the final strong owner; Weak links require checked upgrade.",
  "narration": "Smart pointers encode ownership patterns. `Box<T>` gives one owner for heap-allocated data. It is still single ownership: the box owns the value, and cleanup happens when the box is dropped. This is useful when indirection is needed without creating multiple cleanup authorities.\n\n`Rc<T>` supports coordinated shared ownership in single-threaded code. `Arc<T>` supports coordinated shared ownership across threads. These types allow multiple strong owners to point to the same value, but they do not create independent cleanup paths. The value is dropped only when the final strong owner goes away.\n\nThat difference matters. Shared ownership is not duplicate ownership. Duplicate ownership means more than one path incorrectly believes it independently owns the same raw resource. Coordinated shared ownership uses reference counting so cleanup happens exactly once at the right time.\n\n`Weak` references represent non-owning links. A weak reference does not keep the value alive. Code must check whether the value still exists before using it. This is useful for parent-child relationships, caches, observer lists, graph-like structures, and lifecycle-sensitive designs where not every relationship should extend cleanup timing.\n\nDefensive design chooses smart pointers deliberately. Shared ownership can solve real problems, but it can also make lifecycle timing less obvious. Review whether sharing is truly needed, whether mutation is controlled, whether cycles are possible, and whether a weaker non-owning relationship would better express the design.",
  "narrationPoints": [
    "Smart pointers encode ownership patterns.",
    "`Rc<T>` supports coordinated shared ownership.",
    "That difference matters.",
    "`Weak` references represent non-owning links.",
    "Defensive design chooses smart pointers deliberately.",
    "Code must check whether the value still exists."
  ]
};
