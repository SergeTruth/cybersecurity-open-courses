window.COURSE_MODULE = {
  "title": "Priorities, Scheduling, Timing, and Availability",
  "graphicAlt": "Short critical work defers heavier processing, with explicit budgets, timeouts, and recovery protecting timing behavior.",
  "narration": "In embedded systems, availability is often part of security. A device that misses timing, blocks a critical control path, ignores backpressure, or becomes stuck in lower-value work can fail in ways that matter to safety, reliability, and user trust.\n\nRTIC priority design should reflect what must happen quickly, what may wait, and what work should be deferred or bounded. High priority should not become a place for unlimited parsing, logging, storage, or communication work. Priority expresses operational intent, so it deserves design review.\n\nLong-running work can starve lower-priority tasks or delay critical maintenance. Even if the code is memory-safe, a task that monopolizes execution can interfere with watchdog service, command handling, sensor processing, or recovery actions. Timing risks are not always visible from functional tests alone.\n\nDefensive design uses bounded work, clear scheduling assumptions, timeouts, watchdog thinking, and recovery paths. It asks what happens under load, what happens when input arrives faster than expected, and what happens when hardware responds slowly or not at all.\n\nTiming assumptions should be written in reviewable language. If a task must finish quickly, say what quickly means for the product. If work is deferred, state what queue or signal limits apply. If a watchdog is part of recovery, define what conditions it is expected to catch and what evidence should be available after recovery.\n\nA useful review question is not only, can this run, but can this run safely under degraded conditions. RTIC gives structure for priority and scheduling decisions. Security comes from using that structure to make timing behavior measurable, bounded, and aligned with product requirements.",
  "narrationPoints": [
    "In embedded systems, availability is often part of security.",
    "RTIC priority design should reflect what must happen.",
    "Long-running work can starve lower-priority tasks or delay.",
    "Defensive design uses bounded work.",
    "Timing assumptions should be written in reviewable language.",
    "A useful review question is not only."
  ]
};
