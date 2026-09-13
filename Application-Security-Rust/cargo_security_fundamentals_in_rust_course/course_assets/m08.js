window.COURSE_MODULE = {
  "title": "CI/CD, Reproducibility, and Release Readiness",
  "graphicAlt": "A release links reviewed source, dependency state, toolchain, build evidence, and an artifact while keeping logs free of secrets.",
  "narration": "Cargo workflows often run in CI/CD, so secure Cargo practice must include the pipeline. A pipeline should build from reviewed code, use expected toolchain versions, respect lockfiles where appropriate, and run in a clean environment that does not carry accidental local state. The build boundary is part of the product's trust story.\n\nReproducibility is not only a technical ideal. It is an operational advantage. When teams can trace an artifact back to a commit, configuration, dependency set, toolchain, and build job, they can investigate incidents, compare releases, reproduce defects, and answer compliance questions more confidently. Perfect reproducibility may not always be possible, but traceability should still be a goal.\n\nLockfile use and clean builds help reduce ambiguity. Applications and services usually benefit from building the dependency versions that were reviewed and tested. Libraries may have different lockfile expectations, but release and CI behavior should be explicit. Reviewers should know whether the pipeline is resolving fresh dependencies or using a committed resolution.\n\nRelease readiness should include more than a passing unit test. Dependency review, feature review, advisory checks, license expectations, artifact integrity, provenance records, versioning, changelog review, and rollback planning all contribute to confidence. The right gates depend on risk, but the process should be deliberate rather than improvised at release time.\n\nBuild logs should be useful without exposing secrets. Registry tokens, sensitive configuration, private package details, credentials, and unnecessary environment output should not appear in logs or artifacts. A secure release process gives operators and reviewers enough evidence to trust the build while protecting the sensitive information that made the build possible.",
  "narrationPoints": [
    "Cargo workflows often run in CI/CD.",
    "Reproducibility is not only a technical ideal.",
    "Lockfile use and clean builds help reduce ambiguity.",
    "Release readiness should include more than a passing unit.",
    "Build logs should be useful without exposing secrets.",
    "Perfect reproducibility may not always be possible."
  ]
};
