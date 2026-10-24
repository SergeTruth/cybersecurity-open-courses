window.COURSE_MODULE = {
  "title": "Trust Boundaries in File Paths",
  "graphicAlt": "Path source and operation role determine directory trust and permission checks.",
  "narration": "File paths cross trust boundaries in many ordinary workflows. A command-line argument, configuration value, environment variable, package setting, administrator-provided path, or runtime-generated path can all guide file operations. Each source needs a trust decision based on who controls it and what the program will do with it.\n\nUser-supplied paths should be validated against the intended purpose. A path used for input is different from a path used for output, cleanup, replacement, import, export, or logging. The validation rule should match the operation, not just the fact that the value is a path.\n\nEnvironment-derived paths are not automatically trusted. Environment variables can be absent, unexpected, inherited from a launcher, or changed by deployment tooling. Service working directories can also differ between development and production. Code should make its directory assumptions visible.\n\nShared directories require stricter assumptions because other users or processes may be able to create, remove, or replace entries depending on permissions. Temporary directories, spool directories, upload directories, and package-managed paths all deserve explicit ownership and permission review.\n\nConfiguration paths should match documented purpose. If a setting names a trusted root, output directory, key location, log directory, or cache path, the program should validate it as that role. Directory trust depends on ownership, permissions, who can modify entries, and whether the program runs with broader access than the path source.",
  "narrationPoints": [
    "File paths cross trust boundaries in many ordinary workflows.",
    "A path used for input is different from a path used for output, cleanup, replacement, import, export, or logging.",
    "Environment variables can be absent, unexpected, inherited from a launcher, or changed by deployment tooling.",
    "Temporary directories, spool directories, upload directories, and package-managed paths all deserve explicit ownership and permission review.",
    "If a setting names a trusted root, output directory, key location, log directory, or cache path, the program should validate it as that role."
  ]
};
