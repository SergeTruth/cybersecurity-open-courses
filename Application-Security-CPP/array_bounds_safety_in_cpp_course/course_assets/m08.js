window.COURSE_MODULE = {
  "title": "Refactoring Legacy Array Code",
  "graphicAlt": "A legacy pointer-and-count function is wrapped by a bounded adapter, then gradually replaced at call sites by container and span interfaces.",
  "narration": "Many teams inherit C++ code with raw arrays, pointer arithmetic, manual buffer management, and unclear ownership. The right response is not usually a full rewrite. Bounds safety improves through focused, incremental changes that reduce risk while preserving behavior.\n\nStart with priority paths. Externally reachable parsers, file importers, protocol handlers, serialization code, plugin boundaries, boundary-heavy loops, and code that mixes offsets and lengths deserve early attention. These paths are where unclear bounds assumptions can have the broadest impact.\n\nAdd regression tests before behavior-sensitive changes. Legacy code often contains undocumented compatibility behavior, and tests give the team confidence to refactor safely. Boundary tests around empty input, exact sizes, truncated data, and near-limit ranges are especially useful.\n\nWrap unsafe interfaces before replacing internals. A small adapter can validate inputs, preserve length with data, and provide a bounded view to newer code. That wrapper becomes a controlled boundary while the implementation is gradually moved toward containers, spans, and clearer range objects.\n\nReplace pointer arithmetic with clearer range logic where practical. Instead of moving pointers through a buffer without visible context, keep a view of remaining data or use helper functions that validate subranges. Document assumptions that cannot yet be removed and add follow-up work when the surrounding design is ready.",
  "narrationPoints": [
    "Many teams inherit C++ code with raw arrays, pointer arithmetic, manual buffer management, and unclear ownership.",
    "Bounds safety improves through focused, incremental changes that reduce risk while preserving behavior.",
    "Legacy code often contains undocumented compatibility behavior, and tests give the team confidence to refactor safely.",
    "Boundary tests around empty input, exact sizes, truncated data, and near-limit ranges are especially useful.",
    "Replace pointer arithmetic with clearer range logic where practical.",
    "Document assumptions that cannot yet be removed and add follow-up work when the surrounding design is ready."
  ]
};
