window.COURSE_MODULE = {
  "id": "m05",
  "title": "Building Active Projects and Repositories That Prove Capability",
  "type": "lesson",
  "narration": "A public repository can demonstrate offensive-security proficiency when it shows that you can build, test, explain, and maintain useful security work. The project does not need to be a dangerous tool. In many cases, the most credible projects are safer: a detection harness, a vulnerable-lab generator, a ruleset with tests, a parser, a checklist application, a proof verifier, or a teaching tool that helps others understand a weakness without enabling real-world abuse.\n\nThe repository should make its claim obvious. A short project description, clear readme, threat model, setup guidance for an authorized lab, and examples of expected output help reviewers understand what the project proves. Tests matter because they show repeatability. A small suite of meaningful tests can be more persuasive than a large codebase with no evidence that it works. Release notes and issue history also show whether you improve the project over time.\n\nSecurity posture matters inside the project itself. Safe defaults, input validation, dependency discipline, logging choices, and careful error handling all communicate engineering judgment. If the project intentionally demonstrates vulnerable behavior, label it clearly and isolate it from real systems. Do not publish secrets, real target data, private program details, or features whose main purpose is unauthorized exploitation. A portfolio project should make reviewers more confident in your judgment.\n\nCommit history can be evidence when it shows a thoughtful progression. It can reveal that you investigated edge cases, responded to feedback, added tests, clarified documentation, and fixed mistakes. You do not need to pretend every first attempt was perfect. Professional growth is visible when the repository contains decisions, revisions, and maintenance practices that resemble real engineering work.\n\nFinally, connect the repository to the broader portfolio. Explain what capability it demonstrates: analysis, secure coding, reverse engineering, protocol understanding, detection engineering, reporting, or remediation. Link the project to a write-up, talk, lab, or disclosure only when the connection is real and safe to share. The goal is not to collect badges. The goal is to create artifacts that let others verify skill through useful work.\n\nMaintenance is part of that proof. A project that receives small fixes, dependency review, documentation updates, and clarified examples over time feels closer to professional practice than a one-day showcase. Even if the scope is modest, steady care tells reviewers that you can keep security work reliable after the first interesting result.",
  "narrationPoints": [
    "Repositories can prove skill without publishing dangerous tooling.",
    "Detection, lab, parser, verifier, and teaching projects are credible.",
    "Readme files should explain purpose, scope, setup, and expected output.",
    "Tests and release notes make project claims easier to verify.",
    "Safe defaults and clear labels demonstrate engineering judgment.",
    "Commit history can show feedback, revision, and maintenance.",
    "Connect each project to a specific capability claim."
  ],
  "graphic": "course_assets/m05.png",
  "graphicAlt": "A useful project demonstrates capability through purpose, safe defaults, tests, review history and maintenance.",
  "codeExamples": []
};
