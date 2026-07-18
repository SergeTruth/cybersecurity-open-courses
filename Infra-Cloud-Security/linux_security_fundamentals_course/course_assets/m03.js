window.COURSE_MODULE = {
  "title": "File Ownership and Permissions",
  "graphicAlt": "Conceptual visual of file ownership and permissions controlling read, write, and execute access.",
  "narration": "Linux file security is built around ownership and permissions. A file has an owner, a group, and a file mode that describes who can read, write, or execute it. That model is simple enough to learn, but important enough to affect almost every Linux system. Incorrect permissions can expose sensitive data, allow unauthorized changes, prevent applications from working, or make troubleshooting much harder.\n\nRead access matters because many files contain useful or sensitive information: configuration, credentials, logs, application data, scripts, reports, keys, and system details. Write access matters because changing the wrong file can alter behavior, damage data, or weaken controls. Execute access matters because scripts and programs should run only where that makes sense. A file that is readable or writable by too many users may be a security problem even if the system appears healthy.\n\nDirectories need special attention. Directory permissions affect whether users can list names, traverse paths, create files, remove files, or reach objects below the directory. A sensitive file can still be exposed if the path around it is poorly controlled. Application directories, shared folders, log locations, temporary spaces, and deployment paths should be reviewed with their real purpose in mind.\n\nThe defensive habit is to match permissions to need. Sensitive files should not be broadly accessible. Scripts should be controlled by the right owner and group. Logs should be available for operations and investigation without unnecessary exposure. Before changing permissions on a production system, administrators should understand the application, test safely, document the change, and keep a rollback plan.",
  "narrationPoints": [
    "Linux files have owners, groups, and permissions.",
    "Read, write, and execute access affect security.",
    "Directories require careful permission handling.",
    "Sensitive files should not be broadly accessible.",
    "Permissions should match the system's purpose."
  ]
};
