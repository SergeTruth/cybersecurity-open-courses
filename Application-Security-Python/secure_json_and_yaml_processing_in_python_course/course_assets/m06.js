window.COURSE_MODULE = {
  "title": "Object Mapping, Mass Assignment, and Configuration Safety",
  "graphicAlt": "Mass assignment copies every incoming field toward an internal model and is blocked; the approved path maps only display name and locale into a narrow update object.",
  "narration": "Mapping JSON or YAML into Python objects is convenient, but it can become risky when input fields are treated as trusted program state. Mass assignment, also called over-posting in many contexts, happens when input can set fields the application did not intend to expose. The issue is not the mapping library; it is the lack of an allowlist and a clear boundary.\n\nUser-controlled structured data should not be able to change internal state, permissions, feature flags, file paths, URLs, command options, runtime settings, or deployment behavior unless that is the explicit purpose and the value has been validated. A safe design separates public input models from internal domain models and privileged configuration models.\n\nConfiguration injection at a high level means structured input influences configuration in unintended ways. A field might change a destination URL, enable a feature, select a file path, alter logging behavior, modify permissions, or change how a job runs. These values require more than type checks. They need allowlisted keys, safe defaults, business validation, and authorization where appropriate.\n\nApplications should not blindly turn structured input into trusted behavior. Prefer narrow constructors, explicit field mapping, immutable defaults where useful, and reviewable configuration surfaces. When a new key is added, the team should understand who can set it, what it controls, how it is validated, how it is logged, and what happens if it is missing or maliciously shaped.",
  "narrationPoints": [
    "The issue is not the mapping library; it is the lack of an allowlist and a clear boundary.",
    "A safe design separates public input models from internal domain models and privileged configuration models.",
    "Configuration injection at a high level means structured input influences configuration in unintended ways.",
    "Prefer narrow constructors, explicit field mapping, immutable defaults where useful, and reviewable configuration surfaces.",
    "Mass assignment, also called over-posting in many contexts, happens when input can set fields the application did not intend to expose.",
    "Applications should not blindly turn structured input into trusted behavior."
  ]
};
