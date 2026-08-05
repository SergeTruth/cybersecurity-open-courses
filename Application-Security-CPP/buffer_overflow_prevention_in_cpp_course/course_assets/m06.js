window.COURSE_MODULE = {
  "title": "Input Validation and Size Calculation",
  "graphicAlt": "Untrusted length fields pass through parsing and subtraction-based bounds checks before checked multiplication, allocation, or copy operations.",
  "narration": "Untrusted or variable-length input should be validated before allocation, parsing, copying, formatting, or transformation. A length field in a file, message, request, or configuration value is a claim, not proof. The program should check that claim against supported limits and available data.\n\nReasonable maximum sizes are part of defensive resource control. A format may be able to express very large lengths, but the product still needs a maximum it is willing to process. That maximum should consider memory use, CPU time, service expectations, and failure behavior.\n\nSize arithmetic deserves careful review. Multiplication can overflow before allocation. Adding a terminator, header, or alignment padding can exceed a supported maximum. Converting between bytes, characters, elements, and protocol units can change meaning if the code is not explicit.\n\nSeparate parsing, validation, and memory operations where practical. First read enough to understand the claimed size. Then validate it against maximums and remaining input. Only then allocate, copy, or transform data. This structure makes review easier and reduces partial-state problems.\n\nA violated size assumption should be a safe failure. Reject the input, preserve the previous state, clean up temporary resources, and report a bounded diagnostic. Do not proceed with a smaller allocation or a guessed length simply because the normal path expected a different value.\n\nTests and reviews should cover zero sizes, one less than maximum, exact maximum, one more than maximum, conversion boundaries, empty input, truncated input, and repeated small fragments. Boundary cases are where many buffer assumptions become visible.",
  "narrationPoints": [
    "Untrusted or variable-length input should be validated before allocation, parsing, copying, formatting, or transformation.",
    "Reasonable maximum sizes are part of defensive resource control.",
    "Converting between bytes, characters, elements, and protocol units can change meaning if the code is not explicit.",
    "First read enough to understand the claimed size.",
    "Reject the input, preserve the previous state, clean up temporary resources, and report a bounded diagnostic.",
    "Boundary cases are where many buffer assumptions become visible."
  ]
};
