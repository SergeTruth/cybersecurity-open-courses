window.COURSE_MODULE = {
  "title": "CI/CD, Git, Deployment, and Remote Automation",
  "graphicAlt": "Repository and environment boundaries scope job keys, with controlled runtime delivery and cleanup rather than image-layer or artifact storage.",
  "narration": "SSH keys are often used by CI/CD jobs, Git operations, deployment scripts, artifact synchronization jobs, monitoring checks, and remote administration tasks. These environments create storage and exposure risks that differ from an interactive shell. A key may be injected into a runner, copied into a workspace, cached in a container layer, printed in debug output, or reused across environments because it was easy to configure once.\n\nGit deploy keys should be scoped to the repository and workflow that need them. A key that only needs read access to one repository should not have broader platform access. Deployment and artifact-transfer keys should be scoped to their target environment and task. Production keys should be separated from development and staging keys so a lower-environment job does not accidentally gain production reach.\n\nBuild-time and runtime key material should be handled separately. Keys used during image builds can be captured in layers, caches, package metadata, or build logs if the process is not designed carefully. Runtime keys should be injected at runtime through controlled mechanisms where practical. Temporary key files should avoid artifact paths, shared caches, and broad workspaces.\n\nSecret masking helps reduce accidental log exposure, but it is not a complete boundary. Derived values, file names, debug output, copied workspaces, or untrusted jobs can still create risk. Automation should clean up temporary key material, avoid overbroad environment access, and log enough to support review without exposing secrets. CI/CD SSH keys should be treated as production credentials when they can affect production systems.",
  "narrationPoints": [
    "SSH keys are often used by CI/CD jobs, Git operations, deployment scripts, artifact synchronization jobs, monitoring checks, and remote administration tasks.",
    "Git deploy keys should be scoped to the repository and workflow that need them.",
    "Build-time and runtime key material should be handled separately.",
    "Secret masking helps reduce accidental log exposure, but it is not a complete boundary.",
    "A key that only needs read access to one repository should not have broader platform access.",
    "Deployment and artifact-transfer keys should be scoped to their target environment and task."
  ]
};
