window.COURSE_MODULE = {
  "title": "What the C Memory Model Means",
  "graphicAlt": "Bullet summary graphic for What the C Memory Model Means.",
  "narration": "The C memory model describes how C programs reason about objects, bytes, memory locations, lifetimes, accesses, and shared memory in the C abstract machine. It gives language-level rules for what a C program may assume, what a compiler may assume, and when a program has left the defined part of the language.\n\nThis is not the same as a diagram of one operating system's process memory. Stack, heap, globals, and code segments can be useful teaching pictures, but the C standard talks in terms of objects, storage duration, lifetime, effective type, alignment, evaluation, and synchronization. A program that appears to work on one compiler, CPU, or optimization level may still be relying on assumptions the language does not guarantee.\n\nC gives programmers low-level control, but that control depends on staying within the rules. Undefined behavior gives the implementation no required behavior. Unspecified and implementation-defined behavior also need care because they can make code less portable or harder to review. Defensive C avoids depending on fragile behavior just because it currently seems to produce a desired result.\n\nMemory-model reasoning matters for security because invalid lifetimes, out-of-bounds access, aliasing mistakes, uninitialized reads, unclear sequencing, and data races can break the assumptions used by validation, authorization, parsing, state management, and cleanup code. The goal of this course is safe reasoning and review: understand the rules well enough to write code that remains correct under optimization, maintenance, and production pressure.",
  "narrationPoints": [
    "The C memory model describes how C programs reason about objects, bytes, memory locations, lifetimes, accesses.",
    "Stack, heap, globals, and code segments can be useful teaching pictures, but the C standard talks in terms of objects.",
    "C gives programmers low-level control, but that control depends on staying within the rules.",
    "Memory-model reasoning matters for security because invalid lifetimes, out-of-bounds access, aliasing mistakes, uninitialized reads.",
    "The goal of this course is safe reasoning and review."
  ]
};
