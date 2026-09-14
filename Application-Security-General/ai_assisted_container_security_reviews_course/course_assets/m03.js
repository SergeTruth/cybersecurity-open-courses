window.COURSE_MODULE = {
  "title": "Understanding Container Images",
  "graphicAlt": "A container image’s layers are tied to an exact digest; movable tags differ from immutable image identity, while provenance and an SBOM support the review.",
  "narration": "Container images package an application with the files, dependencies, and metadata needed to run it. Most images start from a base image, then add layers for packages, application code, configuration, and runtime setup. Each layer reflects a build step, and those layers can contain useful review clues such as package installation, copied files, environment settings, or leftover build artifacts.\n\nTags and digests are important. A tag such as latest or production may move over time, while a digest identifies a specific immutable image version more precisely. Reviews should prefer evidence that points to the exact image under discussion. If the report references a tag but the tag later changes, the evidence may become ambiguous. Digests help make findings repeatable.\n\nRegistries and provenance also matter. The reviewer should understand where images come from, who can publish them, whether signing or verification is used, how images move through promotion stages, and whether base images are trusted and maintained. An SBOM can help identify software components and dependencies inside an image, but it should be interpreted with the same care as any other evidence source.\n\nAI can help explain image structure and summarize scanner output, especially when reports are large. It can group findings by package, layer, base image, or remediation path. The reviewer should still verify scanner results, check whether the image matches the deployment, and understand whether the vulnerable component is actually present, used, or reachable in the workload context.",
  "narrationPoints": [
    "Container images package an application with the files, dependencies, and metadata needed to run it.",
    "Tags and digests are important.",
    "Registries and provenance also matter.",
    "AI can help explain image structure and summarize scanner output, especially when reports are large."
  ]
};
