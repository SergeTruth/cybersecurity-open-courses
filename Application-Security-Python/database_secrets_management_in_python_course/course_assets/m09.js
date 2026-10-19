window.COURSE_MODULE = {
  "title": "Course Summary and Key Takeaways",
  "graphicAlt": "Known consumers, separated environments, narrow privileges, safe retrieval, rotation and monitoring make database secrets manageable.",
  "narration": "Database secrets management in Python protects the credentials that allow applications, tools, jobs, and pipelines to reach sensitive data stores. These secrets include passwords, tokens, connection strings, DSNs, certificates, private keys, and migration credentials. They appear in web services, ORMs, scripts, notebooks, CI/CD systems, background workers, migrations, and internal tools, so the program must cover more than the main application runtime.\n\nStrong designs avoid hardcoded credentials, separate environments, centralize secret storage, enforce least privilege, load secrets safely at runtime, rotate deliberately, and keep secrets out of logs, images, caches, artifacts, and shared local files. Runtime integration should be centralized and reviewable. Rotation should account for connection pools, jobs, migrations, deployment order, rollback, and consumer ownership.\n\nDatabase secrets connect application architecture, ORM configuration, migration tooling, CI/CD, containers, monitoring, incident response, and operational ownership. A credential should have a purpose, owner, consumer list, access policy, rotation plan, logging expectations, and retirement path. Without those details, secrets spread quietly and become hard to recover from when exposed.\n\nThe goal is not simply hiding a password. The goal is controlling database credential lifecycle so Python systems remain secure, maintainable, and recoverable. When teams inventory exposure paths, reduce uncontrolled copies, enforce least privilege, test failure modes, monitor usage, and practice rotation, database secrets become managed operational assets rather than hidden liabilities.",
  "narrationPoints": [
    "Database secrets management in Python protects.",
    "Strong designs avoid hardcoded credentials.",
    "Database secrets connect application architecture.",
    "The goal is not simply hiding a password.",
    "Runtime integration should be centralized and reviewable.",
    "Rotation should account for connection pools."
  ]
};
