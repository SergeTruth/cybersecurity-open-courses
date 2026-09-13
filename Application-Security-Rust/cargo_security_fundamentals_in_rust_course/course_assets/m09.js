window.COURSE_MODULE = {
  "title": "Course Summary: Cargo Security Checklist",
  "graphicAlt": "Cargo review covers inputs, crates, features, protected builds, and traceable releases.",
  "narration": "Cargo security fundamentals are a repeatable engineering practice. Start by reviewing Cargo.toml and Cargo.lock together. The manifest tells you what the project intends to depend on and how it is configured. The lockfile tells you what versions Cargo resolved for the build. Both views are necessary for real dependency visibility.\n\nKnow your direct and transitive dependencies. Choose crates intentionally, understand why they are needed, review their maintenance and compatibility signals, and remove dependencies that no longer earn their place. Update deliberately: do not ignore dependency changes forever, but do not accept changes blindly without tests and review.\n\nReview features and optional code paths. Default features, workspace feature interactions, protocol support, parser formats, native integrations, and cryptographic backend choices can all affect the final artifact. Select the minimum behavior required for the job and revisit feature choices during dependency updates.\n\nTreat build scripts, procedural macros, generated code, and native dependencies as trusted build inputs. Protect registry credentials, private package access, and publishing authority. Keep tokens out of repositories, logs, history, and broad CI/CD exposure. Make publishing deliberate, reviewed, and traceable.\n\nFinally, keep governance active. Use advisory, license, policy, and SBOM-style checks to maintain visibility. Build through controlled CI/CD workflows. Keep artifacts traceable, logs clean, releases reviewable, rollback expectations clear, and dependency records ready for incident response. Cargo security is not a one-time cleanup; it is part of how Rust software is responsibly built and released.",
  "narrationPoints": [
    "Cargo security fundamentals are a repeatable engineering.",
    "Know your direct and transitive dependencies.",
    "Review features and optional code paths.",
    "Treat build scripts.",
    "Finally, keep governance active.",
    "Update deliberately: do not ignore dependency changes."
  ]
};
