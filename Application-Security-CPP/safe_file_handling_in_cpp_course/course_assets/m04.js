window.COURSE_MODULE = {
  "title": "Reading and Parsing File Contents",
  "graphicAlt": "Bounded-read pipeline showing file metadata checks, byte ceilings, incremental reads, strict decoding, exact schema validation, and fail-closed handling for truncation, malformed input, oversized content, and I/O errors.",
  "narration": "File contents should be treated as input, even when the file lives in a location the application controls. Files can be stale, malformed, truncated, oversized, partially written, copied from another version, or changed by an administrative process. A trusted path does not automatically make the contents valid for the current program state.\n\nSize limits should come before loading whole files into memory. Small configuration files and large data files deserve different strategies. If a file may be large or externally influenced, prefer streaming or chunked processing where practical. When the program does load a complete file, the maximum expected size should be explicit and justified. That protects reliability as much as security.\n\nText and binary files need different assumptions. Text processing should define encoding expectations and how invalid text is handled. Binary processing should define exact structure, versioning, length fields, and numeric boundaries. Parsing should detect incomplete or extra data according to the format contract rather than quietly accepting whatever was convenient to read.\n\nA maintainable design separates responsibilities. First read bytes or text from an approved file. Then parse structure. Then validate meaning: ranges, required fields, relationships, and resource limits. Only after those checks should the data enter business logic. That separation makes tests sharper and reviews easier because each layer has a clear question to answer.",
  "narrationPoints": [
    "File contents should be treated as input, even when the file lives in a location the application controls.",
    "When the program does load a complete file, the maximum expected size should be explicit and justified.",
    "If a file may be large or externally influenced, prefer streaming or chunked processing where practical.",
    "Binary processing should define exact structure, versioning, length fields, and numeric boundaries.",
    "Parsing should detect incomplete or extra data according to the format contract rather than quietly accepting whatever was convenient to read.",
    "Then validate meaning: ranges, required fields, relationships, and resource limits."
  ]
};
