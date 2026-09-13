window.COURSE_MODULE = {
  "title": "Bounds Checks, Indexing, and Safe Access Patterns",
  "graphicAlt": "Checked lookup, iteration, and shape matching make boundary behavior explicit.",
  "narration": "Direct indexing is sometimes appropriate, especially when surrounding logic has already proved the index is valid. But it should not be the only habit. If an index is influenced by input, parsing, length calculations, record structure, or previous state, checked access can make the intended behavior clearer.\n\nMethods such as checked lookup let code handle missing or short data explicitly. Instead of assuming an index exists, the code can decide what should happen when data is absent. That choice is important for parsers, command-line tools, network handlers, and services that process untrusted or variable input.\n\nIterators often make buffer access safer and clearer than manual index arithmetic. They let the collection manage traversal while the code focuses on the operation being performed. When a loop does not need the numeric index, removing manual indexing also removes opportunities for off-by-one assumptions.\n\nPattern matching and slice APIs can express expected shapes. Code can distinguish empty data, one element, a fixed header plus body, or a prefix and remainder. These patterns make assumptions visible. They also make failure behavior easier to review because unsupported shapes are handled as cases rather than accidents.\n\nDefensive Rust reviews empty, short, long, and malformed inputs. It asks what happens at the first element, the last element, one past the last element, and no elements at all. The goal is not to fear indexing. The goal is to choose access patterns that make boundary behavior deliberate.",
  "narrationPoints": [
    "Direct indexing is sometimes appropriate, especially.",
    "Methods such as checked lookup let code handle missing.",
    "Iterators often make buffer access safer and clearer than.",
    "Pattern matching and slice APIs can express expected shapes.",
    "Defensive Rust reviews empty.",
    "But it should not be the only habit."
  ]
};
