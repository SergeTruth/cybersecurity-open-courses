window.COURSE_CODE_MODULE = {
  "title": "Decoding is not authentication",
  "codeIntro": "Deliberately unsafe example for code review. Do not use it as authentication middleware.",
  "codeExamples": [
    {
      "title": "Unsafe: trusting parsed client input",
      "language": "typescript",
      "blurb": "A decode-only function can parse untrusted data. No authenticated context may be assigned until verification and all required validation succeed.",
      "code": "// UNSAFE: decoding establishes no trust.\nconst claims = decodeJwt(token);\nreq.user = claims;"
    }
  ]
};
