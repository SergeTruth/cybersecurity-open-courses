window.COURSE_MODULE = {
  "title": "Rotation and Credential Lifecycle",
  "graphicAlt": "Rotation maps consumers, stages a replacement, refreshes and verifies use, then revokes the old credential.",
  "narration": "A database secret has a lifecycle: creation, activation, use, expiration, rotation, revocation, retirement, and sometimes emergency replacement. Rotation should reduce risk without causing avoidable outages. That means teams need to know which applications, jobs, migrations, notebooks, dashboards, and pipelines consume the credential. A secret with unknown consumers is difficult to rotate safely because nobody knows what will break.\n\nStaged or dual-credential rotation patterns can reduce downtime risk. The database may accept an old and new credential during a controlled transition, or the application may be updated to read a new secret before the old one is revoked. Connection pool draining, application restarts, worker reloads, and scheduled jobs must be considered. Rotation is not finished until old credentials are no longer accepted and consumers are verified on the new path.\n\nMigration coordination and rollback planning matter. A deployment may include application code, database schema changes, secret updates, and infrastructure changes. If rotation fails halfway through, teams need a safe plan that preserves availability without leaving both credentials active indefinitely. Emergency replacement after exposure may move faster, but it still needs owner communication, scope assessment, revocation, and verification that affected systems are using the replacement.\n\nDocumenting credential owners and consumers is practical security work. The owner knows why the secret exists, who can approve changes, when it should rotate, and what systems rely on it. Consumers are the services, jobs, or humans allowed to retrieve it. Without that map, rotation becomes a high-risk manual exercise. With it, rotation becomes an expected maintenance workflow that improves security and reliability together.",
  "narrationPoints": [
    "A database secret has a lifecycle: creation.",
    "Staged or dual-credential rotation patterns can reduce.",
    "Migration coordination and rollback planning matter.",
    "Documenting credential owners and consumers is practical.",
    "Rotation should reduce risk without causing avoidable.",
    "Connection pool draining."
  ]
};
