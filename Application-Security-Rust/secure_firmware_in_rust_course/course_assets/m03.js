window.COURSE_MODULE = {
  "title": "Memory Safety, no_std, and Resource Constraints",
  "graphicAlt": "Firmware uses bounded stack, buffers, and queues with validated sizes, allocation policy, timeouts, and defined failure behavior.",
  "narration": "Many firmware projects use `no_std`, fixed memory layouts, static allocation, bounded buffers, or carefully controlled heap usage. These constraints shape security because the device may have limited diagnostics, strict timing behavior, and little tolerance for unbounded allocation or surprise failure paths.\n\nRust ownership and borrowing help clarify who owns buffers, peripherals, state, and handles. That clarity reduces classes of memory-safety risk in safe code and gives reviewers a better way to reason about reuse, mutation, and lifetime. In firmware, that also helps explain which component is responsible for a resource at each point in time.\n\nMemory-safe code can still fail through resource pressure. Stack depth, buffer sizes, queue lengths, message rates, recursion, allocation policy, integer conversions, and worst-case input sizes all matter. A firmware path can be memory safe and still become unreliable if it accepts more work than the device can handle.\n\nDefensive Rust firmware favors bounded data structures, explicit limits, predictable failure behavior, and careful conversion of numeric values into sizes, indexes, counts, and timeouts. When a heap is present, the policy for allocation and failure should be clear. When static buffers are used, ownership and maximum use should be documented.\n\nThe practical review question is what happens under pressure. If input is too large, if a queue is full, if a task misses timing, if a buffer is exhausted, or if a conversion fails, the device should move to a defined behavior. Secure firmware is not only memory safe; it is bounded enough to operate safely when conditions are not ideal.",
  "narrationPoints": [
    "Many firmware projects use `no_std`.",
    "Rust ownership and borrowing help clarify who owns buffers.",
    "Memory-safe code can still fail through resource pressure.",
    "Defensive Rust firmware favors bounded data structures.",
    "The practical review question is what happens under.",
    "When a heap is present."
  ]
};
