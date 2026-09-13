window.COURSE_MODULE = {
  "title": "Overflow, Underflow, and Arithmetic Behavior",
  "graphicAlt": "For u8 at 255 plus one: checked_add returns None, saturating_add returns 255, wrapping_add returns 0, and overflowing_add returns (0, true).",
  "narration": "Arithmetic behavior is a design decision. Overflow and underflow happen when a calculation crosses the range that a type can represent. The defensive question is not only whether Rust catches a problem in one configuration. The question is which arithmetic behavior the application actually intends.\n\nRust can detect overflow in checked configurations, but production code should not rely on accidental build-mode behavior for security decisions, allocation decisions, authorization rules, or parser boundaries. If failure matters, the code should represent failure explicitly through checked arithmetic or a domain-specific validation path.\n\nChecked arithmetic reports failure when the result cannot be represented. That is often the right choice for allocation sizes, offsets, counters, protocol calculations, money-like values, and other cases where crossing the boundary means the operation should stop or return an error.\n\nSaturating arithmetic clamps at a boundary. It can be appropriate for some counters, metrics, or bounded display values, but it can hide a problem if the domain really needs to know that a limit was exceeded. Wrapping arithmetic intentionally wraps around the type range and should be used only when wraparound is part of the design, not because it is convenient.\n\nOverflowing arithmetic returns both a result and an overflow indication, which can be useful when the caller needs both pieces of information. Whichever behavior is chosen, document the intent and test the edge cases. Minimums, maximums, zero, one, and one-past-limit values are where numeric assumptions become visible.",
  "narrationPoints": [
    "Arithmetic behavior is a design decision.",
    "Rust can detect overflow in checked configurations.",
    "Checked arithmetic reports failure.",
    "Saturating arithmetic clamps at a boundary.",
    "Overflowing arithmetic returns both a result.",
    "If failure matters."
  ]
};
