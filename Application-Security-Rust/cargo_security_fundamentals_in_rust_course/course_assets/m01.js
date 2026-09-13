window.COURSE_MODULE = {
  "title": "Why Cargo Security Matters",
  "graphicAlt": "Cargo builds an artifact from dependencies, selected features, and build-time code that all require visibility.",
  "narration": "Cargo is more than the command Rust developers use to build code. It defines packages, resolves dependencies, enables features, runs build-time logic, manages lockfiles, interacts with registries, and supports publishing workflows. Those responsibilities put Cargo directly inside the software supply chain for Rust applications, libraries, command-line tools, and services.\n\nRust gives teams strong memory-safety properties, but memory safety does not remove dependency and release risk. A project can be written in safe Rust and still depend on unnecessary crates, surprising default features, stale versions, unreviewed build scripts, leaked registry credentials, or release artifacts that nobody can trace back to a reviewed source state.\n\nThe important security idea is that everything Cargo builds becomes part of the trusted product. Direct dependencies, transitive dependencies, feature-selected code paths, procedural macros, native libraries, generated code, and package metadata can all influence what reaches production. A secure team knows what those inputs are and why they are present.\n\nCargo security fundamentals are not about distrusting every crate or freezing development. They are about making dependency and build decisions visible. Teams need practical habits for reviewing manifests, lockfiles, features, build-time code, registries, credentials, advisory signals, licenses, CI/CD behavior, and release evidence.\n\nThe defensive goal is a repeatable build process with governed inputs. A reviewer should be able to understand what code is being built, where it came from, what features are enabled, which tools produced the artifact, who can publish changes, and what evidence supports release readiness. That visibility is the foundation for trust.",
  "narrationPoints": [
    "Cargo is more than the command Rust developers use to build.",
    "Rust gives teams strong memory-safety properties.",
    "The important security idea is that everything Cargo builds.",
    "Cargo security fundamentals are not about distrusting every.",
    "The defensive goal is a repeatable build process.",
    "A reviewer should be able to understand what code is being."
  ]
};
