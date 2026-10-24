window.COURSE_MODULE = {
  "title": "Directories, Paths, and Trust Boundaries",
  "graphicAlt": "Location checks and known path context select a controlled directory, while shared-writable locations require stronger assumptions.",
  "narration": "Temporary-file location is a security and reliability decision. A directory determines who can list, create, replace, remove, or observe names, and it can influence cleanup and operational monitoring. Treat temporary directories as trust boundaries, not as neutral storage.\n\nShared directories require stricter assumptions. If a directory is writable by multiple users or services, code must not assume that names, permissions, or existing files represent only the current process. In those cases, safe creation and restrictive permissions become especially important.\n\nEnvironment-derived paths should be validated before use. Environment variables, configuration values, or command-line arguments may point to locations that are missing, unexpected, too long, or outside the intended scope. A program should define which directories are acceptable and what happens when the requested location is not usable.\n\nRelative paths depend on current working directory context. A service, scheduler, script, or test harness may launch the same program from different directories. If a temporary path is relative, the program should understand and document what it is relative to.\n\nPath normalization and canonicalization decisions should be deliberate. Some code needs to compare locations, some only needs an opened directory or file handle, and some needs to preserve a user-facing path. The chosen rule should be applied before relying on path meaning.",
  "narrationPoints": [
    "Treat temporary directories as trust boundaries, not as neutral storage.",
    "If a directory is writable by multiple users or services, code must not assume that names, permissions, or existing files represent only the current process.",
    "A program should define which directories are acceptable and what happens when the requested location is not usable.",
    "A service, scheduler, script, or test harness may launch the same program from different directories.",
    "Path normalization and canonicalization decisions should be deliberate."
  ]
};
