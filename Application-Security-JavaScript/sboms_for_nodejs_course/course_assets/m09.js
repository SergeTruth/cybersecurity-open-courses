window.COURSE_MODULE = {
  "title": "Governance, Storage, Sharing, and Maintenance",
  "graphicAlt": "Owners maintain protected, release-linked SBOM records for retrieval, controlled sharing, updates and response.",
  "narration": "SBOM programs fail when SBOMs are treated as one-time generated files. A useful program needs owners, generation points, storage locations, retention rules, sharing rules, update expectations, and response procedures. Store SBOMs where they can be retrieved by release, service, artifact, image digest, package version, commit, or customer version. Protect SBOM repositories with access control, integrity controls, audit logs, and retention appropriate to their sensitivity and value.\n\nDifferent architectures may require multiple SBOMs or layered SBOMs. A monorepo may contain several Node.js services. A workspace may produce multiple packages. A Dockerized application may need one SBOM for npm dependencies and another view for the container image and operating system packages. Third-party packages, serverless bundles, and deployed customer versions may all require clear release linkage. Older SBOMs remain useful when older releases are still deployed or supported.\n\nDefine who reviews SBOM quality and who responds to dependency, vulnerability, license, supplier, or customer questions. Align engineering, security, legal, procurement, support, and customer-facing teams so SBOMs are not owned by nobody. Regenerate SBOMs when dependencies, builds, images, packages, or releases change. Governance turns SBOM generation into a repeatable operating process: generate, validate, store, protect, share, update, respond, and retire.",
  "narrationPoints": [
    "Protect SBOM repositories with access control, integrity controls, audit logs, and retention appropriate to their sensitivity and value.",
    "A Dockerized application may need one SBOM for npm dependencies and another view for the container image and operating system packages.",
    "Governance turns SBOM generation into a repeatable operating process: generate, validate, store, protect, share, update, respond, and retire.",
    "A useful program needs owners, generation points, storage locations, retention rules, sharing rules, update expectations, and response procedures.",
    "Third-party packages, serverless bundles, and deployed customer versions may all require clear release linkage.",
    "SBOM programs fail when SBOMs are treated as one-time generated files."
  ]
};
