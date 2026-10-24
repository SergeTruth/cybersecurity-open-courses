window.COURSE_MODULE = {
  "title": "Key Storage, Secret Managers, and Access Control",
  "graphicAlt": "Approved storage delivers keys through scoped runtime identity with access evidence, while uncontrolled copies are excluded.",
  "narration": "Key storage is a control point. Production keys should not live in source code, committed .env files, frontend bundles, Docker images, build artifacts, logs, screenshots, tickets, or public documentation. Every uncontrolled copy makes rotation harder and increases the chance that a routine workflow becomes a key exposure event.\n\nUse approved secret-management systems, cloud key-management services, vault systems, HSM-backed services, orchestrator secrets, or protected runtime injection mechanisms where appropriate. These systems can reduce uncontrolled copies, centralize access policy, support audit records, and help with rotation. They do not fix overly broad permissions or unsafe downstream use by themselves.\n\nAccess should follow least privilege. Applications, developers, CI jobs, deployment jobs, workers, and services should only access the keys they need. Production keys should not be broadly readable by every developer or every CI job. A build job that creates an artifact may not need runtime decryption keys. A worker that verifies webhooks may not need a database encryption key.\n\nEnvironment variables can deliver key references or key material, but they are not a complete key-management solution. They do not automatically provide ownership, audit, rotation, recovery, safe logging, or policy review. The design should distinguish where a key is stored, how it is delivered to runtime, how code uses it, and what evidence exists when someone accesses it.",
  "narrationPoints": [
    "env files, frontend bundles, Docker images, build artifacts, logs, screenshots, tickets, or public documentation.",
    "Use approved secret-management systems, cloud key-management services, vault systems, HSM-backed services, orchestrator secrets, or protected runtime injection mechanisms where appropriate.",
    "A worker that verifies webhooks may not need a database encryption key.",
    "Environment variables can deliver key references or key material, but they are not a complete key-management solution.",
    "These systems can reduce uncontrolled copies, centralize access policy, support audit records, and help with rotation.",
    "Applications, developers, CI jobs, deployment jobs, workers, and services should only access the keys they need."
  ]
};
