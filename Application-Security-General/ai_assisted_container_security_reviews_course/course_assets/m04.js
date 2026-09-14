window.COURSE_MODULE = {
  "title": "Dockerfile and Build Review",
  "graphicAlt": "The final container image receives only required runtime files from a reviewed build; secrets are excluded, and base images, packages, and copied files are checked.",
  "narration": "Dockerfiles and build definitions show how an image is created. Review begins with the base image. Is it maintained, trusted, and appropriate for the workload? Is the version pinned enough to make builds repeatable? Are package sources controlled? A weak base image choice can create recurring vulnerability and maintenance problems even when the application code is sound.\n\nBuild steps can introduce risk. Package installation may add unnecessary tools, shells, compilers, or network utilities that are not needed at runtime. Copied files may include source, test data, credentials, or local configuration that should not be in the final image. Multi-stage builds can reduce runtime footprint when used well, but the final stage still needs review for what it actually contains.\n\nBuild secrets deserve special attention. Secrets can be accidentally baked into image layers, written to logs, stored in package manager configuration, or left in intermediate artifacts. The review should look for patterns that separate build-time credentials from final runtime images and confirm that secret handling aligns with the organization's approved pipeline practices.\n\nAI can assist by reading Dockerfile patterns, explaining hardening opportunities, and generating a checklist for human review. For example, it can flag questions about pinned versions, non-root users, unnecessary packages, copied directories, or health checks. The reviewer must verify each suggestion against the actual build, the application requirements, and the team's operational constraints.",
  "narrationPoints": [
    "Dockerfiles and build definitions show how an image is created.",
    "Build steps can introduce risk.",
    "Build secrets deserve special attention.",
    "AI can assist by reading Dockerfile patterns, explaining hardening opportunities, and generating a checklist for human review."
  ]
};
