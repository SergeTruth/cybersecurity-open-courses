window.COURSE_MODULE = {
  "title": "Iterator Categories and Access Assumptions",
  "graphicAlt": "Iterator-category ladder from input through forward, bidirectional, random-access, and contiguous capabilities, with indexing enabled only at the appropriate level.",
  "narration": "Not all iterators support the same operations. Some are single-pass input iterators. Some are forward iterators that support multi-pass traversal. Some are bidirectional. Some are random-access or contiguous. The operations that are safe and efficient depend on the category and on the range behind the iterator.\n\nA common mistake is to treat every iterator like a vector iterator. Subtraction, indexing, jumping forward by an arbitrary distance, or assuming constant-time movement may be valid for random-access iterators and invalid or expensive for others. Repeated traversal may be safe for a forward range and unsafe for a single-pass input range.\n\nGeneric code should express its iterator requirements clearly. In modern C++, concepts can state that an algorithm needs a forward iterator, random-access range, or contiguous range. In older code, template structure, function names, documentation, assertions, and tests can still make requirements visible.\n\nClear constraints protect callers. If a function accepts any iterator but internally assumes random access, the problem may not appear until a different container or range is used. That is a maintainability hazard and a correctness risk. Defensive APIs make the required traversal behavior part of the contract.\n\nIterator category awareness also helps performance review. Code that repeatedly advances through a linked structure may be correct but unexpectedly costly. Safety and performance both improve when traversal assumptions match the actual range.",
  "narrationPoints": [
    "The operations that are safe and efficient depend on the category and on the range behind the iterator.",
    "Repeated traversal may be safe for a forward range and unsafe for a single-pass input range.",
    "A common mistake is to treat every iterator like a vector iterator.",
    "In older code, template structure, function names, documentation, assertions, and tests can still make requirements visible.",
    "If a function accepts any iterator but internally assumes random access, the problem may not appear until a different container or range is used.",
    "Safety and performance both improve when traversal assumptions match the actual range."
  ]
};
