window.COURSE_MODULE = {
  "title": "Course Summary: Ownership Fundamentals Checklist",
  "graphicAlt": "The ownership checklist covers responsibility, minimal borrowing, explicit mutation, valid lifetimes, deliberate sharing, and cleanup.",
  "narration": "Ownership fundamentals are a practical design habit. Start by asking who owns each value and who is responsible for cleanup. If a function needs long-term responsibility, ownership may be appropriate. If it only needs temporary access, borrowing is usually clearer. The signature should communicate the responsibility.\n\nBorrow when ownership is not needed. Use shared references for reading and mutable references for controlled change. Keep mutation explicit and exclusive. When the borrow checker objects, treat that feedback as a signal that scopes, responsibilities, or data flow may need to be clearer.\n\nUse lifetimes to understand reference relationships. Most lifetime reasoning is inferred, but the concept matters every time a function returns a reference or a struct borrows data. If a borrowing relationship becomes hard to express, consider whether owned data, a different state structure, or a clearer API would better match the program's real responsibilities.\n\nDesign functions, structs, and enums around ownership contracts. Choose strings, slices, collections, iterators, and smart pointers intentionally. Avoid clones that only hide ownership confusion, but do not reject owned data when it makes the design safer and easier to maintain.\n\nOwnership is not a hurdle to overcome. It is how Rust makes responsibility visible. When used well, it supports memory safety, predictable cleanup, clear APIs, concurrency discipline, and reviewable data flow across applications, libraries, services, command-line tools, and systems components.",
  "narrationPoints": [
    "Ownership fundamentals are a practical design habit.",
    "Borrow when ownership is not needed.",
    "Use lifetimes to understand reference relationships.",
    "Design functions, structs, and enums around ownership.",
    "Ownership is not a hurdle to overcome.",
    "The signature should communicate the responsibility."
  ]
};
