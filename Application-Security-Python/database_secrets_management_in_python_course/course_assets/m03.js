window.COURSE_MODULE = {
  "title": "Storage Patterns and Environment Separation",
  "graphicAlt": "Development, testing and production use separate managed credentials, and a missing required secret stops startup.",
  "narration": "Managed secret stores, cloud secret managers, operating system secret stores, and encrypted configuration systems all exist to reduce uncontrolled secret spread. The exact product or platform may change, but the principle is stable: secrets should be stored in a system designed for access control, auditing, lifecycle management, and retrieval by authorized workloads. Source code, images, shared local files, and general-purpose documentation systems are poor places for production database secrets.\n\nEnvironment variables are common and can be useful, but they are not a complete secrets management strategy by themselves. Depending on the platform, environment values may be visible through process inspection, crash dumps, logs, debugging tools, deployment manifests, or broad runtime access. They are often better than hardcoding secrets, but teams should still control who can set them, who can read them, how they are rotated, and whether more managed storage is appropriate.\n\nEnvironment separation is a major safety control. Local development, testing, staging, and production should use separate database accounts and separate secrets. Lower-trust environments should not grant production access. Shared credentials across environments increase blast radius and make it harder to know which system used a credential. Per-environment accounts also make monitoring and revocation more precise when a secret is exposed or a system is retired.\n\nSafe defaults matter. A missing database secret should lead to a clear, safe startup failure rather than falling back to a shared default, a local development password, or a privileged account. Production database secrets should not be recoverable from source code, images, artifacts, or shared local files. A secure design assumes configuration mistakes will happen and makes those mistakes visible before the application starts handling real data.",
  "narrationPoints": [
    "Managed secret stores.",
    "Environment variables are common and can be useful.",
    "Environment separation is a major safety control.",
    "Safe defaults matter.",
    "Local development, testing, staging, and production should.",
    "Lower-trust environments should not grant production access."
  ]
};
