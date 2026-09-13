window.COURSE_MODULE = {
  "title": "RTIC Architecture, Tasks, Resources, and Boundaries",
  "graphicAlt": "Events map to focused tasks with local state and deliberately shared resources, alongside initialization and idle behavior.",
  "narration": "A secure RTIC system starts with an architecture that another engineer can understand. Reviewers should be able to identify initialization behavior, idle behavior, hardware-facing tasks, communication tasks, timing tasks, shared resources, local resources, and safety-relevant actions without reverse engineering the whole firmware.\n\nInitialization is part of the security model. It decides which peripherals exist, which resources are initialized, which tasks are enabled, what defaults apply, and what happens if a resource is unavailable. Idle behavior also matters because low-power states, background maintenance, and watchdog interactions can affect device reliability and recovery.\n\nRTIC resources should have clear ownership and access rules. Local resources can keep state close to the task that owns it. Shared resources should exist for a specific reason and should not become a dumping ground for global state. The more broadly shared a resource is, the more important its access policy becomes.\n\nFocused task responsibilities improve reviewability. A single task should not casually mix parsing, authorization, hardware control, logging, diagnostics, and recovery if those concerns need separate timing or trust decisions. Clear separation helps reviewers understand what input can influence which device behavior.\n\nSecurity review should map input paths to resources and actions. When a message, sensor value, maintenance command, or timer event enters the system, reviewers should know which task handles it, what resource it can touch, what validation happens first, and what failure behavior protects the device.",
  "narrationPoints": [
    "A secure RTIC system starts with an architecture.",
    "Initialization is part of the security model.",
    "RTIC resources should have clear ownership and access rules.",
    "Focused task responsibilities improve reviewability.",
    "Security review should map input paths to resources.",
    "Shared resources should exist for a specific reason."
  ]
};
