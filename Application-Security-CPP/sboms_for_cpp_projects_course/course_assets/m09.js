window.COURSE_MODULE = {
  "title": "Course Summary: Practical SBOM Habits",
  "graphicAlt": "Practical SBOM maintenance connects clear scope, repeatable generation, quality and decisions.",
  "narration": "Practical SBOM work starts with clear scope. Define whether the SBOM describes source, a build environment, an executable, an installer, a package, a container, or another release artifact. Include source, binary, vendored, generated, build-time, runtime, and transitive components where they matter to that scope. Clear scope keeps later review grounded.\n\nUse standard machine-readable formats supported by the organization and its tools. Generate SBOMs repeatably in the build or release workflow, not as a one-time manual spreadsheet. Include useful component identity, versions, sources, licenses, hashes where practical, relationships, and enough build context to support real analysis.\n\nValidate quality and watch for drift. Check for missing components, ambiguous names, unknown versions, duplicate records, incomplete relationships, and mismatches between the SBOM and the artifact. Review major dependency changes, platform changes, and release packaging changes before the SBOM becomes part of the release record. Small validation habits prevent large response delays later.\n\nFinally, connect SBOMs to decisions. Use them for vulnerability response, license review, supplier communication, customer requests, release confidence, and incident response. Store and share SBOMs according to policy, assign owners, and keep them current. An SBOM is a living engineering artifact that improves supply-chain visibility when the team maintains it.",
  "narrationPoints": [
    "Define whether the SBOM describes source, a build environment, an executable, an installer, a package, a container, or another release artifact.",
    "Include useful component identity, versions, sources, licenses, hashes where practical, relationships, and enough build context to support real analysis.",
    "Review major dependency changes, platform changes, and release packaging changes before the SBOM becomes part of the release record.",
    "Small validation habits prevent large response delays later.",
    "Use them for vulnerability response, license review, supplier communication, customer requests, release confidence, and incident response.",
    "Store and share SBOMs according to policy, assign owners, and keep them current."
  ]
};
