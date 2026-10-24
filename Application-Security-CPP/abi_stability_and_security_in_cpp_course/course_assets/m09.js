window.COURSE_MODULE = {
  "title": "Testing, Verification, and ABI Governance",
  "graphicAlt": "Old-client tests, lifecycle checks and symbol baselines support an owned review of shipping binaries.",
  "narration": "ABI stability becomes manageable when it is measured. ABI baselines, exported-symbol checks, binary compatibility tools, header review, dependency lockfiles, release checklist items, and CI gates can help detect unintended changes. These controls are most useful when the team has already identified which interfaces are promised to be stable and which are internal implementation details.\n\nTests should include old clients with new libraries where practical, plugin compatibility checks, version negotiation, allocation and release paths, error translation, initialization, and shutdown behavior. Build matrix testing can also catch compiler, runtime, and configuration differences that source-only tests miss. Verification should inspect the artifacts that will actually ship, not only the headers that developers read.\n\nGovernance matters because a binary compatibility promise is a product commitment. Documentation should state supported platforms, supported build modes, stable interfaces, internal interfaces, deprecation policy, and migration expectations. Release review should ask whether ABI changes were intentional, whether compatibility impact is documented, and whether downstream users have a safe upgrade path. Defects found by ABI tooling should become tracked engineering work. Ownership should be assigned so compatibility decisions do not drift between teams.\n\nThe governance model should fit the size of the product, but it must be explicit. A small library might need a short release checklist and symbol comparison. A large platform may need compatibility councils, baseline artifacts, staged deprecations, and partner validation. In both cases, the objective is the same: make binary compatibility a managed engineering decision.",
  "narrationPoints": [
    "ABI stability becomes manageable when it is measured.",
    "Build matrix testing can also catch compiler, runtime, and configuration differences that source-only tests miss.",
    "Governance matters because a binary compatibility promise is a product commitment.",
    "Defects found by ABI tooling should become tracked engineering work.",
    "The governance model should fit the size of the product, but it must be explicit.",
    "In both cases, the objective is the same: make binary compatibility a managed engineering decision."
  ]
};
