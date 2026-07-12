window.COURSE_MODULE = {
  "title": "Testing Validation Logic",
  "graphicAlt": "Blank placeholder graphic for testing Python validation logic",
  "narration": "Validation logic should be tested as deliberately as business logic. Unit tests should confirm that valid inputs pass and invalid inputs fail. Negative tests are especially important because validation exists to reject bad data. Test missing fields, wrong types, invalid formats, excessive lengths, boundary values, unexpected nested structures, and values that violate business rules.\n\nBoundary tests catch many real defects. If a field allows one to one hundred items, test zero, one, one hundred, and one hundred one. If a number has a maximum, test the maximum and the value just above it. If a string has a length limit, test empty strings, maximum length, and overlong input. These tests make the contract concrete.\n\nProperty-based testing and fuzzing, at a high level, can help discover cases developers did not think to write manually. They are not replacements for clear requirements, but they can expose parser issues, encoding surprises, type confusion, and boundary failures. Use them where input parsing or transformation is complex enough to justify broader exploration.\n\nInvalid input should be logged safely. Logs can help detect abuse and debug integration problems, but raw invalid input may contain secrets, personal data, control characters, or payloads that make logs hard to read. Log enough context to support troubleshooting and monitoring, but avoid storing sensitive or dangerous raw values unnecessarily. Testing should cover behavior, errors, and observability, not only happy paths.",
  "narrationPoints": [
    "Validation logic should be tested as deliberately as business logic.",
    "Boundary tests catch many real defects.",
    "Property-based testing and fuzzing, at a high level, can help discover cases developers did not think to write manually.",
    "Invalid input should be logged safely.",
    "Python-specific negative tests should include booleans when an exact integer is required."
  ]
};
