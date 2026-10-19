window.COURSE_MODULE = {
  "title": "CI/CD, Containers, Migrations, and Automation",
  "graphicAlt": "Production database secrets stay out of reusable artifacts and reach runtime or automation through separate controlled credentials.",
  "narration": "Build-time and runtime secrets should be separated. A container image, package artifact, or compiled bundle should not contain production database credentials. Images may be stored, scanned, cached, copied, shared, or reused outside the intended runtime context. Runtime injection from a managed store or controlled platform is usually safer because it keeps the same artifact deployable across environments without embedding environment-specific secrets.\n\nCI/CD systems often need database access for tests, migrations, seed scripts, deployment checks, or operational automation. These credentials deserve the same ownership, least privilege, rotation, and monitoring as application credentials. A pipeline account should not have broad production access unless the job truly requires it and the controls around that job are strong. Test data setup should use isolated test credentials and databases whenever possible.\n\nMigrations and scheduled tasks are common blind spots. A migration job may need schema privileges that normal runtime code should not have. A notebook or data workflow may start as local analysis and later become a recurring process. An admin script may live outside the main repository review path. Each automation path should have a documented credential, storage pattern, access limit, and logging policy rather than borrowing a production application secret.\n\nInfrastructure-as-code should reference secrets without exposing secret values in plans, state files, caches, artifacts, or logs. CI/CD variables, deployment manifests, and container orchestrator settings should be reviewed for who can read or modify them. Automation credentials can do real damage if mishandled because they often run without a human watching. Treat them as production access, not as harmless plumbing.",
  "narrationPoints": [
    "Build-time and runtime secrets should be separated.",
    "CI/CD systems often need database access for tests.",
    "Migrations and scheduled tasks are common blind spots.",
    "Infrastructure-as-code should reference secrets.",
    "A container image.",
    "Test data setup should use isolated test credentials."
  ]
};
