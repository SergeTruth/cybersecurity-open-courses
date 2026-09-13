window.COURSE_MODULE = {
  "title": "Memory, no_std, Panic Behavior, and Resource Limits",
  "graphicAlt": "Firmware explicitly budgets stack, queue, and buffer use and defines product-specific rejection, recovery, and panic behavior.",
  "narration": "Many RTIC systems run in `no_std` environments with strict memory and timing constraints. That can mean limited library support, controlled allocation, fixed buffers, static resources, and failure behavior that must match the device rather than a desktop or server runtime.\n\nSafe Rust reduces memory-corruption risk, but firmware can still fail through stack exhaustion, oversized buffers, unbounded queues, unchecked integer conversions, uncontrolled allocation, or panic behavior that is not appropriate for the product. Resource safety remains an engineering task.\n\nDefensive design reviews stack use, heap policy if any, static memory, queue lengths, message rates, buffer sizes, allocation strategy, recursion, and worst-case parsing paths. Numeric values that influence indexes, lengths, timeouts, counts, or allocation should be validated and bounded.\n\nPanic behavior should be deliberate. A development panic policy may be useful during testing, but production firmware needs a product-specific answer for what happens when an invariant fails. The answer may involve reset, safe state, error reporting, watchdog behavior, or controlled shutdown depending on the device.\n\nThe system should define behavior under pressure: full queues, oversized input, dropped messages, missed timing, peripheral failure, and allocation failure. Predictable degraded behavior is better than pretending those conditions cannot happen.",
  "narrationPoints": [
    "Many RTIC systems run in `no_std` environments with strict.",
    "Safe Rust reduces memory-corruption risk.",
    "Defensive design reviews stack use.",
    "Panic behavior should be deliberate.",
    "The system should define behavior under pressure: full.",
    "Numeric values that influence indexes."
  ]
};
