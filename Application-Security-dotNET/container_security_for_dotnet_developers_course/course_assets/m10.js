window.COURSE_MODULE = {
  "title": "Course Summary: A Secure .NET Container Baseline",
  "graphicAlt": "Bullet summary graphic for Course Summary: A Secure .NET Container Baseline.",
  "narration": "A secure .NET container baseline starts with trusted, minimal, appropriate base images. Use SDK images for builds and runtime images for production whenever that fits the application. Use multi-stage builds so the final image contains the published application and runtime dependencies instead of build tools and local artifacts.\n\nKeep secrets out of images, build layers, logs, and support artifacts. Inject runtime configuration through governed platform mechanisms, understand ASP.NET Core configuration precedence, and separate development, staging, and production settings so one environment does not quietly override another.\n\nRun containers as non-root where possible, reduce runtime privilege, review writable paths, and avoid assumptions that the application can install tools or modify filesystem state at runtime. Align the application with orchestrator settings for identity, filesystem behavior, capabilities, resource limits, and probes.\n\nReview network exposure, TLS termination, proxy headers, health endpoints, service boundaries, image scanning, SBOMs, registry controls, logging, diagnostics, rollback, and incident response. Container security is an ongoing lifecycle for .NET developers, platform teams, and operations working from the same release baseline.",
  "narrationPoints": [
    "A secure .NET container baseline starts with trusted, minimal, appropriate base images.",
    "Inject runtime configuration through governed platform mechanisms, understand ASP.NET Core configuration precedence, and separate development, staging, and production settings so one environment does not quietly override another.",
    "Run containers as non-root where possible, reduce runtime privilege, review writable paths, and avoid assumptions that the application can install tools or modify filesystem state at runtime.",
    "Review network exposure, TLS termination, proxy headers, health endpoints, service boundaries, image scanning, SBOMs, registry controls, logging, diagnostics, rollback, and incident response.",
    "Container security is an ongoing lifecycle for .NET developers, platform teams, and operations working from the same release baseline."
  ]
};
