window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Processing budgets are separate from multipart limits. The helper below is a conceptual supervisor contract, not a real Node.js API.",
  "codeExamples": [
    {
      "title": "Constrain archive processing while it runs",
      "language": "typescript",
      "blurb": "Illustrative limits. The supervisor must enforce termination, CPU/memory/output budgets, and restricted access. The extractor must contain every entry, reject links and unsupported entry types, and account for actual decompressed bytes. A timer in the same blocked event loop is insufficient.",
      "code": "const result = await runIsolatedArchiveProcessor(stagedVersion, {\n  maxInputBytes: 8 * 1024 * 1024,\n  maxExpandedBytes: 64 * 1024 * 1024,\n  maxEntries: 200,\n  maxNestedArchives: 0,\n  maxOutputBytes: 64 * 1024 * 1024,\n  maxWallTimeMs: 10_000,\n  maxCpuTimeMs: 5_000,\n  maxMemoryBytes: 256 * 1024 * 1024,\n  allowLinks: false,\n  networkAccess: false\n});\nawait validateDerivedOutputs(result);\n// Output remains private until required checks and promotion pass.\n// Always clean up the restricted processing workspace."
    }
  ]
};
