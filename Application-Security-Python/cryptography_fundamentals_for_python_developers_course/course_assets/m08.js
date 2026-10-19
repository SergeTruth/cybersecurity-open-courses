window.COURSE_MODULE = {
  "title": "Common Python Crypto Mistakes and Safe Review",
  "graphicAlt": "A crypto integration is reviewed for goals, vetted libraries, key lifecycle, validation, safe logs and failure handling.",
  "narration": "Common Python cryptography mistakes usually come from misplaced confidence. A developer writes custom cryptography, copies obsolete examples, hardcodes keys, reuses nonces, encrypts without integrity protection, uses fast hashes for passwords, disables TLS certificate verification, logs secrets or private keys, confuses encoding with encryption, accepts unsigned tokens, or forgets rotation. None of these mistakes requires a weak algorithm. They are usually integration and ownership failures.\n\nEncoding is a frequent source of confusion. Encoding changes representation so data can be transported or displayed; it does not provide confidentiality. Compression is not encryption. Hashing is not encryption. Signing is not encryption. Obscuring a value in a configuration file is not the same as protecting it with managed key access. Reviewers should ask which security property the code actually provides and whether that property matches the requirement.\n\nSafe review questions are direct. What is the security goal? Which library or protocol is used? Where do keys come from? Where are keys stored? Is randomness security-grade? Is authenticated encryption used where confidentiality and tamper detection are needed? Are passwords handled with dedicated password hashing? Is TLS verification enabled? Are tokens validated before claims are trusted? How are errors, logs, and rotation handled?\n\nSecurity tools can help find weak patterns, leaked secrets, outdated libraries, and dangerous configuration, but they do not replace design review and ownership. A tool may flag a call but not understand the business context, or miss a misuse hidden in architecture. Strong teams document crypto decisions, prefer high-level APIs, avoid custom primitives, test failure paths, monitor key and certificate lifecycle, and assign ownership for review and remediation.",
  "narrationPoints": [
    "Common Python cryptography mistakes usually come.",
    "Encoding is a frequent source of confusion.",
    "Safe review questions are direct.",
    "Security tools can help find weak patterns.",
    "Reviewers should ask which security property the code.",
    "Strong teams document crypto decisions."
  ]
};
