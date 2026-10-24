window.COURSE_MODULE = {
  "title": "Memory Ownership, Allocators, and Runtime Mismatch",
  "graphicAlt": "Library-created objects return through matching destruction functions while caller wrappers preserve ownership rules.",
  "narration": "Memory ownership across ABI boundaries is a common source of defects. If one component allocates memory and another frees it with a different allocator, runtime, build mode, or cleanup convention, behavior can become unsafe. This is especially important across DLL boundaries, plugins, custom allocators, third-party libraries, and mixed debug or release builds. The problem is not just allocation. It is the entire ownership lifecycle.\n\nDefensive APIs define who owns each object, which function releases it, and whether the caller may copy, retain, mutate, or share it. A returned pointer without a release rule is not a complete contract. Passing containers or strings across a boundary can also carry allocator and layout assumptions. Even when the code compiles, the binary contract may assume a runtime pairing the deployment does not actually provide.\n\nRelease functions, custom deleters, opaque handles, and RAII wrappers can make cleanup rules explicit and reviewable. A library that creates an object can provide the matching destroy function. A caller-side wrapper can then call that function automatically. This keeps ownership visible while avoiding mismatched cleanup. Review should ask what happens on normal release, error paths, early shutdown, repeated cleanup, and version mismatch. Tests should include the exact allocation and release paths that cross the boundary.\n\nOwnership rules should be written in a way a caller can follow without reading implementation code. State whether returned memory is borrowed or owned, whether buffers can be retained after the call, whether the caller may mutate data, and which function performs cleanup. The safer API is usually the one where the release path is boring, obvious, and hard to get wrong.",
  "narrationPoints": [
    "Memory ownership across ABI boundaries is a common source of defects.",
    "A returned pointer without a release rule is not a complete contract.",
    "Even when the code compiles, the binary contract may assume a runtime pairing the deployment does not actually provide.",
    "A caller-side wrapper can then call that function automatically.",
    "Tests should include the exact allocation and release paths that cross the boundary.",
    "The safer API is usually the one where the release path is boring, obvious, and hard to get wrong."
  ]
};
