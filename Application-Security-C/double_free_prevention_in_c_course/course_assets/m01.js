window.COURSE_MODULE = {
  "title": "Why Double-Free Prevention Matters",
  "graphicAlt": "Bullet summary graphic for Why Double-Free Prevention Matters.",
  "narration": "A double-free defect happens when the same dynamically allocated object is released more than once. In C, that is usually not just a single mistaken call. It often reflects a deeper contract problem: more than one path believes it has cleanup authority, or ownership changed but the surrounding code did not update its assumptions.\n\nThese defects matter because dynamic memory is shared through pointers, structures, containers, callbacks, and error paths. A pointer value can be copied many times, but the allocation it refers to has one lifetime. When that lifetime ends, every remaining alias must stop acting as if the object is still valid or still owned.\n\nDouble-free risk appears in normal engineering work. A function grows from one return path to several. A partially initialized object adds another member. A helper starts taking ownership on success. A container insertion changes who releases a child object. Without explicit rules, cleanup logic can drift into duplicated release behavior.\n\nPrevention is a design discipline. Developers should be able to point to the owner, the transfer rule, the valid lifetime, the cleanup authority, and the state after failure. Reviewers should not have to infer those facts from a long chain of conditionals.\n\nThis course stays focused on defensive practice: ownership, lifetime, cleanup paths, API contracts, testing, and tool-supported validation. The goal is to make memory release behavior predictable enough that one allocation has one clear cleanup story.",
  "narrationPoints": [
    "A double-free defect happens when the same dynamically allocated object is released more than once.",
    "When that lifetime ends, every remaining alias must stop acting as if the object is still valid or still owned.",
    "A function grows from one return path to several.",
    "Developers should be able to point to the owner, the transfer rule, the valid lifetime, the cleanup authority.",
    "Developers should be able to point to the owner, the transfer rule, the valid lifetime, the cleanup authority, and the state after failure."
  ]
};
