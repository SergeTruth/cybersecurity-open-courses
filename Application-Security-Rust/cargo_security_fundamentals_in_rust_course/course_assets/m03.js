window.COURSE_MODULE = {
  "title": "Crates, Versions, and Dependency Trust",
  "graphicAlt": "A crate review considers purpose, maintenance, full dependency footprint, and deliberate updates.",
  "narration": "Adding a crate is a trust decision. The project now relies on that crate's code, maintainers, release process, dependencies, features, and future updates. This does not mean every dependency is suspicious. It means each dependency should have a clear reason to exist and enough review evidence for the risk it introduces.\n\nA practical dependency review starts with purpose. What problem does the crate solve? Is the dependency used in production code, tests, examples, or build tooling? Could the project use a smaller dependency, an existing internal abstraction, or a standard library feature instead? The answer may still be to add the crate, but the reasoning should be explicit.\n\nMaintenance signals also matter. Reviewers should consider documentation quality, compatibility expectations, version history, release cadence, issue activity, and whether the crate's maintainers appear responsive to important problems. These signals are not perfect, but they help teams avoid quietly depending on abandoned or poorly understood code.\n\nThe dependency footprint includes transitive dependencies and enabled features. A small direct dependency can introduce a larger set of libraries, optional integrations, parsing formats, native components, or build-time behavior. Review should consider the full impact on the artifact, not only the top-level crate name in Cargo.toml.\n\nUpdates should be deliberate. Ignoring updates indefinitely can leave known issues unresolved, but accepting every update blindly can introduce behavior changes or feature interactions without review. Retiring unnecessary dependencies is also a security improvement. Less trusted code means less surface area to understand, monitor, and maintain.",
  "narrationPoints": [
    "Adding a crate is a trust decision.",
    "A practical dependency review starts with purpose.",
    "Maintenance signals also matter.",
    "The dependency footprint includes transitive dependencies.",
    "Updates should be deliberate.",
    "It means each dependency should have a clear reason."
  ]
};
