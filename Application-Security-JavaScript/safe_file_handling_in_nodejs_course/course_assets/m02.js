window.COURSE_MODULE = {
  "title": "File-Handling Architecture and Trust Boundaries",
  "graphicAlt": "Layered architecture view of File-Handling Architecture and Trust Boundaries for Safe File Handling in Node.js, placing the protected asset at the center and surrounding it with identity, validation, resource, lifecycle, and monitoring controls.",
  "narration": "Secure file handling starts with knowing the lifecycle. Identify where files come from, where they are stored, who can access them, which code processes them, and when they are deleted or retained. A static image, customer invoice, temporary export, server log, configuration file, uploaded attachment, and cached background job result should not be treated the same way. They have different sources, owners, retention needs, and exposure risks.\n\nMap trust boundaries between users, APIs, reverse proxies, Node.js processes, file systems, object stores, databases, background workers, scanners, and download clients. Separate application-owned files from user-controlled files, generated files, temporary files, logs, configuration, and secrets. A file that is safe for a worker to generate may not be safe for direct public download. A file that is internal to one tenant should not become visible through a shared export route.\n\nDefine the operations allowed for each use case: read, write, append, rename, delete, list, stream, transform, or serve. Then tie those operations to business rules. Is the file public, private, tenant-scoped, user-scoped, administrative, or internal-only? Is it immutable after creation? Can it be overwritten? Can users list files or only access known objects? These decisions matter more than the specific filesystem API because the API should enforce a workflow the team already understands.",
  "narrationPoints": [
      "A static image, customer invoice, temporary export, server log, configuration file, uploaded attachment, and cached background job result should not be treated the same way.",
      "Separate application-owned files from user-controlled files, generated files, temporary files, logs, configuration, and secrets.",
      "Is the file public, private, tenant-scoped, user-scoped, administrative, or internal-only?",
      "Map trust boundaries between users, APIs, reverse proxies, Node.js processes, file systems, object stores, databases, background workers, scanners, and download clients.",
      "A file that is internal to one tenant should not become visible through a shared export route.",
      "Secure file handling starts with knowing the lifecycle."
  ]
};
