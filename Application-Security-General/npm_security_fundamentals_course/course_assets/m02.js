window.COURSE_MODULE = {
  "title": "Understanding npm Project Artifacts",
  "graphicAlt": "package.json declares intent, package-lock.json records the resolved dependency tree, and node_modules is the generated installation that should be reproducible.",
  "narration": "The package.json file is the visible contract for an npm project. It names the package, declares runtime dependencies, development dependencies, scripts, package manager expectations, and metadata used by developers and automation. Security review should treat package.json as more than a manifest of convenience. It defines what code can enter the project and which commands can run during development, build, test, and release workflows.\n\nThe package-lock.json file captures the resolved dependency tree for the application. It records specific package versions, integrity values, registry locations, and transitive relationships. This does not prove that every dependency is safe, but it does make the install more repeatable and reviewable. When a lockfile changes, the team can see the actual dependency movement instead of assuming a broad version range resolved to the same tree everywhere.\n\nThe node_modules directory is a generated result, not a trustworthy source of record. It can be large, machine-specific, and easy to corrupt through local experimentation. Secure teams usually review package.json and lockfile changes, use repeatable installation in automation, and avoid relying on manually edited installed packages. The important question is not just what is present on one workstation, but what a clean install will reproduce in CI and production build environments.",
  "narrationPoints": [
    "The package.json file is the visible contract for an npm project.",
    "The package-lock.json file captures the resolved dependency tree for the application.",
    "The node_modules directory is a generated result, not a trustworthy source of record."
  ]
};
