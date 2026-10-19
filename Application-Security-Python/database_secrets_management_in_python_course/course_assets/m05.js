window.COURSE_MODULE = {
  "title": "Runtime Retrieval and Application Integration",
  "graphicAlt": "Central secret retrieval supplies database drivers and pools, with refresh behavior and safe failures considered during rotation.",
  "narration": "Python applications need a predictable way to load database secrets. Some systems retrieve secrets at startup and configure an ORM or database driver once. Others retrieve secrets at runtime, refresh them periodically, or use short-lived database tokens. The implementation can vary, but the use of secrets should be centralized, reviewable, and easy to rotate. Scattered connection logic makes exposure and rotation much harder.\n\nConnection pools complicate secret lifecycle. A pool may keep existing connections alive after a password or token changes. Applications may need refresh behavior, pool draining, restart sequencing, or retry logic that understands credential changes. A rotation plan that updates a secret store but leaves long-lived connections using an old credential is only partly complete. Runtime behavior should match the lifecycle expectations of the credential.\n\nTLS and certificate handling at a high level also belong in database connection design. Certificate material, private keys, trust bundles, and driver options can be just as sensitive as passwords. They should be stored and loaded with the same care. Health checks, metrics, debug pages, and error messages should confirm connectivity without exposing secrets, connection strings, certificate details, or internal routing information unnecessarily.\n\nFailure modes should be safe and clear. If a required secret is unavailable, malformed, expired, or rejected, the application should fail in a controlled way and log enough sanitized context for operators. It should not fall back to an old shared password, skip authentication, or expose connection details to users. Centralizing database secret retrieval makes these failure modes easier to test and standardize across services, jobs, and tools.",
  "narrationPoints": [
    "Python applications need a predictable way to load database.",
    "Connection pools complicate secret lifecycle.",
    "TLS and certificate handling at a high level also belong.",
    "Failure modes should be safe and clear.",
    "Others retrieve secrets at runtime.",
    "The implementation can vary."
  ]
};
