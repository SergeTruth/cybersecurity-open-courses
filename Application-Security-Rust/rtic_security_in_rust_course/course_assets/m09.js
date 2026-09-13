window.COURSE_MODULE = {
  "title": "Course Summary: RTIC Security Checklist",
  "graphicAlt": "RTIC security combines mapped boundaries, bounded timing, narrow locks, explicit DMA ownership, state validation, and lifecycle hardening.",
  "narration": "RTIC security is a layered embedded engineering practice. Start by mapping device assets, external interfaces, tasks, execution contexts, shared and local resources, trust boundaries, and lifecycle assumptions. The architecture should show how input can influence resources and device behavior.\n\nUse RTIC structure to make concurrency reviewable. Priorities should reflect time-critical work. Locks and critical sections should stay narrow. Interrupt work should be bounded. DMA buffer ownership should be explicit. Memory, queues, and panic behavior should have product-specific limits and recovery expectations.\n\nTreat protocol parsing as a security boundary. Validate length, framing, fields, state, mode, and relationships before actions reach sensitive logic. Convert valid messages into domain types where possible so later tasks operate on reviewed meaning rather than raw bytes.\n\nDocument hardware and unsafe assumptions. Review peripheral ownership, register behavior, initialization order, interrupt interactions, and safe wrappers. Unsafe code should be small, justified, tested, and protected by APIs that ordinary callers can use correctly.\n\nFinally, harden the lifecycle. Protect secrets, updates, debug paths, dependencies, build artifacts, signing materials, release evidence, and maintenance procedures. Test timing, failure paths, input boundaries, and lifecycle assumptions over time so firmware remains reviewable after the first release.",
  "narrationPoints": [
    "RTIC security is a layered embedded engineering practice.",
    "Use RTIC structure to make concurrency reviewable.",
    "Treat protocol parsing as a security boundary.",
    "Document hardware and unsafe assumptions.",
    "Finally, harden the lifecycle.",
    "The architecture should show how input can influence."
  ]
};
