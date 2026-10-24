window.COURSE_MODULE = {
  "title": "Course Summary: Secure Library Habits",
  "graphicAlt": "A maintained library contract combines narrow APIs, explicit lifetimes, bounded failures and updates.",
  "narration": "Secure C++ libraries start with the public API. Treat every public function as part of a consumer's security model. Keep interfaces narrow, use clear names, prefer safe defaults, use strong types for important choices, and make sensitive operations explicit enough to review. The API should guide callers toward correct use.\n\nMake contracts visible. Document ownership, lifetime, cleanup, error behavior, thread safety, compatibility, and configuration. Avoid hidden global state, unclear allocator boundaries, and ambiguous behavior that forces callers to guess how the library should be used. Clear contracts reduce support burden and make wrapper code safer.\n\nValidate before trust. Check sizes, ranges, encodings, structure, and resource limits at boundaries. Preserve invariants on failure, return useful errors, and test malformed input, likely misuse, concurrency behavior, and compatibility across supported platforms and build modes.\n\nFinally, maintain the library as a product. Minimize and track dependencies, keep build options reviewable, publish clear release notes, support vulnerability response, and give consumers a path to update safely. A secure library helps every consuming application make safer decisions. Its design quality travels wherever the library is reused, so governance is part of the API promise. Secure habits compound across every downstream integration over time and responsible maintenance.",
  "narrationPoints": [
    "Secure C++ libraries start with the public API.",
    "Keep interfaces narrow, use clear names, prefer safe defaults, use strong types for important choices, and make sensitive operations explicit enough to review.",
    "Avoid hidden global state, unclear allocator boundaries, and ambiguous behavior that forces callers to guess how the library should be used.",
    "Check sizes, ranges, encodings, structure, and resource limits at boundaries.",
    "A secure library helps every consuming application make safer decisions.",
    "Secure habits compound across every downstream integration over time and responsible maintenance."
  ]
};
