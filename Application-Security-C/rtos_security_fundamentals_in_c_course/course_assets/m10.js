window.COURSE_MODULE = {
  "title": "Course Summary: Secure RTOS Design Habits",
  "graphicAlt": "Three large major systems—task/driver boundary map, memory/message contract, minimal ISR/deferred task—stand on tested-failure foundation.",
  "narration": "Secure RTOS design begins with clear boundaries. Define task responsibilities, driver responsibilities, peripheral interfaces, interrupt paths, shared resources, and privileged code. When the architecture shows where data and authority move, review becomes practical.\n\nKeep memory and communication contracts explicit. Know who owns each buffer, how long it is valid, what length and capacity apply, which task may mutate it, and how messages are validated. Predictable memory behavior and clear inter-task communication reduce both reliability and security risk.\n\nMinimize high-authority and timing-sensitive work. Keep interrupt handlers small, defer complex work, limit privileged access, control shared state, and size stacks for real workloads. Real-time behavior is easier to trust when the most sensitive paths are small and well tested.\n\nFinally, test operational behavior. Exercise fault paths, timeout paths, queue full conditions, stack margins, update failures, watchdog behavior, diagnostic limits, and production configuration. RTOS security is a set of habits: explicit boundaries, least privilege, memory discipline, safe communication, interrupt discipline, hardened configuration, and tested failure behavior.",
  "narrationPoints": [
    "When the architecture shows where data and authority move, review becomes practical.",
    "Know who owns each buffer, how long it is valid, what length and capacity apply.",
    "Keep interrupt handlers small, defer complex work, limit privileged access, control shared state, and size stacks for real workloads.",
    "Keep interrupt handlers small, defer complex work, limit privileged access, control shared state.",
    "RTOS security is a set of habits: explicit boundaries, least privilege, memory discipline, safe communication, interrupt discipline."
  ]
};
