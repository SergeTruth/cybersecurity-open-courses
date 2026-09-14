window.COURSE_MODULE = {
  "title": "Identity, Secrets, and Least Privilege",
  "graphicAlt": "Validation, planning, and apply jobs receive distinct levels of access, using credentials that are owned, scoped, and revocable.",
  "narration": "IaC automation usually needs credentials to read current state and modify infrastructure. Those credentials may belong to a service account, workload identity, cloud role, CI/CD runner, managed deployment platform, or human-approved release job. Whatever form they take, they should be treated as sensitive operational authority because they can change real infrastructure.\n\nDifferent jobs may need different permissions. A formatting or module validation job may not need cloud access at all. A plan job may need read access to state and current resources. An apply job may need write access for a specific environment. A rollback or break-glass workflow may need a separate approval path. Treating every job as though it needs broad administrator access creates unnecessary blast radius.\n\nSecrets should come from approved secret-management mechanisms, platform identity, or workload identity where practical. Avoid hard-coded credentials, broad repository variables, copied local credentials, and shared cloud administrator keys. Scope identities by environment, action, service, repository, and workflow. A development plan should not accidentally receive production apply privileges.\n\nAutomation identities need lifecycle management. Each credential should have an owner, purpose, scope, environment boundary, rotation path, revocation process, and review schedule. Least privilege is not a one-time setting. As repositories, modules, cloud services, and pipelines evolve, the permissions behind IaC automation should be reviewed and narrowed where possible.",
  "narrationPoints": [
    "IaC automation usually needs credentials to read current state and modify infrastructure.",
    "Different jobs may need different permissions.",
    "Secrets should come from approved secret-management mechanisms, platform identity, or workload identity where practical.",
    "Automation identities need lifecycle management."
  ]
};
