window.COURSE_MODULE = {
  "title": "Files, Permissions, and Encryption at Rest",
  "graphicAlt": "Secret-lifecycle diagram for Files, Permissions, and Encryption at Rest, connecting an opaque provider reference to least-privilege retrieval, bounded in-memory use, protected storage, rotation, revocation, safe telemetry, and incident recovery.",
  "narration": "File-based secret storage is sometimes unavoidable. Local agents, appliances, legacy systems, offline tools, and embedded deployments may need secrets on disk. When that happens, the file becomes part of the security boundary. It needs a controlled location, strict ownership, narrow permissions, documented platform assumptions, and predictable backup behavior. A secret file in a convenient shared directory is rarely a good long-term design.\n\nEncryption at rest can help, but it does not solve the whole problem by itself. If the decryption key is stored next to the encrypted secret, access to one often implies access to both. Key management, key separation, service identity, and access control remain central. Teams should also consider backups, deployment artifacts, support bundles, temporary files, and old versions that may preserve secrets long after the current file is replaced.\n\nC++ file handling should account for platform details. Permissions can be inherited in surprising ways. Symlinks or path confusion can undermine assumptions about where data is written. Temporary files can remain after failure. Cleanup paths may be skipped during crashes. Defensive file handling uses controlled directories, explicit permissions, careful error handling, and review of deployment behavior. When a platform secret store is available, prefer it over inventing a file format. When files are required, treat them as sensitive operational assets with lifecycle rules.",
  "narrationPoints": [
    "A secret file in a convenient shared directory is rarely a good long-term design.",
    "When that happens, the file becomes part of the security boundary.",
    "Key management, key separation, service identity, and access control remain central.",
    "Defensive file handling uses controlled directories, explicit permissions, careful error handling, and review of deployment behavior.",
    "When a platform secret store is available, prefer it over inventing a file format.",
    "When files are required, treat them as sensitive operational assets with lifecycle rules."
  ]
};
