window.COURSE_MODULE = {
  "title": "Course Summary: Use-After-Free Prevention Habits",
  "graphicAlt": "A lifetime-safety roadmap follows ownership definition, bounded borrowing, invalidation rules, async capture, legacy transfer, and regression evidence.",
  "narration": "Use-after-free prevention is built from consistent habits. Make ownership and lifetime explicit. Prefer values and standard containers when they express the design. Use std::unique_ptr for exclusive ownership, std::shared_ptr only for intentional shared lifetime, and std::weak_ptr for observation when shared ownership already exists.\n\nKeep borrowed access short-lived. Treat raw pointers, references, iterators, spans, string views, and callbacks as non-owning access unless the API clearly says otherwise. Review any stored borrow, returned reference, captured pointer, or view into mutable data. Avoid raw owning pointers in new designs.\n\nPay special attention to invalidation and delayed execution. Container mutations can stale access. Reset and release operations can change ownership quickly. Callbacks and async work may run after the originating scope ends. Legacy boundaries need clear allocation and cleanup contracts.\n\nWhen a lifetime rule feels hard to explain, improve the design before relying on memory. Rename the role, change the type, shorten the borrow, or add a wrapper that makes the intended ownership obvious.\n\nFinally, use tooling and review together. Sanitizers, static analysis, focused tests, and CI builds can expose defects, but they work best when ownership design is clear. The durable question is simple: can any access outlive the object it uses?",
  "narrationPoints": [
    "Prefer values and standard containers when they express the design.",
    "Treat raw pointers, references, iterators, spans, string views, and callbacks as non-owning access unless the API clearly says otherwise.",
    "Pay special attention to invalidation and delayed execution.",
    "Legacy boundaries need clear allocation and cleanup contracts.",
    "Rename the role, change the type, shorten the borrow, or add a wrapper that makes the intended ownership obvious.",
    "The durable question is simple: can any access outlive the object it uses?"
  ]
};
