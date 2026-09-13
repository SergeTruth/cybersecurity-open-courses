window.COURSE_MODULE = {
  "title": "Advisories, Licenses, Policy Checks, and SBOMs",
  "graphicAlt": "Advisory, license, policy, and SBOM records support ongoing dependency review and accountable exceptions.",
  "narration": "Cargo security is not finished when the first build succeeds. Dependencies change, advisories are published, licenses matter, maintainers move on, and organizational policy evolves. A build that was acceptable last month may need attention after a new advisory, license review, version conflict, abandoned dependency signal, or policy update.\n\nTeams should maintain dependency visibility over time. Advisory review helps identify known vulnerability signals. License review helps ensure the project can legally and operationally use what it ships. Policy checks can flag banned crates, duplicate versions, risky features, maintenance concerns, or dependencies that require extra approval.\n\nSBOM-style records support this work by describing what components were shipped. They do not magically make a project secure, but they help teams answer urgent questions when a dependency issue appears. Which applications include this crate? Which versions were released? Which artifact contains the affected component? Which team owns the follow-up?\n\nCI checks can make dependency governance repeatable, but they should remain understandable. A policy gate that nobody understands becomes noise or frustration. Good checks explain what failed, why it matters, and what kind of review or exception is expected. Security signals are most useful when they lead to timely, accountable decisions.\n\nExceptions should have owners, reasons, scope, and expiration expectations. Sometimes a team may temporarily accept a dependency risk while waiting for an upstream fix or migration path. That decision should be visible and revisited. Dependency records, policy history, and SBOM data help teams respond when new issues emerge instead of reconstructing the past during an incident.",
  "narrationPoints": [
    "Cargo security is not finished.",
    "Teams should maintain dependency visibility over time.",
    "SBOM-style records support this work by describing what.",
    "CI checks can make dependency governance repeatable.",
    "Exceptions should have owners.",
    "Advisory review helps identify known vulnerability signals."
  ]
};
