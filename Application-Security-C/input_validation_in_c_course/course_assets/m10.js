window.COURSE_MODULE = {
  "title": "Course Summary: Validate Before Trust",
  "graphicAlt": "Identified input, explicit rules, validation before commitment and safe rejection rest on boundary and malformed-input testing.",
  "narration": "The main rule of this course is validate before trust. Input is not trusted just because it was received, decoded, copied, or converted. It becomes usable only after it has been checked against explicit source, type, range, length, format, encoding, and state rules for the operation it will influence.\n\nUse practical review questions. Where did this input come from? What trust boundary did it cross? What type, range, length, format, and encoding are expected? Has the input been parsed before use? Could invalid input influence memory access, resource use, control flow, or state changes?\n\nWhen validation fails, the program should fail closed, avoid partial state updates, clean up temporary resources, and log safely. Deeper code should receive a validated representation or a clear error, not ambiguous data that every layer has to reinterpret.\n\nFinally, keep validation alive through testing and review. Boundary tests, malformed input tests, regression tests, warnings, static analysis, sanitizers, and high-level input-generation workflows can reveal missed assumptions. They work best when the validation contract is explicit enough for both humans and tools to understand.",
  "narrationPoints": [
    "Input is not trusted just because it was received, decoded, copied.",
    "Could invalid input influence memory access, resource use, control flow, or state changes.",
    "Could invalid input influence memory access, resource use, control flow.",
    "When validation fails, the program should fail closed, avoid partial state updates, clean up temporary resources.",
    "Boundary tests, malformed input tests, regression tests, warnings, static analysis."
  ]
};
