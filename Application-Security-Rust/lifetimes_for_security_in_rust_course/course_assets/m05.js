window.COURSE_MODULE = {
  "title": "Structs, Traits, and Borrowed Fields",
  "graphicAlt": "Owned fields stay inside their struct, while borrowed fields and callbacks remain tied to an external owner.",
  "narration": "Structs can own their fields, or they can store references to data owned somewhere else. A struct with owned fields is usually straightforward: the struct controls the data and cleanup follows ownership. A struct with borrowed fields can be efficient, but it introduces lifetime relationships that callers must satisfy.\n\nWhen a struct stores borrowed data, the struct needs lifetime parameters to express that it cannot outlive the data it references. This protects safe code from building a long-lived object around short-lived data. The type itself communicates that the borrowed data must remain valid.\n\nBorrowed fields are not wrong. They can be useful for views, parsers, adapters, temporary contexts, and APIs that should avoid allocation. But they increase API complexity because every caller must understand and satisfy the lifetime relationship. That complexity should be justified by the design.\n\nTrait objects, callbacks, and borrowed behavior can also introduce lifetime questions. A callback may hold a reference. A trait object may be tied to borrowed data. An abstraction may need to expose whether it owns its data, borrows it, or shares ownership through another mechanism.\n\nDefensive API design asks which ownership model is clearest. Should the type own its data? Should it borrow temporarily? Should it use shared ownership because several components truly need the same value? The simplest safe ownership model is often the most maintainable one.",
  "narrationPoints": [
    "Structs can own their fields.",
    "When a struct stores borrowed data.",
    "Borrowed fields are not wrong.",
    "Trait objects, callbacks, and borrowed behavior can also.",
    "Defensive API design asks which ownership model is clearest.",
    "A struct with borrowed fields can be efficient."
  ]
};
