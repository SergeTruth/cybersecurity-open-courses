window.COURSE_MODULE = {
  "title": "Using Platform Random Sources Safely",
  "graphicAlt": "Platform or approved-library source feeds a narrow wrapper, then a complete-output review gate, then requested random-byte buffer.",
  "narration": "Modern systems typically provide operating system or approved library APIs for security-grade random bytes. The exact API varies by platform, but the design principle is consistent: use the system or trusted library source intended for security-sensitive randomness rather than building your own generator.\n\nPlatform-specific APIs differ in names, blocking behavior, error reporting, initialization expectations, and supported environments. C code should document which platforms are supported and which randomness source is used on each one. This is especially important for portable libraries and cross-platform applications.\n\nRandom byte generation should check return values. The code should confirm that the requested amount was produced, and it should define what happens when the call fails or produces less than requested. Security-sensitive values should not be created from incomplete output.\n\nA small wrapper function can help. A wrapper can centralize platform differences, enforce complete output, convert API errors into application errors, and make call sites consistent. It also gives reviewers one place to inspect the security-grade randomness path.\n\nAvoid mixing untrusted or predictable values into a secure random source unless the platform or library explicitly supports that operation safely. Application-level mixing is easy to do badly and usually unnecessary. Request the bytes you need from the trusted source and keep the failure behavior simple.",
  "narrationPoints": [
    "The exact API varies by platform, but the design principle is consistent.",
    "C code should document which platforms are supported and which randomness source is used on each one.",
    "The code should confirm that the requested amount was produced, and it should define what happens.",
    "A wrapper can centralize platform differences, enforce complete output, convert API errors into application errors.",
    "Request the bytes you need from the trusted source and keep the failure behavior simple."
  ]
};
