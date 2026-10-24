window.COURSE_MODULE = {
  "title": "Permissions, Ownership, and Privileged Contexts",
  "graphicAlt": "Scoped identities and operation-specific permissions constrain paths crossing privilege boundaries.",
  "narration": "Permissions and ownership shape symbolic-link safety because they determine who can create, replace, read, modify, or remove filesystem entries. A link-aware design still needs directory permissions that match the trust model.\n\nLeast privilege reduces the impact of mistakes. Code that does not need broad filesystem access should not run with it. Services should have clear filesystem scope, and helper processes should operate with only the access needed for their role.\n\nPrivileged contexts require extra care. A higher-privilege program may process paths supplied by lower-trust users, configuration, automation, or service inputs. The program should not let a less trusted path string determine access to resources that the path source could not normally reach.\n\nOwnership checks should match the operation. Reading a file, replacing a file, deleting a file, writing inside a directory, and traversing a tree all have different ownership and permission questions. A single check is rarely enough to answer every operation.\n\nInherited privileges and service accounts should be documented. Reviewers should know which account runs the code, which directories it can modify, which directories are shared, and which paths come from lower-trust sources. File-handling design is much easier when privilege boundaries are explicit.",
  "narrationPoints": [
    "Permissions and ownership shape symbolic-link safety because they determine who can create, replace, read, modify, or remove filesystem entries.",
    "Services should have clear filesystem scope, and helper processes should operate with only the access needed for their role.",
    "The program should not let a less trusted path string determine access to resources that the path source could not normally reach.",
    "Reading a file, replacing a file, deleting a file, writing inside a directory, and traversing a tree all have different ownership and permission questions.",
    "Reviewers should know which account runs the code, which directories it can modify, which directories are shared, and which paths come from lower-trust sources."
  ]
};
