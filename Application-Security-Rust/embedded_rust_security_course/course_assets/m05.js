window.COURSE_MODULE = {
  "title": "Interrupts, Concurrency, DMA, and Shared State",
  "graphicAlt": "DMA buffer ownership transfers from software to hardware and returns only after completion.",
  "narration": "Embedded firmware often has multiple execution contexts: a main loop, interrupt handlers, timers, DMA engines, RTOS tasks, and sometimes async executors. These contexts can interact through shared state, hardware flags, buffers, queues, and peripheral events. Rust helps with ownership and data-race prevention, but the concurrency design still needs to be explicit.\n\nShared mutable state should be protected through an appropriate pattern. Depending on the platform and framework, that may mean critical sections, atomics, locks, message passing, ownership transfer, or framework-supported resource models. The key is that the code should show who may read or mutate a value and under what conditions.\n\nDMA introduces special ownership questions because hardware may read or write a buffer while software also wants access. Defensive code defines who owns the buffer at each moment, when software may inspect it, when hardware may write it, how completion is signaled, and what happens on cancellation, timeout, or error.\n\nTiming and signaling matter. A design may be memory-safe and still have races in state transitions, missed signals, unexpected latency, or cleanup that only works on the happy path. Reviewers should ask whether interrupt handlers do minimal work, whether shared flags are used correctly, and whether long operations are bounded.\n\nThe defensive goal is concurrency that is bounded and reviewable. The firmware should make shared-state rules, buffer ownership, interrupt behavior, and completion paths clear enough that a reviewer can reason about normal execution, overload, cancellation, and recovery without guessing.",
  "narrationPoints": [
    "Embedded firmware often has multiple execution contexts.",
    "Shared mutable state should be protected through.",
    "DMA introduces special ownership questions.",
    "Timing and signaling matter.",
    "The defensive goal is concurrency that is bounded.",
    "The key is that the code should show who may read or mutate."
  ]
};
