window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "An upload policy must be enforced by actual infrastructure, parser, storage, and processing components. This application type is not a runtime validator or a library configuration API.",
  "codeExamples": [
    {
      "title": "A narrow illustrative image policy",
      "language": "typescript",
      "blurb": "Illustrative values, not universal recommendations. The total request budget includes multipart overhead. Count fields and parts as well as files, and enforce aggregate quotas and concurrency separately.",
      "code": "type UploadPolicy = {\n  maxFileBytes: number;\n  maxRequestBytes: number;\n  maxFiles: number;\n  maxFields: number;\n  maxParts: number;\n  allowedTypes: readonly string[];\n  allowArchives: boolean;\n};\n\nconst avatarPolicy: UploadPolicy = {\n  maxFileBytes: 2 * 1024 * 1024,\n  maxRequestBytes: 3 * 1024 * 1024,\n  maxFiles: 1,\n  maxFields: 2,\n  maxParts: 3,\n  allowedTypes: [\"image/png\", \"image/jpeg\"],\n  allowArchives: false\n};\n// Enforce actual received bytes before unbounded buffering.\n// allowedTypes requires content-aware checks, not header equality."
    }
  ]
};
