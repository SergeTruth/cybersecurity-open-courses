window.COURSE_MODULE = {
  "title": "Why Buffer Overflow Prevention Still Matters",
  "graphicAlt": "A write crosses the end of a byte buffer into adjacent metadata, contrasted with a bounded copy that stops and returns an explicit error.",
  "narration": "Buffer overflow prevention still matters because C++ gives engineers direct control over memory, layout, object lifetime, and performance-sensitive behavior. That control is valuable. It lets teams build fast libraries, device software, services, engines, and infrastructure. It also means the program is responsible for respecting object boundaries and valid storage.\n\nA buffer mistake is not only a security concern. Writing past the end of a buffer, reading beyond valid storage, or trusting an incorrect length can corrupt state, damage data integrity, break reliability, and make later maintenance harder. The problem often starts as an ordinary engineering mistake rather than an obviously dangerous decision.\n\nPrevention starts before the copy or write operation. Teams need designs that preserve bounds information, express ownership, keep lifetimes clear, and avoid pointer-only APIs where better abstractions fit. When the design loses length, capacity, or ownership context, every later caller has to reconstruct the contract from memory.\n\nCompiler and library defenses help, but they cannot rescue unsafe assumptions. Stack protection, fortified library checks, sanitizers, warnings, and hardened release profiles are valuable layers. They work best when the code already uses safer C++ practices and when teams verify the final build.\n\nThe main theme of this course is layered prevention. Use modern C++ containers and views where appropriate. Validate input sizes before allocation or copying. Treat strings and byte buffers differently. Test edge cases. Harden releases. Then confirm that the shipped artifact matches policy.",
  "narrationPoints": [
    "Buffer overflow prevention still matters because C++ gives engineers direct control over memory, layout, object lifetime, and performance-sensitive behavior.",
    "Writing past the end of a buffer, reading beyond valid storage, or trusting an incorrect length can corrupt state, damage data integrity, break reliability, and make later maintenance harder.",
    "Prevention starts before the copy or write operation.",
    "Compiler and library defenses help, but they cannot rescue unsafe assumptions.",
    "The main theme of this course is layered prevention.",
    "Then confirm that the shipped artifact matches policy."
  ]
};
