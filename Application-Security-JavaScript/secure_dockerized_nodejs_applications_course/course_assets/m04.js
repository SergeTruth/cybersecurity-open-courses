window.COURSE_MODULE = {
  "title": "npm Dependencies, Lockfiles, and Reproducible Builds",
  "graphicAlt": "Lifecycle sequence for npm Dependencies, Lockfiles, and Reproducible Builds in Secure Dockerized Node.js Applications, tracing creation, validation, use, failure handling, cleanup, and verification while highlighting the component responsible at every transition.",
  "narration": "Docker does not remove npm risk. It packages npm risk into a deployable artifact. Runtime dependencies, transitive packages, install scripts, native modules, and lockfile changes become part of the image that runs in production. package.json and package-lock.json should be reviewed during pull requests because they define not only what the application imports, but also what the container build may execute and preserve.\n\nFor clean CI and container builds, npm ci is often preferred when a lockfile is present. It installs from the committed package-lock.json and fails when package metadata is inconsistent. A common build pattern is to copy package metadata first, run npm ci, then copy the rest of the application code. That can improve caching, but the security lesson is predictability and reviewability. The build should reproduce the dependency tree the team reviewed, not silently resolve something different during release.\n\nProduction runtime images should avoid carrying development dependencies when they are not needed. Test frameworks, linters, compilers, build plugins, and debugging tools may belong in a build stage but not the final image. Reproducible builds reduce uncertainty, but they do not prove dependencies are safe. Teams still need dependency scanning, package review, lockfile review, lifecycle script awareness, and remediation processes for known vulnerabilities.",
  "narrationPoints": [
      "Runtime dependencies, transitive packages, install scripts, native modules, and lockfile changes become part of the image that runs in production.",
      "For clean CI and container builds, npm ci is often preferred when a lockfile is present.",
      "Production runtime images should avoid carrying development dependencies when they are not needed.",
      "Reproducible builds reduce uncertainty, but they do not prove dependencies are safe.",
      "Teams still need dependency scanning, package review, lockfile review, lifecycle script awareness, and remediation processes for known vulnerabilities.",
      "The build should reproduce the dependency tree the team reviewed, not silently resolve something different during release."
  ]
};
