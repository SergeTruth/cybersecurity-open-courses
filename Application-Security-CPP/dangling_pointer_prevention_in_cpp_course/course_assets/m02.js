window.COURSE_MODULE = {
  "title": "Object Lifetime and Ownership Basics",
  "graphicAlt": "Ownership map distinguishing unique owner, shared owners, weak observer, and scoped borrow with their permitted lifetime transitions.",
  "narration": "An object is valid only during its lifetime. That lifetime may be tied to automatic storage in a scope, dynamic allocation, container ownership, static storage, a resource manager, or a higher-level object graph. Once the lifetime ends, old access paths to that object no longer have a valid target.\n\nOwnership answers the question of responsibility. Who keeps the object alive, who may transfer it, and who destroys it when work is complete? A program is easier to review when ownership has one clear answer or a deliberately shared answer with a documented policy.\n\nBorrowing answers a different question. Who may temporarily observe or use an object without owning it? Borrowed access is useful and common, but it must remain shorter than the owner. A borrowed pointer, reference, iterator, span, or string view should not silently become a long-lived object dependency.\n\nScope exits, destruction, movement, and temporaries all affect lifetime. A local object ends when its scope ends. A moved-from object remains alive but may no longer contain the expected value. A temporary may disappear sooner than a stored view expects. These rules matter because code often stores access paths separately from the owner.\n\nLifetime safety starts by making ownership and borrowing visible in code structure. Values, RAII members, smart pointers, spans, references, callbacks, and handles should each communicate their role. When that meaning is unclear, reviewers should ask whether the object will still be alive at every use.",
  "narrationPoints": [
    "That lifetime may be tied to automatic storage in a scope, dynamic allocation, container ownership, static storage, a resource manager, or a higher-level object graph.",
    "Who keeps the object alive, who may transfer it, and who destroys it when work is complete?",
    "Borrowed access is useful and common, but it must remain shorter than the owner.",
    "Scope exits, destruction, movement, and temporaries all affect lifetime.",
    "These rules matter because code often stores access paths separately from the owner.",
    "When that meaning is unclear, reviewers should ask whether the object will still be alive at every use."
  ]
};
