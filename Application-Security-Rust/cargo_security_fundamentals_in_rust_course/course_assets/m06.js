window.COURSE_MODULE = {
  "title": "Registries, Sources, Credentials, and Publishing",
  "graphicAlt": "Build and test stages are separated from an approved publishing stage with scoped registry credentials.",
  "narration": "Cargo can use public registries, private registries, alternate sources, and organization-specific publishing workflows. Registry and source configuration affect where dependencies come from and which packages a build is allowed to resolve. That configuration should be intentional, documented, and consistent with organizational policy.\n\nPublishing authority is a security responsibility. A package release can affect every downstream consumer that trusts the crate. Teams should know who owns publishing rights, which accounts or automation can publish, how release approval works, and how ownership changes are reviewed. Release authority should not be a vague privilege attached to whoever happens to have an old token.\n\nRegistry tokens and publishing credentials are sensitive. They may authorize package release actions or access to private packages. They should not live in source repositories, shell history, general-purpose logs, developer notes, shared chat messages, or broad CI/CD variables. They should be scoped, stored in approved secret systems, rotated when appropriate, and revoked when no longer needed.\n\nCI/CD publishing workflows need separation between build, test, package, and release steps. A pipeline that can build code does not always need permission to publish packages. A release job that holds publishing authority should run under stricter conditions, with reviewed inputs and clear provenance. This reduces the chance that an ordinary build path accidentally becomes a release path.\n\nPublishing should be deliberate, reviewed, and traceable. Versioning, changelogs, source commit, dependency state, build environment, artifact handling, and rollback expectations should be part of release readiness. The goal is not heavy bureaucracy. The goal is that a published crate or production artifact can be explained after the fact without guesswork.",
  "narrationPoints": [
    "Cargo can use public registries.",
    "Publishing authority is a security responsibility.",
    "Registry tokens and publishing credentials are sensitive.",
    "CI/CD publishing workflows need separation between build.",
    "Publishing should be deliberate, reviewed, and traceable.",
    "That configuration should be intentional."
  ]
};
