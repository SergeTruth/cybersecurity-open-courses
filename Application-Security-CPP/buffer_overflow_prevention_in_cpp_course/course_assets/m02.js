window.COURSE_MODULE = {
  "title": "Understanding Buffers, Bounds, and Object Lifetimes",
  "graphicAlt": "A buffer contract labels base pointer, element count, valid range, object lifetime, and remaining capacity rather than relying on an address alone.",
  "narration": "A buffer is not just a pointer. It has storage, capacity, current length, element type, lifetime, ownership, and valid access rules. Safe buffer design keeps those facts visible for as long as possible. When they are separated, mistakes become much easier to write and much harder to review.\n\nRaw pointers and C-style arrays often lose important context when passed across function boundaries. A callee may know where data starts, but not how much storage exists, how much data is initialized, who owns the storage, or whether the pointer points to one element or many. That missing context is where boundary mistakes grow.\n\nNull termination is not the same as a verified length. A C-style string convention depends on a terminator being present before the valid storage ends. If code assumes termination without knowing the buffer capacity, it may read beyond the intended range. Text interfaces should define length and encoding expectations clearly.\n\nByte buffers and character strings require different handling rules. Binary data may contain zero bytes and should not be treated as text. Encoded text may change length when converted. A destination that is large enough for characters in one representation may not be large enough after transformation.\n\nSafe APIs preserve ownership and bounds across boundaries. Containers, spans, string types, buffer objects, and explicit length parameters all help maintain the contract. The goal is to make valid access rules obvious to the caller, the callee, tests, and reviewers.",
  "narrationPoints": [
    "Safe buffer design keeps those facts visible for as long as possible.",
    "A callee may know where data starts, but not how much storage exists, how much data is initialized, who owns the storage, or whether the pointer points to one element or many.",
    "A C-style string convention depends on a terminator being present before the valid storage ends.",
    "Byte buffers and character strings require different handling rules.",
    "A destination that is large enough for characters in one representation may not be large enough after transformation.",
    "The goal is to make valid access rules obvious to the caller, the callee, tests, and reviewers."
  ]
};
