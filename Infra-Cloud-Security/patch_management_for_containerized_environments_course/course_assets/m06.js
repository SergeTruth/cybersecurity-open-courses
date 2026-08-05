window.COURSE_MODULE = {
  "title": "CI/CD and Automation",
  "narration": "CI/CD turns patching into a repeatable flow. Dependency-update tools can propose new base images or library versions, but proposals still need ownership, review, and testing. Unreviewed automation can introduce incompatible code, untrusted artifacts, or changes that bypass risk decisions.\n\nPipeline scans evaluate source dependencies, build inputs, and completed images. Policy gates enforce defined requirements before promotion, such as approved base images, acceptable vulnerability posture, successful tests, required SBOMs, or reviewed exceptions.\n\nBuild provenance records how an artifact was created. Signing associates an approved identity with the image digest, while verification helps registries and clusters reject artifacts that do not meet policy. Protect signing keys, build identities, and pipeline credentials as high-value assets.\n\nRegistry controls limit who can push, retag, delete, and pull images. Retain immutable digests, scanning results, SBOMs, signatures, and lifecycle records. Promotion should move the same tested artifact through environments instead of rebuilding unrelated copies for each stage.\n\nAutomation should surface decisions rather than hide them. Clear reports explain the changed dependency, risk addressed, tests run, policy result, approver, and destination. Exceptions should be explicit, time-limited, and visible to later promotion steps.\n\nMeasure pipeline reliability as well as speed. Failed updates, stale pull requests, bypassed gates, unsigned images, and differences between approved and deployed digests reveal process weakness. Good automation shortens remediation while preserving evidence, separation of duties, and controlled release.",
  "narrationPoints": [
    "CI/CD turns patching into a repeatable flow.",
    "Pipeline scans evaluate source dependencies, build inputs, and completed images.",
    "Build provenance records how an artifact was created.",
    "Registry controls limit who can push, retag, delete, and pull images.",
    "Automation should surface decisions rather than hide them.",
    "Measure pipeline reliability as well as speed."
  ],
  "graphicAlt": "Blank course graphic placeholder"
};
