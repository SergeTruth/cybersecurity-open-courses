window.COURSE_MODULE = {
  "title": "Dependencies, Builds, and Supply Chain Hygiene",
  "graphicAlt": "Reviewed source, module records and build choices feed tests and a traceable release artifact that can be patched or rolled back.",
  "narration": "Go modules make dependencies visible, but visibility is not the same as governance. Every dependency should have a reason to exist, an owner, a maintenance story, and a path for updates. A small library can still introduce transitive code, behavior during build or generation, license concerns, or operational risk.\n\nVersion control matters. go.mod and go.sum should be reviewed with the same seriousness as application code when dependency behavior changes. Teams should understand why a version is pinned, when updates are expected, and how vulnerability notices or maintenance concerns are handled. Minimizing unnecessary dependencies can reduce the amount of code the team must trust.\n\nBuilds are also part of the security boundary. Build flags, generated code, embedded files, container images, release artifacts, debug symbols, linker settings, and environment-specific behavior can all affect what is shipped. A release process should make those choices visible rather than hiding them inside local commands or undocumented scripts.\n\nCI/CD checks can reinforce the baseline. Tests, race detection where appropriate, static analysis, formatting, dependency review, vulnerability checks where available, configuration validation, and artifact signing or provenance controls can help catch risky changes before deployment. The checks should be meaningful, repeatable, and owned by the team.\n\nReproducible habits make response easier. When teams know exactly what source, dependencies, flags, and artifacts went into a release, investigation and rollback become faster. Supply chain hygiene is not a separate paperwork exercise; it is part of dependable Go engineering. It also gives maintainers confidence that a security fix was built, packaged, and deployed from the intended inputs.",
  "narrationPoints": [
    "Go modules make dependencies visible, but visibility is not the same as governance.",
    "Version control matters.",
    "Builds are also part of the security boundary.",
    "CI/CD checks can reinforce the baseline.",
    "Reproducible habits make response easier."
  ]
};
