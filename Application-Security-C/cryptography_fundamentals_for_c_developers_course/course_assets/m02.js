window.COURSE_MODULE = {
  "title": "Use Libraries, Not Custom Crypto",
  "graphicAlt": "Draft visual summary for Use Libraries, Not Custom Crypto",
  "narration": "C developers should rely on well-maintained cryptographic libraries and reviewed platform capabilities. Cryptographic design is specialized, and small mistakes can change the security meaning of a system. A maintained library gives the application reviewed implementations, safer API patterns, documentation, update paths, and behavior that is already tested across platforms.\n\nAvoid custom algorithms and hand-built protocols. A project may have unique application requirements, but that does not mean it needs unique cryptographic primitives. The safer approach is to select an organization-approved library, follow current documentation, and keep integration code small enough to review.\n\nLibrary choice should consider maintenance, documentation quality, supported platforms, secure defaults, update cadence, compliance requirements where relevant, and operational fit. If a project must meet a regulatory or procurement requirement, that requirement should be included in the library decision early rather than retrofitted after implementation.\n\nAPI contracts matter. Some libraries require explicit initialization and cleanup. Some return detailed verification results. Some expose one-shot APIs, streaming APIs, context objects, reference-counted objects, or platform-backed key stores. Developers should understand memory ownership, thread-safety expectations, error reporting, and cleanup rules before writing application logic around the library.\n\nUsing a library does not remove responsibility. Teams still need to load keys correctly, choose approved settings, validate identities, check return values, test negative cases, and update dependencies. Safe cryptography in C is mostly the disciplined use of trusted APIs, not clever code.",
  "narrationPoints": [
    "C developers should rely on well-maintained cryptographic.",
    "Avoid custom algorithms and hand-built protocols.",
    "Library choice should consider maintenance.",
    "API contracts matter.",
    "Using a library does not remove responsibility.",
    "The safer approach is to select an organization-approved."
  ]
};
