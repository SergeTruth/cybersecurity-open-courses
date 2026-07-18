window.COURSE_MODULE = {
  "title": "Randomness, Nonces, and Initialization Values",
  "graphicAlt": "Draft visual summary for Randomness, Nonces, and Initialization Values",
  "narration": "Many cryptographic operations depend on values that are unpredictable, unique, or both. Keys, salts, nonces, initialization values, and session material may look like ordinary bytes, but their security requirements are specific. Using a general-purpose pseudo-random function for these values is not acceptable unless the library explicitly documents that use.\n\nCryptographically secure random sources are designed for security-sensitive generation. In C applications, that usually means using the operating system, platform API, or cryptographic library function approved for this purpose. The code should handle random-generation failure as a real error, because continuing with weak or missing randomness can invalidate the design.\n\nNonces and initialization values are not all secret. Many require uniqueness or unpredictability according to the primitive and mode being used. A nonce may be stored or transmitted with the protected data, but reuse can still be unsafe when the primitive requires uniqueness. Developers should follow the library's rules rather than relying on intuition.\n\nStartup assumptions matter. Embedded systems, early-boot services, containerized processes, and restricted environments may have different random-source behavior. The application should use approved APIs and should make startup failures visible when secure randomness is not available. Silent fallback to weaker generation is not a safe recovery strategy.\n\nWhen the library can manage nonces, initialization values, salts, or generated keys safely, prefer that path. Library-managed values reduce the chance of local mistakes and often encode the expected size and format. When the application must provide values, tests should verify size, uniqueness policy, storage behavior, and error handling.\n\nReviewers should ask where every security-sensitive random or unique value comes from, how failure is handled, and whether the value is secret, unique, unpredictable, or simply a label. Clear answers prevent accidental misuse of strong primitives.",
  "narrationPoints": [
    "Many cryptographic operations depend on values.",
    "Cryptographically secure random sources are designed.",
    "Nonces and initialization values are not all secret.",
    "Startup assumptions matter.",
    "When the library can manage nonces.",
    "Reviewers should ask where every security-sensitive random."
  ]
};
