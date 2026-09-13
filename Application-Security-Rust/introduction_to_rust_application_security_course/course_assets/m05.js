window.COURSE_MODULE = {
  "title": "Dependencies, Crates, and Supply Chain Risk",
  "graphicAlt": "Direct and transitive crates, enabled features, lockfiles, and build-time code form a reviewed dependency surface.",
  "narration": "Rust projects often rely on crates from the ecosystem. That reuse is powerful, but every dependency becomes code that the application builds, links, and trusts. A dependency may parse input, handle network data, manage cryptography, process files, serialize messages, or run build-time logic. Dependency review is therefore part of application security, not a separate administrative task.\n\nTeams should understand direct and transitive dependencies. A small crate can pull in additional code through its dependency graph. Review should consider purpose, maintenance health, version constraints, licenses, known security issues, and whether the dependency is still necessary. The goal is not to avoid dependencies entirely; it is to know what code is part of the application and why.\n\nFeature flags deserve attention because they can enable additional code paths, optional parsers, protocols, cryptographic backends, platform integrations, or runtime behavior. A dependency may be safe for one use case with a minimal feature set but less appropriate when broad optional features are enabled. Feature selection should be intentional and visible during review.\n\nLockfiles, dependency inventories, SBOM-style records, and reproducible build practices improve visibility. Dependency updates should be planned and tested, not ignored indefinitely or accepted blindly. Secure Rust teams build a routine for reviewing dependency changes, testing updates, and understanding how crate choices affect the application's attack surface and operational risk.",
  "narrationPoints": [
    "Rust projects often rely on crates from the ecosystem.",
    "Teams should understand direct and transitive dependencies.",
    "Feature flags deserve attention.",
    "Lockfiles, dependency inventories, SBOM-style records,.",
    "Dependency review is therefore part of application security.",
    "Review should consider purpose."
  ]
};
