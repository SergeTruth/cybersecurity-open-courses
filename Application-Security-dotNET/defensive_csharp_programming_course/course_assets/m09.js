window.COURSE_MODULE = {
  "title": "Dependencies, Build Hygiene, and Review Practices",
  "graphicAlt": "Dependency and warning review feed tested, approved releases with deliberately scoped build identities.",
  "narration": "Dependencies are part of the application. NuGet packages, transitive dependencies, analyzers, build tools, source generators, runtime versions, container base images, and platform libraries all influence what ships. Introducing or updating a dependency should be reviewed like any other meaningful code change.\n\nMaintenance is continuous. Packages, runtimes, SDKs, operating systems, and deployment platforms need updates over time. Defensive teams make patching an engineering process: monitor, evaluate, test, approve, and deploy. Waiting until a major incident forces an upgrade usually makes the work harder.\n\nCompiler warnings, nullable warnings, analyzers, formatting checks, and static analysis can catch issues earlier. These tools are not a substitute for design review, but they are useful guardrails. Treat warnings as feedback about maintainability and correctness, not just noise to suppress.\n\nBuild hygiene includes repeatability and credential protection. CI/CD systems may access package feeds, signing keys, deployment credentials, cloud identities, and production environments. Those permissions should be scoped, rotated, audited, and separated by environment where possible.\n\nSecurity review should be part of normal code review. Reviewers should ask what assumptions changed, what input boundaries were added, what data is now stored or logged, what dependencies changed, and what failure modes were introduced. Defensive programming scales when it becomes ordinary team practice.",
  "narrationPoints": [
    "Introducing or updating a dependency should be reviewed like any other meaningful code change.",
    "Defensive teams make patching an engineering process: monitor, evaluate, test, approve, and deploy.",
    "Treat warnings as feedback about maintainability and correctness, not just noise to suppress.",
    "CI/CD systems may access package feeds, signing keys, deployment credentials, cloud identities, and production environments.",
    "Reviewers should ask what assumptions changed, what input boundaries were added, what data is now stored or logged."
  ]
};
