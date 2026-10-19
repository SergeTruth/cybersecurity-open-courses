window.COURSE_MODULE = {
  "title": "What Database Secrets Management Means",
  "graphicAlt": "Database credentials have owners, approved consumers, controlled storage and a rotation and retirement lifecycle.",
  "narration": "Database secrets are credentials and sensitive values that allow Python applications, jobs, tools, and pipelines to connect to databases. They may include passwords, connection strings, DSNs, API tokens, client certificates, private keys, IAM-generated tokens, and credentials used by migration tooling. These values are different from public identifiers such as hostnames, usernames, database names, or service labels, although those identifiers can still provide useful context to an attacker if combined with a real secret.\n\nPython systems use database secrets in many places: Flask applications, Django applications, FastAPI services, scripts, ORMs, background workers, data pipelines, notebooks, scheduled jobs, migrations, and internal tools. A credential copied for convenience can quickly become a shared dependency across local development, testing, deployment, reporting, and operations. That spread is what makes secrets management a lifecycle problem rather than a single configuration choice.\n\nA mishandled database secret can expose a large amount of application data because databases often hold customer records, operational history, authentication state, financial data, analytics, or regulated information. Even a read-only credential can be sensitive if it grants access to broad tables. A write-capable or administrative credential can affect integrity, availability, auditability, and recovery. Risk is based on what the credential can reach and what actions it can perform.\n\nDatabase secrets management covers creation, storage, access, use, rotation, logging, monitoring, and retirement. The goal is not simply hiding a password. The goal is controlling the credential lifecycle so every secret has an owner, a purpose, a storage location, an access path, a rotation plan, and an incident response path. Good secrets management makes secure behavior routine and recovery possible when something goes wrong.",
  "narrationPoints": [
    "Database secrets are credentials and sensitive values.",
    "Python systems use database secrets in many places: Flask.",
    "A mishandled database secret can expose a large amount.",
    "Database secrets management covers creation.",
    "They may include passwords.",
    "A credential copied for convenience can quickly become."
  ]
};
