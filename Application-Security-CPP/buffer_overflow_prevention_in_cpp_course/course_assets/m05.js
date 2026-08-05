window.COURSE_MODULE = {
  "title": "Designing Safer Function and API Boundaries",
  "graphicAlt": "A transformation API accepts separate input and output spans, checks overlap and capacity, and returns the exact number of elements written.",
  "narration": "Buffer overflow prevention is often an API design problem. A function that accepts only a raw pointer gives callers and reviewers very little safety information. The pointer may refer to one object, an array, output storage, optional data, or legacy ownership. The API should not force every caller to guess.\n\nWhere raw buffers are unavoidable, pair them with explicit length or capacity parameters and clear contracts. Say whether the length is in bytes or elements. Say whether the function reads, writes, appends, or formats. Say whether the function may partially write output when it fails.\n\nPrefer APIs that return owned values, accept containers, or use bounded views when those choices fit the design. Returning a `std::string`, `std::vector`, or domain-specific buffer object can make ownership clear. Accepting `std::span` can make a borrowed range clear. These choices reduce pointer-only ambiguity.\n\nDefine what happens when output does not fit. The policy might be an error return, an exception, truncation with explicit reporting, or a caller-provided retry with the required size. The important point is that the function does not silently produce ambiguous output.\n\nAmbiguous API contracts become long-term security debt because every caller must preserve a hidden rule. Safer APIs make the valid call easy, the invalid call harder, and the failure behavior visible. They are easier to test because the boundary conditions are part of the contract.",
  "narrationPoints": [
    "Buffer overflow prevention is often an API design problem.",
    "The API should not force every caller to guess.",
    "Say whether the function reads, writes, appends, or formats.",
    "Returning a `std::string`, `std::vector`, or domain-specific buffer object can make ownership clear.",
    "The policy might be an error return, an exception, truncation with explicit reporting, or a caller-provided retry with the required size.",
    "Safer APIs make the valid call easy, the invalid call harder, and the failure behavior visible."
  ]
};
