window.COURSE_MODULE = {
  "title": "Testing and Validation",
  "graphicAlt": "Detection testing loop showing draft logic, test data, validation, analyst review, and deployment decision.",
  "narration": "Detection rules should be tested before broad deployment whenever practical. Validation helps teams understand whether the rule generates expected signals, produces excessive noise, or needs adjustment before analysts depend on it.\n\nTesting can include reviewing historical data, using safe lab data, comparing against known benign patterns, checking field parsing, confirming alert enrichment, and asking analysts whether the output gives them enough context to investigate.\n\nValidation is not only a technical step. It also asks whether the detection is operationally useful. Does it produce clear output? Does it support triage? Is the severity reasonable? Are the instructions understandable? Is the expected response defined?\n\nNo test guarantees perfect performance, but testing improves confidence. It helps teams find weak assumptions, missing telemetry, noisy conditions, broken parsing, and workflow gaps before those issues create operational friction.",
  "narrationPoints": [
    "Detection rules should be tested before broad deployment whenever practical. Validation helps teams understand whether the rule generates expected signals, produces excessive noise, or needs adjustment before analysts depend on it.",
    "Testing can include reviewing historical data, using safe lab data, comparing against known benign patterns, checking field parsing, confirming alert enrichment, and asking analysts whether the output gives them enough context to investigate.",
    "Validation is not only a technical step. It also asks whether the detection is operationally useful. Does it produce clear output? Does it support triage? Is the severity reasonable? Are the instructions understandable? Is the expected response defined?",
    "No test guarantees perfect performance, but testing improves confidence. It helps teams find weak assumptions, missing telemetry, noisy conditions, broken parsing, and workflow gaps before those issues create operational friction."
  ]
};
