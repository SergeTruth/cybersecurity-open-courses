window.COURSE_MODULE = {
  "title": "Debug, Diagnostics, Dependencies, and Production Hardening",
  "graphicAlt": "Release review transforms development settings into deliberate production configuration with controlled diagnostics, dependencies, artifacts, and maintenance ownership.",
  "narration": "Production firmware security depends on more than application logic. Debug and maintenance interfaces should match product risk and operational policy. Serviceability matters, but broad access that is useful during development may be inappropriate for shipped firmware.\n\nDiagnostics should support supportability without exposing secrets, sensitive configuration, internal trust assumptions, or unnecessary implementation details. Logs, crash data, version reports, and field diagnostics should be useful enough for operations while still respecting data exposure and product risk.\n\nDependency review matters because crates, features, build scripts, generated code, hardware abstraction layers, board support packages, toolchains, linker configuration, and platform files become part of the trusted firmware. A small feature change can pull in new code paths or change runtime behavior.\n\nRelease hardening should include configuration review, artifact traceability, symbol and log decisions, signing-material handling, version reporting, vulnerability response planning, and evidence that production settings are repeatable. Tribal knowledge is not a release process.\n\nLong-term maintenance also needs ownership. Teams should know who reviews dependency updates, who responds to vulnerabilities, who approves production configurations, who maintains release evidence, and how field issues are reported. Secure firmware remains secure through disciplined operation, not only through the first build.",
  "narrationPoints": [
    "Production firmware security depends on more than.",
    "Diagnostics should support supportability without exposing.",
    "Dependency review matters.",
    "Release hardening should include configuration review.",
    "Long-term maintenance also needs ownership.",
    "Debug and maintenance interfaces should match product risk."
  ]
};
