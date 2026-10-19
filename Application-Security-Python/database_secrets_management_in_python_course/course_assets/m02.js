window.COURSE_MODULE = {
  "title": "Database Connection Strings and Secret Exposure Paths",
  "graphicAlt": "Credential exposure review maps configuration, code, notebooks, build artifacts and diagnostics to reduce uncontrolled copies.",
  "narration": "Connection strings and DSNs are common places where secrets gather. They may include usernames, passwords, hostnames, ports, database names, connection options, certificate paths, token references, or driver-specific settings. Not every part is secret, but the complete string can be highly sensitive because it often combines routing information with authentication material. Treat connection strings as sensitive unless they are deliberately proven otherwise.\n\nDatabase secrets spread through normal engineering habits. A developer may paste credentials into source code for a quick test, add them to an environment file, print a connection error, save a notebook, bake a value into a container image, copy it into a CI/CD variable, or configure migration tooling separately from the runtime application. Each copy becomes another place where the credential must be protected, rotated, and eventually removed.\n\nLogs and diagnostics are especially common exposure paths. Stack traces, debug pages, failed connection messages, ORM configuration dumps, health checks, metrics, and local scripts can reveal passwords, tokens, certificate paths, or full connection strings if they are not redacted. Notebooks and one-off scripts deserve attention too because they often live outside normal application review while still touching production-like data or credentials.\n\nDevelopers should identify every place a database credential is stored, transmitted, logged, or loaded. That inventory should include source repositories, local files, environment variables, secret stores, CI/CD systems, deployment manifests, container images, runtime configuration, migration jobs, backups, artifacts, and monitoring tools. Once the paths are visible, teams can reduce copies, centralize access, and design rotation without guessing where a secret might still exist.",
  "narrationPoints": [
    "Connection strings and DSNs are common places.",
    "Database secrets spread through normal engineering habits.",
    "Logs and diagnostics are especially common exposure paths.",
    "Developers should identify every place a database.",
    "Each copy becomes another place.",
    "Notebooks and one-off scripts deserve attention too."
  ]
};
