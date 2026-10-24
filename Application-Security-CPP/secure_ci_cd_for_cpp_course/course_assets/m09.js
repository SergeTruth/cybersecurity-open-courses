window.COURSE_MODULE = {
  "title": "Course Summary: Secure CI/CD Habits",
  "graphicAlt": "Secure CI/CD connects reviewed changes, controlled builds, scoped secrets, traceable artifacts and recovery.",
  "narration": "Secure CI/CD for C++ starts with the right mental model. The pipeline is part of the product's security boundary because it decides what code becomes trusted software. Protect source control, workflow files, release branches, tags, approvals, and the rules that trigger sensitive jobs. Review the pipeline as an engineering system, not a collection of background scripts.\n\nControl the build path. Isolate runners, clean workspaces, document or pin toolchains, manage caches deliberately, and test the configurations users actually receive. Scope secrets narrowly, keep credentials out of logs and artifacts, protect signing material, and separate production access from workflows that do not need it.\n\nMake release inputs and outputs traceable. Pin dependencies, verify provenance according to policy, retain build metadata, run layered C++ security checks, generate SBOMs, sign artifacts, and store release outputs in controlled repositories. Promote known artifacts rather than rebuilding unknown inputs at each stage.\n\nFinally, govern delivery. Use environment gates, approval records, rollback plans, monitoring, and incident response evidence. Review CI/CD changes as security-sensitive engineering work. A reliable C++ release process is not just fast automation; it is disciplined automation that can be reviewed, explained, recovered, and trusted. Those habits make release speed safer instead of fragile.",
  "narrationPoints": [
    "The pipeline is part of the product's security boundary because it decides what code becomes trusted software.",
    "Review the pipeline as an engineering system, not a collection of background scripts.",
    "Secure CI/CD for C++ starts with the right mental model.",
    "Isolate runners, clean workspaces, document or pin toolchains, manage caches deliberately, and test the configurations users actually receive.",
    "Pin dependencies, verify provenance according to policy, retain build metadata, run layered C++ security checks, generate SBOMs, sign artifacts, and store release outputs in controlled repositories.",
    "Use environment gates, approval records, rollback plans, monitoring, and incident response evidence."
  ]
};
