window.COURSE_MODULE = {
  "title": "Feature Flags and Optional Code Paths",
  "graphicAlt": "Feature choices determine optional code and dependencies, and shared crates can receive features from multiple dependents.",
  "narration": "Cargo feature flags are powerful because they let crates enable optional behavior. A feature may add a dependency, activate protocol support, switch a backend, enable serialization formats, include command-line integrations, change runtime behavior, or alter platform support. That flexibility is useful, but it also means features are part of the security profile.\n\nDefault features deserve attention. A crate may enable defaults that are helpful for broad compatibility but unnecessary for a specific project. If a service only needs one small capability, broad defaults may bring extra code paths, dependencies, formats, or integrations into the build. Disabling unnecessary defaults can make the artifact easier to review when it is practical and well tested.\n\nFeature interactions can surprise teams in workspaces and dependency graphs. Cargo feature unification means a feature enabled by one part of the graph can affect how a shared crate is built for another part. Reviewers do not need to memorize every internal detail to be effective, but they should know that workspace feature choices can have wider effects than a single Cargo.toml line suggests.\n\nSome feature choices are directly security-relevant. Features can influence parsing behavior, cryptographic backend selection, transport support, native integrations, logging behavior, or optional runtime capabilities. During dependency updates, a changed feature set may matter as much as a changed version number.\n\nDefensive Cargo use means selecting features intentionally. Document why important features are enabled, disable unnecessary defaults where appropriate, review feature changes in pull requests, and keep release tests aligned with the feature combinations that production actually uses. Minimal behavior is easier to reason about than accidental capability.",
  "narrationPoints": [
    "Cargo feature flags are powerful.",
    "Default features deserve attention.",
    "Feature interactions can surprise teams in workspaces.",
    "Some feature choices are directly security-relevant.",
    "Defensive Cargo use means selecting features intentionally.",
    "Disabling unnecessary defaults can make the artifact easier."
  ]
};
