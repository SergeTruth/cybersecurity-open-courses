window.COURSE_CODE_MODULE = {
  "title": "The server defines algorithm policy",
  "codeIntro": "Conceptual TypeScript pseudocode. These function names and options are illustrative, not an API from a specific JWT package.",
  "codeExamples": [
    {
      "title": "Constrain the cryptographic verification stage",
      "language": "typescript",
      "blurb": "This stage alone is insufficient for authentication. The configured key must belong to the expected issuer and match its algorithm policy. Module 3 adds the claim policy.",
      "code": "const protectedPayload = await verifySignatureOnly(\n  token,\n  trustedIssuerVerificationKey,\n  { algorithms: [\"RS256\"] }\n);\n\n// Do not assign req.auth here.\n// Issuer, audience, time, purpose, and claims still need checks."
    }
  ]
};
