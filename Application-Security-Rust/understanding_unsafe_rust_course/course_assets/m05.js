window.COURSE_MODULE = {
  "title": "Raw Pointers, Aliasing, Layout, and Lifetimes",
  "graphicAlt": "Raw-pointer access requires live aligned initialized memory, a valid lifetime, appropriate aliasing, and clear cleanup ownership.",
  "narration": "Raw pointers are powerful because they allow code to refer to memory without the normal reference checks of safe Rust. That power is why they need careful review. The code must establish pointer validity, alignment, initialization, ownership, aliasing behavior, and lifetime relationships through other means.\n\nReview should ask whether the pointer points to live data, whether the memory is correctly aligned for the type, whether the data has been initialized, and whether the referenced memory outlives the use. If mutation is involved, review must also ask whether the mutation is exclusive when exclusivity is required by the abstraction.\n\nAliasing assumptions should be explicit. Safe Rust references carry strict aliasing and mutation rules. Raw pointer code may need to recreate those guarantees through design. If multiple views can point to the same memory, reviewers should understand which operations are allowed, which are forbidden, and how the code prevents conflicting access.\n\nOwnership transfer and cleanup responsibility are equally important. If memory crosses a boundary, who owns it afterward? Who frees it? Which allocator created it? Can the external code retain it? Can the Rust side use it again? These questions should be answered in the API contract, not guessed from local code.\n\nLayout and representation assumptions matter when code crosses FFI boundaries or interprets bytes as structured data. Defensive design keeps these assumptions behind narrow abstractions and tests the boundary behavior. The smaller the low-level surface, the easier it is to prove that the assumptions hold.",
  "narrationPoints": [
    "Raw pointers are powerful.",
    "Review should ask whether the pointer points to live data.",
    "Aliasing assumptions should be explicit.",
    "Ownership transfer and cleanup responsibility are equally.",
    "Layout and representation assumptions matter.",
    "That power is why they need careful review."
  ]
};
