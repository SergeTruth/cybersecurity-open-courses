window.COURSE_MODULE = {
  "title": "File-Handling Architecture and Trust Boundaries",
  "graphicAlt": "Files move from a source through a service and temporary storage to private storage and authorized download, separate from public assets, logs, configuration and secrets.",
  "narration": "Secure file handling starts by mapping the lifecycle. Identify where files come from, where they are stored, who can access them, and which code processes them. A static image, customer invoice, temporary PDF export, server log, configuration file, user-uploaded archive, and generated backup should not be treated the same way. Each has a different source, sensitivity, retention expectation, access rule, and cleanup path.\n\nMap trust boundaries between users, APIs, controllers, servlet containers, Java services, background jobs, object stores, local filesystems, databases, scanners, queues, reverse proxies, and download clients. The boundary matters because a value that is harmless as display text can become dangerous when it influences a filesystem path, object key, archive entry, response header, or processing command. The same string can have different risk depending on where it is used.\n\nSeparate application-owned files from user-controlled files, generated files, temporary files, logs, configuration files, public assets, backups, and secrets. Storage layout is a security control. If logs, secrets, uploads, public assets, and temporary processing outputs all live near each other with broad permissions, a small bug can become a larger exposure. Clear separation makes code review and operations easier because each location has a known purpose.\n\nDefine which operations are allowed per use case: read, write, append, rename, delete, list, stream, transform, archive, extract, or serve. Also define whether the files are public, private, tenant-scoped, user-scoped, administrative, or internal-only. Security requirements should be tied to the business workflow, not only to the Java API being called. A safe design starts with policy and then uses Java APIs to enforce it.",
  "narrationPoints": [
    "Secure file handling starts by mapping the lifecycle.",
    "Map trust boundaries between users.",
    "Separate application-owned files from user-controlled files.",
    "Define which operations are allowed per use case: read.",
    "Clear separation makes code review and operations easier.",
    "Security requirements should be tied to the business."
  ]
};
