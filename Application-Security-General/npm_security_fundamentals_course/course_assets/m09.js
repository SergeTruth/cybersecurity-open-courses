window.COURSE_MODULE = {
  "title": "CI/CD and Team Workflow Controls",
  "graphicAlt": "A repeatable pipeline cleanly installs, tests and scans, reviews dependency changes, and gates releases while isolating build and publishing privileges and tracking exceptions.",
  "narration": "CI/CD is where npm security practices become repeatable. A strong pipeline uses npm ci, starts from a clean environment, runs tests, reviews lockfile changes, performs dependency and secret scanning, and fails on policy violations that the team has agreed are release blockers. The goal is not to make every finding fatal. The goal is to make dependency risk visible, consistently evaluated, and handled before release pressure hides it.\n\nTeam workflow matters as much as tooling. Pull requests should make dependency intent clear, especially when package.json or package-lock.json changes. CODEOWNERS or required reviewers can route dependency changes to people who understand the risk. Branch protections, release approvals, and documented exception processes help prevent emergency habits from becoming permanent. When a dependency update is accepted despite risk, the acceptance should have an owner and review date.\n\nSecure npm workflows also reduce secret exposure. Build jobs that install dependencies should not automatically receive deployment tokens. Jobs that publish packages should be isolated and protected. Cache usage should be deliberate so teams do not preserve untrusted state between builds. When a pipeline is easy to rebuild from source, lockfiles, and controlled registries, incident response becomes more practical because the team can reproduce and inspect what shipped.",
  "narrationPoints": [
    "CI/CD is where npm security practices become repeatable.",
    "Team workflow matters as much as tooling.",
    "Secure npm workflows also reduce secret exposure."
  ]
};
