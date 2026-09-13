window.COURSE_MODULE = {
  "title": "Collections, Strings, Slices, and Bounds",
  "graphicAlt": "Checked access, UTF-8 character boundaries, and owner-linked slices make collection assumptions visible.",
  "narration": "Many memory-safety problems in other languages appear around arrays, strings, buffers, and indexing. Rust provides safer abstractions for collections, strings, slices, and iteration. Bounds checks, ownership rules, and borrowing rules remove many classes of direct memory misuse in safe code. But developers still make design choices about how data is accessed and interpreted.\n\nDirect indexing can panic when length assumptions are wrong. Sometimes indexing is acceptable because the code has already proven the length. In other cases, iterator-based patterns or checked access express intent more clearly. Defensive Rust code makes assumptions visible instead of hiding them in a position that might become invalid when input shape changes.\n\nRust strings are UTF-8, so code should distinguish text operations from byte operations. A character boundary is not always a byte boundary, and the meaning of length depends on what the code is measuring. Parsing, slicing, and validation should be explicit about whether the data is text, bytes, tokens, fields, or a structured format.\n\nSlices are borrowed views into data. They are powerful because they let code operate without copying, but the relationship between the slice and the owner must remain clear. Secure design avoids hidden assumptions about length, encoding, delimiters, and input shape. The goal is not to avoid collections or slices; it is to make access patterns match the actual data contract.",
  "narrationPoints": [
    "Many memory-safety problems in other languages appear.",
    "Direct indexing can panic when length assumptions are wrong.",
    "Rust strings are UTF-8.",
    "Slices are borrowed views into data.",
    "Parsing, slicing, and validation should be explicit about.",
    "They are powerful."
  ]
};
