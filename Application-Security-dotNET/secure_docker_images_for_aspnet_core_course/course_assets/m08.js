window.COURSE_MODULE = {
  "title": "Image Tags, Metadata, SBOMs, and Provenance",
  "graphicAlt": "Mutable tags point to images, while an exact digest connects the promoted artifact to SBOM and provenance evidence.",
  "narration": "Image identity matters in production operations. A tag is a mutable label that points to an image. A digest identifies a specific image content set. Tags are useful for human workflows, but digests are stronger evidence for what actually ran.\n\nLabels and metadata can help record source revision, build date, owner, version, service name, repository, support contact, and related release information. They should not include secrets, sensitive internal details, customer data, or build records that reveal protected information.\n\nSBOMs help teams understand which packages, libraries, and components are inside the image. They support vulnerability triage, license review, dependency ownership, incident response, and long-term maintenance. An SBOM is most useful when it is tied to the exact image that was built and deployed.\n\nProvenance and build metadata can support supply-chain review when produced and protected appropriately. They can help answer where the image came from, which source revision produced it, which build system built it, and which process approved it.\n\nImage promotion should make it clear which artifact was built, tested, approved, and deployed. Rebuilding from the same source is not always the same as promoting the same artifact. Clear promotion rules reduce ambiguity during release and rollback.\n\nStale tags, ambiguous latest tags, and undocumented rebuilds make incident response harder. When a production issue appears, teams need to identify the exact image content, dependencies, base image, build inputs, and approval path quickly.",
  "narrationPoints": [
    "Tags are useful for human workflows, but digests are stronger evidence for what actually ran.",
    "An SBOM is most useful when it is tied to the exact image that was built and deployed.",
    "Provenance and build metadata can support supply-chain review when produced and protected appropriately.",
    "Image promotion should make it clear which artifact was built, tested, approved, and deployed.",
    "When a production issue appears, teams need to identify the exact image content, dependencies, base image, build inputs."
  ]
};
