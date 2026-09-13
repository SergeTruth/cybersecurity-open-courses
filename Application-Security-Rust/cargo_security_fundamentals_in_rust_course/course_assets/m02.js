window.COURSE_MODULE = {
  "title": "Cargo.toml, Cargo.lock, and Dependency Visibility",
  "graphicAlt": "Cargo.toml records dependency intent while Cargo.lock records resolved versions, including transitive dependencies.",
  "narration": "The Cargo.toml manifest is the project's declaration of intent. It describes the package, dependencies, features, workspace relationships, build settings, metadata, and sometimes publishing behavior. For security review, the manifest answers a simple but important question: what did this project ask Cargo to include and how is that request configured?\n\nCargo.lock answers a different question. It records the resolved versions selected for a build. That matters because dependency requirements in the manifest can allow a range of versions, while the lockfile captures the concrete dependency graph that Cargo actually selected. The manifest shows intent. The lockfile shows resolution.\n\nDirect dependencies are the crates the project requests explicitly. Transitive dependencies arrive through those crates. Both are security-relevant because both become part of the trusted codebase. A project may have only a few direct dependencies and still pull in a larger tree of parsing libraries, platform helpers, build utilities, procedural macros, or optional integrations.\n\nVersion requirements deserve review because they shape what Cargo can resolve now and during future updates. Flexible requirements may ease maintenance, but they still need release discipline. Very narrow requirements may preserve stability, but they can also slow security updates. The right choice depends on the project, the release process, and the team's ability to test changes.\n\nWorkspace dependency visibility is especially important in larger Rust codebases. Shared dependencies, feature unification, internal crates, and multiple binaries can make it harder to see what each artifact uses. Defensive teams review Cargo.toml and Cargo.lock together in code review and CI/CD so unknown, unnecessary, outdated, or surprising dependencies do not enter unnoticed.",
  "narrationPoints": [
    "Direct dependencies are the crates the project requests.",
    "Version requirements deserve review.",
    "Workspace dependency visibility is especially important.",
    "The right choice depends on the project.",
    "lock together in code review and CI/CD.",
    "For security review."
  ]
};
