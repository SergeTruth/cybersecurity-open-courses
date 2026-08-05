window.COURSE_MODULE = {
  "title": "Why Dangling Pointers Matter",
  "graphicAlt": "Memory-lifetime diagram showing an object being destroyed while a raw pointer remains, followed by a blocked dereference path.",
  "narration": "A dangling pointer, reference, iterator, or view refers to an object that no longer exists or is no longer valid at that location. The address or handle may still look ordinary in the code, but the object relationship behind it has ended. That disconnect is what makes lifetime defects so hard to reason about after the fact.\n\nC++ gives engineers direct control over allocation, construction, movement, destruction, and storage reuse. That control supports performance, deterministic cleanup, embedded systems, libraries, and low-level integration. It also means the program is responsible for making sure borrowed access does not outlive the object being borrowed.\n\nLifetime defects can be intermittent. A stale pointer may appear to work in one build, fail in another, or change behavior when allocation patterns, compiler settings, container growth, or timing changes. The delayed symptom often hides the original lifetime mistake from the person investigating the failure.\n\nThe prevention mindset is straightforward: make ownership visible, keep borrowed access short, avoid storing observers without a clear contract, and use abstractions that encode lifetime expectations. Pointers are not the problem by themselves. Unclear ownership and unclear borrowing are the problem.\n\nTooling can help, but tools are strongest when the design already communicates intent. Sanitizers, diagnostics, debug library modes, tests, and review can reveal lifetime defects earlier. They work best when the team treats lifetime safety as a normal engineering concern, not a cleanup task at the end.",
  "narrationPoints": [
    "A dangling pointer, reference, iterator, or view refers to an object that no longer exists or is no longer valid at that location.",
    "That disconnect is what makes lifetime defects so hard to reason about after the fact.",
    "It also means the program is responsible for making sure borrowed access does not outlive the object being borrowed.",
    "The delayed symptom often hides the original lifetime mistake from the person investigating the failure.",
    "Tooling can help, but tools are strongest when the design already communicates intent.",
    "They work best when the team treats lifetime safety as a normal engineering concern, not a cleanup task at the end."
  ]
};
