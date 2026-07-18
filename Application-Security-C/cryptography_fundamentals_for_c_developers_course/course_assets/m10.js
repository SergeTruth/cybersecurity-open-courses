window.COURSE_MODULE = {
  "title": "Course Summary: Crypto as a Maintained Control",
  "graphicAlt": "Draft visual summary for Course Summary: Crypto as a Maintained Control",
  "narration": "Cryptography in C should be treated as a maintained engineering control. Start by defining the security goal: confidentiality, integrity, authentication, non-repudiation, or a combination of those goals. Then select organization-approved libraries and reviewed configurations that fit the application and platform.\n\nProtect the materials that make the design meaningful. Get randomness from approved sources. Generate, store, rotate, and retire keys deliberately. Keep secrets out of logs and diagnostics. Use authenticated encryption where appropriate, and make sure signatures, certificates, and identities are verified for the intended purpose.\n\nIntegration quality is part of security. Check every return value, handle failure safely, manage buffers and cleanup explicitly, limit plaintext and key exposure, and keep application authorization separate from cryptographic verification. A strong primitive cannot rescue code that ignores what the library reports.\n\nFinally, keep the control alive. Ask what negative tests exist, how dependencies are updated, how configurations are reviewed, what logging reveals, and how operational changes are handled. Cryptography is safest when teams can explain it, test it, observe it, and maintain it as the application evolves.",
  "narrationPoints": [
    "Cryptography in C should be treated.",
    "Protect the materials that make the design meaningful.",
    "Integration quality is part of security.",
    "Finally, keep the control alive.",
    "Use authenticated encryption where appropriate.",
    "Cryptography is safest."
  ]
};
