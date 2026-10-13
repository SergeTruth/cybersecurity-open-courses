window.COURSE_MODULE = {
  "title": "Course Summary: Choose by Contract, Use Consistently",
  "graphicAlt": "Contract-driven string handling identifies representation, supplies true capacity, checks every result, and handles lifetime and failure consistently, with edge-case tests and documented conventions.",
  "narration": "The main lesson is to choose string libraries by contract and use them consistently. A safer API is valuable when its behavior is documented, understood, and followed. It is not enough to replace an old function name with a newer one and assume the work is done.\n\nTrack the facts that matter: destination capacity, content length, null termination, pointer lifetime, mutability, ownership, allocation behavior, truncation behavior, and failure reporting. When those facts are explicit, string code becomes easier to review and easier to test.\n\nMake edge cases part of normal validation. Test exact-fit buffers, empty strings, full buffers, truncation, embedded nulls where relevant, allocation failure, malformed input, and platform differences. Check return values, and decide what partial output means before it reaches later logic.\n\nFinally, document project conventions. Which APIs are approved? How are wrappers expected to behave? What happens on truncation? Who owns returned buffers? Which platforms are supported? Safe string-library usage is a maintainable practice built from clear contracts, consistent code, and reviewable decisions.",
  "narrationPoints": [
    "The main lesson is to choose string libraries by contract and use them consistently.",
    "Track the facts that matter: destination capacity, content length, null termination, pointer lifetime, mutability.",
    "When those facts are explicit, string code becomes easier to review and easier to test.",
    "Check return values, and decide what partial output means before it reaches later logic.",
    "Safe string-library usage is a maintainable practice built from clear contracts, consistent code, and reviewable decisions."
  ]
};
