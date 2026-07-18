window.COURSE_MODULE = {
  "title": "Installation and Persistence Risk",
  "graphicAlt": "Conceptual visual of installation and persistence risk addressed through monitoring, change detection, and containment planning.",
  "narration": "Installation describes the possibility that adversary-controlled software, access, or configuration becomes established after initial activity. Persistence risk should be handled carefully and defensively. Responders do not need a catalog of persistence techniques to use this stage well; they need to know what changed, whether the change is authorized, and whether it could allow continued access. Endpoint monitoring, application control, change detection, startup and service review, integrity monitoring, privileged access control, and configuration baselines all help. This stage also requires humility. Many modern incidents do not involve traditional malware installation. Cloud, SaaS, and identity-driven incidents may leave evidence in tokens, sessions, roles, automation rules, OAuth grants, API keys, or configuration changes rather than on a single endpoint. Analysts should avoid forcing the evidence into a malware-centered story. Instead, ask what capability or access could persist, where it would appear in telemetry, who owns the affected system, and what containment would reduce risk while preserving evidence. Good use of this stage helps teams find unauthorized change and decide whether recovery requires cleanup, rebuild, revocation, or configuration correction. Defenders should also consider how persistence risk changes by platform. Endpoint, server, cloud, SaaS, and identity systems all leave different evidence. A strong review looks across those layers instead of assuming that one endpoint scan can answer every persistence question.",
  "narrationPoints": [
    "Installation involves establishing attacker-controlled access or software.",
    "Persistence risk should be discussed defensively.",
    "Change detection and endpoint monitoring help identify unusual activity.",
    "Privileged access control reduces impact.",
    "Modern incidents may not use traditional malware installation."
  ]
};
