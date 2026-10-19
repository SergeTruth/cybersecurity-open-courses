window.COURSE_MODULE = {
  "title": "Course Summary: A Secure ASP.NET Core Image Baseline",
  "graphicAlt": "A secure image baseline joins clean builds, excluded secrets, compatible least-privilege runtime, exact artifact evidence and continued patching.",
  "narration": "A secure ASP.NET Core Docker image baseline starts by treating images as supply-chain artifacts. Know what is inside the image, which base image it uses, who can build it, who can publish it, and how the exact production artifact is identified.\n\nUse trusted ASP.NET Core runtime images for production and keep SDK images in build stages. Multi-stage builds should separate restore, build, publish, and runtime concerns so the final image contains only required runtime artifacts.\n\nKeep the build context clean with .dockerignore, narrow copy instructions, and review of final contents. Keep secrets out of Docker layers, build arguments, environment instructions, logs, caches, and final artifacts. Use appropriate build-secret mechanisms when restricted access is truly needed.\n\nRun as non-root where practical, with intentional file ownership, writable paths, ports, temporary directories, and runtime assumptions. Ship only required runtime contents while preserving compatibility for certificates, time zones, globalization, native libraries, and operational diagnostics that the service genuinely needs.\n\nFinally, manage images over time. Track tags, digests, metadata, SBOMs, provenance, scans, patch status, registry permissions, promotion workflow, rollback plan, and release ownership. Image security is not a one-time Dockerfile cleanup; it is a repeatable release and operations habit.",
  "narrationPoints": [
    "A secure ASP.NET Core Docker image baseline starts by treating images as supply-chain artifacts.",
    "Use trusted ASP.NET Core runtime images for production and keep SDK images in build stages.",
    "Keep secrets out of Docker layers, build arguments, environment instructions, logs, caches.",
    "Ship only required runtime contents while preserving compatibility for certificates, time zones, globalization, native libraries.",
    "Image security is not a one-time Dockerfile cleanup; it is a repeatable release and operations habit."
  ]
};
