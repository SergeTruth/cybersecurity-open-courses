window.COURSE_MODULE = {
  "title": "Permissions, Storage Isolation, Archives, and Secrets",
  "graphicAlt": "Least-privilege Java storage separates logs, uploads and temporary files from code and secrets, while archive extraction checks entries and expansion limits.",
  "narration": "Storage layout is a security control. The Java process should run with the least privilege needed for its file operations. Separate read-only application code from writable runtime data. Keep secrets, configuration, logs, uploaded files, generated files, public assets, backups, and temporary files in clearly separated locations. Clear separation reduces the chance that a path bug, permission mistake, or cleanup task exposes unrelated data.\n\nAvoid broad filesystem permissions, broad container mounts, or host paths that expose unnecessary data. Production applications should not require write access to source code, dependency directories, deployment directories, application-server internals, or unrelated host directories. If a container needs a writable volume, keep it specific to the workflow. If an object store is used, scope credentials and policies to the required prefixes and operations.\n\nSecrets should not live in publicly served directories, uploaded file areas, generated reports, logs, temporary artifacts, or backup bundles that are handled like ordinary files. Configuration and secret-management locations need separate access rules and operational handling. A file export or diagnostic bundle should be reviewed for accidental inclusion of keys, tokens, connection strings, internal URLs, and customer data before it becomes available to users or support teams.\n\nArchive extraction is a special form of file writing. Java applications often process ZIPs, documents, backups, and import bundles. Defensive extraction validates entry names, paths, sizes, file counts, symlinks, nested archives, and expansion behavior before writing output. Keep the discussion at the design level: extraction should happen inside a controlled boundary with resource limits and safe failure behavior, not with broad filesystem access and unlimited expansion.",
  "narrationPoints": [
    "Storage layout is a security control.",
    "Avoid broad filesystem permissions.",
    "Secrets should not live in publicly served directories.",
    "Archive extraction is a special form of file writing.",
    "The Java process should run with the least privilege needed.",
    "Production applications should not require write access."
  ]
};
