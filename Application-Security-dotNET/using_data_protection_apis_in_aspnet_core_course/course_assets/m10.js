window.COURSE_MODULE = {
  "title": "Course Summary: A Practical Data Protection Baseline",
  "graphicAlt": "Protected cookies and workflow links rest on appropriate protection, durable isolated keys and operational ownership with rotation and recovery review.",
  "narration": "A practical ASP.NET Core Data Protection baseline starts with appropriate use. Use Data Protection for protected application and framework payloads that need confidentiality and integrity and must later be validated and recovered by the intended application.\n\nChoose purpose strings deliberately. Keep purposes specific, stable, and tied to the workflow. Use time-limited protection when a value should expire, and remember that protected payloads do not replace server-side authorization, ownership checks, or current account state.\n\nConfigure deployment reality. Production applications often need durable key rings, environment separation, explicit application names, and reviewed behavior for containers, deployment slots, server farms, backups, and restore. Protect keys at rest and limit access to key material.\n\nFinally, plan operations. Understand framework dependencies such as cookies, antiforgery, and account tokens. Review key rotation, revocation, backup, restore, shared-cookie scenarios, logging, and failure behavior before release. Data Protection is strongest when cryptographic use, deployment reliability, and operational ownership are all aligned.",
  "narrationPoints": [
    "A practical ASP.NET Core Data Protection baseline starts with appropriate use.",
    "Use time-limited protection when a value should expire, and remember that protected payloads do not replace server-side authorization.",
    "Protect keys at rest and limit access to key material.",
    "Data Protection is strongest when cryptographic use, deployment reliability, and operational ownership are all aligned.",
    "Data Protection is strongest when cryptographic use, deployment reliability."
  ]
};
