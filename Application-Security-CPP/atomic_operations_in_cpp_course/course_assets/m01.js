window.COURSE_MODULE = {
  "title": "Why Atomic Operations Matter",
  "graphicAlt": "Two threads access shared state; an unsynchronized path forms a data race while an atomic or locked path establishes a defined synchronization edge.",
  "narration": "Atomic operations are tools for safe communication between threads. They give C++ programs defined behavior when multiple threads access a specific atomic object, which is very different from relying on a plain variable and hoping the timing works out.\n\nThat definition is narrow on purpose. An atomic prevents data races on the atomic object itself when used correctly, but it does not automatically make a class, container, subsystem, or object graph thread-safe. Larger relationships still need ownership rules, synchronization, and lifetime design.\n\nAtomics matter because concurrent behavior affects reliability, availability, and safe cleanup. A stop flag that is not observed correctly may leave work running too long. A readiness flag that is not paired with proper publication rules may let another thread observe incomplete state. A counter may look harmless but still carry operational decisions.\n\nThe most appropriate uses are simple shared values: flags, counters, and small state transitions where the meaning is clear. When the code needs to protect multiple fields or preserve a compound invariant, another synchronization mechanism may be clearer.\n\nA useful habit is to treat every atomic as a small contract. What value does it represent? Who writes it? Who reads it? What other state does it coordinate with? What lifetime assumptions are required?\n\nAtomic code is powerful, but it should not feel mysterious. Secure C++ favors concurrent designs that reviewers can explain, test, and maintain under production pressure.\n\nIf the explanation depends on hidden timing assumptions, the design needs more structure before it is ready.",
  "narrationPoints": [
    "Atomic operations are tools for safe communication between threads.",
    "Larger relationships still need ownership rules, synchronization, and lifetime design.",
    "A readiness flag that is not paired with proper publication rules may let another thread observe incomplete state.",
    "The most appropriate uses are simple shared values: flags, counters, and small state transitions where the meaning is clear.",
    "Atomic code is powerful, but it should not feel mysterious.",
    "If the explanation depends on hidden timing assumptions, the design needs more structure before it is ready."
  ]
};
