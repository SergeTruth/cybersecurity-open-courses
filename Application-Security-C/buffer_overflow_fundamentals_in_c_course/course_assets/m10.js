window.COURSE_MODULE = {
  "title": "Course Summary: A Buffer Safety Baseline",
  "graphicAlt": "Bullet summary graphic for Course Summary: A Buffer Safety Baseline.",
  "narration": "A practical buffer safety baseline for C starts with treating external input as size-risking data. Do not assume that input fits, is terminated, uses the expected encoding, or contains the delimiter the parser expects. Validate before copying, formatting, indexing, or allocating.\n\nTrack destination capacity, current length, and terminator space. Keep element counts and byte counts distinct. Validate arithmetic before allocation and copying, especially where multiplication, addition, casts, or signed and unsigned conversions are involved.\n\nMake buffer contracts explicit. Functions should show ownership, capacity, length, result state, truncation behavior, and failure behavior. Prefer reviewed interfaces that reduce hidden assumptions and carry validated size information through the workflow.\n\nUse compiler warnings, static analysis, sanitizers, and boundary tests to catch mistakes earlier. Review logs and diagnostics so they do not expose sensitive memory or internal details. Treat buffer safety as an engineering habit, not a one-time patch after a defect is found.",
  "narrationPoints": [
    "A practical buffer safety baseline for C starts with treating external input as size-risking data.",
    "Do not assume that input fits, is terminated, uses the expected encoding, or contains the delimiter the parser expects.",
    "Validate arithmetic before allocation and copying, especially where multiplication, addition, casts.",
    "Prefer reviewed interfaces that reduce hidden assumptions and carry validated size information through the workflow.",
    "Treat buffer safety as an engineering habit, not a one-time patch after a defect is found."
  ]
};
