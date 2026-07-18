window.COURSE_MODULE = {
  "title": "Security, Access, and Network Exposure",
  "graphicAlt": "Preview bullet summary visual for security, access, and network exposure.",
  "narration": "Local model serving is not automatically safe just because it runs nearby. Operators should understand what address the service listens on, who can reach it, and which applications are expected to use it. A service intended for one user on a local machine has different risk than a service reachable by a team, a lab network, or other internal systems.\n\nNetwork exposure should be a deliberate architecture decision. If a model service is reachable by other hosts, teams may need authentication, authorization, firewalling, reverse proxy controls, monitoring, and documented ownership. The exact controls depend on the environment, but the principle is consistent: do not assume that being internal means access is automatically appropriate.\n\nData handling is also part of security operations. Prompts, retrieved context, file contents, and outputs may contain secrets, credentials, personal data, internal plans, customer information, or confidential work product. Integrations should avoid logging sensitive prompts or outputs unless a governed process explicitly requires it. When logs are necessary, teams should consider redaction, retention, and who can read them.\n\nDefensive operation focuses on clear access boundaries, privacy-aware logging, and supportable ownership. Operators should know which workflows are approved, which users or applications can reach the service, what data classes are allowed, and who reviews changes. These choices keep local AI useful without turning it into an unmanaged internal endpoint.",
  "narrationPoints": [
    "Local model serving is not automatically safe just because it runs nearby.",
    "Network exposure should be a deliberate architecture decision.",
    "Data handling is also part of security operations.",
    "Defensive operation focuses on clear access boundaries, privacy-aware logging, and supportable ownership."
  ]
};
