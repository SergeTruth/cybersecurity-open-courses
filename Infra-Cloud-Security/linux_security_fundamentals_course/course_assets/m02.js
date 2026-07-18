window.COURSE_MODULE = {
  "title": "Users, Groups, Privilege, and Sudo",
  "graphicAlt": "Conceptual visual of users, groups, root, sudo, service accounts, and least privilege.",
  "narration": "Linux separates normal users from administrative authority. A normal user can run applications, create personal files, and perform work allowed by that account. The root account is different. Root can modify system configuration, install packages, change ownership, stop services, read many protected files, and affect other users. That makes root powerful, but also high impact. Mistakes made with root privileges can break systems, expose data, or remove evidence needed for troubleshooting.\n\nSudo is a controlled way to grant administrative capability without having everyone sign in directly as root. In a well-managed system, sudo access is intentional: who has it, why they have it, what they are allowed to do, and how that access is reviewed. Broad sudo access may be convenient, but it creates risk. It can also hide accountability if shared administrator accounts are used instead of unique user accounts.\n\nGroups help organize access. A group may control access to files, devices, application directories, operational functions, or administrative capabilities. Group membership should be treated like permission, not decoration. Privileged groups deserve periodic review, especially after role changes, contractor offboarding, migrations, or emergency access exceptions.\n\nService accounts also need care. A service account should have an owner, purpose, authentication method, and lifecycle. It should not be a forgotten account with broad access and no review. Good Linux security starts with identity hygiene: unique accounts, limited privilege, strong authentication, documented exceptions, and regular validation that users, groups, sudo rights, and service accounts still match the system's purpose.",
  "narrationPoints": [
    "Linux separates normal users from administrative authority.",
    "Root and sudo access are high-impact privileges.",
    "Groups help manage access to files and functions.",
    "Privileged access should be limited and reviewed.",
    "Service accounts need ownership and clear purpose."
  ]
};
