window.COURSE_MODULE = {
  "title": "Course Summary: A Secure Reflection Baseline",
  "graphicAlt": "Typed designs, bounded selection, authorized invocation, trusted plugins and deployment review keep dynamic behavior owned and observable.",
  "narration": "A secure reflection baseline starts by minimizing reflection when a typed design is safer. Reflection is useful, but its flexibility should be deliberate. Use explicit maps, allowlists, registries, typed interfaces, and trusted contracts when runtime selection is required.\n\nDo not let users choose arbitrary types, members, plugins, handlers, or concrete implementations. Validate and authorize before dynamic invocation, and treat reflected arguments and configuration values as untrusted unless they come from a trusted source.\n\nTreat loaded assemblies as code, not data. AssemblyLoadContext can help manage dependencies, but it does not make untrusted code safe to execute. Plugin systems need trusted sources, narrow contracts, least privilege, dependency review, and operational ownership.\n\nFinally, keep reflection-driven automation reviewable. Handle trimming and Native AOT requirements deliberately, redact logs and diagnostics, document production reflection behavior, and assign clear ownership. Reflection security is about keeping dynamic behavior bounded, observable, and aligned with the application's trust boundaries.",
  "narrationPoints": [
    "A secure reflection baseline starts by minimizing reflection when a typed design is safer.",
    "Do not let users choose arbitrary types, members, plugins, handlers, or concrete implementations.",
    "Plugin systems need trusted sources, narrow contracts, least privilege, dependency review.",
    "Plugin systems need trusted sources, narrow contracts, least privilege, dependency review, and operational ownership.",
    "Reflection security is about keeping dynamic behavior bounded, observable, and aligned with the application's trust boundaries."
  ]
};
