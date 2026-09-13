window.COURSE_MODULE = {
  "title": "Unsafe Rust, Raw Pointers, and Manual Ownership",
  "graphicAlt": "A raw pointer becomes an owning wrapper only through a reviewed single reconstruction with explicit allocator and release contracts.",
  "narration": "Safe Rust prevents ordinary double free, but unsafe code can reintroduce manual ownership assumptions. Raw pointers do not automatically record who owns an allocation, who may free it, or whether the resource has already been transferred. Those facts live in the surrounding contract.\n\nManual reconstruction of owned values from raw pointers is especially sensitive. The review question is whether ownership is being reconstructed exactly once and only by the code that truly owns the resource. If two wrappers are built around the same raw owner, cleanup may run twice through separate paths.\n\nCustom allocation behavior needs clear boundaries. Which allocator created the memory? Which component is allowed to deallocate it? Has ownership been transferred to Rust, to external code, or to a wrapper type? The answer should be visible in the API and safety documentation.\n\nAdvanced tools such as `ManuallyDrop`, intentional drop suppression, or manual cleanup sequencing require strong review evidence. They can be legitimate in low-level abstractions, but they should not be used to paper over unclear ownership. The safety contract should explain why ordinary `Drop` is not enough and how duplicate cleanup is prevented.\n\nA safe wrapper around unsafe internals must enforce cleanup invariants for ordinary callers. Callers should not be able to create two owners for one raw resource, free through the wrong path, or keep using an object after ownership has been consumed. The wrapper is the defensive boundary.",
  "narrationPoints": [
    "Safe Rust prevents ordinary double free.",
    "Manual reconstruction of owned values from raw pointers is.",
    "Custom allocation behavior needs clear boundaries.",
    "Advanced tools such as `ManuallyDrop`.",
    "A safe wrapper around unsafe internals must enforce cleanup.",
    "The review question is whether ownership is being."
  ]
};
